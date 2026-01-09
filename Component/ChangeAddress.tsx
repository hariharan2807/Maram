import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import tailwind from '@tailwind';
// import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GlobalDialogModal } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Location } from '../assets/icons';
import assets_manifest from '@assets';
// import {getAddressid, saveAddressid} from '../../workers/localStorage';
interface proto {
  // key: any;
  selectedAddress: any;
  address_id: any;
  user_address_name: any;
  user_address_details: any;
  item: any;
  action: any;
  setValue: any;
}
export default function ChangeAddress(props: proto) {
  return (
    <TouchableOpacity
      // key={props?.key}
      onPress={
        () => {
          props?.setValue(true);
          props?.action(props?.item);
        }
        // props.changeSelectedAddress(
        //   props?.latitude,
        //   props?.longitude,
        //   props?.address_id,
        // )
      }
      style={[
        tailwind(
          `flex bg-white flex-row mx-2 my-1 rounded items-center relative ${
            props?.address_id === props?.selectedAddress?.user_address_id
              ? 'border-2 border-black '
              : ''
          }`,
        ),
      ]}
    >
      <View
        style={[tailwind('w-1/12 flex flex-row items-center justify-center')]}
      >
        {/* <Location /> */}
        <Image
          style={[tailwind(''), { height: 20, width: 20 }]}
          source={assets_manifest?.locationpin}
          resizeMode="contain"
        />
      </View>
      <View style={[tailwind('px-2 flex-1')]}>
        <View style={[tailwind('mx-1 py-2')]}>
          <Text
            style={[
              tailwind('font-bold uppercase text-gray-700 font-15'),
              // {
              //   fontWeight:
              //     Platform?.OS === 'android' ? 'normal' : '500',
              // },
            ]}
          >
            {props?.user_address_name}
          </Text>
          <Text
            style={[
              tailwind('font-bold py-1 text-gray-600 font-11'),
              // {
              //   fontWeight:
              //     Platform?.OS === 'android' ? 'normal' : '500',
              // },
            ]}
          >
            {props?.user_address_details}
          </Text>
        </View>
      </View>
      {props?.address_id === props?.selectedAddress?.user_address_id ? (
        <View style={[tailwind('absolute inset-0')]}>
          <Image
            style={[tailwind(''), { height: 21, width: 21 }]}
            source={assets_manifest?.checkbox}
          />
          {/* <Icon name="checkbox" size={21} color="black" /> */}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
