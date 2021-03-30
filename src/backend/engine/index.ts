import EventEmitter from "eventemitter3";
import { PACKETS } from "../websocket";
import { PhaseManager } from "./managers/PhaseManager";
import { PlayerManager } from "./managers/PlayerManager";
import { Phase } from "./structures/Phase";
import { Player } from "./structures/Player";


export class Engine extends EventEmitter {
    phases: PhaseManager 
    players: PlayerManager
    started: boolean
    constructor() {
        super();
        this.phases = new PhaseManager(this, [
            {name: "Day 0", iterations: 0, next: "Night", duration: 5_000},
            {name: "Night", next: "Day", duration: 10_000},
            {name: "Day", next: "Voting", duration: 10_000},
            {name: "Voting", next: "Night", duration: 20_000},
            {name: "Judgement", next: "Last Words", duration: 15_000},
            {name: "Last Words", next: "Night", duration: 10_000}
        ]);
        this.players = new PlayerManager(this);
        this.started = false;

        this.on("disconnect", (player: Player) => {
            if (!this.started) {
                setTimeout(() => {
                    if (player.ws.length) return;
                    this.players.remove(player);
                    this.players.broadcast(PACKETS.LEAVE, {player: player.name});
                }, 5000);
            }
        });
    }

    start(firstPhase: string) : void {
        this.started = true;
        if (!this.phases.has(firstPhase)) return;
        this.phases.move(this.phases.get(firstPhase) as Phase);
    }

}