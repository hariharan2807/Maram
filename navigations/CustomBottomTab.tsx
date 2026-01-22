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
    <View style={tailwind('flex flex-row bg-white items-center  ')}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = async () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            try {
              if (route.name == 'Account') {
                navigation.openDrawer();
              } else {
                navigation.navigate(route.state.routeNames[0]);
              }
            } catch {
              navigation.navigate(route.name);
            }
          }
        };

        const CartStateValue = CartState?.filter(
          item => item?.desigin_type != 4,
        );

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, paddingVertical: 7 }}
          >
            <View
              style={[
                tailwind('flex   items-center justify-center  py-1.5'),
                {
                  backgroundColor: isFocused ? '#80C659' : 'transparent',
                  borderTopLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
              ]}
            >
              {/* {index === 2 && CartStateValue?.length > 0 && (
                <View
                  style={[
                    tailwind(
                      'absolute rounded-full items-center justify-center z-10',
                    ),
                    {
                      top: -5,
                      right: -5,
                      height: 18,
                      width: 18,
                      backgroundColor: 'red',
                    },
                  ]}
                >
                  <Text
                    style={[
                      tailwind('font-bold font-10 text-center'),
                      { color: 'white' },
                    ]}
                  >
                    {CartStateValue?.length}
                  </Text>
                </View>
              )} */}
              <View style={tailwind('')}>
                {index === 0 ? (
                  <DashboardIcon color={isFocused ? 'white' : '#666666'} />
                ) : index === 1 ? (
                  <SubscriptionIcontab
                    color={isFocused ? 'white' : '#666666'}
                  />
                ) : index === 2 ? (
                  <CalenderIconTab color={isFocused ? 'white' : '#666666'} />
                ) : (
                  <AccoundIcon color={isFocused ? 'white' : '#666666'} />
                )}
              </View>
              {isFocused && (
                <Text
                  style={[
                    tailwind('font-14  font-bold'),
                    {
                      color: isFocused ? 'white' : '#666666',
                    },
                  ]}
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
