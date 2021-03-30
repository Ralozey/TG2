import { Engine } from "..";
import { Collection } from "../../utils/Collection";
import { PACKETS } from "../../websocket";
import { Player } from "../structures/Player";


export class PlayerManager extends Collection<Player> {
    game: Engine
    onTrial?: Player
    constructor(game: Engine) {
        super();
        this.game = game;
    }

    create(name: string, id: string) : Player {
        const player = new Player(this.game, name, id);
        this.set(id, player);
        return player;
    }

    remove(id: string) : void {
        const left = this.get(id);
        if (!left) return;
        for (const [, player] of this) {
            if (player.num > left.num) player.num--;
        }
        this.delete(id);
    }

    broadcast(packet: PACKETS, content: any) : void {
        for (const [, player] of this) {
            for (const socket of player.ws) socket.send(JSON.stringify({e: packet, d: content}));
        }
    }

    clear() : void {
        delete this.onTrial;
        for (const [, player] of this) player.clear();
    }
}