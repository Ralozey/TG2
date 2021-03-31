import { v4 } from "uuid";
import { ApiEndpoint } from "../..";

export default {
    method: "post",
    path: "/api/me/verify",
    exec: (game, req, res) => {
         if (req.cookies.__admin__ && game.admins.has(req.cookies.__admin__)) return res.sendStatus(204);
         const password = (req.body as VerifyBody).password; 
         if (process.env.PASSWORD !== password) return res.sendStatus(401);
         const adminCookie = v4();
         res.cookie("__admin__", adminCookie, {httpOnly: true, expires: new Date(Date.now() + 604_800_000)});
         game.admins.add(adminCookie);
         return res.sendStatus(204);
    }
} as ApiEndpoint;

export interface VerifyBody {
    password: string
}