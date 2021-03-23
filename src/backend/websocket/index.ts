
import WebSocket from "ws";
import http from "http";
import cookie from "cookie";

export class WebSocketServer extends WebSocket.Server {
    constructor(path: string, server: http.Server) {
        super({server, path});

        this.on("connection", (socket, req) => {
            if (!req.headers.cookie) return socket.close();
            const cookies = cookie.parse(req.headers.cookie);
            if (!cookies.__secret) return socket.close();
            this.emit("connect", cookies.__secret, socket);
        });
    }

}

