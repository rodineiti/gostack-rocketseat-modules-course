import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin:0;
    padding:0;
    outline:none;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #18bc9c;
    -webkit-font-smoothing: antialiased !important; /** deixa as forntes mais definidas */
  }

  body, input, button {
    color: #222;
    font-size:14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
