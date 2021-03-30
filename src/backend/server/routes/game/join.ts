import { ApiEndpoint } from "../../";
import { Player } from "../../../engine/structures/Player";
import { PACKETS } from "../../../websocket";
import {v4} from "uuid";
import { err } from "../../../utils";
import {getClientIp} from "request-ip";
import {validateName} from "../../../../frontend/src/utils/validation";

export default {
    method: "post",
    path: "/api/game/players",
    exec: (game, req, res) => {
        const name = (req.body as GameJoinBody).name;
        if (!name) return err(res, 400, "Name is required");
        const validation = validateName(name);
        if (validation) return err(res, 400, validation);
        if (game.players.some(p => p.name === name)) return err(res, 400, "Name is taken");
        let playerId = req.cookies.__player__ as string;
        if (game.players.has(playerId)) return err(res, 401, "You are already in the game");
        playerId = v4();
        res.cookie("__player__", playerId, {httpOnly: true, expires: new Date(Date.now() + 86_400_000)});
        const ip = getClientIp(req);
        if (game.players.some(p => p.ip === ip)) game.players.broadcast(PACKETS.JOIN, {altOf: (game.players.find(p => p.ip === ip) as Player).name})
        else game.players.broadcast(PACKETS.JOIN, {});
        game.players.create({name, id: playerId, ip});
        res.sendStatus(204);
    }
} as ApiEndpoint;

export interface GameJoinBody {
    name: string
}