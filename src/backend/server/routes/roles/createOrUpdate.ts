import { ApiEndpoint } from "../..";
import { validateRole } from "../../../../frontend/src/utils/validation";
import { RoleData } from "../../../database/models/Role";
import {get as getRole, create as createRole} from "../../../database/models/Role";
import { err } from "../../../utils";

export default {
    method: "post",
    path: "/api/roles",
    exec: async (game, req, res) => {
        if (!game.admins.has(req.cookies.__admin__)) return res.sendStatus(401);
        const body = req.body as RoleCreateBody;
        const validation = validateRole(body.role);
        if (validation) return err(res, 401, validation);
        const existing = await getRole(body.role.name);
        if (existing) {
            Object.assign(existing, body.role);
            await existing.save();
            return res.sendStatus(204);
        }
        await createRole(body.role);
        res.sendStatus(204);
    }
} as ApiEndpoint;

export interface RoleCreateBody {
    role: RoleData
}