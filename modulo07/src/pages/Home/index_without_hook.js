import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../utils/format";
import api from "../../services/api";
import * as CartActions from "../../store/modules/cart/actions";
import { ProductList } from "./styles";

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get("/products");

    // utiliza ({}) para retornar um novo object, ou poderia ser return {}
    // retornando novo objeto com outro campo adicional

    // const data = response.data.map((product) => {
    //   return {
    //     ...product,
    //     priceFormat: formatPrice(product.price),
    //   };
    // });

    // outra forma do map acima
    const data = response.data.map((product) => ({
      ...product,
      priceFormat: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAdd = (id) => {
    const { cartAddRequest } = this.props;
    cartAddRequest(id);
  };

  render() {
    const { products } = this.state;
    const { qty } = this.props;

    return (
      <ProductList>
        {products.map((product) => (
          <li key={String(product.id)}>
            <img
              src={product.image}
              alt={product.title}
              title={product.title}
            />
            <strong>{product.title}</strong>
            <span>{product.priceFormat}</span>

            <button type="button" onClick={() => this.handleAdd(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />{" "}
                {qty[product.id] || 0}
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = (state) => ({
  qty: state.cart.reduce((qty, product) => {
    qty[product.id] = product.qty; /** [1] => 1, [2] => 5 */
    return qty;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
