import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";

import { Container, Cart } from "./styles";

import logo from "../../assets/images/logo.svg";

function Header({ cartLength }) {
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

export default connect((state) => ({
  cartLength: state.cart.length,
}))(Header);
