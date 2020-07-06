import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../utils/format";
import api from "../../services/api";
import * as CartActions from "../../store/modules/cart/actions";
import { ProductList } from "./styles";

export default function Home() {
  const [products, setProducts] = useState([]);
  const qty = useSelector((state) =>
    state.cart.reduce((sumQty, product) => {
      sumQty[product.id] = product.qty; /** [1] => 1, [2] => 5 */
      return sumQty;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");

      const data = response.data.map((product) => ({
        ...product,
        priceFormat: formatPrice(product.price),
      }));

      setProducts(data);
    }
    getProducts();
  }, []);

  function handleAdd(id) {
    dispatch(CartActions.cartAddRequest(id));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={String(product.id)}>
          <img src={product.image} alt={product.title} title={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormat}</span>

          <button type="button" onClick={() => handleAdd(product.id)}>
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
