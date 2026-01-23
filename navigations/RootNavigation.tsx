import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Host } from 'react-native-portalize';

import InitialScreen from '../screens/InitialScreen';
import BottomTabNavigation from './BottomTabNavigation';
import OrderListScreen from '../screens/OrderListScreen';
import SingleOrderScreen from '../screens/SingleOrderScreen';
import SearchScreen from '../screens/SearchScreen';
import BluePrintScreenlineChat from '../screens/BluePrintScreen';
import OrderSuccessFailScreen from '../screens/OrderSuccessFailScreen';
import ErrorBoundary from '../workers/ErrorBoundary';
import NotificationScreen from '../screens/NotificationScreen';
import WebViewScreen from '../screens/WebViewScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ViewAllScreen from '../screens/ViewAllScreen';
import AddressListScreen from '../screens/AddressListScreen';
import AddAddressScreen from '../screens/AddaddressScreen';
import OrderHistoryScreeen from '../screens/OrderHistoryScreeen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { NewSubscription, Subscription } from '../screens/NewSubscription';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import CartScreen from '../screens/CartScreen';
import { BillDetailScreen, BillViewDetails } from '../screens/BillDetailScreen';
import { FailureScreen, SuccessScreen } from '../screens/SuccessScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SubscritionSuccess from '../screens/SubscritionSuccess';
import CalendarScreen from '../screens/CalenderScreeen/CalenderScreeen';
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
            <RootNavigator.Screen component={CartScreen} name="Cart" />
            <RootNavigator.Screen
              component={BillDetailScreen}
              name="BillDetailScreen"
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
              component={BillViewDetails}
              name="BillViewDetails"
            />

            <RootNavigator.Screen
              component={OrderHistoryScreeen}
              name="OrderHistoryScreeen"
            />

            <RootNavigator.Screen
              component={CheckoutScreen}
              name="CheckoutScreen"
            />
            <RootNavigator.Screen
              component={NewSubscription}
              name="NewSubscription"
            />
            <RootNavigator.Screen
              component={Subscription}
              name="Subscription"
            />
            <RootNavigator.Screen
              component={FailureScreen}
              name="FailureScreen"
              // options={{
              //   headerShown: false,
              //   gestureEnabled: false,
              // }}
            />
            <RootNavigator.Screen
              component={SuccessScreen}
              name="SuccessScreen"
              // options={{
              //   headerShown: false,
              //   gestureEnabled: false,
              // }}
            />
            <RootNavigator.Screen
              component={CategoryScreen}
              name="CategoryScreen"
            />

            <RootNavigator.Screen
              component={DashboardScreen}
              name="DashboardScreen"
            />
            <RootNavigator.Screen
              component={SubscritionSuccess}
              name="SubscritionSuccess"
            />

        <RootNavigator.Screen
              component={CalendarScreen}
              name="CalendarScreen"
            />

          </RootNavigator.Navigator>
        </Host>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
