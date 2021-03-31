
import WebSocket from "ws";
import { Engine } from "..";
import { Bitfield } from "../../../frontend/src/utils/Bitfield";

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
    SPECTATOR = 1 << 2
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
                this.disconnected = true;
                this.game.emit("disconnect", this);
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