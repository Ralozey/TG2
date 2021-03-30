
import {DataTypes, Model} from "sequelize";
import Instance from "../instance";

export interface BanModel extends Model {
    ip: string,
    expiresAt: number
}

export const Bans = Instance.define<BanModel>("bans", {
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    expiresAt: DataTypes.INTEGER
});


const cache = new Map<string, BanModel>();

export const create = async (ip: string, expiresAt?: Date) : Promise<BanModel> => {
    const obj = await Bans.create({ip, expiresAt: expiresAt && expiresAt.getTime()});
    cache.set(ip, obj);
    return obj;
}

export const has = async (ip: string) : Promise<boolean> => {
    if (cache.has(ip)) {
        const ban = cache.get(ip) as BanModel;
        // Ban has expired, delete from database
        if (ban.expiresAt < Date.now()) {
            await ban.destroy();
            cache.delete(ip);
            return false;
        }
        return true;
    }
    const ban = await Bans.findByPk(ip);
    if (!ban) return false;
    if (ban.expiresAt < Date.now()) {
        await ban.destroy();
        return false;
    }
    cache.set(ip, ban);
    return true;
}

export const loadAll = async () : Promise<void> => {
    const allBans = await Bans.findAll({});
    for (const ban of allBans) cache.set(ban.ip, ban);
}

