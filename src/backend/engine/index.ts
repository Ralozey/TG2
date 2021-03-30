import { EventEmitter } from "events";
import { PhaseManager } from "./managers/PhaseManager";
import { PlayerManager } from "./managers/PlayerManager";
import { Phase } from "./structures/Phase";


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
    }

    start(firstPhase: string) : void {
        this.started = true;
        if (!this.phases.has(firstPhase)) return;
        this.phases.move(this.phases.get(firstPhase) as Phase);
    }

}