
export class Bitfield {
    bits: number
    constructor(bits = 0) {
        this.bits = bits;
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
    } 

    remove(...bits: Array<number>) : void {
        let total = 0;
        for (const bit of bits) {
            total |= bit;
        }
        this.bits &= ~total;
    } 

}