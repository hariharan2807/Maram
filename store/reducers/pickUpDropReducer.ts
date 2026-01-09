import {
  PICKUP_SERVICE,
  PICKUP_TEXT,
  PICKUP_IMAGE,
  PICKUP_DOCUMENT,
  PICKUP_CHARGE,
  UPDATE_PICKUP_ADDRESS,
  UPDATE_DROP_ADDRESS,
  PICKUP_PEAK_CHARGE,
  PICKUP_PEAK_COMMENT,
  PICKUP_NUMBER,
  DROP_NUMBER,
  PICKUP_TYPE,
  PICK_BATCH_ORDER_ADDRESSES,
  TASK_CHARGE,
  TRIP_TYPE,
} from '../actions/actionTypes';

const initialState = {
  pick_drop_service: null,
  pickup_address: null,
  drop_address: null,
  pickup_text: '',
  pickup_image: null,
  pickup_document: null,
  pickup_tip: 0,
  pickup_charge: null,
  pickup_peakCharge: 0,
  pickup_peakComment: null,
  pick_drop_points: null,
  pickup_number_state: null,
  drop_number_state: null,
  pickup_type: 0,
  pick_batch_order_address: [],
  task_charge: 0,
  trip_type: 0,
};

interface actionShape {
  type: string;
  payload: any;
}

const Service = (state = initialState, action: actionShape): any => {
  switch (action.type) {
    case PICKUP_SERVICE: {
      return {
        ...state,
        pick_drop_service: action.payload,
      };
    }
    case UPDATE_PICKUP_ADDRESS: {
      return {
        ...state,
        pickup_address: action.payload,
      };
    }
    case UPDATE_DROP_ADDRESS: {
      return {
        ...state,
        drop_address: action.payload,
      };
    }
    case PICKUP_TEXT:
      return {
        ...state,
        pickup_text: action.payload,
      };
    case PICKUP_IMAGE:
      return {
        ...state,
        pickup_image: action.payload,
      };
    case PICKUP_DOCUMENT:
      return {
        ...state,
        pickup_document: action.payload,
      };
    case PICKUP_CHARGE:
      return {
        ...state,
        pickup_charge: action.payload,
      };
    case PICKUP_PEAK_CHARGE:
      return {
        ...state,
        pickup_peakCharge: action.payload,
      };
    case PICKUP_PEAK_COMMENT:
      return {
        ...state,
        pickup_peakComment: action.payload,
      };
    case PICKUP_NUMBER:
      return {
        ...state,
        pickup_number_state: action.payload,
      };
    case DROP_NUMBER:
      return {
        ...state,
        drop_number_state: action.payload,
      };
    case PICKUP_TYPE:
      return {
        ...state,
        pickup_type: action.payload,
      };
    case PICK_BATCH_ORDER_ADDRESSES:
      return {
        ...state,
        pick_batch_order_address: action.payload,
      };
    case TASK_CHARGE:
      return {
        ...state,
        task_charge: action.payload,
      };
    case TRIP_TYPE:
      return {
        ...state,
        trip_type: action.payload,
      };
    default:
      return state;
  }
};

export default Service;
