
export class Bitfield {
    bits: number
    private changeCb: (value: number) => void
    constructor(bits = 0, changeCb: (value: number) => void) {
        this.bits = bits;
        this.changeCb = changeCb;
    }

    has(bit: number|Array<number>) : boolean {
        if (bit instanceof Array) return bit.every(p => this.has(p));
        return (this.bits & bit) === bit; 
    }

    add(...bits: Array<number>) : void {
        let total = 0;
        for (const bit of bits) {
            total |= bit;
        }
        this.bits |= total;
        this.changeCb(this.bits);
    } 

    remove(...bits: Array<number>) : void {
        let total = 0;
        for (const bit of bits) {
            total |= bit;
        }
        this.bits &= ~total;
        this.changeCb(this.bits);
    } 

}