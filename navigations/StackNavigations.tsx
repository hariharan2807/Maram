import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfileScreen from '../screens/UserProfileScreen';

//  Auth Screen
import DashboardScreen from '../screens/DashboardScreen';
import InitialScreen from '../screens/InitialScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import ViewAllScreen from '../screens/ViewAllScreen';
import SearchScreen from '../screens/SearchScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import { NewSubscription } from '../screens/NewSubscription';
import CalenderScreen from '../screens/CalenderScreeen';
import WalletScreeen from '../screens/Wallet';

const StackConfig = { headerShown: false };

const DashboardStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

export function Home(props: any) {
  return (
    <DashboardStack.Navigator screenOptions={StackConfig}>
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
      />
    </DashboardStack.Navigator>
  );
}
export function Subscriptions(props: any) {
  return (
    <SearchStack.Navigator screenOptions={StackConfig}>
      <SearchStack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
      {/* <SearchStack.Screen
        name="NewSubscription"
        component={NewSubscription}
      /> */}
    </SearchStack.Navigator>
  );
}
export function Auth(props: any) {
  return (
    <AccountStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={StackConfig}
    >
      <AccountStack.Screen name="LoginScreen" component={LoginScreen} />
    </AccountStack.Navigator>
  );
}
export function Account(props: any) {
  return (
    <AccountStack.Navigator
      initialRouteName="UserProfileScreen"
      screenOptions={StackConfig}
    >
      <AccountStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </AccountStack.Navigator>
  );
}
export function Calendar(props: any) {
  return (
    <AuthStack.Navigator
      initialRouteName="CalenderScreen"
      screenOptions={StackConfig}
    >
      <AuthStack.Screen name="CalenderScreen" component={CalenderScreen} />
    </AuthStack.Navigator>
  );
}

export function Wallet(props: any) {
  return (
    <AuthStack.Navigator
      initialRouteName="WalletScreeen"
      screenOptions={StackConfig}
    >
      <AuthStack.Screen name="WalletScreeen" component={WalletScreeen} />
    </AuthStack.Navigator>
  );
}