import React from 'react';
import { useSelector } from 'react-redux';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import tailwind from '@tailwind';

// Import your custom icons
import {
  DashboardIcon,
  SubscriptionIcontab,
  CalenderIconTab,
  AccoundIcon,
  CartIcon,
  BillHistoryIcon,
  WalletIcon,
} from '../assets/icons';
import {
  Account,
  Auth,
  Calendar,
  Home,
  Subscriptions,
  Wallet,
} from './StackNavigations';
import CalendarScreen from '../screens/CalenderScreeen/CalenderScreeen';

// Import your screens

export default function BottomTabNavigation(props: any) {
  const ID = useSelector((state: any) => state.user.user_id);
  const CartState = useSelector((state: any) => state.user.cart);

  // Function to get custom icon based on route name
  const getCustomIcon = (routeName: string, isSelected: boolean) => {
    const color = isSelected ? '#10B981' : '#9CA3AF';
    const size = 24;

    switch (routeName) {
      case 'Home':
        return <DashboardIcon color={color} size={size} />;
      case 'Subscriptions':
        return <SubscriptionIcontab color={color} size={size} />;
      case 'Wallet':
        return <WalletIcon color={color} size={size} />;
      case 'Profile':
      case 'Login':
        return <AccoundIcon color={color} size={size} />;
      default:
        return null;
    }
  };

  return (
    <CurvedBottomBar.Navigator
      screenOptions={{ headerShown: false }}
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={50}
      circleWidth={50}
      bgColor="white"
      initialRouteName="Home"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigate('Calendar')} // This should work now
          activeOpacity={0.9}
        >
          <CalenderIconTab color={'#FFFFFF'} size={28} />
        </TouchableOpacity>
      )}
      tabBar={({ routeName, selectedTab, navigate }) => {
        // Don't render tab bar for Calendar since it's in the center
        if (routeName === 'Calendar') return null;

        const isSelected = selectedTab === routeName;

        return (
          <TouchableOpacity
            onPress={() => navigate(routeName)}
            style={[styles.tabBarItem, isSelected && styles.activeTab]}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.iconContainer,
                isSelected && styles.activeIconContainer,
              ]}
            >
              {getCustomIcon(routeName, isSelected)}
            </View>
            <Text
              style={[
                tailwind('font-bold'),
                styles.tabBarText,
                {
                  color: isSelected ? '#10B981' : '#9CA3AF',
                  fontWeight: Platform?.OS === 'android' ? 'normal' : '500',
                },
              ]}
            >
              {routeName}
            </Text>
          </TouchableOpacity>
        );
      }}
    >
      {/* Left Side Tabs */}
      <CurvedBottomBar.Screen name="Home" position="LEFT" component={Home} />
      <CurvedBottomBar.Screen
        name="Subscriptions"
        position="LEFT"
        component={Subscriptions}
      />

      <CurvedBottomBar.Screen
        name="Calendar"
        component={CalendarScreen} // Make sure you import this
      />

      {/* Right Side Tabs */}
      <CurvedBottomBar.Screen
        name="Wallet"
        position="RIGHT"
        component={Wallet}
      />

      {/* Conditional Profile/Login */}
      {ID ? (
        <CurvedBottomBar.Screen
          name="Profile"
          position="RIGHT"
          component={Account}
        />
      ) : (
        <CurvedBottomBar.Screen
          name="Login"
          position="RIGHT"
          component={Auth}
        />
      )}
    </CurvedBottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    marginTop: -30,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 4,
  },
  activeTab: {
    backgroundColor: 'rgba(128, 198, 89, 0.1)',
    borderRadius: 10,
  },
  activeIconContainer: {
    // backgroundColor: 'rgba(128, 198, 89, 0.1)',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
  },
  tabBarText: {
    fontSize: 12,
    // marginTop: 2,
  },
});
