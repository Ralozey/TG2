import { ApiEndpoint } from "../../";
import { Player } from "../../../engine/structures/Player";
import { PACKETS } from "../../../websocket";
import {v4} from "uuid";

export default {
    method: "post",
    path: "/api/game/players",
    exec: (game, req, res) => {
        const name = (req.body as GameJoinBody).name;
        if (!name) return res.status(400).send("Name is required");
        if (game.players.some(p => p.name === name)) return res.status(406).send("Name is taken");
        let playerId = req.cookies.__player__ as string;
        if (game.players.has(playerId)) return res.status(401).send("You are already in the game");
        playerId = v4();
        res.cookie("__player__", playerId, {httpOnly: true, expires: new Date(86_400_000)});
        game.players.broadcast(PACKETS.JOIN, {});
        game.players.create(name, playerId);
        res.sendStatus(204);
    }
} as ApiEndpoint;

export interface GameJoinBody {
    name: string
}