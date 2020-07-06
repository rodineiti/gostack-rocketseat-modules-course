import { call, select, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { formatPrice } from "../../../utils/format";

import { cartAddSuccess, updateQtySuccess } from "./actions";

function* cardAdd({ id }) {
  const exists = yield select((state) => state.cart.find((p) => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const stockQty = stock.data.amount;
  const currentQty = exists ? exists.qty : 0;

  const qty = currentQty + 1;

  // verificar se ainda tem em estoque
  if (qty > stockQty) {
    toast.error("Quantidade solicitada fora de estoque");
    return;
  }

  if (exists) {
    yield put(updateQtySuccess(id, qty));
    toast.success("Produto adicionado com sucesso");
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      qty: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(cartAddSuccess(data));
    toast.success("Produto adicionado com sucesso");
  }
}

function* updateQty({ id, qty }) {
  if (qty <= 0) return;

  const product = yield select((state) => state.cart.find((p) => p.id === id));

  const stock = yield call(api.get, `/stock/${product.id}`);

  const stockQty = stock.data.amount;

  // verificar se ainda tem em estoque
  if (qty > stockQty) {
    toast.error("Quantidade solicitada fora de estoque");
    return;
  }

  yield put(updateQtySuccess(id, qty));

  toast.success("Quantidade do produto atualizada com sucesso");
}

export default all([
  takeLatest("@cart/ADD_REQUEST", cardAdd),
  takeLatest("@cart/UPDATE_QTY_REQUEST", updateQty),
]);
