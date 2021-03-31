
import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { PlayerView, PLAYER_FLAGS } from "../../../../../backend/engine/structures/Player";
import { Bitfield } from "../../../utils/Bitfield";
import styled from "styled-components";

const StyledPlayerItem = styled(ListGroup.Item)<{disconnected: boolean}>`
    ${(props) => props.disconnected && "color: darkgrey"}
`;

const StyledPlayerName = styled.span`
    margin-right: 10px;
`;

export interface PlayerProps {
    player: PlayerView,
    isThis: boolean
}

export const Player: React.FunctionComponent<PlayerProps> = (props) => {
    const flags = new Bitfield(props.player.flags);
    if (flags.has(PLAYER_FLAGS.DEAD)) return null;
    return(
        <StyledPlayerItem disconnected={flags.has(PLAYER_FLAGS.DISCONNECTED)}>
            <StyledPlayerName>{props.player.num}. {props.player.name}</StyledPlayerName>
            {props.isThis && <Badge>You</Badge>}
        </StyledPlayerItem>
    )
}