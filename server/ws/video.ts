import { defineWebSocketHandler } from 'h3'

const rooms = new Map<string, Set<any>>()

export default defineWebSocketHandler({
  open(peer) {
    console.log('Connected')
  },

  message(peer: any, message) {
    const data = JSON.parse(message.text())

    switch (data.type) {
      case 'join': {
        const room = data.room

        if (!rooms.has(room)) rooms.set(room, new Set())

        const clients = rooms.get(room)!

        peer.room = room

        clients.add(peer)

        for (const client of clients) {
          if (client !== peer) {
            client.send(
              JSON.stringify({
                type: 'peer-joined'
              })
            )
          }
        }

        break
      }

      case 'signal': {
        const clients = rooms.get(peer.room)

        if (!clients) return

        for (const client of clients) {
          if (client !== peer) {
            client.send(
              JSON.stringify({
                type: 'signal',
                signal: data.signal
              })
            )
          }
        }

        break
      }
    }
  },

  close(peer: any) {
    const room = peer.room

    if (!room) return

    const clients = rooms.get(room)

    if (!clients) return

    clients.delete(peer)

    if (!clients.size) rooms.delete(room)
  }
})
