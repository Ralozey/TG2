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
import Select from "react-select";
import { Bitfield } from "../../../../utils/Bitfield";
import { post } from "../../../../utils/requests";

const InputGroup = styled(Row)`
    margin-bottom: 15px;
`;

const StyledSelect = styled(Select)`
    & .Select__control {
    outline: none;
    background-color: transparent;
    color: ${({theme}) => theme.textColor};
    border-color: ${({theme}) => theme.borderColor}
    }

    & .Select__control:hover {
        outline: none;
    }

    & .Select__control--is-focused {
        outline: none;
        border-color: ${({theme}) => theme.borderColor};
    }

    & .Select__multi-value__remove:hover {
        background-color: transparent;
    }

    & .Select__multi-value__label,& .Select__multi-value__remove {
    outline: none;
    background-color: ${({theme}) => theme.backgroundColor};
    color: ${({theme}) => theme.textColor};
    border-color: ${({theme}) => theme.borderColor};
    border-radius: 0px;
    }

    & .Select__multi-value__remove:hover {
        background-color: ${({theme}) => theme.backgroundColor};
    }

    & .Select__indicator {
        color: ${({theme}) => theme.textColor};
    }

    & .Select__menu,& .Select__option {
        border-color: ${({theme}) => theme.buttonColor};
        background-color: ${({theme}) => theme.buttonColor};
        color: ${({theme}) => theme.textColor};
        transition: all 2s ease-in-out;
    }

    & .Select__option:hover {
        cursor: pointer;
        filter: brightness(1.1);
    }

`;

export interface ManageRoleProps {
    role?: RoleData
}

const RoleOptions = [
    {value: ROLE_FLAGS.DAY_ACTION, label: "Day Action"},
    {value: ROLE_FLAGS.ASTRAL_VISITS, label: "Astral Visits"}
];

export const ManageRole: React.FunctionComponent<ManageRoleProps> = (props) => {
    const [role, setRole] = useState<Partial<RoleData>>(props.role || {});
    const [error, setError] = useState<string|undefined>();

    useEffect(() => {
        setRole(props.role || {});
    }, [props.role]);

    return(
        <Container>
            <Row>
                <Col sm={6} md={6} lg={6}>
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