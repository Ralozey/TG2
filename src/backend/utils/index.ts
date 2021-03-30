
import Express from "express";
import WebSocket from "ws";
import fs from "fs";
import { PACKETS } from "../websocket";


export function getFiles(folder: string) : Array<string> {
    const filePaths = [];
    const allFiles = fs.readdirSync(folder);
    for (const file of allFiles) {
        const path = `${folder}/${file}`;
        const fileStats = fs.statSync(path);
        if (fileStats.isFile()) filePaths.push(path);
        else filePaths.push(...getFiles(path));
    }
    return filePaths;
}

export function err(res: Express.Response, code: number, text: string) : void {
    res.statusMessage = text;
    res.sendStatus(code);
}

export function sendToSocket(socket: WebSocket, event: PACKETS, obj: any) : void {
    socket.send(JSON.stringify({e: event, d: obj}));
}