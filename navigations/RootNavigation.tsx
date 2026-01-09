import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Host } from 'react-native-portalize';

import InitialScreen from '../screens/InitialScreen';
import BottomTabNavigation from './BottomTabNavigation';
import PasswordScreen from '../screens/PasswordScreen';
import MisMatchScreen from '../screens/MisMatchScreen';
import OrderListScreen from '../screens/OrderListScreen';
import SingleOrderScreen from '../screens/SingleOrderScreen';
import SearchScreen from '../screens/SearchScreen';
import BluePrintScreen from '../screens/BluePrintScreen1';
import BluePrintScreenlineChat from '../screens/BluePrintScreen';
import { Alert, BackHandler } from 'react-native';
import OrderSuccessFailScreen from '../screens/OrderSuccessFailScreen';
import ErrorBoundary from '../workers/ErrorBoundary';
import NotificationScreen from '../screens/NotificationScreen';
import WebViewScreen from '../screens/WebViewScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ViewAllScreen from '../screens/ViewAllScreen';
import CategoryScreen from '../screens/CategoryScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import AddressListScreen from '../screens/AddressListScreen';
import AddAddressScreen from '../screens/AddaddressScreen';
import CouponScreen from '../screens/CouponScreen';
import OrderHistoryScreeen from '../screens/OrderHistoryScreeen';
import CheckoutScreen from '../screens/CheckoutScreen';
const RootNavigator = createNativeStackNavigator();

const StackConfig = { headerShown: false };
// const rnBiometrics = new ReactNativeBiometrics();

export default function RootNavigation() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Host>
          <RootNavigator.Navigator
            initialRouteName="InitialScreen"
            screenOptions={StackConfig}
          >
            <RootNavigator.Screen
              component={InitialScreen}
              name="InitialScreen"
            />

            <RootNavigator.Screen
              component={BottomTabNavigation}
              name="BottomTabNavigation"
            />
            <RootNavigator.Screen component={LoginScreen} name="LoginScreen" />

            <RootNavigator.Screen component={OtpScreen} name="OtpScreen" />
            <RootNavigator.Screen
              component={EditProfileScreen}
              name="EditProfileScreen"
            />
            <RootNavigator.Screen
              component={OrderListScreen}
              name="OrderListScreen"
            />
            <RootNavigator.Screen
              component={SingleOrderScreen}
              name="SingleOrderScreen"
            />
            <RootNavigator.Screen
              component={BluePrintScreenlineChat}
              name="BluePrintScreenlineChat"
            />
            <RootNavigator.Screen
              component={OrderSuccessFailScreen}
              name="OrderSuccessFailScreen"
            />
            <RootNavigator.Screen
              component={NotificationScreen}
              name="NotificationScreen"
            />
            <RootNavigator.Screen
              component={SearchScreen}
              name="SearchScreen"
            />
            <RootNavigator.Screen
              component={WebViewScreen}
              name="WebViewScreen"
            />
            <RootNavigator.Screen
              component={ViewAllScreen}
              name="ViewAllScreen"
            />
            <RootNavigator.Screen
              component={CategoryScreen}
              name="CategoryScreen"
            />
            <RootNavigator.Screen
              component={FavoriteScreen}
              name="FavoriteScreen"
            />
            <RootNavigator.Screen
              component={AddressListScreen}
              name="AddressListScreen"
            />

            <RootNavigator.Screen
              component={AddAddressScreen}
              name="AddAddressScreen"
            />
            <RootNavigator.Screen
              component={CouponScreen}
              name="CouponScreen"
            />

            <RootNavigator.Screen
              component={OrderHistoryScreeen}
              name="OrderHistoryScreeen"
            />


<RootNavigator.Screen
              component={CheckoutScreen}
              name="CheckoutScreen"
            />

          </RootNavigator.Navigator>
        </Host>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
