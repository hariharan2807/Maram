import {
  UPDATE_LOCATION,
  UPDATE_GEO_NAME,
  UPDATE_ADDRESS_NAME,
  SAVE_MAP_KEY,
  APP_CONTROLL_STATE,
  APPUPDATE,
  ISLOCATION,
  SAVE_BRANCH,
} from './actionTypes';
import { useQueryClient } from 'react-query';

export const saveLocationAction = (payload: any) => ({
  type: UPDATE_LOCATION,
  payload,
});
export const saveBranchction = (payload: any) => ({
  type: SAVE_BRANCH,
  payload,
});

export const saveMapkeyAction = (payload: any) => ({
  type: SAVE_MAP_KEY,
  payload,
});

export const saveGeoNameAction = (payload: any) => ({
  type: UPDATE_GEO_NAME,
  payload,
});

export const saveGeoAddressName = (payload: any) => ({
  type: UPDATE_ADDRESS_NAME,
  payload,
});

export const saveAppcontrollAction = (payload: any) => ({
  type: APP_CONTROLL_STATE,
  payload,
});

export const updateAppUpdate = (payload: any) => ({
  type: APPUPDATE,
  payload,
});
export const updateLocation = (payload: any) => ({
  type: ISLOCATION,
  payload,
});
