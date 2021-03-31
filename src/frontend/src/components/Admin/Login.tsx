import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Input, MiniHeader, Btn } from "../../styles";
import { post } from "../../utils/requests";
import { Err } from "../Home";

export interface LoginProps {
    onVerify?: () => void
}

export const Login: React.FunctionComponent<LoginProps> = (props) => {
    const [password, setPassword] = useState<string>("");
    const [err, setError] = useState<string|undefined>();

    return (
        <Container>
            <Row>
                <Col className="text-center" sm={{offset: 4, span: 4}}>
                    <MiniHeader>Admin Password:</MiniHeader>
                    <Input type="text" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    onEnter={() => handleLogin(setError, password, props.onVerify)} />
                    {err && <Err>{err}</Err>}
                    <Btn onClick={() => handleLogin(setError, password, props.onVerify)}>Submit</Btn>
                </Col>
            </Row>
        </Container>
    )
}

const handleLogin = async (setError: (err: string|undefined) => void, password: string, onVerify?: () => void) => {
    const res = await post<void>("/api/me/verify", {password});
    if (res) return setError("Invalid password");
    onVerify?.();
};

