import AsyncStorage from '@react-native-async-storage/async-storage';
import SInfo from 'react-native-sensitive-info';

interface persistedUser {
  user_id: string;
}

export const savePersistedUser = async (payload: persistedUser) => {
  try {
    const response = await AsyncStorage.setItem(
      '@user',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};

export const getPersistedUser = async (): persistedUser => {
  try {
    const response = await AsyncStorage.getItem('@user');
    return JSON.parse(response);
  } catch {
    return false;
  }
};
export const removePersistedUser = async () => {
  try {
    const response = await AsyncStorage.removeItem('@user');
    return true;
  } catch {
    return false;
  }
};

export const savePersistedLogin = async (payload: perisitedLogedin) => {
  try {
    const response = await AsyncStorage.setItem(
      '@login',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};

export const getPersistedLogin = async () => {
  try {
    const response = await AsyncStorage.getItem('@login');
    return JSON.parse(response);
  } catch {
    return false;
  }
};

export const removePersistedLogin = async () => {
  try {
    const response = await AsyncStorage.removeItem('@login');
    return true;
  } catch {
    return false;
  }
};

export const saveCheckBoxLogin = async (payload: any) => {
  try {
    const response = await AsyncStorage.setItem(
      '@check',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};

export const getCheckBoxLogin = async () => {
  try {
    const response = await AsyncStorage.getItem('@check');
    return JSON.parse(response);
  } catch {
    return false;
  }
};

export const removeCheckBoxdLogin = async () => {
  try {
    const response = await AsyncStorage.removeItem('@check');
    return true;
  } catch {
    return false;
  }
};
export const saveAddressid = async (payload: any) => {
  try {
    const response = await AsyncStorage.setItem(
      '@AddressId',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};
export const getAddressid = async () => {
  try {
    const response = await AsyncStorage.getItem('@AddressId');
    // console.log('GETADDERESS ',response)
    return JSON.parse(response);
  } catch {
    //console.log('false woeking')
    return false;
  }
};
export const saveSelectedCopany = async (payload: any) => {
  try {
    // Convert the payload (object) to a JSON string and store it in AsyncStorage
    await AsyncStorage.setItem('@selectedCopany', JSON.stringify(payload));
    return true; // Return true if saving was successful
  } catch (error) {
    console.error('Failed to save address:', error); // Log the error for debugging
    return false; // Return false if saving failed
  }
};
export const getSelectedCopany = async () => {
  try {
    const response = await AsyncStorage.getItem('@selectedCopany');
    // console.log('GETADDERESS ',response)
    return JSON.parse(response);
  } catch {
    //console.log('false woeking')
    return false;
  }
};
export const removeSelectedCopany = async () => {
  try {
    const response = await AsyncStorage.removeItem('@selectedCopany');
    return true;
  } catch {
    return false;
  }
};
export const saveListCopany = async (payload: any) => {
  try {
    // Convert the payload (object) to a JSON string and store it in AsyncStorage
    await AsyncStorage.setItem('@saveListCopany', JSON.stringify(payload));
    return true; // Return true if saving was successful
  } catch (error) {
    console.error('Failed to save address:', error); // Log the error for debugging
    return false; // Return false if saving failed
  }
};
export const getListCopany = async () => {
  try {
    const response = await AsyncStorage.getItem('@saveListCopany');
    // console.log('GETADDERESS ',response)
    return JSON.parse(response);
  } catch {
    //console.log('false woeking')
    return false;
  }
};
export const removeListCompany = async () => {
  try {
    const response = await AsyncStorage.removeItem('@saveListCopany');
    return true;
  } catch {
    return false;
  }
};
export const removeAddressid = async () => {
  try {
    const response = await AsyncStorage.removeItem('@AddressId');
    return true;
  } catch {
    return false;
  }
};
export const saveNavUser = async (payload: any) => {
  try {
    const response = await AsyncStorage.setItem(
      '@NavUser',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};
export const getNavUser = async () => {
  try {
    const response = await AsyncStorage.getItem('@NavUser');
    // console.log('GETADDERESS ',response)
    return JSON.parse(response);
  } catch {
    //console.log('false woeking')
    return false;
  }
};
export const removeNavUser = async () => {
  try {
    const response = await AsyncStorage.removeItem('@NavUser');
    return true;
  } catch {
    return false;
  }
};
export const saveOrdertype = async (payload: any) => {
  try {
    const response = await AsyncStorage.setItem(
      '@Ordertype',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};
export const getOrdertype = async () => {
  try {
    const response = await AsyncStorage.getItem('@Ordertype');
    // console.log('GETADDERESS ',response)
    return JSON.parse(response);
  } catch {
    //console.log('false woeking')
    return false;
  }
};
export const removeOrdertype = async () => {
  try {
    const response = await AsyncStorage.removeItem('@Ordertype');
    return true;
  } catch {
    return false;
  }
};
export const saveRecentSearch = async (payload: any) => {
  try {
    const response = await AsyncStorage.setItem(
      '@recent',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};

export const getRecentSearch = async (): [] => {
  try {
    const response = await AsyncStorage.getItem('@recent');
    let raw_data = JSON.parse(response);
    if (raw_data?.length && raw_data?.length > 0) {
      return raw_data;
    } else {
      throw 'err';
    }
  } catch {
    return [];
  }
};

//For receive notificaion

export const saveFCMToken = async (payload: any) => {
  const response = await AsyncStorage.setItem('fcmtoken', payload);
  return true;
};

export const getFCMToken = async () => {
  const response = await AsyncStorage.getItem('fcmtoken');
  return response;
};

export const removeFCMToken = async () => {
  const response = await AsyncStorage.removeItem('fcmtoken');
  return true;
};

export const saveSplashGif = async (payload: any) => {
  try {
    const response = await AsyncStorage.setItem(
      '@splash',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};

export const getSplashGif = async (): [] => {
  try {
    const response = await AsyncStorage.getItem('@splash');
    let raw_data = JSON.parse(response);
    if (raw_data?.length && raw_data?.length > 0) {
      return raw_data;
    } else {
      throw 'err';
    }
  } catch {
    return [];
  }
};

//JWT Token
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (err) {
    console.log('saveTokenErr -->', err);
    return false;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch {
    return false;
  }
};

export const removeToken = async () => {
  try {
    const response = await AsyncStorage.removeItem('token');
    return true;
  } catch {
    return false;
  }
};

export const saveCompanyId = async (id: string) => {
  try {
    await AsyncStorage.setItem('companyId', id);
  } catch (err) {
    console.log('saveTokenErr -->', err);

    return false;
  }
};

export const getCompanyId = async () => {
  try {
    const id = await AsyncStorage.getItem('companyId');
    return id;
  } catch {
    return false;
  }
};

export const removeCompanyId = async () => {
  try {
    const id = await AsyncStorage.removeItem('companyId');
    return id;
  } catch {
    return false;
  }
};
export const saveDeliveryCharge = async (charge: string) => {
  try {
    // Convert charge to a string to ensure compatibility with AsyncStorage
    const chargeString = String(charge);

    // Save the charge in AsyncStorage
    await AsyncStorage.setItem('charge', chargeString);
    console.log('Local------>2122', await getDeliveryCharge());

    console.log('Charge successfully saved!');
    return true; // Indicate success
  } catch (err) {
    console.log('saveTokenErr -->', err);

    return false; // Indicate failure
  }
};

export const getDeliveryCharge = async () => {
  try {
    const id = await AsyncStorage.getItem('charge');
    console.log('local---id', id);
    return id;
  } catch {
    return false;
  }
};

export const removeDeliveryCharge = async () => {
  try {
    const id = await AsyncStorage.removeItem('charge');
    return id;
  } catch {
    return false;
  }
};
export const saveNotification = async (payload: any) => {
  try {
    const response = await AsyncStorage.setItem(
      '@notify',
      JSON.stringify(payload),
    );
    return true;
  } catch {
    return false;
  }
};

export const getNotification = async (): [] => {
  try {
    const response = await AsyncStorage.getItem('@notify');
    let raw_data = JSON.parse(response);
    if (raw_data?.length && raw_data?.length > 0) {
      return raw_data;
    } else {
      throw 'err';
    }
  } catch {
    return [];
  }
};

export const removeNotification = async () => {
  try {
    const response = await AsyncStorage.removeItem('@notify');
    return true;
  } catch {
    return false;
  }
};




export const saveUser_id = async (payload: string) => {
  try {
    await AsyncStorage.setItem('user_id', payload);
  } catch (err) {
    // console.log('saveTokenErr -->', err);
    return false;
  }
};

export const getUser_id = async () => {
  try {
    const response = await AsyncStorage.getItem('user_id');
    return response
  } catch {
    return false;
  }
};

export const removeUser_id = async () => {
  try {
    const response = await AsyncStorage.removeItem('user_id');
    return true;
  } catch {
    return false;
  }
};