import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import assets_manifest from '@assets';
const { width } = Dimensions.get('window');
interface Prototype {
  // key:any,
  order_string: any;
  booking_time: any;
  booking_date: any;
  total_amount: any;
  order_status: any;
  id: string;
  navigation: any;
}
export default function OrderListComponent(props: Prototype) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        props?.navigation?.navigate('SingleOrderScreen', {
          order_id: props?.id,screen:true
        });
      }}
      style={[
        tailwind(' bg-white  px-3 py-5'),
        { borderBottomColor: 'silver', borderBottomWidth: 2 },
      ]}
      //   key={props?.key}
    >
      {/* Your existing item rendering code */}
      <View style={[tailwind('flex-row')]}>
        <View>
          <Text style={[tailwind('font-bold text-gray font-14'), {}]}>
            Order ID
          </Text>
          <Text style={[tailwind('font-bold mt-2 font-14')]}>
            {props?.order_string}
          </Text>
        </View>
        <View
          style={[tailwind(''), { marginLeft: 'auto', alignItems: 'flex-end' }]}
        >
          <Text style={[tailwind('font-bold text-gray font-14'), {}]}>
            Order Date & Time
          </Text>
          <Text style={[tailwind('font-bold mt-2  text-black font-14')]}>
            {props?.booking_date} , {props?.booking_time}
          </Text>
        </View>
      </View>
      <View
        style={[
          tailwind('mt-3 mb-2 '),
          { height: 0.5, width: '100%', backgroundColor: 'silver' },
        ]}
      />
      <View style={[tailwind('flex-row mt-2 items-center'), {}]}>
        <View style={[tailwind(' items-center ')]}>
          <Text style={[tailwind('font-bold font-18')]}>
            ₹{props?.total_amount}
          </Text>
        </View>
        <View
          style={[tailwind('flex-row items-center'), { marginLeft: 'auto' }]}
        >
          <Text
            style={[
              tailwind('font-bold  font-16 mr-1'),
              {
                color:
                  props?.order_status === 0 || props?.order_status === 6
                    ? 'red'
                    : 'green',
              },
            ]}
          >
            {props?.order_status === 0
              ? 'Cancelled'
              : props?.order_status === 1
              ? 'Placed'
              : props?.order_status === 2
              ? 'Processing'
              : props?.order_status === 3
              ? 'Ready'
              : props?.order_status === 4
              ? 'Picked Up'
              : props?.order_status === 5
              ? 'Delivered'
              : 'Pending'}
          </Text>
          <Image
            resizeMode="contain"
            style={[tailwind('ml-1'), { height: 20, width: 20 }]}
            source={
              props?.order_status === 0 || props?.order_status === 6
                ? assets_manifest?.close
                : assets_manifest?.img_tick_status
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
