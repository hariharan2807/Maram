import { METHODS } from '../constants/API_constants';
import store from '../store/index';
import {
  getToken,
  removeFCMToken,
  removePersistedUser,
  removeToken,
  saveToken,
} from './localStorage';
import { saveJWTTokenAction } from '@actions/userActions';
import { errorBox } from './utils';
import RNRestart from 'react-native-restart';

const DynamicRequestServer = function (
  method: string,
  url: string,
  payload?: any,
): any {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 100000);
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
        'Content-Type': 'application/json',
        authorization: token,
      },
    };
    if (method === METHODS.POST) {
      options.body = JSON.stringify(payload);
    }

    fetch(url, options)
      .then(async serverResponse => {
        //header to senf JWT token
        const header = serverResponse.headers.get('authorization');
        if (header) {
          // replace a new token
          await saveToken(header);
          store.dispatch(saveJWTTokenAction(header));
        }

        clearTimeout(timeoutId);
        if (serverResponse.ok) {
          if (serverResponse.ok) {
            logRequest(url, payload);
            if (serverResponse.status === 401) {
              setTimeout(() => {
                errorBox('Session expired Please Login Again');
              }, 5000);
              await removePersistedUser();
              await removeToken();
              await removeFCMToken();
              RNRestart.Restart();
            }
          } else {
            ErrorRequest(url, payload);
          }

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
          console.log('>> Status: ', serverResponse.status);
          ErrorRequest(url, payload);
          serverResponse.json().then(data => {
            reject({ status: false, data });
          });
        }
      })
      .catch(err => {
        clearTimeout(timeoutId);

        console.log(err);
        ErrorRequest(url, payload);
        reject('Failed Request');
      });
  });
};

export default DynamicRequestServer;

const logRequest = (url: string, payload: any) => {
  console.log(`\x1b[32m  Request ${url} : ${JSON.stringify(payload)} \x1b[0m`);
};
const ErrorRequest = (url: string, payload: any) => {
  console.log(
    `\x1b[33m [*ERROR*] Request ${url} : ${JSON.stringify(payload)} \x1b[0m`,
  );
};
