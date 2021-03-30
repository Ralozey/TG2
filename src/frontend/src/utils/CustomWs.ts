
import EventEmitter from "eventemitter3";

export class CustomWs extends EventEmitter {
    ws: WebSocket
    constructor() {
        super();
        this.ws = new WebSocket(`${location.protocol === "https:" ? "wss:":"ws:"}//${location.host}/api/gateway`);

        this.ws.onclose = () => {
            this.emit("close");
        }
    
        this.ws.onmessage = (msg) => {
            if (!msg.data) return;
            let data;
            try {
                data = JSON.parse(msg.data) as WSPacket;
            } catch {
                return;
            };
            this.emit(data.e.toString(), data.d);
        }
    }

    listen(e: number, cb: (...args: Array<any>) => void) {
        this.on(e.toString(), cb);
    }
}

export interface WSPacket {
    e: number,
    d: any
}