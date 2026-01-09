import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import assets_manifest from '@assets';
import { useSelector } from 'react-redux';
export const ApplyCoupon = (props: any) => {
  const { width, height } = Dimensions.get('window');
  const Couponstate = useSelector((state: any) => state.user.coupon);
  const ID = useSelector((state: any) => state.user.user_id);

  const scaleFont = (size: number) => (width / 375) * size;

  return (
    <View style={[tailwind('mx-5 mt-5 ')]}>
      <Text
        style={[
          tailwind('font-bold text-primary'),
          { fontSize: scaleFont(16) },
        ]}
      >
        Offer Coupon code
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (ID) {
            props?.navigation?.navigate('CouponScreen');
          } else {
            props?.navigation?.navigate('LoginScreen');
          }
        }}
        style={[
          tailwind('flex-row px-3 py-3 items-center my-3 rounded-xl'),
          {
            borderWidth: 2,
            borderStyle: 'dotted',
            borderColor: '#45302B',
          },
        ]}
      >
        <Image
          style={[tailwind(''), { height: 20, width: 20 }]}
          source={assets_manifest?.ic_coupon}
        />
        <Text style={[tailwind(`mx-3 font-bold font-15 ${Couponstate?.offer_id?'text-black':'text-gray-500'}`)]}>
          {Couponstate?.offer_id
            ? Couponstate?.offer_coupon
            : `Enter Your Coupon`}
        </Text>
        <Text
          style={[
            tailwind(
              `font-bold ${
                Couponstate?.offer_id ? 'font-10' : 'font-15'
              } text-primary`,
            ),
            { marginLeft: 'auto' },
          ]}
        >
          {Couponstate?.offer_id ? 'Change Coupon' : 'Apply'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
