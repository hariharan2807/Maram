// import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CustomBottomTab from '../sharedComponents/atoms/CustomBottomTab';

import { Account, Auth, Cart, Dashboard, Search } from './StackNavigations';
import {
  ViewBase,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import tailwind from '@tailwind';
import React, { useEffect, useRef } from 'react';
import assets_manifest from '@assets';
import CustomBottomTab from './CustomBottomTab';
import { useSelector } from 'react-redux';

const BottomTab = createBottomTabNavigator();

const config = { headerShown: false };

export default function BottomTabNavigation(props: any) {
  const ID = useSelector((state: any) => state.user.user_id);
  return (
    <BottomTab.Navigator
      screenOptions={config}
      tabBar={props => <CustomBottomTab {...props} />}
    >
      <BottomTab.Screen name="Home" component={Dashboard} />
      <BottomTab.Screen name="Search" component={Search} />

      <BottomTab.Screen name="Cart" component={Cart} />
      {ID ? (
        <BottomTab.Screen name="Account" component={Account} />
      ) : (
        <BottomTab.Screen name="Login" component={Auth} />
      )}
    </BottomTab.Navigator>
  );
}
