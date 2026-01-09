import { BASE_URL, METHODS } from '../constants/API_constants';
import requestServer from '../workers/requestServer';
const log = console.log;

const req_initiate_order = 'generate_hash.php';
const req_generate_hash_pre_order = 'generate_hash_pre_order.php';
const req_create_order = 'create_order.php';
const req_create_order_pre_order = 'create_order_pre_order.php';
const req_create_pre_order = 'Preorder/create_preorder';
const req_create_pickup_order = 'create_pickup_order';
const req_create_pickup_batch_order = 'create_batch_order';
const req_cancel_order = 'cancel_order.php';
const req_cancel_pickupOrder = 'PickupOrder/cancel_order';
const req_cancel_preOrder = 'Preorder/cancel_order';
const req_check_delivery = 'check_location_service';
const req_status_update_order = 'order_status.php';
const req_get_order_status = 'get_order_status';
const req_order_status_pre_order = 'order_status_pre_order.php';
const req_status_update_pre_order = 'Preorder/order_status';
const req_status_update_pick_and_drop_order = 'PickupOrder/order_status';
const req_status_razorpay_update_order = 'Order/codpayment_status';
const req_status_razorpay_update_preorder = 'Preorder/codpayment_status';
const req_status_razorpay_update_pickuporder = 'PickupOrder/codpayment_status';
const req_instruction = 'get_instruction';
const req_razorpay_key = 'razorpay_key.php';
const req_add_rating = 'Order/order_rating';
const req_pre_rating = 'Preorder/order_rating';
const req_pickup_rating = 'PickupOrder/order_rating';
const razorpay_add_money = 'razorpay_add_money';
const add_money = 'add_money';
const get_time_slot = 'get_time_slot';
const refund_status_check = 'refund_status_check';
export const initiateOrderRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_initiate_order,
      orderObj,
    );
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 403) {
      // console.log('403 Forbidden error:', response);
      return response.data; // Ensure the 403 response is returned
    } else if (response.status === 400) {
      // console.log('400 Bad Request error:', response);
      return response.data; // Ensure the 400 response is returned
    } else {
      return failedLog('initiateOrderRemote()', response);
    }
  } catch (err) {
    console.log('err--->', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const initiatePreOrderRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_generate_hash_pre_order,
      orderObj,
    );
    return response.status === 200
      ? response.data
      : failedLog('initiatePreOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createOrderRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_create_order,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('createOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const PreOrderCreateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_create_order_pre_order,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('PreOrderCreateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const orderStatusUpdateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_status_update_order,
      orderObj,
    );
    return response.status === 200
      ? response
      : failedLog('orderStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const OrderPreStatusUpdateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_order_status_pre_order,
      orderObj,
    );
    return response.status === 200
      ? response
      : failedLog('OrderPreStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const orderStatusRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_get_order_status,
    );
    return response.status === 200
      ? response?.data
      : failedLog('orderStatusRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const preOrderStatusUpdateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_status_update_pre_order,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('orderStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const preOrderGetTimeslot = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + get_time_slot,
      params,
    );
    return response.status === 200
      ? response?.data.GTS
      : failedLog('orderStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const pickNDropOrderStatusUpdateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_status_update_pick_and_drop_order,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('orderStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const refundStatusCheckRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + refund_status_check,
      { order_id: params.queryKey[1] },
    );
    return response.status == 200
      ? response?.data
      : failedLog('refundStatusCheckRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const razorpayorderStatusUpdateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_status_razorpay_update_order,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('razorpayorderStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const rezorpaywalletupdate = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + razorpay_add_money,
      params,
    );
    return response.status === 200
      ? { status: true, response: response?.data }
      : failedLog('rezorpaywalletupdate()', response);
  } catch (err) {
    console.log(err);
    return { status: false, response: err };
  }
};
export const razorpaywalletstatusUpdate = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + add_money,
      params,
    );
    return response.status === 200
      ? { status: true, response: response?.data }
      : failedLog('rezorpaywalletupdate()', response);
  } catch (err) {
    console.log(err);
    return { status: false, response: err };
  }
};

export const razorpaypreOrderStatusUpdateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_status_razorpay_update_preorder,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('razorpaypreOrderStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const razorpaypickupOrderStatusUpdateRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_status_razorpay_update_pickuporder,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('razorpaypickupOrderStatusUpdateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const createPickupOrderRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_create_pickup_order,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('createPickupOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createPickupBatchOrderRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_create_pickup_batch_order,
      orderObj,
    );
    return response.status === 200
      ? response.data
      : failedLog('createPickupBatchOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createPreOrderRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_create_pre_order,
      orderObj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('createPreOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getRazorPayKey = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_razorpay_key,
      orderObj,
    );
    // console.log("\x1b[31m response -----1234",response)
    return response.status === 200
      ? response
      : failedLog('getRazorPayKey()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getDeliveryCheck = async (obj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_check_delivery,
      obj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getDeliveryCheck()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const cancelOrderRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_cancel_order,
      payload,
    );
    return response.status === 200
      ? true
      : failedLog('cancelOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const cancelPickupOrderRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_cancel_pickupOrder,
      {
        user_id: payload.user_id,
        order_id: payload.order_id,
        comment: payload.comment,
      },
    );
    return response.status === 200
      ? true
      : failedLog('cancelPickupOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const cancelPreOrderRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_cancel_preOrder,
      payload,
    );
    return response.status === 200
      ? true
      : failedLog('cancelPreOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const InstructionRemote = async (orderObj: any) => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_instruction,
      orderObj,
    );
    return response.status === 200
      ? response?.data?.GTS
      : failedLog('InstructionRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addRatingRemote = async (obj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_add_rating,
      obj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('addRatingRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addPreRatingRemote = async (obj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_pre_rating,
      obj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('addPreRatingRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addPickupRatingRemote = async (obj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_pickup_rating,
      obj,
    );
    return response.status === 200
      ? response?.data
      : failedLog('addPickupRatingRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const failedLog = (functionname: string, response: any) => {
  console.log(
    `\x1b[35m  Request ${functionname} : ${JSON.stringify(response)} \x1b[0m`,
  );
  throw response;
};
