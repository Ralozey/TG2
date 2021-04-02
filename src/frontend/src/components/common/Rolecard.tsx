
import React from "react";
import styled from "styled-components";
import { RolePreview, ROLE_FLAGS } from "../../../../backend/database/models/Role";
import { RoleGoalToText } from "../../utils";
import { Bitfield } from "../../utils/Bitfield";

const StyledRolecard = styled.div` 
    position: relative;
    background-image: url("./assets/images/back.jpg"), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5));
    background-blend-mode: overlay;
    height: 375px;
    width: 270px;
    display: inline-block;
    overflow-wrap: break-word;
    margin: 10px 10px 10px 10px;
`;

const CenterWrapper = styled.div`  
    position: absolute;
    left: 50%;
`;

const CenteredText = styled.p` 
    position: relative;
    left: -50%;
`;

const RegularWrapper = styled.div` 
    position: absolute;
    left: 15px;
    max-width: 240px;
    top: 65px;
`;

const MiniHeader = styled.p` 
    position: relative;
    color: gold;
    font-weight: bold;
    margin: 0;
`;

const RegularText = styled.p` 
    position: relative;
    font-size: 14px;
    color: white;
`;

const RoleName = styled(CenteredText)<{color?: string}>`
    top: 15px;
    font-weight: bold;
    font-size: 32px;
    color: ${(props) => props.color};
`;

const Goal = styled(RegularWrapper)` 
    top: 80%;
`;

export interface RolecardProps {
    role: RolePreview
}

export const Rolecard: React.FunctionComponent<RolecardProps> = (props) => {
    return(
        <StyledRolecard>
            <CenterWrapper><RoleName color={props.role.color}>{props.role.name}</RoleName></CenterWrapper>
            <RegularWrapper>
                <MiniHeader style={{display: "inline-block", marginRight: "10px"}}>Alignment:</MiniHeader>
                <RegularText style={{display: "inline-block"}}><span style={{color: props.role.color, fontWeight: "bold"}}>{props.role.faction}</span> <span style={{fontWeight: "bold", color: "lightgrey"}}>({props.role.alignment})</span></RegularText>
                <MiniHeader>Abilities</MiniHeader>
                <RegularText>{props.role.abilities}</RegularText>
                <MiniHeader>Attributes</MiniHeader>
                <RegularText>{resolveAttributes(props.role.flags)}</RegularText>
            </RegularWrapper>
            <Goal>
                <MiniHeader>Goal</MiniHeader>
                <RegularText>{props.role.goal === undefined ? props.role.goalStr:RoleGoalToText[props.role.goal]}</RegularText>
            </Goal>
        </StyledRolecard>
    )
}

const resolveAttributes = (flags: number) : string => {
    if (!flags) return "None.";
    const bitfield = new Bitfield(flags);
    let res = "";
    if (bitfield.has(ROLE_FLAGS.ASTRAL_VISITS)) res += "- Astral visits\n";
    if (res === "") return "None.";
    return res;
}