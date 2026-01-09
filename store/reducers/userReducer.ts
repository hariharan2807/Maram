import {
  HANDLE_ERROR,
  SAVE_USER,
  UPDATE_SHOP,
  RESET_CART_SESSION,
  UPDATE_CART,
  UPDATE_TIP,
  UPDATE_COUPON,
  UPDATE_INVOICE,
  SAVE_ADDRESSES,
  UPDATE_SELECTED_ADDRESS,
  UPDATE_DELIVERY_INSTRUCTIONS,
  UPDATE_DELIVERY_SHOP_INSTRUCTIONS,
  UPDATE_NO_CONTACT_DELIVERY,
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
  DELIVERY_CHARGE,
} from '../actions/actionTypes';

// import {NORMAL_DELIVERY} from '../../constants/API_constants';
// import {format} from 'date-fns';

const initialState = {
  userInfo: null,
  userAddresses: [],
  selected_address: null,
  shop: null,
  cart: [],
  invoice: null,
  userNotify: null,
  tip: 0,
  total: 0,
  initTotal: [],
  coupon: null,
  delivery_instruction: '',
  delivery_shop_instruction: '',
  no_contact_delivery: false,
  // delivery_type: NORMAL_DELIVERY,
  is_preOrder: false,
  searchclear: false,
  preOrderId: null,
  saveDate: '',
  saveTime: '',
  jwt_token: null,
  wallet_amount: 0,
  device: null,
  amount: {},
  delivery_chargs: null,
  // preOrderDate: {
  //   date: format(new Date(), 'dd'),
  //   fullDate: format(new Date(), 'yyyy-MM-dd'),
  // },
  shopId: null,
  proOrderStatus: false,
  user_id: null,
  pre_order_date: null,
  pre_order_time: null,
};

interface actionShape {
  type: string;
  payload: any;
}

const User = (state = initialState, action: actionShape): any => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SEARCH_CLEAR:
      return {
        ...state,
        searchclear: action.payload,
      };
    case PREORDER_DATE:
      // console.log("action.payload",action.payload)
      return {
        ...state,
        pre_order_date: action.payload,
      };
    case PREORDER_TIME:
      return {
        ...state,
        pre_order_time: action.payload,
      };
    case SAVE_NOTIFYID:
      return {
        ...state,
        userNotify: action.payload,
      };
    case UPDATE_SHOP: {
      return {
        ...state,
        shop: action.payload,
      };
    }
    case PREORDERSTATUS: {
      return {
        ...state,
        proOrderStatus: action.payload,
      };
    }
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    case UPDATE_PRE_ORDER:
      return {
        ...state,
        is_preOrder: action.payload,
      };
    case PREORDERID:
      return {
        ...state,
        preOrderId: action.payload,
      };
    case SHOPID:
      return {
        ...state,
        shopId: action.payload,
      };
    case PREORDERDATE:
      return {
        ...state,
        preOrderDate: action.payload,
      };
    case UPDATE_INVOICE:
      return {
        ...state,
        invoice: action.payload,
      };
    case TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case INT_PRODUCT:
      return {
        ...state,
        initTotal: action.payload,
      };
    case SAVE_ADDRESSES:
      return {
        ...state,
        userAddresses: action.payload,
      };
    case UPDATE_SELECTED_ADDRESS:
      return {
        ...state,
        selected_address: action.payload,
      };
    case DELIVERY_CHARGE:
      return {
        ...state,
        delivery_chargs: action.payload,
      };

    case UPDATE_TIP:
      return {
        ...state,
        tip: action.payload,
      };
    case UPDATE_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
    case SAVE_DATE:
      return {
        ...state,
        saveDate: action.payload,
      };
    case SAVE_TIME:
      return {
        ...state,
        saveTime: action.payload,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_DELIVERY_INSTRUCTIONS: {
      return {
        ...state,
        delivery_instruction: action.payload,
      };
    }
    case UPDATE_DELIVERY_SHOP_INSTRUCTIONS: {
      return {
        ...state,
        delivery_shop_instruction: action.payload,
      };
    }
    case UPDATE_NO_CONTACT_DELIVERY: {
      return {
        ...state,
        no_contact_delivery: action.payload,
      };
    }
    case SAVE_JWT_TOKEN: {
      return {
        ...state,
        jwt_token: action.payload,
      };
    }
    case SAVE_ID: {
      return {
        ...state,
        user_id: action.payload,
      };
    }
    case UPDATE_DELIVERY_TYPE: {
      // console.log('>>>>');
      return {
        ...state,
        delivery_type: action.payload,
      };
    }
    case UPDATE_WALLET:
      return {
        ...state,
        wallet_amount: action.payload,
      };
    case DEVICE:
      return {
        ...state,
        device: action.payload,
      };
    case RESET_CART_SESSION: {
      return {
        ...state,
        shop: null,
        cart: [],
      };
    }
    default:
      return state;
  }
};

export default User;
