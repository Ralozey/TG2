import { Engine } from "..";
import { Collection } from "../../utils/Collection";
import { PACKETS } from "../../websocket";
import { Player, PlayerData } from "../structures/Player";
import WebSocket from "ws";

export class PlayerManager extends Collection<Player> {
    game: Engine
    onTrial?: Player
    constructor(game: Engine) {
        super();
        this.game = game;
    }

    create(data: PlayerData) : Player {
        const player = new Player(this.game, data);
        this.set(data.id, player);
        return player;
    }

    remove(left: Player) : void {
        for (const [, player] of this) {
            if (player.num > left.num) player.num--;
        }
        this.delete(left.id);
    }

    onConnect(id: string, socket: WebSocket) : void {
        if (!this.has(id)) return socket.close();
        (this.get(id) as Player).addSocket(socket);
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