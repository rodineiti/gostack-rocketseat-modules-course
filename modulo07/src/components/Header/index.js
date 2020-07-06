import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import { Container, Cart } from "./styles";

import logo from "../../assets/images/logo.svg";

export default function Header() {
  const cartLength = useSelector((state) => state.cart.length);
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="reactshoes" title="reactshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartLength} Itens</span>
        </div>
        <MdShoppingBasket color="#FFF" size={36} />
      </Cart>
    </Container>
  );
}
