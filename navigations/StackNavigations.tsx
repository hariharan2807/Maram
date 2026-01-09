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

const StackConfig = { headerShown: false };

const DashboardStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

export function Dashboard(props: any) {
  return (
    <DashboardStack.Navigator screenOptions={StackConfig} >
      <DashboardStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
      />
    </DashboardStack.Navigator>
  );
}
export function Search(props: any) {
  return (
    <SearchStack.Navigator screenOptions={StackConfig}>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      
    </SearchStack.Navigator>
  );
}
export function Auth(props: any) {
  return (
    <AccountStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={StackConfig}
    >
      <AccountStack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
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
export function Cart(props: any) {
  return (
    <AuthStack.Navigator
      initialRouteName="CartScreen"
      screenOptions={StackConfig}
    >
      <AuthStack.Screen name="CartScreen" component={CartScreen} />
    </AuthStack.Navigator>
  );
}
