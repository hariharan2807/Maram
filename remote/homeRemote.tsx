import { BASE_URL, METHODS } from '../constants/API_constants';
import requestServer from '../workers/requestServer';
import store from '../store';
import {
  SanitizeCouponRestaurant,
  SanitizeCuisineRestaurant,
  SanitizeDealOfTheDay,
  SanitizeExclusiveShop,
  SanitizeNearByHotel,
  SanitizeOfferShop,
  SanitizeserviceShops,
  SanitizeTopBrandProducts,
} from '../workers/objCreators';
const log = console.log;

const LOCATIONSTATE = store.getState().app.locationState;

// API Routes
const req_homeTopSection = 'get_home_top_contents';
const req_exclusiveShop = 'get_exclusive_shop_list';
const req_homeBottomSection = 'get_home_bottom_contents';
const req_nearybyHotels = 'get_home_nearby_shops';
const req_popularShops = 'get_popular_shop_list';
const req_offer_shops = 'get_offer_shop_list';
const req_coupon_shops = 'get_offer_shop_list.php';
const req_cuisine_shops = 'cuisine_based_shop_list';
const req_service_shops = 'get_service_shop';
const req_page_service_shops = 'get_service_shop_on';
const req_nearby_shops_on = 'get_home_nearby_shops_on';
const req_nearby_shops_off = 'get_home_nearby_shops_off';
const req_page_off_service_shops = 'get_service_shop_off';
const req_shops_by_coupons = 'get_coupon_shop_list';
const req_get_news_feed = 'get_newsfeed';
const req_pre_order = 'get_preorder';
const req_timer = 'timer';
const req_banner_shops = 'get_listed_shops.php';

const req_deal_of_day = 'get_dealoftheday_shop';
const req_top_brands = 'top_brand_based_shop_list';
const req_deal_of_day_banner = 'get_deal_banner';
const req_services = 'get_city_services.php';
const req_banners = 'get_banners.php';
const req_get_pre_order_banners = 'get_pre_order_banners.php';
const req_popular_top_brands = 'get_popular_top_brands';
const req_popular_brands = 'get_popular_brands';
const req_cuisine = 'get_all_cusines.php';
const req_get_pre_order_cusine = 'get_pre_order_cusine.php';
const req_cuisine_shop = 'cuisine_based_shop_list.php';
const req_pre_order_cuisine_based_shop_list =
  'pre_order_cuisine_based_shop_list.php';
const req_offer_shop_list = 'get_offer_shop_list.php';
const req_coupon = 'get_coupons';
const req_combos = 'get_combos';

export const getHomeTopRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_homeTopSection,
      params?.queryKey[1],
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getHomeTopRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getDealOfTheDayBannerRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_deal_of_day_banner,
      params?.queryKey[1],
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getDealOfTheDayBannerRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getExclusiveShopRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_exclusiveShop,
      params?.queryKey[1],
    );
    return response.status === 200
      ? SanitizeExclusiveShop(response.data.GTS, params?.queryKey[2])
      : failedLog('getExclusiveShopRemote()', response);
  } catch (err) {
    console.log('err====>', err);
    return false;
  }
};

