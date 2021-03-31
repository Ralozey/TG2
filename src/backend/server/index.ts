
import Express from "express";
import http from "http";
import CookieParser from "cookie-parser";
import path from "path";
import { getFiles } from "../utils";
import {WebSocketServer} from "../websocket";
import { Engine } from "../engine";

export default (game: Engine): void => {
    const app = Express();
    const server = http.createServer(app);

    const socketServer = new WebSocketServer("/api/gateway", server);

    socketServer.on("connect", (id, adminId, socket) => {
        game.onConnect(id, adminId, socket);
    });

    app.use(Express.static(path.resolve(__dirname + "/../../../frontend/public")));
    app.use(Express.json());
    app.use(Express.urlencoded({extended: false}));
    app.use(CookieParser());

    const allEndpoints = getFiles(__dirname + "/routes");
    for (const filePath of allEndpoints) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const endpoint = require(filePath).default as ApiEndpoint;
        console.log(`[Express] Route [${endpoint.method}] [${endpoint.path}] loaded!`);
        app[endpoint.method](endpoint.path, endpoint.exec.bind(null, game));
    }

    app.get("*", async (req, res) => {
        res.sendFile(path.resolve(__dirname + "../../../../frontend/html/index.html"));
    });

    server.listen(process.env.PORT || 4000, () => {
        console.log(`Server is listening on port ${process.env.PORT || 4000}`);
    });
};

export interface ApiEndpoint {
    method: "get"|"post"|"delete"|"patch",
    exec: (game: Engine, req: Express.Request, res: Express.Response) => void,
    path: string
}
