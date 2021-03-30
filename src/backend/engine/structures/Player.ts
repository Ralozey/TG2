
import WebSocket from "ws";
import { Engine } from "..";

export const enum JUDGEMENT_TYPES {
    NEUTRAL,
    INNOCENT,
    GUILTY
}

export class Player {
    name: string
    id: string
    num: number
    game: Engine
    ws: Array<WebSocket>
    votes: number
    judgement?: JUDGEMENT_TYPES
    votedFor?: Player
    //role
    //action
    dead: boolean
    constructor(game: Engine, name: string, id: string) {
        this.game = game;
        this.id = id;
        this.num = game.players.size + 1;
        this.name = name;
        this.votes = 0;
        this.dead = false;
        this.ws = [];
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