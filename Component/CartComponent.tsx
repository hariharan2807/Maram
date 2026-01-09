import React, { useCallback, useRef, useState } from 'react';
import {
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
  isVeg: boolean;
  veg: boolean;
  key: number;
  quantity: number;
  image: string;
  product_name: string;
  price: number;
  id: number;
  offer: number;
  is_favourite: boolean;
  description: string;
  product_image: string;
  variation: any;
  increment: any;
  decrement: any;
  color_variation: any;
  item: any;
  product_price: number;
}
const CartComponent = (props: CartCompType) => {
  const imageLargerRef = useRef(null);
  const initiateDecrement = useCallback(() => {
    let uuid = `${props?.item?.product_id}_${props?.item?.variation?.product_price_id}`;
    props.decrement({ uuid });
  }, [
    props?.item?.product_id,
    props?.item?.variation?.product_price_id,
    props.decrement,
  ]);
  const initiateIncrement = useCallback(() => {
    let uuid = `${props?.item?.product_id}_${props?.item?.variation?.product_price_id}`;
    let cartObj = {
      uuid: uuid,
    };
    props.increment(cartObj);
  }, [
    props.item?.product_id,
    props?.variation?.product_price_id,
    props?.variation,
    props.increment,
  ]);
  return (
    <View style={tailwind(' my-1.5')}>
      <View style={[tailwind('flex-row  rounded-2xl px-1 py-1')]}>
        <View>
          <Image
            source={{ uri: props?.image }}
            style={[
              tailwind(''),
              {
                width: 100,
                height: 110,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              },
            ]}
            resizeMode="cover"
            defaultSource={assets_manifest?.banner_loading}
          />
        </View>
        <View style={[tailwind('flex-1  px-2'), { justifyContent: 'center' }]}>
          <Text style={tailwind('font-16 font-bold ')} numberOfLines={2}>
            {props?.product_name}
          </Text>
          <View style={[tailwind('flex-row')]}>
            <View style={[tailwind(''), { width: '50%' }]}>
              <Text
                style={tailwind('font-13 text-gray-500 py-2 font-bold ')}
                numberOfLines={2}
              >
                {props?.quantity} X {props?.product_price}
              </Text>
              <Text
                style={tailwind('font-14 text-gray-500 py-2 font-bold ')}
                numberOfLines={2}
              >
                {props?.variation?.product_variation}{' '}
                {props?.variation?.product_unit}
              </Text>
            </View>
            <View style={[tailwind(' items-center'), { width: '50%' }]}>
              <Text
                style={[
                  tailwind('font-16 text-black py-2 mr-5 font-bold '),
                  { marginLeft: 'auto' },
                ]}
                numberOfLines={2}
              >
                ₹ {props?.quantity * props?.product_price}
              </Text>
              <View
                style={[
                  tailwind('flex-row  py-1 px-2 items-center  bg-primary'),
                  { width: '100%', borderRadius: 10, marginLeft: 'auto' },
                ]}
              >
                <TouchableOpacity
                  onPress={initiateDecrement}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={[
                    {
                      width: '20%',
                      // height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    tailwind(''),
                  ]}
                >
                  <Text style={tailwind('font-bold font-20 text-white')}>
                    −
                  </Text>
                </TouchableOpacity>
                <View style={[tailwind(''), { width: '60%' }]}>
                  <Text
                    style={tailwind(
                      'font-bold text-base text-white text-center',
                    )}
                  >
                    {props?.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={initiateIncrement}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={[
                    {
                      width: '20%',
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // backgroundColor: '#FFFFFF',
                    },
                    tailwind(''),
                  ]}
                >
                  <Text
                    style={[tailwind('font-bold font-20 '), { color: 'white' }]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Portal>
        <Modalize
          ref={imageLargerRef}
          useNativeDriver={true}
          modalTopOffset={100}
          adjustToContentHeight={true}
          HeaderComponent={
            <ImageViewer image={props.image} imageLargerRef={imageLargerRef} />
          }
          FooterComponent={
            <View
              style={tailwind(
                'flex-row bg-white rounded-xl py-2 px-2 items-center mr-2',
              )}
            >
              <Text
                style={tailwind('font-18 font-bold flex-1')}
                numberOfLines={2}
              >
                {props?.product_name}
              </Text>
              <View
                style={[
                  tailwind('flex-row items-center'),
                  {
                    backgroundColor: '#e8efe7',
                    borderRadius: 10,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={initiateDecrement}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={[
                    {
                      width: 30,
                      height: 30,
                      // borderWidth: 1,
                      // borderColor: '#60B244',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      //  backgroundColor:"#e8efe7"
                    },
                    tailwind(''),
                  ]}
                >
                  <Text style={tailwind('font-bold text-lg text-red')}>-</Text>
                </TouchableOpacity>
                <View style={[tailwind('mx-5')]}>
                  <Text style={tailwind('font-bold text-base text-gray-900')}>
                    {props?.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={initiateIncrement}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={[
                    {
                      width: 30,
                      height: 30,
                      // borderWidth: 1,
                      // borderColor: '#60B244',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#e8efe7',
                    },
                    tailwind(''),
                  ]}
                >
                  <Text
                    style={[
                      tailwind('font-bold text-lg '),
                      { color: '#24661E' },
                    ]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          disableScrollIfPossible={false}
          closeOnOverlayTap={true}
        ></Modalize>
      </Portal>
    </View>
  );
};
export default CartComponent;
