import tailwind from '@tailwind';
import { BagColor, DashboardIcon, SearchIcons } from '../assets/icons';
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
    <View style={tailwind('flex flex-row bg-primary items-center')}>
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
          // if (route?.name == 'Home') {
          //   await analytics().logEvent('click_homemenu');
          // }
          // if (route?.name == 'Search') {
          //   await analytics().logEvent('click_searchmenu');
          // }
          // if (route?.name == 'Cart') {
          //   await analytics().logEvent('click_cartmenu');
          // }
          // if (route?.name == 'Account') {
          //   await analytics().logEvent('click_accountmenu');
          // }
          // console.log(route);
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
        console.log('CartStateCartState', CartState);
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
            <View style={tailwind('flex items-center my-1')}>
              {index === 2 && CartStateValue?.length > 0 ? (
                <View
                  style={[
                    tailwind(
                      'flex absolute  rounded-full items-center justify-center  items-center flex-row',
                    ),
                    {
                      right: 27,
                      bottom: 20,
                      zIndex: 999,
                      height: 16,
                      width: 16,
                      backgroundColor: 'red',
                    },
                  ]}
                >
                  <Text
                    style={[
                      tailwind('font-bold font-10  text-center'),
                      { color: 'white' },
                    ]}
                  >
                    {CartState?.length}
                  </Text>
                </View>
              ) : null}

              {index === 0 ? (
                // isFocused ? (
                <DashboardIcon color={isFocused ? '#FFCC01' : 'white'} />
              ) : // ) : (
              //   <Home />
              // )
              index === 1 ? (
                <SearchIcons color={isFocused ? '#FFCC01' : 'white'} />
              ) : index === 2 ? (
                <BagColor color={isFocused ? '#FFCC01' : 'white'} />
              ) : (
                <ProfileIcon1 color={isFocused ? '#FFCC01' : 'white'} />
              )}

              <Text
                style={[
                  tailwind(`text-white font-12   ${'font-bold'}`),
                  { color: `${isFocused ? '#FFCC01' : 'white'}` },
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
