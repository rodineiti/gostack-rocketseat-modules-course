import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from "react-icons/md";
import { toast } from "react-toastify";
import * as CartActions from "../../store/modules/cart/actions";
import { formatPrice } from "../../utils/format";
import { Container, ProductTable, Total } from "./styles";

export default function Cart({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subtotal: formatPrice(product.price * product.qty),
    }))
  );

  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.qty;
      }, 0)
    )
  );

  function inc(product) {
    dispatch(CartActions.updateQtyRequest(product.id, product.qty + 1));
  }

  function dec(product) {
    if (product.qty <= 1) {
      dispatch(CartActions.cartDel(product.id));
      toast.success("Produto deletado com sucesso");
    } else {
      dispatch(CartActions.updateQtyRequest(product.id, product.qty - 1));
    }
  }

  function del(id) {
    dispatch(CartActions.cartDel(id));
    toast.success("Produto deletado com sucesso");
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th></th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, key) => (
            <tr key={String(key)}>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  title={product.title}
                />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => dec(product)}>
                    <MdRemoveCircleOutline size={20} color="#18bc9c" />
                  </button>
                  <input type="number" readOnly value={product.qty} />
                  <button type="button" onClick={() => inc(product)}>
                    <MdAddCircleOutline size={20} color="#18bc9c" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => del(product.id)}>
                  <MdDelete size={20} color="#18bc9c" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button
          type="button"
          onClick={() => history.push("/")}
          disabled={!cart.length}
        >
          Finalizar pedido
        </button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
