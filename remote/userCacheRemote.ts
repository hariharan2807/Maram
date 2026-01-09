import { BASE_URL, METHODS } from '../constants/API_constants';
import requestServer from '../workers/requestServer';
const log = console.log;

// API Routes
const req_getAll_address = 'get_user_address';
const req_get_order = 'get_single_order';
const req_all_orders = 'get_all_order';
const req_get_favorites = 'get_favorites';

export const getAllAddressCacheRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_getAll_address,
      { user_id: params?.queryKey[1] },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getAllAddressCacheRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getAllOrdersCacheRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_all_orders,
      { user_id: params?.queryKey[1] },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getAllOrdersCacheRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getOrderByIdCacheRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_order,
      { user_id: params?.queryKey[1], order_id: params?.queryKey[2] },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getOrderByIdCacheRemote()', response);
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
