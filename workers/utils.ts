import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import Geolocation from 'react-native-geolocation-service';

const log = console.log;
export const acquireGPSPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return {
          status: true,
        };
      } else {
        throw 'Android Permission Rejected';
      }
    } else {
      const hasLocationPermission = await Geolocation.requestAuthorization(
        'always',
      );
      if (hasLocationPermission === 'granted') {
        return {
          status: true,
        };
      } else {
        throw 'IOS Permission Rejected';
      }
    }
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: typeof err === 'string' || 'failed to get GPS Location',
    };
  }
};
export const isBranchOpen = (branchData) => {
  if (!branchData || !branchData.branch_intime || !branchData.branch_outtime) {
    return false; // Invalid data
  }

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Convert current time to minutes since midnight
  const currentTimeInMinutes = (currentHours * 60) + currentMinutes;
  
  // Parse branch opening time
  const [openHour, openMinute] = branchData.branch_intime.split(':').map(Number);
  const openingTimeInMinutes = (openHour * 60) + openMinute;
  
  // Parse branch closing time
  const [closeHour, closeMinute] = branchData.branch_outtime.split(':').map(Number);
  const closingTimeInMinutes = (closeHour * 60) + closeMinute;
  
  // Handle overnight hours (if close time is earlier than open time, e.g., 22:00 to 02:00)
  if (closingTimeInMinutes <= openingTimeInMinutes) {
    // Closing time is next day
    return currentTimeInMinutes >= openingTimeInMinutes || 
           currentTimeInMinutes <= closingTimeInMinutes;
  }
  
  // Normal hours (same day)
  return currentTimeInMinutes >= openingTimeInMinutes && 
         currentTimeInMinutes <= closingTimeInMinutes;
};
export const getLocationCoords = async () => {
  return new Promise(async (resolve, reject) => {
    Geolocation.getCurrentPosition(
      async success => {
        // console.log('Coords', success);
        let obj = {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
        };
        resolve(obj);
      },
      async err => {
        reject('Failed to get Location');
      },
      {enableHighAccuracy: true, maximumAge: 7000},
    );
  });
};
export const getStoragePermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const requestResponse = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ).then(result => {
        return result;
      });
      // console.log('result-------------->', requestResponse);
      if (requestResponse) {
        if (requestResponse == 'limited' || requestResponse == 'granted') {
          return {
            status: true,
          };
        } else {
          return {
            status: false,
          };
        }
      }
    } else {
      const requestResponse = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ).then(result => {
        return result;
      });
      // console.log('result ', requestResponse);
      if (requestResponse) {
        if (
          requestResponse == 'limited' ||
          requestResponse == 'granted' ||
          requestResponse == 'unavailable'
        ) {
          return {
            status: true,
          };
        } else {
          return {
            status: false,
          };
        }
      }
    }
  } catch (err) {
    console.log('err', err);
    return {
      status: false,
    };
  }
};

export const resetToBottomTabNavigation = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'DrawerNavigation',
        },
      ],
    }),
  );
};

export const resetToLocationBaseCity = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'LocationBaseCity',
        },
      ],
    }),
  );
};
export const resetToProfileScreenNavigation = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'ProfileEditScreen',
        },
      ],
    }),
  );
};

export const resetToAddressSelection = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'AddressSelectionScreen',
        },
      ],
    }),
  );
};

export const resetToOnBoardScreen = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'OnBoardingScreen',
        },
      ],
    }),
  );
};
export const resetNewLoginScreen = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'NewLogin',
        },
      ],
    }),
  );
};
export const resetLocationBaseCity = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'LocationBaseCity',
        },
      ],
    }),
  );
};
export const resetToLoginNavigation = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'LoginScreen',
        },
      ],
    }),
  );
};
export const resetToNoInternet = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'NOInternetScreen',
        },
      ],
    }),
  );
};

export const resetToInitialScreen = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'InitialScreen',
        },
      ],
    }),
  );
};
export const resetToCartScreen = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Cart',
        },
      ],
    }),
  );
};

export const resetToIntialTask = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'initialTask',
        },
      ],
    }),
  );
};

export const resetToLocationPermissionScreen = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'LocationPermissionScreen',
        },
      ],
    }),
  );
};

