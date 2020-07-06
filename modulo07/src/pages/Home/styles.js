import styled from "styled-components";
import { darken } from "polished";

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /** cria 3 colunas iguais */
  grid-gap: 20px; /**distanciamento dos items */
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    /** somente dentro do li */
    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #18bc9c;
      color: #fff;
      border: 0;
      border-radius: 4px;
      margin-top: auto; /** para que o botão fiquem sempre alinhando abaixo para manter o design do card */
      overflow: hidden;
      display: flex;
      align-items: center;
      transition: background 0.2s; /** adicionar transição no background do botão */

      &:hover {
        background: ${darken(0.05, "#18bc9c")}; /** lib para escurecer cores */
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }
`;
