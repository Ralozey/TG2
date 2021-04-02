
import {DataTypes, Model} from "sequelize";
import { CbBitfield } from "../../utils/CallbackBitfield";
import Instance from "../instance";

export const enum ROLE_FLAGS {
    ASTRAL_VISITS = 1 << 0,
    DAY_ACTION = 1 << 1
}

export const enum ROLE_GOALS {
    TOWN,
    MAFIA
}

export interface RoleData {
    name: string,
    alignment: string,
    faction: string,
    attack: number,
    defense: number,
    code: string,
    abilities: string,
    color?: string,
    goal?: number,
    goalStr?: string,
    priority: number,
    targets: number,
    flags: number
}

export interface RolePreview {
    name: string,
    alignment: string,
    abilities: string,
    faction: string,
    goal?: number,
    goalStr?: string,
    color?: string,
    flags: number
}

export interface RoleModel extends Model {
    name: string,
    alignment: string,
    faction: string,
    attack: number,
    defense: number,
    code: string,
    priority: number,
    abilities: string,
    color?: string,
    goal?: number,
    goalStr?: string
    targets: number,
    flags: CbBitfield,
    _flags: CbBitfield,
    toPreview() : RolePreview;
}


export const Roles = Instance.define<RoleModel>("roles", {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    alignment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    faction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attack: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    defense: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    abilities: DataTypes.TEXT,
    goal: DataTypes.SMALLINT,
    goalStr: DataTypes.STRING,
    color: DataTypes.STRING,
    code: DataTypes.TEXT,
    priority: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 10
    },
    targets: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    flags: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get(): CbBitfield {
            if (!this._flags) this._flags = new CbBitfield(this.getDataValue("flags"), (val) => this.setDataValue("flags", val));
            return this._flags;
        },
        set(val: number) : number {
            if (this._flags) this._flags.bits = val;
            this.setDataValue("flags", val);
            return val;
        }
    }
});

Roles.prototype.toPreview = function() {
    return {
        name: this.name,
        faction: this.faction,
        alignment: this.alignment,
        abilities: this.abilities,
        flags: this.flags.bits,
        goal: this.goal,
        goalStr: this.goalStr,
        color: this.color
    };
}

const cache = new Map<string, RoleModel>();
let loadedAll = false;

export const create = async (data: RoleData) : Promise<RoleModel> => {
    const role = await Roles.create(data);
    cache.set(data.name, role);
    return role;
}

export const get = async (name: string) : Promise<undefined|RoleModel> => {
    if (cache.has(name)) return cache.get(name) as RoleModel;
    const role = await Roles.findByPk(name);
    if (!role) return;
    cache.set(name, role);
    return role;
}

export const update = async (name: string, data: Partial<RoleData>) : Promise<void> => {
    if (cache.has(name)) {
        const role = cache.get(name) as RoleModel;
        Object.assign(role, data);
        await role.save();
    } else {
        const role = await Roles.findByPk(name);
        if (!role) return;
        await role.update(data);
        cache.set(name, role);
    }
}

export const loadAll = async (): Promise<Array<RoleModel>> => {
    if (loadedAll) return [...cache.values()];
    const allRoles = await Roles.findAll();
    for (const role of allRoles) cache.set(role.name, role);
    loadedAll = true;
    return allRoles;
}

export const destroy = async (name: string): Promise<void> => {
    if (cache.has(name)) cache.delete(name);
    await Roles.destroy({where: {name}});
}
