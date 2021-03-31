import { ApiEndpoint } from "../..";

export default {
    method: "get",
    path: "/api/me/in",
    exec: (game, req, res) => {
         if (!req.cookies.__player__) return res.send({in: false});
         res.send({in: game.players.has(req.cookies.__player__)});
    }
} as ApiEndpoint;

export interface GameJoinBody {
    name: string
}