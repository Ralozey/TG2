
import styled, {createGlobalStyle} from "styled-components";
import {Container, FormControl, Button} from "react-bootstrap";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  };

  body {
      color: ${({theme}) => theme.textColor};
      background-color: ${({theme}) => theme.backgroundColor};
      height: 100%;
  };

  a, a:not([href]):not([class]) {
      color: ${({theme}) => theme.linkColor};
      font-weight: bold;
      text-decoration: none;
      border-bottom: 1px solid ${({theme}) => theme.linkColor};
      padding-bottom: 4px;
      border-bottom-style: dashed;
  };

  a:hover, a:not([href]):not([class]):hover {
    color: ${({theme}) => theme.textColor};
    text-decoration: none;
    cursor: pointer;
  };
  
  button {
      color: ${({theme}) => theme.buttonColor};
  };

textarea:hover, 
input:hover, 
textarea:active, 
input:active, 
textarea:focus, 
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active
{
    outline: none;
    -webkit-appearance:none;
    box-shadow: none !important;
}

  .badge {
    color: ${({theme}) => theme.textColor} !important;
    background-color: ${({theme}) => theme.buttonColor} !important;
  }

  .list-group-item {
    background-color: transparent !important;
    color: ${({theme}) => theme.textColor} !important;
  }

  .CodeMirror {
    height: 90vh;
    margin-left: 20px;
  }
`;

export const MiddledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Input = styled(FormControl)`
    background-color: transparent !important;
    color: ${({theme}) => theme.textColor} !important;
    border-color: ${({theme}) => theme.borderColor} !important;
    transition: all .2s ease-in-out !important;

    &:hover {
        transform: scale(1.02);
    }
`;

export const MiniHeader = styled.p`
  color: ${({theme}) => theme.linkColor} !important;
  font-weight: bold;
  font-size: 1.25rem;
`;

export const Btn = styled(Button)`
    color: ${({theme}) => theme.textColor} !important;
    background-color: ${({theme}) => theme.buttonColor} !important;
    transition: all .2s ease-in-out !important;
    border: none !important;
    &:hover {
        transform: scale(1.02);
        filter: brightness(90%);
    }
`;

export const TextArea = styled.textarea` 
    background-color: transparent !important;
    color: ${({theme}) => theme.textColor} !important;
    border-color: ${({theme}) => theme.borderColor} !important;
    border-radius: .25rem;
`;