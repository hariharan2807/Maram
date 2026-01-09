import { METHODS } from '../constants/API_constants';
import NetInfo from '@react-native-community/netinfo';
import store from '../store/index';
import {
  getToken,
  removePersistedUser,
  removeToken,
  saveToken,
} from './localStorage';
import { saveJWTTokenAction } from '@actions/userActions';
import RNRestart from 'react-native-restart';
import { errorBox } from './utils';

const requestServerMultiPart = function (
  method: string,
  url: string,
  payload?: any,
): any {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 300000);
  return new Promise(async (resolve, reject) => {
    //for token
    let token = store.getState().user.jwt_token;

    if (!token) {
      const sinfoToken = await getToken();
      token = sinfoToken;
    }
    let options: any = {
      signal: controller.signal,
      method: method,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        authorization: token,
      },
      body: payload,
    };
    if (method === METHODS.POST || method === METHODS.GET) {
      options.body = JSON.stringify(payload);
    }

    fetch(url, {
      signal: controller.signal,
      method: method,
      body: payload,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        authorization: token,
      },
    })
      .then(async serverResponse => {
        clearTimeout(timeoutId);
        console.log('red--', JSON.stringify(serverResponse));
        if (serverResponse.ok) {
          logRequest(url, payload);
          if (serverResponse.headers.get('content-length') === '0') {
            resolve({ status: serverResponse.status });
          } else {
            serverResponse
              .json()
              .then(data => {
                resolve({ status: serverResponse.status, data });
              })
              .catch(err => {
                ErrorRequest(url, payload);
                reject('Parse Failed');
              });
          }
        } else {
          if (serverResponse.status === 401) {
            setTimeout(() => {
              errorBox('Session expired Please Login Again');
            }, 2000);
            await removeToken();
            await removePersistedUser();
            // await removeFCMToken();
            RNRestart.Restart();
          }

          console.log('>> Status: ', serverResponse.status);
          ErrorRequest(url, payload);
          console.log('asdfasf', JSON?.stringify(serverResponse));

          serverResponse
            .json()
            .then(data => {
              // console.log('data-----', data);
              reject({
                status: false,
                statusCode: serverResponse.status,
                data,
              });
            })
            .catch(err => {
              reject({ status: false, statusCode: serverResponse.status, err });
            });
        }
      })
      .catch(err => {
        clearTimeout(timeoutId);

        console.log('cioi', err);
        ErrorRequest(url, payload);
        reject({ status: false, err });
      });
  });
};

export default requestServerMultiPart;

const logRequest = (url: string, payload: any) => {
  console.log(`\x1b[32m  Request ${url} : ${JSON.stringify(payload)} \x1b[0m`);
};
const ErrorRequest = (url: string, payload: any) => {
  console.log(
    `\x1b[33m [*ERROR*] Request ${url} : ${JSON.stringify(payload)} \x1b[0m`,
  );
};
