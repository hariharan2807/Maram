import {
  SAVE_USER,
  SAVE_ADDRESSES,
  HANDLE_ERROR,
  UPDATE_CART,
  RESET_CART_SESSION,
  UPDATE_INVOICE,
  UPDATE_COUPON,
  UPDATE_TIP,
  UPDATE_SHOP,
  UPDATE_SELECTED_ADDRESS,
  UPDATE_NO_CONTACT_DELIVERY,
  UPDATE_DELIVERY_INSTRUCTIONS,
  UPDATE_DELIVERY_SHOP_INSTRUCTIONS,
  UPDATE_DELIVERY_TYPE,
  UPDATE_PRE_ORDER,
  SAVE_DATE,
  SAVE_TIME,
  SAVE_JWT_TOKEN,
  UPDATE_WALLET,
  PREORDERID,
  PREORDERDATE,
  SHOPID,
  PREORDERSTATUS,
  SAVE_NOTIFYID,
  SEARCH_CLEAR,
  DEVICE,
  SAVE_ID,
  TOTAL,
  AMOUNT,
  INT_PRODUCT,
  PREORDER_TIME,
  PREORDER_DATE,
  DELIVERY_CHARGE,SUBSCRIPTION_START_DATE,
  CATEGORY_LIST,CUSTOMIZED_DAY,
} from './actionTypes';
// import {getAllAddressRemote} from '../../remote/userRemote';
// import {
//   serviceChargeType,
//   invoiceObjType,
//   couponType,
// } from '../../types/orderTypes';
const log = console.log;
// import {invoiceObjCreator} from '../../workers/orderObjCreator';
import store from '../index';
import { errorBox } from '../../workers/utils';
// import { Bluelog } from '@API_constants';
export const savePreorderdate = (payload: any) => ({
  type: PREORDER_DATE,
  payload,
});
export const savePreorderTime = (payload: any) => ({
  type: PREORDER_TIME,
  payload,
});
export const saveUser = (payload: any) => ({
  type: SAVE_USER,
  payload,
});
export const searchCleardata = (payload: any) => ({
  type: SEARCH_CLEAR,
  payload,
});
export const device_info = (payload: any) => ({
  type: DEVICE,
  payload,
});
export const saveNotifyid = (payload: any) => ({
  type: SAVE_NOTIFYID,
  payload,
});

export const updateShop = (payload: any) => ({
  type: UPDATE_SHOP,
  payload,
});

export const updateCart = (payload: []) => ({
  type: UPDATE_CART,
  payload,
});

export const saveJWTTokenAction = (payload: any) => ({
  type: SAVE_JWT_TOKEN,
  payload,
});
export const saveuseridAction = (payload: any) => ({
  type: SAVE_ID,
  payload,
});
export const updatePreOrder = (payload: boolean) => ({
  type: UPDATE_PRE_ORDER,
  payload,
});
export const Customized_days = (payload: any[]) => ({
  type: CUSTOMIZED_DAY,
  payload,
});


export const resetCartSessionAction = () => ({
  type: RESET_CART_SESSION,
});
export const saveShopIdAction = (payload: any) => ({
  type: SHOPID,
  payload,
});

// export const updateInvoice = (payload: invoiceObjType) => ({
//   type: UPDATE_INVOICE,
//   payload,
// });
// export const totalAction = (payload: invoiceObjType) => ({
//   type: TOTAL,
//   payload,
// });
export const initproductAction = (payload: any) => ({
  type: INT_PRODUCT,
  payload,
});
export const updateCoupon = (payload: any) => ({
  type: UPDATE_COUPON,
  payload,
});

export const SaveWalletAction = (payload: any) => ({
  type: UPDATE_WALLET,
  payload,
});
export const updateTipAction = (payload: number) => ({
  type: UPDATE_TIP,
  payload,
});

export const handleError = (payload: string) => ({
  type: HANDLE_ERROR,
  payload,
});

export const saveAddresses = (payload: []) => ({
  type: SAVE_ADDRESSES,
  payload,
});
export const savePreorderDate = (payload: []) => ({
  type: PREORDERDATE,
  payload,
});

export const savePreOrderStatus = (payload: []) => ({
  type: SAVE_ADDRESSES,
  payload,
});

export const saveDate = (payload: any) => ({
  type: SAVE_DATE,
  payload,
});

export const saveTime = (payload: any) => ({
  type: SAVE_TIME,
  payload,
});

