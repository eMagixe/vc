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
const video = defineWebSocketHandler({
  open(peer) {
    console.log("Connected");
  },
  message(peer, message) {
    const data = JSON.parse(message.text());
    switch (data.type) {
      case "join": {
        const room = data.room;
        if (!rooms.has(room)) rooms.set(room, /* @__PURE__ */ new Set());
        const clients = rooms.get(room);
        peer.room = room;
        clients.add(peer);
        for (const client of clients) {
          if (client !== peer) {
            client.send(
              JSON.stringify({
                type: "peer-joined"
              })
            );
          }
        }
        break;
      }
      case "signal": {
        const clients = rooms.get(peer.room);
        if (!clients) return;
        for (const client of clients) {
          if (client !== peer) {
            client.send(
              JSON.stringify({
                type: "signal",
                signal: data.signal
              })
            );
          }
        }
        break;
      }
    }
  },
  close(peer) {
    const room = peer.room;
    if (!room) return;
    const clients = rooms.get(room);
    if (!clients) return;
    clients.delete(peer);
    if (!clients.size) rooms.delete(room);
  }
});

export { video as default };
//# sourceMappingURL=video.mjs.map
