import {
  HANDLE_ERROR,
  UPDATE_GEO_NAME,
  UPDATE_ADDRESS_NAME,
  UPDATE_LOCATION,
  SAVE_MAP_KEY,
  APP_CONTROLL_STATE,
  APPUPDATE,
  ISLOCATION,
  SAVE_BRANCH,
} from '../actions/actionTypes';

const initialState = {
  locationState: null,
  error: null,
  ip: null,
  geoCodedAddress: null,
  geocodelocation: null,
  mapKey: null,
  app_controll: null,
  app_update: false,
  isLocation: null,
  branch: null,
};

interface actionShape {
  type: string;
  payload: any;
}

const App = (state = initialState, action: actionShape): any => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        locationState: action.payload,
      };
    case SAVE_BRANCH:
      return {
        ...state,
        branch: action.payload,
      };
    case UPDATE_GEO_NAME:
      return {
        ...state,
        geoCodedAddress: action.payload || 'Unnamed Road',
      };
    case UPDATE_ADDRESS_NAME:
      return {
        ...state,
        geocodelocation: action.payload || 'Unnamed Place',
      };
    case SAVE_MAP_KEY:
      return {
        ...state,
        mapKey: action.payload,
      };
    case ISLOCATION:
      return {
        ...state,
        isLocation: action.payload,
      };

    case APP_CONTROLL_STATE:
      return {
        ...state,
        app_controll: action.payload,
      };
    case APPUPDATE:
      return {
        ...state,
        app_update: action.payload,
      };
    case HANDLE_ERROR:
      console.log(
        `Detected Anomaly while Dispatching Action ---> ${action.payload} `,
      );
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default App;
