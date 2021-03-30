
import WebSocket from "ws";
import { Engine } from "..";
import { Bitfield } from "../../../shared/Bitfield";

export const enum JUDGEMENT_TYPES {
    NEUTRAL,
    INNOCENT,
    GUILTY
}

export interface PlayerData {
    name: string,
    id: string,
    ip: string | null
}

export const enum PLAYER_FLAGS {
    DEAD = 1 << 0,
    DISCONNECTED = 1 << 1,
    ADMIN = 1 << 2,
    DEV = 1 << 3,
    SPECTATOR = 1 << 4
}

export interface PlayerView {
    name: string,
    num: number,
    flags: number,
    votes?: number
}

export class Player {
    name: string
    id: string
    ip: string | null
    num: number
    game: Engine
    ws: Array<WebSocket>
    votes: number
    judgement?: JUDGEMENT_TYPES
    votedFor?: Player
    //role
    //action
    flags: Bitfield
    constructor(game: Engine, data: PlayerData) {
        this.game = game;
        this.id = data.id;
        this.name = data.name;
        this.ip = data.ip;
        this.num = game.players.size + 1;
        this.votes = 0;
        this.ws = [];
        this.flags = new Bitfield();
    }


    addSocket(socket: WebSocket) : void {
        if (this.disconnected) this.disconnected = false;
        this.ws.push(socket);
        socket.on("close", () => {
            this.ws.splice(this.ws.indexOf(socket), 1);
            if (!this.ws.length) {
                this.game.emit("disconnect", this);
                this.disconnected = true;
            }
        });
    }

    get dead() {
        return this.flags.has(PLAYER_FLAGS.DEAD);
    }

    set dead(val: boolean) {
        val ? this.flags.add(PLAYER_FLAGS.DEAD):this.flags.remove(PLAYER_FLAGS.DEAD);
    }

    get disconnected() {
        return this.flags.has(PLAYER_FLAGS.DISCONNECTED);
    }

    set disconnected(val: boolean) {
        val ? this.flags.add(PLAYER_FLAGS.DISCONNECTED):this.flags.remove(PLAYER_FLAGS.DISCONNECTED);
    }

    get admin() {
        return this.flags.has(PLAYER_FLAGS.ADMIN);
    }

    set admin(val: boolean) {
        val ? this.flags.add(PLAYER_FLAGS.ADMIN):this.flags.remove(PLAYER_FLAGS.ADMIN);
    }

    get spectator() {
        return this.flags.has(PLAYER_FLAGS.SPECTATOR);
    }

    set spectator(val: boolean) {
        val ? this.flags.add(PLAYER_FLAGS.SPECTATOR):this.flags.remove(PLAYER_FLAGS.SPECTATOR);
    }

    toView() : PlayerView {
        return {
            name: this.name,
            num: this.num,
            flags: this.flags.bits
        }
    }

    clear() : void {
        this.votes = 0;
        this.flags.bits = 0;
        delete this.votedFor;
        delete this.judgement;
        //delete this.role;
        //delete this.action;
    }
}