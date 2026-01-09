import { BASE_URL, METHODS } from '../constants/API_constants';
import requestServer from '../workers/requestServer';
const log = console.log;

// API Routes
const req_isAvailable = 'check_location_service.php';
const req_UpdateLocation = 'update_location.php';

const req_onboarding = 'get_splash_banner.php';
const req_available_payments = 'get_payment_mode.php';
const req_app_control = 'get_app_control.php';
const req_available_cites = 'get_all_city';
const req_get_company_details = 'get_company_details.php';
export const appOnboardingRemote = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_onboarding,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('appOnboardingRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const appAvailableCitiesRemote = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_available_cites,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('appAvailableCitiesRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isLocationServicableRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_isAvailable,
      params,
    );
    return response.status === 200
      ? response.data
      : failedLog('isLocationServicableRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const updateLocationRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_UpdateLocation,
      params,
    );
    return response.status === 200
      ? response.data
      : failedLog('updateLocationRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const isLocationServicableRemote1 = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_isAvailable,
      {
        latitude: params.queryKey[1],
        longitude: params.queryKey[2],
        company_id: params.queryKey[3],
      },
    );
    return response.status === 200
      ? response.data
      : failedLog('isLocationServicableRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const Company_Details = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_company_details,
      {
        company_id: params.queryKey[1],
      },
    );
    return response.status === 200
      ? response.data
      : failedLog('Company_Details()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const appControllRemote = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_app_control,
    );
    return response.status === 200
      ? response.data.GTS
      : failedLog('appControllRemote()', response);
  } catch (err) {
    console.log('\x1b[31m appControllRemote()', err);
    return false;
  }
};

export const fetchAvailablePaymentsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_available_payments,
      // {
      //   latitude: params?.queryKey[1],
      //   longitude: params?.queryKey[2],
      //   total_amount: params?.queryKey[3],
      // },
    );
    return response.status === 200
      ? response
      : failedLog('fetchAvailablePaymentsRemote()', response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const reverseGeoCodeRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.GET,
      `https://nominatim.openstreetmap.org/reverse?lat=${payload.latitude}&lon=${payload.longitude}&format=json`,
    );
    return response
      ? response.data
      : failedLog('reverseGeoCodeRemote()', response);
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
