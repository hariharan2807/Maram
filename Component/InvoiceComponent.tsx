import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import tailwind from '../tailwind';
import { cartItemUniqueIdwithoutCust, errorBox } from '../workers/utils';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import ImageViewer from './ImageViewer';
import assets_manifest from '@assets';
interface CartCompType {
  totalQuantity: any;
  Couponstate: any;
  Total: any;
  Delivery_charge: any;
}
export const InvoiceComponent = (props: CartCompType) => {
  const { width, height } = Dimensions.get('window');

  const scaleFont = (size: number) => (width / 375) * size;

  return (
    <View style={[tailwind('bg-white rounded-xl py-3 my-3 px-3')]}>
      {props?.totalQuantity  && (
        <View
          style={[
            tailwind('flex-row my-2'),
            { justifyContent: 'space-between' },
          ]}
        >
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'black', fontSize: scaleFont(15) },
            ]}
          >
            Sub Total
          </Text>
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'black', fontSize: scaleFont(15) },
            ]}
          >
            ₹ {props?.totalQuantity}
          </Text>
        </View>
      )}
      {props?.Delivery_charge?.delivery_charge  && (
        <View
          style={[
            tailwind('flex-row my-2'),
            { justifyContent: 'space-between' },
          ]}
        >
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'black', fontSize: scaleFont(13) },
            ]}
          >
            Delivery Charge
          </Text>
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'black', fontSize: scaleFont(13) },
            ]}
          >
            ₹ {props?.Delivery_charge?.delivery_charge}
          </Text>
        </View>
      )}
      {props?.Couponstate?.offer_id  && (
        <View
          style={[
            tailwind('flex-row my-2'),
            { justifyContent: 'space-between' },
          ]}
        >
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'green', fontSize: scaleFont(13) },
            ]}
          >
            Coupon Discount
          </Text>
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'green', fontSize: scaleFont(13) },
            ]}
          >
            - ₹ {props?.Couponstate?.caluculate_amount}
          </Text>
        </View>
      )}
      <View
        style={[
          tailwind('my-2'),
          { height: 1, width: '100%', backgroundColor: 'silver' },
        ]}
      />
      {props?.Total !==0 && (
        <View
          style={[
            tailwind('flex-row my-2'),
            { justifyContent: 'space-between' },
          ]}
        >
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'black', fontSize: scaleFont(17) },
            ]}
          >
            Total
          </Text>
          <Text
            style={[
              tailwind('font-bold '),
              { color: 'black', fontSize: scaleFont(17) },
            ]}
          >
            ₹ {props?.Total}
          </Text>
        </View>
      )}
    </View>
  );
};
