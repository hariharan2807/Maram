/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import RootNavigation from './navigations/RootNavigation';
import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { SafeAreaView as RNSafeAreaView } from 'react-native';

import { QueryClient, QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './constants/toastConfig';
import { ThemeProvider } from './screens/context/ThemeContext';
import ReactNativeBiometrics from 'react-native-biometrics';
import { NavigationContainer } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import NetInfo from '@react-native-community/netinfo';
import { CloudIcon, SettingIcon, TryagainIcon } from './assets/icons';
import tailwind from '@tailwind';

function App() {
  const queryClient = new QueryClient();
  const [loading, setLoading] = useState(true);
  const navigationRef = useRef(null);
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setOffline(false);
      } else {
        setOffline(true);
      }
    });
  }, [NetInfo]);
  const appRestart = async () => {
    RNRestart.Restart();
  };
  const openSettings = async () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };
  const barStyle = Platform.OS === 'android' ? 'dark-content' : 'dark-content';

  return (
    <>
      {/* // <SafeAreaView style={[tailwind('flex-1')]} ref={navigationRef}> */}
      <Provider store={store}>
        {offline ? (
          <View style={tailwind('bg-white h-full flex-col justify-between ')}>
            <View style={[tailwind('flex-row justify-end items-center p-3')]}>
              <Text style={[tailwind('font-bold text-right font-17 mt-12')]}>
                Network error
              </Text>
            </View>
            <View style={[tailwind('items-center')]}>
              <Image
                style={[tailwind(''), { height: 300, width: 300 }]}
                source={require('./assets/images/No_Internet.png')}
              />
              {/* <CloudIcon />
              <Text
                style={[
                  tailwind('font-fold text-primary font-20 text-center mt-2'),
                ]}
              >
                No Internet
              </Text> */}
            </View>
            <View style={[tailwind('py-4')]}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={appRestart}
                style={[
                  tailwind(
                    'bg-green m-3 p-3 rounded-xl flex-row justify-center items-center',
                  ),
                ]}
              >
                <TryagainIcon />
                <Text
                  style={[
                    tailwind(
                      'font-bold text-white text-center px-3 uppercase font-15',
                    ),
                  ]}
                >
                  Try Again
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={openSettings}
                style={[
                  tailwind(
                    'bg-black m-3 p-3 rounded-xl flex-row items-center justify-center',
                  ),
                ]}
              >
                <SettingIcon />
                <Text
                  style={[
                    tailwind(
                      'font-bold text-white text-center px-3 uppercase font-15',
                    ),
                  ]}
                >
                  Open Settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  {/* ✅ Use a single SafeAreaView for all platforms */}
                  <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar barStyle={barStyle} backgroundColor="white" />
                    <RootNavigation />
                  </SafeAreaView>
                </GestureHandlerRootView>
              </SafeAreaProvider>
              <Toast config={toastConfig} />
            </QueryClientProvider>
            {/* <Toast config={toastConfig} /> */}
          </>
        )}
      </Provider>
      {/* </SafeAreaView> */}
    </>
  );
}
export default App;
