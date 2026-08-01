<script setup lang="ts">
import { onMounted, ref } from 'vue'

const localVideo = ref<HTMLVideoElement>()
const remoteVideo = ref<HTMLVideoElement>()

let socket: WebSocket
let peer: RTCPeerConnection

const room = 'room-1'

const config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
}

async function init() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })

  localVideo.value!.srcObject = stream

  peer = new RTCPeerConnection(config)

  stream.getTracks().forEach((track) => {
    peer.addTrack(track, stream)
  })

  peer.ontrack = (e) => {
    remoteVideo.value!.srcObject = e.streams[0] as any
  }

  peer.onicecandidate = (e) => {
    if (!e.candidate) return

    socket.send(
      JSON.stringify({
        type: 'signal',
        signal: {
          candidate: e.candidate
        }
      })
    )
  }

  socket = new WebSocket(`ws://${location.host}/ws/video`)

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: 'join',
        room
      })
    )
  }

  socket.onmessage = async (event) => {
    const msg = JSON.parse(event.data)

    switch (msg.type) {
      case 'peer-joined': {
        const offer = await peer.createOffer()

        await peer.setLocalDescription(offer)

        socket.send(
          JSON.stringify({
            type: 'signal',
            signal: offer
          })
        )

        break
      }

      case 'signal': {
        const signal = msg.signal

        if (signal.type === 'offer') {
          await peer.setRemoteDescription(signal)

          const answer = await peer.createAnswer()

          await peer.setLocalDescription(answer)

          socket.send(
            JSON.stringify({
              type: 'signal',
              signal: answer
            })
          )
        } else if (signal.type === 'answer') {
          await peer.setRemoteDescription(signal)
        } else if (signal.candidate) {
          await peer.addIceCandidate(signal.candidate)
        }

        break
      }
    }
  }
}

onMounted(init)
</script>

<template>
  <div class="video-chat">
    <video ref="localVideo" autoplay playsinline muted />

    <video ref="remoteVideo" autoplay playsinline />
  </div>
</template>

<style scoped>
.video-chat {
  display: flex;
  gap: 20px;
}

video {
  width: 400px;
  border-radius: 12px;
  background: #000;
}
</style>
