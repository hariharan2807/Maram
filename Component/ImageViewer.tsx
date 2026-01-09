import React from 'react';
import tailwind from '@tailwind';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { CURRENCY } from '../../constants/API_constants';
import Icon from 'react-native-vector-icons/Ionicons';
import assets from '@assets';
import assets_manifest from '@assets';

interface PropTypes {
  image: string;
  imageLargerRef?: any;
}

export default function ImageViewer(props: PropTypes) {
  return (
    <View style={[tailwind('')]}>
      <View
        style={{
          width: '100%',
          height: 300,
          overflow: 'hidden',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <ImageBackground
          source={{ uri: props?.image }}
          style={{
            width: '100%',
            height: 300,
            position: 'absolute',
          }}
          resizeMode="cover"
          blurRadius={15}
          defaultSource={assets_manifest?.banner_loading}
        />
        <Image
          source={{ uri: props?.image }}
          style={{
            width: '100%',
            height: 300,
          }}
          resizeMode="contain"
          defaultSource={assets_manifest?.banner_loading}
        />
      </View>
      <TouchableOpacity
        style={[
          tailwind('bg-white rounded-full'),
          {
            position: 'absolute',
            top: 0,
            zIndex: 999,
            padding: 3,
            margin: 10,
            marginTop: 15,
          },
        ]}
        activeOpacity={0.9}
        onPress={() => props?.imageLargerRef?.current?.close()}
      >
        <Image
          style={[
            tailwind(''),
            {
              height: 25,
              width: 25,
              resizeMode: 'contain',
            },
          ]}
          resizeMode="contain"
          source={assets_manifest?.cross}
        />
      </TouchableOpacity>
    </View>
  );
}
