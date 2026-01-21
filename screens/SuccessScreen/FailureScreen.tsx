import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import { Topbar } from '@Component';
import assets_manifest from '@assets';
import { useNavigation } from '@react-navigation/native';
export default function FailureScreen() {
  const navigation = useNavigation();

  return (
    <View style={[tailwind('h-full bg-white')]}>
      <ImageBackground
        style={[tailwind('flex-1'), { height: '100%', width: '100%' }]}
        source={assets_manifest?.PaymentFailed}
      >
        <View
          style={[
            tailwind('flex-1 items-center'),
            { justifyContent: 'center' },
          ]}
        >
          <Image
            style={[tailwind(''), { width: 300, height: 200 }]}
            source={assets_manifest?.Failed}
            resizeMode="contain"
          />
          {/* <TouchableOpacity
            onPress={() => {}}
            style={[
              tailwind('bg-green  rounded-full py-3 my-3'),
              { width: '70%' },
            ]}
          >
            <Text
              style={[tailwind('text-white font-bold text-center  font-18')]}
            >
              Try Again
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack();
            }}
            style={[
              tailwind(' rounded-full bg-green py-3 my-3'),
              { borderWidth: 2, borderColor: '#80C659', width: '70%' },
            ]}
          >
            <Text
              style={[tailwind('text-white text-center font-bold font-15')]}
            >
              Try Another Payment Method{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