export const resetToOrderStatusNavigation = async (
  CommonActions: any,
  navigation: any,
  order_id: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'DrawerNavigation',
        },
        {
          // name: 'OrderStatusScreen',
          name: 'OrderList',
          params: { order_id: order_id },
        },
      ],
    }),
  );
};

export const resetToOrderTrackingScreensNavigation = async (
  CommonActions: any,
  navigation: any,
  order_id: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'DrawerNavigation',
        },
        {
          // name: 'OrderStatusScreen',
          name: 'OrderStatusScreen',
          params: { order_id: order_id },
        },
      ],
    }),
  );
};
export const resetToPickupOrderStatusNavigation = async (
  CommonActions: any,
  navigation: any,
  order_id: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'BottomTabNavigation',
        },
        {
          name: 'PickupOrderStatusScreen',
          params: { order_id: order_id },
        },
      ],
    }),
  );
};

export const resetToPreOrderStatusNavigation = async (
  CommonActions: any,
  navigation: any,
  order_id: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'BottomTabNavigation',
        },
        {
          name: 'PreOrderStatusScreen',
          params: { order_id: order_id },
        },
      ],
    }),
  );
};
export const resetToBatchOrderStatusNavigation = async (
  CommonActions: any,
  navigation: any,
  order_id: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'BottomTabNavigation',
        },
        {
          name: 'BatchOrderStatusScreen',
          params: { order_string: order_id },
        },
      ],
    }),
  );
};

export const resetToProfileEditNavigation = async (
  CommonActions: any,
  navigation: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'ProfileEditScreen',
        },
      ],
    }),
  );
};

export function cartItemUniqueIdGen(
  shop_id: any,
  product_id: any,
  selected_var: any,
  selected_addons: any,
) {
  try {
    let uniqueId = `${shop_id}*${product_id}-${selected_var.product_variation_id}+`;
    if (selected_addons.length > 0) {
      let ids = [];
      for (let i of selected_addons) {
        ids.push(`${i.addon_id}`);
      }
      uniqueId = `${uniqueId}${ids.join('+')}`;
    }
    return uniqueId;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export function cartItemUniqueIdwithoutCust(
  shop_id: any,
  product_id: any,
  selected_var: any,
) {
  try {
    let uniqueId = `${shop_id}*${product_id}-${selected_var.product_variation_id}+`;
    return uniqueId;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const infoBox = (message: string) => {
  Toast.show({
    type: 'successMsg',
    text1: message,
    topOffset: 150,
    bottomOffset: 110,
    position: 'bottom',
    visibilityTime: 3000,
    props: {
      text1NumberOfLines: 3,
    },
  });
  // Snackbar.show({
  //   text: message,
  //   duration: Snackbar.LENGTH_LONG,
  //   backgroundColor: '#219653',
  //   action: {
  //     text: 'OK',
  //     textColor: 'white',
  //     onPress: () => {},
  //   },
  // });
};

export const errorBox = (message: string) => {
  Toast.show({
    type: 'errorMsg',
    text1: `${message}`,
    topOffset: 150,
    bottomOffset: 110,
    position: 'bottom',
    visibilityTime: 3000,
    props: {
      text1NumberOfLines: 3,
    },
  });
  // Snackbar.show({
  //   text: message,
  //   duration: Snackbar.LENGTH_LONG,
  //   backgroundColor: 'red',
  //   action: {
  //     text: 'OK',
  //     textColor: 'white',
  //     onPress: () => {},
  //   },
  // });
};

export const isValidImageURL = (url: any) => {
  if (url) {
    return url;
  } else {
    return url;
    return 'https://i.pinimg.com/originals/e5/15/96/e51596c8a9b8d02d12ed65855ade9196.jpg';
  }
  // if (url.match(/^https[^\?]*.(jpg|jpeg|png)(\?(.*))?$/gmi) != null) {
  //     return url
  // } else {
  //     return "https://i.pinimg.com/564x/44/7d/d8/447dd8875094c18795c11d1414d3e931.jpg"
  // }
  return url;
};

export const parseValidNumber = (input: any) => {
  if (typeof input === 'number') {
    let test = input + 1;
    if (test > 0) {
      return input;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
