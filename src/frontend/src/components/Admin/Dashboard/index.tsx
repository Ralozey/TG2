import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import {ManageRole} from "./ManageRole";
import {AllRoles} from "./AllRoles";

const HeaderBoxContainer = styled(Row)`
    margin-top: 5vh;
    margin-bottom: 10vh; 
`;

const HeaderBox = styled.div<{active?: boolean}>`
    width: 350px;
    padding: 15px 15px;
    text-align: center;
    font-size: 34px;
    font-weight: bold;
    transition: all .2s ease-in-out !important;
    cursor: pointer;

    background-color: ${({theme}) => theme.buttonColor};

    filter: ${({active}) => active ? "brightness(1.2)":"brightness(100%)"};

    &:hover {
        transform: scale(1.03);
    }

`;

const pages: Array<{name: string, page: any}> = [
    {
        name: "Create Role",
        page: ManageRole
    },
    {
        name: "All Roles",
        page: AllRoles
    }
]

export const Dashboard: React.FunctionComponent = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const Current = pages[currentPage].page;
    return(
        <Container>
            <HeaderBoxContainer>
                {pages.map((p, i) => 
                <Col>
                <HeaderBox active={i === currentPage} onClick={() => setCurrentPage(i)}>
                    {p.name}
                </HeaderBox>
                </Col>
                )}
            </HeaderBoxContainer>
            <Current />
        </Container>
    )
}