
import React, { useState } from "react";
import {Image, Container, Row, Col} from "react-bootstrap";
import styled from "styled-components";
import { GeneralProps } from "../../App";
import { Btn, Input, MiddledContainer, MiniHeader } from "../../styles";
import { ThemePicker } from "../common/ThemePicker";

const Logo = styled(Image)`
    margin-bottom: 40px;
    width: 600px;
`;

const FixedText = styled.p` 
    padding: 0px 40px;
    text-align: center;
`;

export const Err = styled.p` 
  color: red;
  font-weight: bold;
  font-size: 0.9rem;
  margin: 10px 0px;
`;

export const Home: React.FunctionComponent<GeneralProps> = (props) => {
    const [error, setError] = useState<undefined|string>();
    const [username, setUsername] = useState<string>("");
    return(
        <Container className="text-center">
            <Row>
                <Col>
                <Logo src="./assets/images/logo.png" fluid></Logo>
                </Col>
            </Row>
            <Row>
                <Col>
                <FixedText>Welcome to the Testing Grounds, where role ideas are tested in simulated gameplay. If you have any questions regarding the Testing Grounds, please view the <a href="https://www.blankmediagames.com/phpbb/viewtopic.php?f=50&t=72338" target="_blank" rel="noreferrer">FAQ</a>. You can also ask questions and report bugs in our <a href="https://discord.com/invite/EVS55Zb" target="_blank" rel="noreferrer">discord server</a>. Created and maintained by <a href="https://blankmediagames.com/phpbb/memberlist.php?mode=viewprofile&un=GoogleFeud" target="_blank" rel="noreferrer">GoogleFeud</a> </FixedText> 
                </Col>
            </Row>
            <Row>
                <Col>
                <MiniHeader>Username:</MiniHeader>
                <Input type="text" value={username} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") HandleSubmit(setError, username);
                }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                }}></Input>
                {error && <Err>{error}</Err>}
                <Btn style={{marginTop: "20px"}} onClick={() => HandleSubmit(setError, username)}>Play</Btn>
                </Col>
            </Row>
            <Row>
                <Col>
                <ThemePicker className="mt-auto py-3 fixed-bottom" {...props}></ThemePicker>
                </Col>
            </Row>
        </Container>
    );
};

const HandleSubmit = (setError: (err: string|undefined) => void, text: string): void => {
    setError("Some error idk");
    console.log(text);
};