export const getHomeBottomRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_homeBottomSection,
      params?.queryKey[1],
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getHomeBottomRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getofferShopsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_coupon_shops,
      { company_id: params?.queryKey[1] },
    );
    return response.status === 200
      ? response
      : failedLog('getofferShopsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCusineShopsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_cuisine_shops,
      {
        ...params?.queryKey[1],
        cuisine_id: params?.queryKey[2],
        user_id: params?.queryKey[3],
      },
    );
    return response.status === 200
      ? SanitizeCuisineRestaurant(response.data.GTS, params?.queryKey[4])
      : failedLog('getCusineShopsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCouponShopsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_offer_shops,
      { ...params?.queryKey[1], coupon_id: params?.queryKey[2] },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getCouponShopsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
// export const getShopsByServiceRemote = async (params: any) => {
//     try {
//         const response = await requestServer(METHODS.POST, BASE_URL + req_service_shops, { ...params?.queryKey[1], service_id: params?.queryKey[2], user_id: params?.queryKey[3], })
//         return response.status === 200 ? response.data.GTS : failedLog("getShopsByServiceRemote()", response)
//     }
//     catch (err) {
//         console.log(err)
//         return false
//     }
// }

export const getShopsByServiceRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_service_shops,
      {
        ...params?.queryKey[1],
        service_id: params?.queryKey[2],
        page: params?.queryKey[3],
      },
    );
    return response.status === 200
      ? SanitizeserviceShops(response.data.GTS, params?.queryKey[4])
      : failedLog('getShopsByServiceRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getShopsByServiceOnPageRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_page_service_shops,
      {
        ...params.location,
        service_id: params.service_id,
        page: params.page,
      },
    );
    return response.status === 200
      ? SanitizeserviceShops(response.data.GTS, params?.vegStatus)
      : failedLog('getShopsByServicePageRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getNearByOnPageRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_nearby_shops_on,
      {
        ...params.location,
        page: params.page,
      },
    );
    return response.status === 200
      ? SanitizeNearByHotel(response.data.GTS, params.vegStatus)
      : failedLog('getNearByOnPageRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getNearByOffPageRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_nearby_shops_off,
      {
        ...params.location,
        page: params.page,
      },
    );
    return response.status === 200
      ? SanitizeNearByHotel(response.data.GTS, params.vegStatus)
      : failedLog('getNearByOffPageRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getShopsByServiceOffPageRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_page_off_service_shops,
      {
        ...params.location,
        service_id: params.service_id,
        page: params.page,
      },
    );
    return response.status === 200
      ? SanitizeserviceShops(response.data.GTS, params?.vegStatus)
      : failedLog('getShopsByServicePageRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getShopsByCouponRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_shops_by_coupons,
      {
        ...params?.queryKey[1],
        coupon_id: params?.queryKey[2],
        user_id: params?.queryKey[3],
      },
    );
    return response.status === 200
      ? SanitizeCouponRestaurant(response.data.GTS, params?.queryKey[4])
      : failedLog('getShopsByCouponRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

// export const getNearyByHotelsRemote = async (params: any) => {
//     try {
//         const response = await requestServer(METHODS.POST, BASE_URL + req_nearybyHotels, params?.queryKey[1])
//         return response.status === 200 ? response.data.GTS : failedLog("getNearyByHotelsRemote()", response)
//     }
//     catch (err) {
//         console.log(err)
//         return false
//     }
// }

export const getNearyByHotelsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_nearybyHotels,
      params?.queryKey[1],
    );
    // console.log('responce------',JSON.stringify(response.data.GTS))
    return response.status === 200
      ? SanitizeNearByHotel(response.data.GTS, params?.queryKey[2])
      : failedLog('getNearyByHotelsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getNearyOnShopQuerysRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_nearby_shops_on,
      {
        ...params.queryKey[1],
        page: 0,
      },
    );
    // console.log('responce------',JSON.stringify(response.data.GTS))
    return response.status === 200
      ? SanitizeNearByHotel(response.data.GTS, params?.queryKey[2])
      : failedLog('getNearyByHotelsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPopularShopListRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_popularShops,
      {
        ...params?.queryKey[1],
        service_id: params?.queryKey[2],
      },
    );
    // console.log('responce------',JSON.stringify(response.data.GTS))
    return response.status === 200
      ? SanitizeNearByHotel(response.data.GTS, false)
      : failedLog('getPopularShopListRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getTimerRemote = async (params: any) => {
  try {
    const response = await requestServer(METHODS.POST, BASE_URL + req_timer);

    return response.status === 200
      ? response.data
      : failedLog('getTimerRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getNewsFeedRemote = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_get_news_feed,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getNewsFeedRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPreOrderRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_pre_order,
      { ...params.queryKey[1] },
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('getPreOrderRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getdealoftheDayRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_deal_of_day,
      { ...params?.queryKey[1] },
    );
    return response.status === 200
      ? SanitizeDealOfTheDay(response.data.GTS, params?.queryKey[2])
      : failedLog('getdealoftheDayRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getBannerShopListRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_banner_shops,
      { company_id: params?.queryKey[1], shops: params?.queryKey[3] },
    );
    return response.status === 200
      ? SanitizeDealOfTheDay(response.data.GTS, params?.queryKey[2])
      : failedLog('getdealoftheDayRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getTopBrandsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_top_brands,
      { brand_id: params?.queryKey[1], ...params?.queryKey[2] },
    );
    return response.status === 200
      ? SanitizeTopBrandProducts(response.data.GTS, params?.queryKey[3])
      : failedLog('getTopBrandsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

//Optimised API for home screen
export const getServicesRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_services,
      {
        company_id: params?.queryKey[1],
        device: params?.queryKey[2],
        version_code: params?.queryKey[3],
      },
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getServicesRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getpreorderbanners = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_pre_order_banners,
      {
        company_id: params?.queryKey[1],
      },
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getpreorderbanners()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getBannersRemote = async (params: any) => {
  try {
    const response = await requestServer(METHODS.POST, BASE_URL + req_banners, {
      company_id: params?.queryKey[1],
    });
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getBannersRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPopularTopBrandsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_popular_top_brands,
      params?.queryKey[1],
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getPopularTopBrandsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getPopularBrandsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_popular_brands,
      params?.queryKey[1],
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getPopularBrandsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getpre_order_cuisine_based_shop_listRemote = async (
  params: any,
) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_pre_order_cuisine_based_shop_list,
      params,
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response
      : failedLog('getpre_order_cuisine_based_shop_listRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getCusisneshopRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_cuisine_shop,
      params,
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response
      : failedLog('getCusisneRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const get_pre_order_cusineremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_pre_order_cusine,
      { company_id: params?.queryKey[1] },
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response
      : failedLog('get_pre_order_cusineremote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const getCusisneRemote = async (params: any) => {
  try {
    const response = await requestServer(METHODS.GET, BASE_URL + req_cuisine);
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response
      : failedLog('getCusisneRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCouponRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_coupon,
      params?.queryKey[1],
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getCopuponRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCombosRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_combos,
      params?.queryKey[1],
    );
    // return response.status === 200 ? SanitizeHomeTop(response.data.GTS,params?.queryKey[2]) : failedLog("getHomeTopRemote()", response)
    return response.status === 200
      ? response.data.GTS
      : failedLog('getCombosRemote()', response);
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
