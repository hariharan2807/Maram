// import store from "store"
import { incrementAction } from '@actions/userActions';
const log = console.log;

export const repeatCartProduct = (uuid: any) => {
  const CartState = store.getState().user.cart;
  let item = CartState.find(item => item.uuid === uuid);
  if (item) {
    store.dispatch(incrementAction(item));
  }
};

export const getQuantity = (cartState, uuid) => {
  const elememt = cartState.find(item => item.variation_id === uuid);
  // console.log('---->',elememt)
  if (elememt) {
    return elememt.quantity;
  } else {
    return 0;
  }
};
