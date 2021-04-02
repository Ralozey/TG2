import styled, {css} from "styled-components";
import Select from "react-select";
import Creatable from "react-select/creatable";

const SharedSelectStyle = css`
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


export const StyledCreatable = styled(Creatable)`
    ${SharedSelectStyle}
`

export const StyledSelect = styled(Select)`
    ${SharedSelectStyle}
`;