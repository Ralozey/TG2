
import React from "react";
import styled from "styled-components";
import { GeneralProps } from "../../App";
import {ThemeList} from "../../styles/themes";

export const ThemeBlock = styled.div<{color: string}>`
    width: 25px;
    height: 25px;
    margin-left: 5px;
    display: inline-block;
    cursor: pointer;
    ${(props) => `background-color: ${props.color}`}
`;


export const ThemePicker: React.FunctionComponent<GeneralProps> = (props) => {
    return(
        <div className={props.className}>
            {Object.values(ThemeList).map(theme => 
                <ThemeBlock key={theme.id} onClick={() => props.setTheme(theme.id)} color={theme.buttonColor || "black"} /> 
            )}
        </div>
    );
};