import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {RoleData} from "../../../../../../backend/database/models/Role";
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

const InputGroup = styled(Row)`
    margin-bottom: 15px;
`;


export interface ManageRoleProps {
    role?: RoleData
}

const roleData: Record<string, number|string> = {};

export const ManageRole: React.FunctionComponent<ManageRoleProps> = (props) => {
    const [role, setRole] = useState<Record<string, number|string>|RoleData>(props.role || {});

    useEffect(() => {
        setRole(props.role || {});
    }, [props.role]);

    return(
        <Container>
            <Row>
                <Col sm={6} md={6} lg={6}>

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
                        <Input type="number" value={role.attack} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, attack: e.target.value})}></Input>
                        </Col>
                        <Col>
                        <MiniHeader>Defense:</MiniHeader>
                        <Input type="number" value={role.defense} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, defense: e.target.value})}></Input>
                        </Col>
                    </InputGroup>

                    <InputGroup>
                        <Col>
                        <MiniHeader>Priority:</MiniHeader>
                        <Input type="number" value={role.priority} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, priority: e.target.value})}></Input>
                        </Col>
                        <Col>
                        <MiniHeader>Targets:</MiniHeader>
                        <Input type="number" value={role.targets} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole({...role, targets: e.target.value})}></Input>
                        </Col>
                    </InputGroup>

                    <InputGroup>
                    <MiniHeader>Abilities:</MiniHeader>
                    <TextArea rows={4} value={role.abilities} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRole({...role, abilities: e.target.value})}></TextArea>
                    </InputGroup>

                    <Btn>Create</Btn>
                </Col>
                <Col>

                <CodeMirror
                value={role.code as string}
                onBeforeChange={(editor, data, value) => {
                    setRole({...role, code: value});
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