import tailwind from '@tailwind';
import {
  AccoundIcon,
  CalenderIconTab,
  DashboardIcon,
  SubscriptionIcontab,
  CartIcon, // Add CartIcon import
} from '../assets/icons';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default function CustomBottomTab({
  state,
  descriptors,
  navigation,
}: any) {
  const [showTab, setShowTab] = useState(true);
  const CartState = useSelector(state => state.user.cart);

  useEffect(() => {
    let show = Keyboard.addListener('keyboardDidShow', () => {
      setShowTab(false);
    });
    let close = Keyboard.addListener('keyboardDidHide', () => {
      setShowTab(true);
    });
    return () => {
      show.remove();
      close.remove();
    };
  }, []);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (showTab === false) {
    return null;
  }

  // Get cart item count (excluding type 4)
  const cartItemCount =
    CartState?.filter(item => item?.desigin_type !== 4)?.length || 0;

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          // Check if this is the center tab (Cart)
          const isCenterTab = index === 2; // Cart is at index 2

          const onPress = async () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // if (route.name === 'Profile' || route.name === 'Login') {
              //   navigation.openDrawer();
              // } else {
              navigation.navigate(route.name);
              // }
            }
          };

          // For center cart tab
          if (isCenterTab) {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={onPress}
                style={styles.centerTabButton}
              >
                <View style={styles.cartCircle}>
                  <CartIcon color="#FFFFFF" size={24} />

                  {/* Cart Badge */}
                  {cartItemCount > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>
                        {cartItemCount > 9 ? '9+' : cartItemCount}
                      </Text>
                    </View>
                  )}
                </View>
                {/* <Text style={[
                  styles.centerTabLabel,
                  isFocused ? styles.centerTabLabelActive : styles.centerTabLabelInactive
                ]}>
                  {label}
                </Text> */}
              </TouchableOpacity>
            );
          }

          // For regular tabs (non-center)
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={onPress}
              style={styles.tabButton}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.activeIconContainer,
                ]}
              >
                {getTabIcon(index, isFocused)}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Helper function to get icons for regular tabs
const getTabIcon = (index: number, isFocused: boolean) => {
  const color = isFocused ? '#80C659' : '#666666';

  switch (index) {
    case 0:
      return <DashboardIcon color={color} />;
    case 1:
      return <SubscriptionIcontab color={color} />;
    case 3:
      return <CalenderIconTab color={color} />;
    case 4:
      return <AccoundIcon color={color} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 3,
    paddingBottom: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // paddingVertical: 4,
  },
  centerTabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // paddingVertical: 4,
    // marginTop:-60,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(128, 198, 89, 0.1)',
    borderRadius: 12,
    width: 40,
    height: 40,
  },
  cartCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#80C659',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#80C659',
  },
  tabLabelInactive: {
    color: '#666666',
  },
  centerTabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  centerTabLabelActive: {
    color: '#80C659',
  },
  centerTabLabelInactive: {
    color: '#666666',
  },
});
