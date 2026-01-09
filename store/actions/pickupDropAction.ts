import {
  UPDATE_PICKUP_ADDRESS,
  UPDATE_DROP_ADDRESS,
  PICKUP_TEXT,
  PICKUP_IMAGE,
  PICKUP_TIP,
  PICKUP_CHARGE,
  PICKUP_SERVICE,
  PICKUP_PEAK_CHARGE,
  PICKUP_PEAK_COMMENT,
  PICKUP_NUMBER,
  DROP_NUMBER,
  PICKUP_TYPE,
  PICK_BATCH_ORDER_ADDRESSES,
  TASK_CHARGE,
  TRIP_TYPE,
  PICKUP_DOCUMENT,
} from './actionTypes';

export const savePickupServiceAction = (payload: any) => ({
  type: PICKUP_SERVICE,
  payload,
});

export const updatePickupAdressAction = (payload: any) => ({
  type: UPDATE_PICKUP_ADDRESS,
  payload,
});
export const updateDropAdressAction = (payload: any) => ({
  type: UPDATE_DROP_ADDRESS,
  payload,
});

export const savePickupTextAction = (payload: any) => ({
  type: PICKUP_TEXT,
  payload,
});

export const savePickupImageAction = (payload: any) => ({
  type: PICKUP_IMAGE,
  payload,
});

export const savePickupDocumentAction = (payload: any) => ({
  type: PICKUP_DOCUMENT,
  payload,
});
export const savePickupChargeAction = (payload: any) => ({
  type: PICKUP_CHARGE,
  payload,
});
export const savePickupTipAction = (payload: any) => ({
  type: PICKUP_TIP,
  payload,
});

export const savePickupPeakChargeAction = (payload: any) => ({
  type: PICKUP_PEAK_CHARGE,
  payload,
});

export const savePickupPeakCommentAction = (payload: any) => ({
  type: PICKUP_PEAK_COMMENT,
  payload,
});

export const savePickupNumberAction = (payload: any) => ({
  type: PICKUP_NUMBER,
  payload,
});

export const saveDropNumberAction = (payload: any) => ({
  type: DROP_NUMBER,
  payload,
});

export const updatePickUpType = (payload: any) => ({
  type: PICKUP_TYPE,
  payload,
});

export const updateTaskCharge = (payload: any) => ({
  type: TASK_CHARGE,
  payload,
});
export const updatetripType = (payload: any) => ({
  type: TRIP_TYPE,
  payload,
});

export const updateBatchAddresses = (payload: any) => ({
  type: PICK_BATCH_ORDER_ADDRESSES,
  payload,
});
