import { RoleData } from "../../../backend/database/models/Role";


export const validateName = (name: string): string|void => {
    if (name.length > 16) return "Your username cannot be longer than 16 characters";
    if (name.length < 4) return "Your username cannot be shorter than 4 characters";
    if (!/^[a-z0-9]+$/i.test(name)) return "Usernames can contain only numbers and letters";
}

export const validateRole = (role: Partial<RoleData>) : string|void => {
    if (!role.name) return "Role name is required";
    if (!role.faction) return "Role faction is required";
    if (!role.alignment) return "Role alignment is required";
    if (typeof role.attack !== "number") return "Role attack is required";
    if (typeof role.defense !== "number") return "Role defense is required";
    if (typeof role.priority !== "number") return "Role priority is required";
    if (typeof role.targets !== "number") return "Role targets is required";
    if (role.name.length > 40) return "Role name must be under 40 characters";
    if (role.name.length < 3) return "Role name must be at least 3 characters";
    if (role.faction.length > 40) return "Role faction must be under 40 characters";
    if (role.faction.length < 3) return "Role faction must be at least 3 characters";
    if (role.alignment.length > 40) return "Role alignment must be under 40 characters";
    if (role.alignment.length < 3) return "Role alignment must be at least 3 characters";
    if (role.attack < 0) return "Role attack must be a positive number or zero";
    if (role.defense < 0) return "Role defense must be a positive number or zero";
    if (role.priority < 0) return "Role priority must be a positive number or zero";
    if (role.targets < 0) return "Role targets must be a positive number or zero";
    if (role.abilities && role.abilities.length > 10_000) return "Role abilities summary cannot contain more than 10,000 characters";
} 