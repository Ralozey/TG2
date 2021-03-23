
import {createGlobalStyle} from "styled-components";


export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  };

  body {
      color: ${({theme}) => theme.textColor};
      background-color: ${({theme}) => theme.backgroundColor};
  };

  a, a:not([href]):not([class]) {
      color: ${({theme}) => theme.linkColor};
      font-weight: bold;
      text-decoration: none;
  };
  a:hover, a:not([href]):not([class]):hover {
    color: ${({theme}) => theme.textColor};
    text-decoration: none;
    cursor: pointer;
  };
  
  button {
      color: ${({theme}) => theme.logoColor};
  };

  .grecaptcha-badge { visibility: hidden; }
  
  .inline {
      display: inline-block;
  }
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

`;