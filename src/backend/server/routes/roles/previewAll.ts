import { ApiEndpoint } from "../..";
import { validateRole } from "../../../../frontend/src/utils/validation";
import { RoleData } from "../../../database/models/Role";
import {loadAll as loadAllRoles} from "../../../database/models/Role";
import { err } from "../../../utils";

export default {
    method: "get",
    path: "/api/roles",
    exec: async (game, req, res) => {
        if (!game.admins.has(req.cookies.__admin__)) return res.sendStatus(401);
        const all = await loadAllRoles();
        res.send(all.map(role => role.toPreview()));
    }
} as ApiEndpoint;

export interface RoleCreateBody {
    role: RoleData
}