export const updateNoContactDeliveryAction = (payload: boolean) => ({
  type: UPDATE_NO_CONTACT_DELIVERY,
  payload,
});
export const preOrderstatusAction = (payload: boolean) => ({
  type: PREORDERSTATUS,
  payload,
});
export const PreOrderIDAction = (payload: boolean) => ({
  type: PREORDERID,
  payload,
});
export const updateDeliveryInstructionsAction = (payload: string) => ({
  type: UPDATE_DELIVERY_INSTRUCTIONS,
  payload,
});
export const updateShopInstructionsAction = (payload: string) => ({
  type: UPDATE_DELIVERY_SHOP_INSTRUCTIONS,
  payload,
});
export const updateSelectedAddressAction = (payload: any | null) => ({
  type: UPDATE_SELECTED_ADDRESS,
  payload,
});
export const updateDeliveryTypeAction = (payload: any) => ({
  type: UPDATE_DELIVERY_TYPE,
  payload,
});
export const amountUpdate = (payload: any) => ({
  type: AMOUNT,
  payload,
});

export const updateDelivery_charge = (payload: any) => ({
  type: DELIVERY_CHARGE,
  payload,
});
export const updateSubscription_start_date = (payload: []) => ({
  type: SUBSCRIPTION_START_DATE,
  payload,
});
export const updateCategory_List = (payload: any) => ({
  type: CATEGORY_LIST,
  payload,
});

// export const incrementAction = (payload: any) => {
//   return async (dispatch: any, getState: any) => {
//     try {
//       const oldCartState = getState().user.cart;
//       const AppControlState = getState().app.app_controll;

//       const isItemInCart = oldCartState.findIndex(
//         (item: any) => item.uuid === payload.uuid,
//       );

//       if (isItemInCart !== -1) {
//         let existingItem = oldCartState[isItemInCart];

//         // ✅ clone the object to avoid mutation
//         let newCartObj = { ...existingItem, quantity: existingItem.quantity + 1 };

//         // ✅ optional: check quantity limit
//         if (
//           AppControlState?.maximum_quantity_limit &&
//           newCartObj.quantity > parseInt(AppControlState.maximum_quantity_limit)
//         ) {
//           // errorBox('Maximum quantity reached');
//           return;
//         }

//         // ✅ create a NEW array with updated item
//         let newCart = [
//           ...oldCartState.slice(0, isItemInCart),
//           newCartObj,
//           ...oldCartState.slice(isItemInCart + 1),
//         ];

//         dispatch(updateCart(newCart));
//       } else {
//         // ✅ add as new item
//         let newCartObj = { ...payload, quantity: 1 };
//         let newCart = [...oldCartState, newCartObj];
//         dispatch(updateCart(newCart));
//       }
//     } catch (err) {
//       console.log(err);
//       dispatch(handleError(`incrementAction()`));
//     }
//   };
// };
// incrementAction
// export const incrementAction = payload => {
//   return async (dispatch, getState) => {
//     const cart = getState().user.cart;

//     let index = -1;
//     if (payload?.type === 2) {
//       // for mismatched → must match both product_id + mismatch_id
//       index = cart.findIndex(
//         it =>
//           it.product_id === payload.product_id &&
//           it.mismatch_id === payload.mismatch_id,
//       );
//     } else {
//       // normal items → match by product_id only
//       index = cart.findIndex(it =>
//         it.product_id === payload.product_id &&
//         it.type !== 2 // Ensure we don't match mismatched items
//       );
//     }

//     if (index !== -1) {
//       const existing = cart[index];
//       const updated = {
//         ...existing,
//         quantity: (existing.quantity || 0) + 1
//       };
//       const newCart = [
//         ...cart.slice(0, index),
//         updated,
//         ...cart.slice(index + 1),
//       ];
//       dispatch(updateCart(newCart));
//     } else {
//       const newItem = {
//         ...payload,
//         quantity: 1
//       };
//       dispatch(updateCart([...cart, newItem]));
//     }
//   };
// };

