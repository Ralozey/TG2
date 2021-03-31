import { ApiEndpoint } from "../..";

export default {
    method: "get",
    path: "/api/me/isAdmin",
    exec: (game, req, res) => {
         if (!req.cookies.__player__) return res.send({in: false});
         res.send({isAdmin: game.admins.has(req.cookies.__admin__)});
    }
} as ApiEndpoint;

export interface GameJoinBody {
    name: string
}