import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import tailwind from '@tailwind';
import { FullScreenLoading, Topbar } from '@Component';
import assets_manifest from '@assets';
import { useQuery } from 'react-query';
import { get_AllCouponList, get_Check_coupon } from '@remote/userRemote';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoupon } from '@actions/userActions';
import { useNavigation } from '@react-navigation/native';
import { errorBox, infoBox } from '../../workers/utils';

export default function CouponScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const ID = useSelector((state: any) => state.user.user_id);
  const CartState = useSelector((state: any) => state.user.cart);

  const totalQuantity = CartState.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );
  //   console?.log('totalQuantity', totalQuantity);
  const Coupon_list = useQuery(
    ['get_AllCouponList', ID ? ID : ''],
    get_AllCouponList,
  );

  const CouponCheck = async (val: any, num: any) => {
    // if (num === 1) {
    if (!code && num === 1) {
      return errorBox('Please Enter code to Proceed');
    }
    //   return
    // }

    const Response = await get_Check_coupon({
      offer_coupon: val,
      user_id: ID,
    });
    if (Response?.status === 'success') {
      // console.log('ResponseResponse', Response?.GTS);
      if (Response?.GTS?.minimum_ordering_amount <= totalQuantity) {
        const output = calculateDiscount(
          totalQuantity,
          Response?.GTS?.offer_percentage,
          Response?.GTS?.maximum_discount_amount,
        );
        const CouponSave = {
          maximum_discount_amount: Response?.GTS?.maximum_discount_amount,
          minimum_ordering_amount: Response?.GTS?.minimum_ordering_amount,
          offer_coupon: Response?.GTS?.offer_coupon,
          promo_string: Response?.GTS?.promo_string,
          offer_id: Response?.GTS?.offer_id,
          offer_percentage: Response?.GTS?.offer_percentage,
          caluculate_amount: output,
        };
        dispatch(updateCoupon(CouponSave));
        infoBox('Coupon Applied!.')
        navigation?.goBack();
      } else {
        errorBox('Offer invalid for this Order');
      }

      //   console.log('output', output);
    } else {
      // console.log("Reponseeeeee=-=-",Response)
      errorBox(Response?.res?.data?.message);
      dispatch(updateCoupon(null));
    }
  };
  const calculateDiscount = (
    productPrice,
    offerPercentage,
    maxDiscountAmount,
  ) => {
    // Step 1: Calculate the percentage discount
    const calculatedDiscount = (productPrice * offerPercentage) / 100;

    // Step 2: Check against maximum limit
    const finalDiscount = Math.min(calculatedDiscount, maxDiscountAmount);

    return finalDiscount;
  };

  // Example with your values: product price = 250, offer_percentage = 50, max_discount = 80
  //   const productPrice = 250;
  //   const offerPercentage = 50; // From your API
  //   const maxDiscountAmount = 80; // From your API

  //   const discount = calculateDiscount(
  //     productPrice,
  //     offerPercentage,
  //     maxDiscountAmount,
  //   );
  //   console.log(`Discount: ₹${discount}`); // Output: Discount: ₹80

  // Calculate final price
  //   const finalPrice = productPrice - discount;
  //   console.log(`Final Price: ₹${finalPrice}`); // Output: Final Price: ₹170
  if (Coupon_list?.isLoading) {
    return <FullScreenLoading />;
  }
  //   console.log('Coupon_list', Coupon_list?.data?.GTS);
  return (
    <View style={[tailwind('bg-secondary h-full'), {}]}>
      <Topbar title="Coupons Codes" type={3} />
      <View style={[tailwind('mx-3')]}>
        <View
          // onPress={() => {
          //   navigation?.navigate('CouponScreen');
          // }}
          style={[
            tailwind('flex-row px-3  items-center my-3 rounded-xl'),
            {
              borderWidth: 2,
              borderStyle: 'dotted',
              borderColor: '#45302B',
              width: '100%',
            },
          ]}
        >
          <Image
            style={[tailwind(''), { height: 20, width: '10%' }]}
            source={assets_manifest?.ic_coupon}
          />
          <TextInput
            onChangeText={txt => {
              setCode(txt);
            }}
            value={code}
            placeholder="Enter Coupon Code"
            placeholderTextColor={'gray'}
            style={[tailwind('mx-3 font-semi font-14 py-3'), { width: '70%' }]}
          />
          {/* <Text
                  style={[tailwind('mx-3 font-bold font-15 text-gray-500')]}
                >
                  {Couponstate ? Couponstate : `Enter Your Coupon`}
                </Text> */}
          <TouchableOpacity
            onPress={() => {
              CouponCheck(code, 1);
            }}
            style={[tailwind(''), { marginLeft: 'auto', width: '20%' }]}
          >
            <Text
              style={[
                tailwind(`font-bold font-15 `),
                { color: 'green', textTransform: 'uppercase' },
              ]}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {Coupon_list?.data?.GTS?.length && (
        <View style={[tailwind('mx-3 ')]}>
          <Text style={[tailwind(`font-bold font-15 my-3`), {}]}>
            Available Coupon Codes
          </Text>
          {Coupon_list?.data?.GTS?.map((items: any, index: any) => {
            return (
              <View style={[tailwind('bg-white rounded-xl my-2')]} key={index}>
                <TouchableOpacity
                  onPress={() => {
                    CouponCheck(items?.offer_coupon, 2);
                  }}
                  style={[
                    tailwind('rounded-xl'),
                    {
                      borderWidth: 2,
                      borderStyle: 'dashed',
                      borderColor: 'red',
                    },
                  ]}
                >
                  <View
                    style={[
                      tailwind('py-3 rounded-xl mt-3 mx-2'),
                      { backgroundColor: '#009949' },
                    ]}
                  >
                    <Text
                      style={[
                        tailwind('font-bold font-16 text-white text-center'),
                      ]}
                    >
                      {items?.offer_coupon}
                    </Text>
                  </View>
                  <Text
                    style={[
                      tailwind(
                        'font-bold font-13 py-3 mb-2 text-black text-center',
                      ),
                    ]}
                  >
                    {items?.promo_string}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
