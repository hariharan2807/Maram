import { BASE_URL, METHODS } from '../constants/API_constants';
import DynamicRequestServer from '../workers/DynamicRequestServer';
import requestServer from '../workers/requestServer';
const log = console.log;
// API Routes
const req_initiate_login = 'login.php';
const req_change_number = 'change_mobilenumber';
const req_verify_otp = 'otp_verify.php';

export const initiateLoginRemote = async (
  input: string,
  password: string,
  fcm: string,
  // used_referral: string,
) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_initiate_login,
      { input, password, fcm },
    );
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const initiateChangeNumberRemote = async (
  mobile: string,
  fcm: string,
  // used_referral: string,
) => {
  try {
    const response = await DynamicRequestServer(
      METHODS.POST,
      BASE_URL + req_change_number,
      { mobile, fcm },
    );
    if (response.status === 200) {
      return { status: true, res: response.data };
    } else {
      failedLog('initiateChangeNumberRemote()', response);
    }
  } catch (err) {
    console.log(err);
    return {
      status: false,
      res: err.data,
    };
  }
};

export const checkOTPRemote = async (
  otp: string,
  from: string,
  deviceInfo: string,
  input: string,
  otp_type: string,
  fcm: any,
) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_verify_otp,
      {
        otp,
        from: from,
        device: deviceInfo,
        input: input,
        otp_type: otp_type,
        fcm: fcm,
      },
    );
    log('RES', response);
    return response.status === 200
      ? response
      : failedLog('checkOTPRemote()', response);
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
