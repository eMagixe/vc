// composables/useWebRTC.ts

import { ref } from 'vue'

export function useWebRTC(room = 'demo') {
	const localVideo = ref<HTMLVideoElement | null>(null)
	const remoteVideo = ref<HTMLVideoElement | null>(null)

	const localStream = ref<MediaStream | null>(null)
	const remoteStream = ref<MediaStream | null>(null)

	let socket: WebSocket

	let peer: RTCPeerConnection

	let makingOffer = false

	const configuration: RTCConfiguration = {
		iceServers: [
			{
				urls: 'stun:stun.l.google.com:19302'
			}
		]
	}

	async function init() {
		localStream.value = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true
		})

		if (localVideo.value) {
			localVideo.value.srcObject = localStream.value
		}

		remoteStream.value = new MediaStream()

		if (remoteVideo.value) {
			remoteVideo.value.srcObject = remoteStream.value
		}

		peer = new RTCPeerConnection(configuration)

		localStream.value.getTracks().forEach((track) => {
			peer.addTrack(track, localStream.value!)
		})

		peer.ontrack = (event) => {
			event.streams[0].getTracks().forEach((track) => {
				remoteStream.value!.addTrack(track)
			})
		}

		peer.onicecandidate = (event) => {
			if (!event.candidate) return

			socket.send(
				JSON.stringify({
					type: 'candidate',
					room,
					data: event.candidate
				})
			)
		}

		socket = new WebSocket(`ws://${location.host}/api/ws/video`)

		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					type: 'join',
					room
				})
			)
		}

		socket.onmessage = async (event) => {
			const message = JSON.parse(event.data)

			switch (message.type) {
				case 'ready':
					if (peer.signalingState === 'stable') {
						await createOffer()
					}
					break

				case 'offer':
					await receiveOffer(message.data)
					break

				case 'answer':
					await receiveAnswer(message.data)
					break

				case 'candidate':
					if (message.data) {
						try {
							await peer.addIceCandidate(message.data)
						} catch (e) {
							console.error(e)
						}
					}
					break
			}
		}
	}

	async function createOffer() {
		try {
			makingOffer = true

			const offer = await peer.createOffer()

			await peer.setLocalDescription(offer)

			socket.send(
				JSON.stringify({
					type: 'offer',
					room,
					data: peer.localDescription
				})
			)
		} finally {
			makingOffer = false
		}
	}

	async function receiveOffer(offer: RTCSessionDescriptionInit) {
		const collision = makingOffer || peer.signalingState !== 'stable'

		if (collision) return

		await peer.setRemoteDescription(offer)

		const answer = await peer.createAnswer()

		await peer.setLocalDescription(answer)

		socket.send(
			JSON.stringify({
				type: 'answer',
				room,
				data: peer.localDescription
			})
		)
	}

	async function receiveAnswer(answer: RTCSessionDescriptionInit) {
		await peer.setRemoteDescription(answer)
	}

	function destroy() {
		socket?.close()

		peer?.close()

		localStream.value?.getTracks().forEach((track) => track.stop())

		remoteStream.value?.getTracks().forEach((track) => track.stop())
	}

	return {
		init,
		destroy,
		localVideo,
		remoteVideo
	}
}
