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
  type: number;
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
    <View style={tailwind('')}>
      {props?.type == 1 && (
        <View style={[tailwind('flex-row  rounded-2xl  ')]}>
          <View>
            <Image
              source={props?.image}
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
          <View style={[tailwind('flex-1  '), { justifyContent: 'center' }]}>
            <Text style={tailwind('font-16 font-bold ')} numberOfLines={2}>
              {props?.product_name}
            </Text>
            <View style={[tailwind(''), { width: '50%' }]}>
              <View style={[tailwind('flex-row items-center')]}>
                <Text
                  style={[tailwind(' font-bold font-15'), { color: '#F39F3E' }]}
                >
                  {' '}
                  ₹{props?.variation?.product_price}
                </Text>
                <Text
                  style={tailwind('font-14 mx-1 text-gray-500 py-2 font-bold ')}
                  numberOfLines={2}
                >
                  {' '}
                  Per Day
                  {/* {props?.variation?.product_variation}{' '}
                {props?.variation?.product_unit} */}
                </Text>
              </View>

              <View
                style={[
                  tailwind('flex-row  items-center '),
                  { borderRadius: 10 },
                ]}
              >
                <TouchableOpacity
                  onPress={initiateDecrement}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={[
                    {
                      backgroundColor: '#80C659',
                      width: '30%',
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopRightRadius: 10,
                      borderBottomLeftRadius: 10,
                    },
                    tailwind(''),
                  ]}
                >
                  <Text style={tailwind('font-bold font-20 text-white')}>
                    −
                  </Text>
                </TouchableOpacity>
                <View
                  style={[
                    tailwind('flex-row items-center'),
                    { justifyContent: 'center', width: '30%' },
                  ]}
                >
                  <Text
                    style={tailwind(
                      'font-bold text-base text-black text-center',
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
                      width: '30%',
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#80C659',
                      borderTopLeftRadius: 10,
                      borderBottomRightRadius: 10,
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
      )}
      {props?.type == 2 && (
        <View style={[tailwind(' my-1 rounded-xl')]}>
          <View
            style={[
              tailwind('flex-row   p-3'),
              {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              },
            ]}
          >
            <View style={[tailwind('mr-3'), { width: '15%' }]}>
              <Image
                source={props?.image}
                style={[
                  tailwind('rounded-lg'),
                  {
                    width: 50,
                    height: 60,
                  },
                ]}
                resizeMode="cover"
                defaultSource={assets_manifest?.banner_loading}
              />
            </View>
            <View style={[tailwind('flex-1 flex-row'), { width: '100%' }]}>
              <View style={[tailwind(''), { width: '70%' }]}>
                <Text
                  style={tailwind('font-16 font-bold text-black')}
                  numberOfLines={2}
                >
                  {props?.product_name}
                </Text>
                <View  style={[tailwind('flex-row my-2')]}>
                   <Text
                    style={[
                      tailwind('font-medium font-14'),
                      { color: 'black',},
                    ]}
                  >
                    {props?.variation?.product_variation}
                  </Text>
                   <Text
                  style={tailwind('font-medium font-14 text-black')}
                  numberOfLines={2}
                >
                  {props?.variation?.product_unit}
                </Text>
                  </View>
                
                
              </View>
              <View style={[tailwind(''), { width: '30%' ,}]}>
                <View style={tailwind('')}>
                  <Text
                    style={[
                      tailwind('font-bold font-18 my-2'),
                      { color: 'black',marginLeft:"auto" },
                    ]}
                  >
                    ₹{props?.variation?.product_price}
                  </Text>
                </View>
                <View
                  style={[
                    tailwind('flex-row  items-center '),
                    { borderRadius: 10, width: '100%',justifyContent:"center" },
                  ]}
                >
                  <TouchableOpacity
                    onPress={initiateDecrement}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={[
                      {
                        backgroundColor: '#80C659',
                        width: 25,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                      },
                      tailwind(''),
                    ]}
                  >
                    <Text style={tailwind('font-bold font-20 text-white')}>
                      −
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={[
                      tailwind('flex-row items-center'),
                      { justifyContent: 'center', width: 30 },
                    ]}
                  >
                    <Text
                      style={tailwind(
                        'font-bold text-base text-black text-center',
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
                        width: 25,
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#80C659',
                        borderTopLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      },
                      tailwind(''),
                    ]}
                  >
                    <Text
                      style={[
                        tailwind('font-bold font-20 '),
                        { color: 'white' },
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
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
