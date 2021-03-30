import { Scheduler } from "../../utils/Scheduler"


export interface PhaseObj {
    name: string,
    duration: number,
    next: string,
    iterations?: number
}

export interface PhaseView {
    name: string,
    timeLeft: {seconds: number, minutes: number}
}

export class Phase {
    private scheduled: Scheduler
    name: string
    originalDuration: number // In milliseconds
    leftoverDuration?: number
    iterations: number // Starts from 1 if not provided
    next: string
    constructor(obj: PhaseObj) {
        this.name = obj.name;
        this.originalDuration = obj.duration;
        this.next = obj.next;
        this.iterations = obj.iterations ?? 1;
        this.scheduled = new Scheduler();
    }

    get duration() : number {
        return this.leftoverDuration || this.originalDuration;
    }

    clearLeftovers() : void {
        delete this.leftoverDuration;
    }

    schedule(nightIteration: number, fn: () => void) : number {
        return this.scheduled.add(nightIteration, fn);
    }

    defer(nightIteration: number, fnIndex: number) : void {
        this.scheduled.remove(nightIteration, fnIndex);
    }

    end() : void {
        delete this.leftoverDuration;
        for (const event of this.scheduled.getAll(this.iterations)) event();
        this.iterations++;
    }

    clear() {
        this.iterations = 0;
        this.scheduled.clear();
    }
    
}