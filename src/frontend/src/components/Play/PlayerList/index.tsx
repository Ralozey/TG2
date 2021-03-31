import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { BasePlayProps } from "..";
import {PlayerView} from "../../../../../backend/engine/structures/Player";
import { PACKETS } from "../../../../../backend/websocket";
import {Player} from "./Player";

const PlayerListBox = styled(ListGroup)`
    border: 2px solid ${({theme}) => theme.borderColor || "black"};
    width: 25vw;
    height: 45vh;
    position: absolute;
    bottom: 5px;
    right: 5px;
`;

export interface PlayerListProps extends BasePlayProps {
    players: Array<PlayerView>
}

export const PlayerList: React.FunctionComponent<PlayerListProps> = (props) => {
    const [players, setPlayers] = useState<Array<PlayerView>>(props.players);

    console.log("New players: ", players);

    useEffect(() => {
        const socket = props.socket.current;
        if (!socket) return;

        const joinListener = (data: {player: PlayerView}) => {
            console.log("Join", data.player);
            setPlayers((old_players) => [...old_players, data.player]);
        };
        socket.listen(PACKETS.JOIN, joinListener);

        const leaveListener = (data: {player: PlayerView}) => {
            setPlayers((oldPlayers) => {
                console.log("Leave", data.player);
                const newPlayerArr = [];
                for (const player of oldPlayers) {
                    if (player.name === data.player.name) continue;
                    if (player.num > data.player.num) player.num--;
                    newPlayerArr.push(player);
                }
                return newPlayerArr;
            });
        }
        socket.listen(PACKETS.LEAVE, leaveListener);

        const flagUpdateListener = (data: {player: PlayerView}) => {
            setPlayers((oldPlayers) => {
                console.log("Flag update", data.player, "Players", oldPlayers);
                oldPlayers.find(p => p.name === data.player.name)!.flags = data.player.flags;
                return [...oldPlayers];
            });
        };
        socket.listen(PACKETS.PLAYER_FLAG_UPDATE, flagUpdateListener);

        return () => {
            socket.deaf(PACKETS.JOIN, joinListener);
            socket.deaf(PACKETS.LEAVE, leaveListener);
            socket.deaf(PACKETS.PLAYER_FLAG_UPDATE, flagUpdateListener);
        }
    }, []);


    return(
        <PlayerListBox>
            {players.map(p => <Player key={p.name} player={p} isThis={props.game.thisPlayerName === p.name}></Player>)}
        </PlayerListBox>
    )
}