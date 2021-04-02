import { ROLE_GOALS } from "../../../backend/database/models/Role";


export const RoleGoalToText: Record<number, string> = {
    [ROLE_GOALS.TOWN]: "Lynch every criminal and evildoer.",
    [ROLE_GOALS.MAFIA]: "Kill anyone that will not submit to the Mafia."
}