
import WebSocket from "ws";
import { Engine } from "..";

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
    dead: boolean
    constructor(game: Engine, data: PlayerData) {
        this.game = game;
        this.id = data.id;
        this.name = data.name;
        this.ip = data.ip;
        this.num = game.players.size + 1;
        this.votes = 0;
        this.dead = false;
        this.ws = [];
    }


    addSocket(socket: WebSocket) : void {
        const id = this.ws.push(socket) - 1;
        socket.on("close", () => {
            this.ws.splice(id, 1);
            if (!this.ws.length) this.game.emit("disconnect", this);
        });
    }

    clear() : void {
        this.votes = 0;
        this.dead = false;
        delete this.votedFor;
        delete this.judgement;
        //delete this.role;
        //delete this.action;
    }
}