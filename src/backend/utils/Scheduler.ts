

export class Scheduler {
    max: number
    private data: Array<Array<() => void>>
    constructor(maxData = 10) {
        this.max = maxData;
        this.data = new Array(maxData);
        for (let i=0; i < maxData; i++) {
            this.data[i] = [];
        }
    }

    add(index: number, fn: () => void) : number {
        if (index > this.max) return -1;
        return this.data[index].push(fn) - 1;
    }

    getAll(index: number) : Array<() => void> {
        return this.data[index];
    }

    remove(index: number, subIndex: number) : void {
        this.data[index].splice(subIndex, 1);
    }

    clear() : void {
        this.data = new Array(this.max).fill([]);
    }

}