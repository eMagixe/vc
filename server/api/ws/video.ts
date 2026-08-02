import { defineWebSocketHandler } from 'h3'

type SignalMessage =
	| {
			type: 'offer'
			room: string
			data: any
	  }
	| {
			type: 'answer'
			room: string
			data: any
	  }
	| {
			type: 'candidate'
			room: string
			data: any
	  }

const rooms = new Map<string, Set<any>>()

function joinRoom(room: string, peer: any) {
	let clients = rooms.get(room)

	if (!clients) {
		clients = new Set()
		rooms.set(room, clients)
	}

	clients.add(peer)

	peer.room = room
}

function leaveRoom(peer: any) {
	const room = peer.room

	if (!room) return

	const clients = rooms.get(room)

	if (!clients) return

	clients.delete(peer)

	if (clients.size === 0) {
		rooms.delete(room)
	}
}

export default defineWebSocketHandler({
	open(peer) {
		console.log('WS connected')
	},

	message(peer, message) {
		try {
			const text = typeof message.text === 'function' ? message.text() : new TextDecoder().decode(message.raw)

			const payload = JSON.parse(text)

			// первое сообщение
			// { type:'join', room:'demo' }

			if (payload.type === 'join') {
				joinRoom(payload.room, peer)

				const clients = rooms.get(payload.room)!

				if (clients.size === 2) {
					for (const client of clients) {
						client.send(
							JSON.stringify({
								type: 'ready'
							})
						)
					}
				}

				return
			}

			const signal = payload as SignalMessage

			const clients = rooms.get(signal.room)

			if (!clients) return

			for (const client of clients) {
				if (client !== peer) {
					client.send(JSON.stringify(signal))
				}
			}
		} catch (e) {
			console.error(e)
		}
	},

	close(peer) {
		leaveRoom(peer)
		console.log('WS disconnected')
	}
})
