import { UPDATE_PRODUCTS } from './actionTypes';
import { handleError } from './appActions';

export const updateProducts = (payload: any) => ({
  type: UPDATE_PRODUCTS,
  payload,
});

export const updateProductsAction = (payload: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(updateProducts(payload));
    } catch (err) {
      dispatch(updateProducts([]));
      dispatch(handleError(`updateProductsAction()`));
    }
  };
};
