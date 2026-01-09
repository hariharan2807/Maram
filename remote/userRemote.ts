import { BASE_URL, Bluelog, METHODS, Redlog } from '../constants/API_constants';
import { UserAddressType } from '../types/userTypes';
import requestServer from '../workers/requestServer';
import requestServerMultiPart from '../workers/requestServerMultiPart';
const log = console.log;

// API Routes
const req_get_top_banner = 'get_top_banner.php';
const req_category = 'get_category.php';
const req_get_app_control = 'get_app_control.php';
const req_login = 'login.php';
const req_verify = 'verify.php';
const req_get_user = 'get_user.php';
const req_update_user = 'update_user.php';
const req_get_best_selling_product = 'get_best_selling_product.php';
const req_get_recommended_product = 'get_recommended_product.php';
const req_add_favourite = 'add_favourite.php';
const req_get_all_products = 'get_all_products.php';
const req_get_category_products = 'get_category_products.php';
const req_get_favorites = 'get_favorites.php';
const req_check_branch = 'check_branch.php';
const req_get_offer_product = 'get_offer_product.php';
const req_get_user_address = 'get_user_address.php';
const req_delete_address = 'delete_address.php';
const req_get_all_coupon_code = 'get_all_coupon_code.php';
const req_check_coupon = 'check_coupon.php';
const req_check_delivery_address = 'check_delivery_address.php';
const req_get_delivery_charge = 'get_delivery_charge.php';
const req_get_live_order = 'get_live_order.php';
const req_get_bottom_banner = 'get_bottom_banner.php';
const req_get_all_order='get_all_order.php'
const req_get_payment_method='get_payment_method.php'
const req_create_order='create_order.php'
const req_order_status_update='order_status_update.php'
const req_razorpay_order='razorpay_order.php'
const req_get_single_order='get_single_order.php'
const req_add_user_address='add_user_address.php'
const req_cancel_order='cancel_order.php'
const req_delete_account='delete_account.php'
export const get_CheckBranch = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_check_branch,
      paylod,
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Cancel_Order = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_cancel_order,
      paylod,
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_DeleteAccount = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_delete_account,
      paylod,
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getSingleOrderRemote = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_single_order,
      { user_id: paylod.queryKey[1] ,order_id:paylod.queryKey[2]},
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Live_Order = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_live_order,
      { user_id: paylod.queryKey[1] },
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Payment = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_payment_method,
      { user_id: paylod.queryKey[1] },
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Create_order = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_create_order,
      paylod,
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_OrderStatus = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_order_status_update,
      paylod,
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Razorpay = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_razorpay_order,
      paylod,
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Add_UserAddress = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_add_user_address,
      paylod,
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_All_Order = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_all_order,
      { user_id: paylod.queryKey[1] },
      
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Delivery_Charge = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_delivery_charge,
      paylod,
    );
    // console.log("responseresponseresponseresponseresponse",response?.data)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};

export const get_AddFav = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_add_favourite,
      paylod,
    );
    // console.log("responseresponseresponseresponseresponse",response)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Check_Delivery_Address = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_check_delivery_address,
      paylod,
    );
    // console.log("responseresponseresponseresponseresponse",response)
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getBanner = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_get_top_banner,
      // params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getBanner()', response);
  } catch (err) {
    Redlog('getBanner Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getBottomBanner = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_get_bottom_banner,
      // params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getBottomBanner()', response);
  } catch (err) {
    Redlog('getBottomBanner Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getAppControll = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_get_app_control,
      // params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getAppControll()', response);
  } catch (err) {
    Redlog('getAppControll Error', err);
    return {
      status: false,
      res: err,
    };
  }
};

export const getLogin = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_login,
      paylod,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getAppControll()', response);
  } catch (err) {
    Redlog('getAppControll Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_best_selling_product = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_best_selling_product,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_best_selling_product()', response);
  } catch (err) {
    Redlog('req_get_best_selling_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Recommenedproduct = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_recommended_product,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};

export const get_AllCouponList = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_all_coupon_code,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Check_coupon = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_check_coupon,
      paylod,
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_Offerproduct = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_offer_product,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};

export const get_FavList = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_favorites,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};

export const deleteAddressRemote = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_delete_address,
      paylod,
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_allAddressList = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_user_address,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_allAddressList1 = async (userId:any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_user_address,
      { user_id: userId },
    );

    return response?.status === 200
      ? response.data
      : failedLog('get_allAddressList1()', response);

  } catch (err) {
    Redlog('get_allAddressList1 Error', err);
    return {
      status: false,
      res: err,
    };
  }
};

export const get_Get_all_Product = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_all_products,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('req_get_recommended_product()', response);
  } catch (err) {
    Redlog('req_get_recommended_product Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getOtpVerify = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_verify,
      paylod,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getAppControll()', response);
  } catch (err) {
    Redlog('getAppControll Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getGetUser = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_user,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('getAppControll()', response);
  } catch (err) {
    Redlog('getAppControll Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getGetUser1 = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_user,
      paylod,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getAppControll()', response);
  } catch (err) {
    Redlog('getAppControll Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const get_category_product = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_category_products,
      paylod,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getAppControll()', response);
  } catch (err) {
    Redlog('getAppControll Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getUpdate_user = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_update_user,
      paylod,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getAppControll()', response);
  } catch (err) {
    Redlog('getAppControll Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
export const getCategory = async (paylod: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_category,
      { user_id: paylod.queryKey[1] },
    );
    return response.status === 200
      ? response?.data
      : failedLog('getCategory()', response);
  } catch (err) {
    Redlog('getCategory Error', err);
    return {
      status: false,
      res: err,
    };
  }
};
const failedLog = (functionname: string, response: any) => {
  console.log(
    `\x1b[35m ['Fail'] Request ${functionname} : ${JSON.stringify(
      response,
    )} \x1b[0m`,
  );
  throw response;
};
