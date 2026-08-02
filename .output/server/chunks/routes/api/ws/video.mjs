import { a as defineWebSocketHandler } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';

const rooms = /* @__PURE__ */ new Map();
function joinRoom(room, peer) {
  let clients = rooms.get(room);
  if (!clients) {
    clients = /* @__PURE__ */ new Set();
    rooms.set(room, clients);
  }
  clients.add(peer);
  peer.room = room;
}
function leaveRoom(peer) {
  const room = peer.room;
  if (!room) return;
  const clients = rooms.get(room);
  if (!clients) return;
  clients.delete(peer);
  if (clients.size === 0) {
    rooms.delete(room);
  }
}
const video = defineWebSocketHandler({
  open(peer) {
    console.log("WS connected");
  },
  message(peer, message) {
    try {
      const text = typeof message.text === "function" ? message.text() : new TextDecoder().decode(message.raw);
      const payload = JSON.parse(text);
      if (payload.type === "join") {
        joinRoom(payload.room, peer);
        const clients2 = rooms.get(payload.room);
        if (clients2.size === 2) {
          for (const client of clients2) {
            client.send(
              JSON.stringify({
                type: "ready"
              })
            );
          }
        }
        return;
      }
      const signal = payload;
      const clients = rooms.get(signal.room);
      if (!clients) return;
      for (const client of clients) {
        if (client !== peer) {
          client.send(JSON.stringify(signal));
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
  close(peer) {
    leaveRoom(peer);
    console.log("WS disconnected");
  }
});

export { video as default };
//# sourceMappingURL=video.mjs.map
