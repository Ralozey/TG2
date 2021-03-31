
import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { PlayerView, PLAYER_FLAGS } from "../../../../../backend/engine/structures/Player";
import { Bitfield } from "../../../utils/Bitfield";
import styled from "styled-components";

const StyledPlayerItem = styled(ListGroup.Item)<{disconnected: boolean}>`
    ${(props) => props.disconnected && "color: darkgrey"}
`;

export interface PlayerProps {
    player: PlayerView,
    isThis: boolean
}

export const Player: React.FunctionComponent<PlayerProps> = (props) => {
    const flags = new Bitfield(props.player.flags);
    return(
        <StyledPlayerItem disconnected={flags.has(PLAYER_FLAGS.DISCONNECTED)}>
            <span>{props.player.num}. {props.player.name}</span>
            {props.isThis && <Badge>You</Badge>}
            {flags.has(PLAYER_FLAGS.ADMIN) && <Badge>Admin</Badge>}
        </StyledPlayerItem>
    )
}