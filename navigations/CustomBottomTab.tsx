import tailwind from '@tailwind';
import {
  AccoundIcon,
  BagColor,
  CalenderIconTab,
  DashboardIcon,
  SearchIcons,
  SubscriptionIcontab,
} from '../assets/icons';
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileIcon1 from '../assets/icons/SvgIcons/ProfileIcon1';

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

  // if (focusedOptions.tabBarVisible === false) {
  //     return null;
  // }
  if (showTab === false) {
    return null;
  }

  return (
    <View
      style={[
        tailwind('flex-row bg-white px-2'),
        {
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            route.name === 'Account'
              ? navigation.openDrawer()
              : navigation.navigate(route.name);
          }
        };

        const CartStateValue = CartState?.filter(
          item => item?.desigin_type !== 4,
        );

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={onPress}
            style={[tailwind(''), { width: '25%', justifyContent: 'center' }]}
          >
            <View
              style={[
                tailwind('items-center  justify-center py-2'),
                {
                  backgroundColor: isFocused ? '#80C659' : 'transparent',
                  // marginHorizontal: 2,
                  marginVertical: 6,
                  // borderRadius: 16,
                  borderTopLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
              ]}
            >
              {/* CART BADGE
              {index === 2 && CartStateValue?.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 18,
                    backgroundColor: 'red',
                    height: 18,
                    width: 18,
                    borderRadius: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                  >
                    {CartStateValue.length}
                  </Text>
                </View>
              )} */}

              {/* ICON */}
              {index === 0 ? (
                <DashboardIcon color={isFocused ? 'white' : '#666'} />
              ) : index === 1 ? (
                <SubscriptionIcontab color={isFocused ? 'white' : '#666'} />
              ) : index === 2 ? (
                <CalenderIconTab color={isFocused ? 'white' : '#666'} />
              ) : (
                <AccoundIcon color={isFocused ? 'white' : '#666'} />
              )}

              {/* LABEL (no layout jump) */}
              {isFocused && (
                <Text
                  style={{
                    paddingVertical: 2,
                    // marginTop: 2,
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: isFocused ? 'white' : '#666',
                    opacity: isFocused ? 1 : 0.7,
                  }}
                >
                  {label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
