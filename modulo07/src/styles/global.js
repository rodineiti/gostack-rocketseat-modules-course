import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import background from "../assets/images/background.svg";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700&display=swap');

  * {
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  body {
    background: #191920 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Lato, sans-serif;
  }

  #root {
    max-width:1020px;
    margin:0 auto;
    padding:0 20px 50px; /** cima, lateral e embaixo */
  }

  button {
    cursor: pointer;
  }
`;