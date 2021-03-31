import EventEmitter from "eventemitter3";
import { PACKETS } from "../websocket";
import { PhaseManager } from "./managers/PhaseManager";
import { PlayerManager } from "./managers/PlayerManager";
import { Phase, PhaseView } from "./structures/Phase";
import { Player, PlayerView } from "./structures/Player";
import WebSocket from "ws";
import { sendToSocket } from "../utils";

export interface EngineView {
    started: number,
    players: Array<PlayerView>
    currentPhase?: PhaseView,
    thisPlayerName?: string
}

export class Engine extends EventEmitter {
    phases: PhaseManager 
    players: PlayerManager
    admins: Set<string>
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
            this.players.broadcast(PACKETS.PLAYER_FLAG_UPDATE, {player: player.toView()});
            if (!this.started) {
                setTimeout(() => {
                    if (player.ws.length) return this.players.broadcast(PACKETS.PLAYER_FLAG_UPDATE, {player: player.toView()});;
                    this.players.remove(player);
                    this.players.broadcast(PACKETS.LEAVE, {player: player.toView()});
                }, 5000);
            }
        });
        
        this.admins = new Set();
    }

    onConnect(id: string, adminId: string|undefined, socket: WebSocket) : void {
        if (!this.players.has(id)) return socket.close();
        const player = this.players.get(id) as Player;
        if (adminId && this.admins.has(adminId)) player.admin = true;
        player.addSocket(socket);
        sendToSocket(socket, PACKETS.GAME_DATA, this.toView(player.name));
    }

    toView(thisPlayerName?: string) : EngineView {
        return {
            started: Number(this.started),
            players: this.players.map(p => p.toView()),
            thisPlayerName: thisPlayerName
        }
    }

    start(firstPhase: string) : void {
        this.started = true;
        if (!this.phases.has(firstPhase)) return;
        this.phases.move(this.phases.get(firstPhase) as Phase);
    }

}