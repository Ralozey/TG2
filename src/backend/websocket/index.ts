
import WebSocket from "ws";
import http from "http";
import cookie from "cookie";

export const enum PACKETS {
    GAME_DATA,
    JOIN,
    LEAVE,
    DISCONNECT
}

export class WebSocketServer extends WebSocket.Server {
    constructor(path: string, server: http.Server) {
        super({server, path});

        this.on("connection", (socket, req) => {
            if (!req.headers.cookie) return socket.close();
            const cookies = cookie.parse(req.headers.cookie);
            if (!cookies.__player__) return socket.close();
            this.emit("connect", cookies.__player__, socket);
        });
    }

}

