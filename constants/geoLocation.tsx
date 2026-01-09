import Geocoder from 'react-native-geocoding';
import requestServer from '../workers/requestServer';
import { BASE_URL, METHODS } from '../constants/API_constants';

import store from '../store/';

export const getAddressByCoordinates = async (...args) => {
  const Map_Key = "AIzaSyCThJkHNxhDKsy3bMkostIgMfeCDbupyNQ";

  Geocoder.init(Map_Key);
  const geocoderResponse = await new Promise((resolve, reject) => {
    Geocoder.from(...args)
      .then(json => {
        resolve(!!json.results ? json.results[0] : []);
      })
      .catch(error => {
        reject(error);
        console.warn('Error:', error);
      });
  });

  return geocoderResponse;
};

export const googlePlacesApiRemote = async (searchText: string) => {
  const Map_Key = 'AIzaSyCThJkHNxhDKsy3bMkostIgMfeCDbupyNQ';
  try {
    const response = await requestServer(
      METHODS.GET,
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&types=establishment&radius=100&key=${Map_Key}&components=country:in`,
    );
    return response ? response : failedLog('googlePlacesApi()', response);
  } catch (err) {
    return false;
  }
};
export const googleReverseCodingRemote = async (payload: any) => {
  const Map_Key: any = store.getState().app.mapKey;  
  // console.log("Map_KeyMap_KeyMap_Key",Map_Key)
  
  try {
    const response = await requestServer(METHODS.GET, `https://maps.googleapis.com/maps/api/geocode/json?latlng=${payload.latitude},${payload.longitude}&key=${'AIzaSyCThJkHNxhDKsy3bMkostIgMfeCDbupyNQ'}`,);
    return response ? response : failedLog("googleReverseCoding()", response)
  } catch (err) {
    console.log(err)
    return false;
  }
};
export const reverseGeoCodeRemote = async (payload: any) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${payload.latitude}&lon=${payload.longitude}&format=json`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'YourAppName/1.0 (your@email.com)', // REQUIRED
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('reverseGeoCodeRemote error:', error);
    return null;
  }
};

const failedLog = (functionname: string, response: any) => {
  throw response;
};
