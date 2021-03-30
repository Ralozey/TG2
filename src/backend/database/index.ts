
import {Bans} from "./models/Ban";
import {Roles} from "./models/Role";

export const sync = async () : Promise<void> => {
    await Bans.sync();
    await Roles.sync();
}