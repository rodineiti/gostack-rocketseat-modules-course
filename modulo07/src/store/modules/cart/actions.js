export function cartAddRequest(id) {
  return {
    type: "@cart/ADD_REQUEST",
    id,
  };
}

export function cartAddSuccess(product) {
  return {
    type: "@cart/ADD_SUCCESS",
    product,
  };
}

export function cartDel(id) {
  return { type: "@cart/DEL", id };
}

export function updateQtyRequest(id, qty) {
  return {
    type: "@cart/UPDATE_QTY_REQUEST",
    id,
    qty,
  };
}

export function updateQtySuccess(id, qty) {
  return {
    type: "@cart/UPDATE_QTY_SUCCESS",
    id,
    qty,
  };
}
