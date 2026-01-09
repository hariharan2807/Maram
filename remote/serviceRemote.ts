import { BASE_URL, METHODS } from '../constants/API_constants';
import requestServer from '../workers/requestServer';
import {
  sanitizeAPIProduct,
  sanitizeAPICategories,
  sanitizeComboProducts,
  SanitizePreOrder,
} from '../workers/objCreators';
const log = console.log;

// API Routes
const search_company = 'search_company.php';
const req_getSingleStore = 'get_shop.php';
const req_get_shop_coupon = 'get_shop_coupon';
const req_getstoreCategory = 'get_category.php';
const req_get_pre_order_category = 'get_pre_order_category.php';
const req_deals_of_the_Product = 'get_dealoftheday_products';
const req_getcategoryProduct = 'get_category_products.php';
const req_getRecomended = 'get_recommended_product';
const req_getCharges = 'get_delivery_charge.php';
const req_getAllCoupon = 'get_all_coupon_code.php';
const req_check_coupon = 'coupon_check.php';
const req_searchShops = 'search_shop.php';
const req_search_product = 'search_product.php';
const req_searchProducts = 'Product/search_product';
const req_shopCombos = 'get_shop_combo.php';
const req_pickupCategories = 'get_pick_category';
const req_pickupCharges = 'pickn_delivery_charge';
const req_preOrder_shoplist = 'get_preorder_shop';
const req_preOrder_products = 'get_preorder_products';
const req_tip_state = 'get_tip_amount';
const req_get_user_scratch = 'get_user_scratch';
const req_pickupBatchCharges = 'batch_pickn_delivery_charge';
const req_get_preorder_date = 'get_preorder_date';
const req_get_page_products = 'get_page_products.php';
const req_get_page_products_pre = 'get_page_products_pre.php';
const req_get_all_product_list = 'get_all_product_list.php';
const req_get_products_by_category = 'get_products_by_category.php';
const req_get_products_by_category_pre = 'get_products_by_category_pre.php';
export const getSingleStoreRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_getSingleStore,
      { company_id: params.queryKey[1], shop_id: params.queryKey[2] },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getSingleStore()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getShopCouponStoreRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_shop_coupon,
      {
        shop_id: params.queryKey[1],
        ...params.queryKey[2],
        date: params?.queryKey[3],
      },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getShopCouponStoreRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getpre_order_categoryRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_pre_order_category,
      { shop_id: params.queryKey[1] },
    );
    return response.status === 200
      ? response
      : failedLog('getpre_order_categoryRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getStoreCategoryRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_getstoreCategory,
      { shop_id: params.queryKey[1] },
    );
    return response.status === 200
      ? response
      : failedLog('getStoreCategoryRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getDealsProductRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_deals_of_the_Product,
      { shop_id: params.queryKey[1] },
    );
    return response.status === 200
      ? sanitizeAPIProduct(response.data.GTS, params?.queryKey[4])
      : failedLog('getDealsProductRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getPreorderdaysRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_preorder_date,
      {
        shop_id: params?.queryKey[1],
      },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getDealsProductRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getRecommendedProductRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_getRecomended,
      { shop_id: params.queryKey[1], date: params.queryKey[3] },
    );
    return response.status === 200
      ? sanitizeAPIProduct(response.data.GTS, params?.queryKey[2])
      : failedLog('getRecommendedProductRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getCategoryProductRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_getcategoryProduct,
      {
        category_id: params.queryKey[1],
        shop_id: params?.queryKey[2],
      },
    );
    // console.log("data------>",response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getCategoryProductRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getCategoryProductRemote1 = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_page_products,
      params,
      // {
      //   category_id: params.queryKey[1],
      //   shop_id:params?.queryKey[2],page:params?.queryKey[3]
      // },
    );
    // console.log("data------>",response)
    return response.status === 200
      ? { status: true, statusCode: response.status, res: response?.data }
      : failedLog('getCategoryProductRemote1()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getget_page_products_preRemote1 = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_page_products_pre,
      params,
      // {
      //   category_id: params.queryKey[1],
      //   shop_id:params?.queryKey[2],page:params?.queryKey[3]
      // },
    );
    // console.log("data------>",response)
    return response.status === 200
      ? { status: true, statusCode: response.status, res: response?.data }
      : failedLog('getget_page_products_preRemote1()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getAllProductListRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_all_product_list,
      params,
      // {
      //   category_id: params.queryKey[1],
      //   shop_id:params?.queryKey[2],page:params?.queryKey[3]
      // },
    );
    // console.log("data------>",response)
    return response.status === 200
      ? { status: true, statusCode: response.status, res: response?.data }
      : failedLog('getCategoryProductRemote1()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getproducts_by_category_preRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_products_by_category_pre,
      params,
      // {
      //   category_id: params.queryKey[1],
      //   shop_id:params?.queryKey[2],page:params?.queryKey[3]
      // },
    );
    // console.log("data------>",response)
    return response.status === 200
      ? { status: true, statusCode: response.status, res: response?.data }
      : failedLog('getproducts_by_category_preRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getAllProductListCategoryRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_products_by_category,
      params,
      // {
      //   category_id: params.queryKey[1],
      //   shop_id:params?.queryKey[2],page:params?.queryKey[3]
      // },
    );
    // console.log("data------>",response)
    return response.status === 200
      ? { status: true, statusCode: response.status, res: response?.data }
      : failedLog('getCategoryProductRemote1()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const searchRestaurantsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_searchShops,
      params,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('searchRestaurantsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const searchCopanyRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + search_company,
      params,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('searchRestaurantsRemote1()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const searchRestaurantsRemote1 = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_search_product,
      params,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('searchRestaurantsRemote1()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const searchProductsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_searchProducts,
      params,
    );
    return response.status === 200
      ? sanitizeAPIProduct(response.data.GTS, false)
      : failedLog('searchProductsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getStoreCombosRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_shopCombos,
      { shop_id: params.queryKey[1] },
    );
    return response.status === 200
      ? sanitizeComboProducts(response.data.GTS, params?.queryKey[2])
      : failedLog('getStoreCombosRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAllCouponsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_getAllCoupon,
      {
        shops: params.queryKey[1],
      },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getAllCouponsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getUserScratchRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_user_scratch,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getUserScratchRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCheckCouponRemote = async (obj: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_check_coupon,
      obj,
    );
    return response.status === 200
      ? response.data
      : failedLog('getCheckCoupon()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPickupServicesRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_pickupCategories,
      {},
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getPickupCategoriesRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPickupChargesRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_pickupCharges,
      payload,
    );
    return response.status === 200
      ? response.data
      : failedLog('getPickupChargesRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPickupDeliveryChargesRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_pickupBatchCharges,
      payload,
    );
    return response.status === 200
      ? response.data
      : failedLog('getPickupChargesRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPreOrderShopRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_preOrder_shoplist,
      { preorder_id: params.queryKey[1], ...params.queryKey[3] },
    );
    return response.status === 200
      ? SanitizePreOrder(response.data.GTS, params.queryKey[2])
      : failedLog('getPreOrderShopRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPreOrderProducts = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_preOrder_products,
      { preorder_shop_id: params.queryKey[1] },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getPreOrderShopRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getChargesRemote = async (params: any) => {
  // console.log("params--------->",params)
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_getCharges,
      {
        shop_id: params.shop_id,
        // total: params.total,
        // // pre_order: params.pre_order,
        // delivery_type: params.delivery_type,
        // ...params.location,
        // products: params?.products,
        // combo: params?.combo,
      },
    );
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 403) {
      // return sanitizeAPIDeliveryCharge(response.data)
      return response.data;
    } else {
      failedLog('getChargesRemote()', response);
    }
  } catch (err) {
    console.log(err);
    throw 'Network Query Failed';
  }
};

export const getTipStateRemote = async (params: any) => {
  try {
    const response = await requestServer(METHODS.GET, BASE_URL + req_tip_state);
    return response.status === 200
      ? response.data.GTS
      : failedLog('getTipStateRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const failedLog = (functionname: string, response: any) => {
  console.log(
    `\x1b[31m  Request ${functionname} : ${JSON.stringify(response)} \x1b[0m`,
  );
  throw response;
};
