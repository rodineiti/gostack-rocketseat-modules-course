import produce from "immer";

export default function cart(state = [], action) {
  switch (action.type) {
    case "@cart/ADD_SUCCESS" /** module/acao */:
      // return [
      //   ...state,
      //   {
      //     ...action.product,
      //     qty: 1,
      //   },
      // ];
      return produce(state, (draft) => {
        draft.push(action.product);
      });
    case "@cart/DEL" /** module/acao */:
      return produce(state, (draft) => {
        const index = draft.findIndex((p) => p.id === action.id);
        if (index >= 0) {
          draft.splice(index, 1);
        }
      });
    case "@cart/UPDATE_QTY_SUCCESS": {
      return produce(state, (draft) => {
        const index = draft.findIndex((p) => p.id === action.id);
        if (index >= 0) {
          draft[index].qty = Number(action.qty);
        }
      });
    }
    default:
      return state;
  }
}
