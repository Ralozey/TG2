import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { BasePlayProps } from "..";
import {PlayerView} from "../../../../../backend/engine/structures/Player";
import { PACKETS } from "../../../../../backend/websocket";

const PlayerListBox = styled(ListGroup)`
    border: 2px solid black;
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

    useEffect(() => {
        const socket = props.socket.current;
        if (!socket) return;

        socket.listen(PACKETS.JOIN, (data: {player: PlayerView}) => {
            setPlayers([...players, data.player]);
        });

        socket.listen(PACKETS.LEAVE, (data: {player: PlayerView}) => {
            const newPlayerArr = [];
            for (const player of players) {
                if (player.name === data.player.name) continue;
                if (player.num > data.player.num) player.num--;
                newPlayerArr.push(player);
            }
            setPlayers(newPlayerArr);
        });

    }, []);

    return(
        <PlayerListBox>
            {players.map(p => <ListGroup.Item key={p.name}>{p.num}. {p.name}</ListGroup.Item>)}
        </PlayerListBox>
    )
}