export const incrementAction = payload => {
  return async (dispatch, getState) => {
    const cart = getState().user.cart;
    const appcontroll = getState().app.app_controll;
// console.log("appcontrollappcontrollappcontroll",appcontroll)
    // Find index by UUID (unique identifier for each cart item)
    let index = -1;

    // Always match by UUID - this ensures uniqueness for variations
    if (payload?.uuid) {
      index = cart.findIndex(item => item.uuid === payload.uuid);
    }

    // Fallback: if no UUID, use the old logic (for backward compatibility)
    if (index === -1 && !payload?.uuid) {
      
        // normal items → match by product_id only
        index = cart.findIndex(
          item => item.product_id === payload.product_id && item.desigin_type !== 2,
        );
      
    }

    if (index !== -1) {

      // Item already exists in cart - increment quantity
      const existing = cart[index];
      if (parseInt(appcontroll.cart_count) > existing.quantity) {

      const updated = {
        ...existing,
        quantity: (existing.quantity || 0) + 1,
      };
      const newCart = [
        ...cart.slice(0, index),
        updated,
        ...cart.slice(index + 1),
      ];
      dispatch(updateCart(newCart));
    }
    else{
      errorBox(`Cart is full! Maximum ${appcontroll.cart_count} total items allowed.`);
    }
    } else {
      // Item doesn't exist - add new item with quantity 1
      const newItem = {
        ...payload,
        quantity: 1,
      };
      dispatch(updateCart([...cart, newItem]));
    }
  };
};
export const decrementAction = payload => {
  return async (dispatch, getState) => {
    const cart = getState().user.cart;

    // Find index by UUID
    let index = -1;

    if (payload?.uuid) {
      index = cart.findIndex(item => item.uuid === payload.uuid);
    }

    // Fallback for backward compatibility
    if (index === -1 && !payload?.uuid) {
      if (payload?.type === 2) {
        index = cart.findIndex(
          item =>
            item.product_id === payload.product_id &&
            item.mismatch_id === payload.mismatch_id,
        );
      } else {
        index = cart.findIndex(
          item => item.product_id === payload.product_id && item.type !== 2,
        );
      }
    }

    if (index !== -1) {
      const existing = cart[index];

      if (existing.quantity > 1) {
        // Decrement quantity if more than 1
        const updated = {
          ...existing,
          quantity: existing.quantity - 1,
        };
        const newCart = [
          ...cart.slice(0, index),
          updated,
          ...cart.slice(index + 1),
        ];
        dispatch(updateCart(newCart));
      } else {
        // Remove item if quantity is 1
        const newCart = cart.filter((_, i) => i !== index);
        dispatch(updateCart(newCart));
      }
    }
  };
};
// export const decrementAction = (payload: any) => {
//   return async (dispatch: any, getState: any) => {
//     try {
//       const cart = getState().user.cart;

//       let index = -1;
//       if (payload?.type === 2) {
//         // For mismatched items - match by product_id + mismatch_id
//         index = cart.findIndex(
//           (it: any) =>
//             it.product_id === payload.product_id &&
//             it.mismatch_id === payload.mismatch_id, // This should match actual mismatch_id
//         );
//       } else {
//         // For normal items - match by product_id only, exclude mismatched items
//         index = cart.findIndex(
//           (it: any) =>
//             it.product_id === payload.product_id &&
//             it.type !== 2 // Important: don't match type 2 items
//         );
//       }

//       if (index !== -1) {
//         if (cart[index].quantity === 1) {
//           const newCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
//           dispatch(updateCart(newCart));
//           dispatch(preOrderstatusAction(false));
//         } else {
//           const updated = {
//             ...cart[index],
//             quantity: cart[index].quantity - 1,
//           };
//           const newCart = [
//             ...cart.slice(0, index),
//             updated,
//             ...cart.slice(index + 1),
//           ];
//           dispatch(updateCart(newCart));
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       dispatch(handleError(`Decrement Action()`));
//     }
//   };
// };

export const removeCartAction = (payload: any) => {
  return (dispatch: any) => {
    let CartState = store.getState().user.cart;
    let isInCart = CartState.find(item => item.uuid === payload.uuid);
    if (isInCart) {
      let index = CartState.findIndex(item => item.uuid === payload.uuid);
      if (isInCart) {
        //remove the item
        CartState.splice(index, 1);
        let newCart = [...CartState];
        dispatch({
          type: UPDATE_CART,
          payload: newCart,
        });
      }
    }
  };
};

export const updateShopAction = (payload: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(updateShop(payload));
    } catch (err) {
      dispatch(handleError(`updateShopAction()`));
    }
  };
};

// export const updateInvoiceAction = (
//   service_charge: serviceChargeType,
//   product_total: number,
//   price:number,
// ) => {
//   return async (dispatch: any) => {
//     try {
//       // console.log("invoiceObj----->123",service_charge,product_total,price)
//       const invoiceObj = invoiceObjCreator(service_charge, product_total,price);
//       if (invoiceObj) {
//         // console.log("invoiceObj----->",invoiceObj)
//         dispatch(updateInvoice(invoiceObj));
//       } else {
//         // Bluelog("invoiceObj----->","invoiceObj----->")
//         dispatch(updateInvoice(null));
//       }
//     } catch (err) {
//       dispatch(handleError(`updateInvoiceAction()`));
//     }
//   };
// };
export const updateCouponAction = (payload: couponType) => {
  return async (dispatch: any) => {
    try {
      dispatch(updateCoupon(payload));
    } catch {
      dispatch(handleError(`updateCouponAction()`));
    }
  };
};

// export const saveAddressesAction = (): any => {
//   return async (dispatch: any) => {
//     try {
//       let addresses = await getAllAddressRemote();
//       if (addresses && addresses.length > 0) {
//         dispatch(saveAddresses(addresses));
//         let lastAddress = addresses[addresses.length - 1];
//         dispatch(updateSelectedAddressAction(lastAddress));
//       } else {
//         throw 'Err';
//       }
//     } catch (err) {
//       dispatch(saveAddresses([]));
//       dispatch(updateSelectedAddressAction(null));
//       dispatch(handleError(`saveAddressAction()`));
//     }
//   };
// };
