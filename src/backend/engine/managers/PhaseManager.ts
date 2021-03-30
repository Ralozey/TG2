
import {Phase, PhaseObj, PhaseView} from "../structures/Phase";
import {Collection} from "../../utils/Collection";
import { Engine } from "..";

export class PhaseManager extends Collection<Phase> {
    current!: Phase
    first!: Phase
    engine: Engine
    phaseStartedAt: number
    private timer!: NodeJS.Timeout
    constructor(engine: Engine, phases?: Array<PhaseObj>) {
        super(phases && phases.map(phase => [phase.name, new Phase(phase)]));
        this.engine = engine;
        this.phaseStartedAt = 0;
    }

    add(...objs: Array<PhaseObj>) {
        for (const obj of objs) this.set(obj.name, new Phase(obj));
    }

    move(next: Phase) : void {
        // The next phase starts
        this.current = next;
        this.engine.emit(next.name, next);
        if (next !== this.current) return; // If this is true, then the "jump" function was called inside the beginning event - and we stop
        this.phaseStartedAt = Date.now();
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            clearTimeout(this.timer);

            // The current phase ends
            this.engine.emit(`${next.name}-End`, next);
            this.engine.emit("phase-end");
            if (this.current !== next) return; // If this is true, then the "jump" function was called in the end event - and we stop
            next.end(); 

            // The next phase restarts the cycle
            this.move(this.get(next.next) as Phase);
        }, next.duration);
    }

    jump(phaseName: string, ends = true, leftovers?: number)  : void {
        const phase = this.get(phaseName);
        if (!phase) return;

        clearTimeout(this.timer);
        
        if (leftovers) this.current.leftoverDuration = leftovers;
        if (ends) {
            this.engine.emit(`${this.current.name}-End`, this.current);
            this.current.end(); 
        }

        this.move(phase);
    }

    timeLeft() : {seconds: number, minutes: number} {
        const now = Date.now();
        const msLeft = this.current.duration - (now - this.phaseStartedAt);
        let mins = Math.floor(msLeft / 60000);
        let secs = Math.round(((msLeft % 60000) / 1000));
        if (secs === 60) {
            mins++;
            secs = 0;
        }
        return { minutes: mins, seconds: secs };
    }

    toView() : PhaseView {
        return {
            name: this.current.name,
            timeLeft: this.timeLeft()
        }
    }

    clear() : void {
        clearTimeout(this.timer);
        for (const [, phase] of this) {
            phase.clear();
        }
    }
}