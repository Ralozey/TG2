import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {RoleData, ROLE_FLAGS} from "../../../../../../backend/database/models/Role";
import { Btn, Input, MiniHeader, TextArea } from "../../../../styles";
import {Controlled as CodeMirror} from 'react-codemirror2'

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
import styled from "styled-components";
import { placeHints } from "../../../../utils/hints";
import { Err } from "../../../Home";
import { validateRole } from "../../../../utils/validation";
import { Bitfield } from "../../../../utils/Bitfield";
import { post } from "../../../../utils/requests";
import {StyledSelect, StyledCreatable} from "./StyledSelect";
import { RoleGoalToText } from "../../../../utils";

const InputGroup = styled(Row)`
    margin-bottom: 15px;
`;

export interface ManageRoleProps {
    role?: RoleData
}

const RoleOptions = [
    {value: ROLE_FLAGS.DAY_ACTION, label: "Day Action"},
    {value: ROLE_FLAGS.ASTRAL_VISITS, label: "Astral Visits"}
];

const GoalOptions = Object.entries(RoleGoalToText).map(([index, str]) => ({value: index, label: str}));


export const ManageRole: React.FunctionComponent<ManageRoleProps> = (props) => {
    const [role, setRole] = useState<Partial<RoleData>>(props.role || {});
    const [error, setError] = useState<string|undefined>();

    useEffect(() => {
        setRole(props.role || {});
    }, [props.role]);

    return(
        <Container>
            <Row>
                <Col sm={5} md={5} lg={5}>
                    {error && <Err>{error}</Err>}
                    <InputGroup>
                        <Col>
                        <MiniHeader>Name:</MiniHeader>
                        <Input type="text" value={role.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, name: e.target.value})}></Input>
                        </Col>
                        <Col>
                        <MiniHeader>Faction:</MiniHeader>
                        <Input type="text" value={role.faction} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, faction: e.target.value})}></Input>
                        </Col>
                        <Col>
                        <MiniHeader>Alignment:</MiniHeader>
                        <Input type="text" value={role.alignment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, alignment: e.target.value})}></Input>
                        </Col>
                    </InputGroup>

                    <InputGroup>
                        <Col>
                        <MiniHeader>Attack:</MiniHeader>
                        <Input type="number" value={role.attack} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, attack: +e.target.value})}></Input>
                        </Col>
                        <Col>
                        <MiniHeader>Defense:</MiniHeader>
                        <Input type="number" value={role.defense} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, defense: +e.target.value})}></Input>
                        </Col>
                    </InputGroup>

                    <InputGroup>
                        <Col>
                        <MiniHeader>Priority:</MiniHeader>
                        <Input type="number" value={role.priority} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, priority: +e.target.value})}></Input>
                        </Col>
                        <Col>
                        <MiniHeader>Targets:</MiniHeader>
                        <Input type="number" value={role.targets} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, targets: +e.target.value})}></Input>
                        </Col>
                    </InputGroup>

                    <InputGroup>
                    <MiniHeader>Abilities:</MiniHeader>
                    <TextArea rows={4} value={role.abilities} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRole({...role, abilities: e.target.value})}></TextArea>
                    </InputGroup>

                    <InputGroup>
                    <MiniHeader>Attributes:</MiniHeader>
                    <StyledSelect classNamePrefix="Select" isMulti options={RoleOptions} defaultValue={resolveSelectedOptionsFlags(role.flags || 0)} onChange={(selected: Array<{value: number}>) => {
                        const bits = new Bitfield(0);
                        for (const {value} of selected) {
                            bits.add(value);
                        }
                        role.flags = bits.bits;
                    }}></StyledSelect>
                    </InputGroup>

                    <InputGroup>
                    <MiniHeader>Goal Message:</MiniHeader>
                    <StyledCreatable classNamePrefix="Select" options={GoalOptions} defaultValue={resolveSelectedOptionGoal(role.goal, role.goalStr)} onChange={(selected: {value: string, label: string}) => {
                        if (isNaN(+selected.value)) role.goalStr = selected.value;
                        else role.goal = +selected.value;
                    }}></StyledCreatable>
                    </InputGroup>

                    <InputGroup>
                    <MiniHeader>Color:</MiniHeader>
                    <Input type="color" defaultValue={role.color} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        role.color = e.target.value;
                    }}></Input>
                    </InputGroup>

                    <Btn onClick={async () => {
                        const err = validateRole(role);
                        if (err) return setError(err);
                        const res = await post<void>("/api/roles", {role});
                        if (res) return setError(res.message);
                        setError("Success!");
                    }}>Create</Btn>
                </Col>
                <Col>

                <CodeMirror
                value={role.code as string}
                onBeforeChange={(editor, data, value) => {
                    setRole({...role, code: value});
                    if (editor.state.completionActive) return;
                    placeHints(value, (code) => setRole({...role, code}), editor);
                }}
                options={{
                    mode: "javascript",
                    theme: "material",
                    lineNumbers: true,
                    smartIndent: true
                }}
                 />
                </Col>
            </Row>
        </Container>
    );
}

function resolveSelectedOptionsFlags(flags: number) {
    const bitfield = new Bitfield(flags);
    const res = [];
    if (bitfield.has(ROLE_FLAGS.DAY_ACTION)) res.push(RoleOptions.find(o => o.value === ROLE_FLAGS.DAY_ACTION));
    if (bitfield.has(ROLE_FLAGS.ASTRAL_VISITS)) res.push(RoleOptions.find(o => o.value === ROLE_FLAGS.ASTRAL_VISITS));
    return res;
}

function resolveSelectedOptionGoal(goal?: number, goalStr?: string) : {value: string, label: string}|undefined {
    if (goal && RoleGoalToText[goal]) return GoalOptions.find(g => g.value === goal.toString()) as {value: string, label: string};
    if (goalStr) return {value: goalStr, label: goalStr};
}