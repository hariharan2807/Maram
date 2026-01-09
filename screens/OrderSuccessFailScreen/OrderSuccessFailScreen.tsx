import {
  BackHandler,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import tailwind from '@tailwind';
import { Topbar } from '@Component';
import LottieView from 'lottie-react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function OrderSuccessFailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    const onBackPress = () => {
      console.log('Back button pressed');
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabNavigation' }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View
      style={tailwind(
        'bg-white h-full flex flex-col justify-center items-center',
      )}
    >
      {route?.params?.status ? (
        <>
          <View style={[tailwind('flex flex-row justify-center items-center')]}>
            <LottieView
              source={require('../../assets/gif/LaundryBasket.json')}
              autoPlay
              loop
              resizeMode="contain"
              style={[tailwind(''), { height: 200, width: 200 }]}
            />

            {/* <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={require('../../assets/gif/Success.gif')}
              style={[tailwind(''), { height: 200, width: 200 }]}
            /> */}
          </View>
          <Text
            style={[
              tailwind(
                'font-bold text-center text-gray pb-4   font-22 text-black',
              ),
              // { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
            ]}
          >
            Your order has been recevied
          </Text>
          <View style={[tailwind('flex-row items-center')]}>
            <Text
              style={[
                tailwind('font-bold text-center text-black pb-4 font-22'),
                // { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
              ]}
            >
              Status : {''}
            </Text>
            <Text
              style={[
                tailwind('font-bold text-center text-orange pb-4 font-22'),
                // { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
              ]}
            >
              Pending
            </Text>
          </View>
          <TouchableOpacity
            // onPress={goToOrderStatusScreen}
            onPress={() => {
              Platform?.OS == 'android'
                ? navigation.navigate('SingleOrderScreen', {
                    type_data: 1,
                    order_id: route?.params?.order_id,
                  })
                : navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'SingleOrderScreen',
                        params: {
                          type_data: 1,
                          order_id: route?.params?.order_id,
                        },
                      },
                    ],
                  });
            }}
            style={[tailwind('mx-3 my-2 p-4 bg-primary rounded')]}
          >
            <Text
              style={[
                tailwind('text-center text-white font-16 font-bold'),
                { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
              ]}
            >
              Track Order
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={[tailwind('flex flex-row justify-center')]}>
            <FastImage
              source={require('../../assets/gif/erro.gif')}
              style={[tailwind('w-52 h-52')]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text
            style={[
              tailwind('font-bold text-center text-secondary py-4 text-3xl'),
              { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
            ]}
          >
            Failed
          </Text>
          <Text
            style={[
              tailwind('font-semi mx-7 py-2 text-center text-gray font-15'),
              { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
            ]}
          >
            Some Technical problem on our side, Please try Again
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            style={[tailwind('mx-3 my-2 p-4 bg-primary rounded')]}
          >
            <Text
              style={[
                tailwind('font-medium text-center text-white font-16'),
                { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
              ]}
            >
              Go Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={cacncelOrder}
            style={[tailwind('mx-3 my-2 p-4 bg-secondary rounded')]}
          >
            <Text
              style={[
                tailwind('font-medium text-center text-white font-16'),
                { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
              ]}
            >
              Cancel Order
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
