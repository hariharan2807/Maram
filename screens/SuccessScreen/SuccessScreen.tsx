import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import tailwind from '@tailwind';
import assets_manifest from '@assets';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function SuccessScreen() {
  const navigation = useNavigation();
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => true;
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <ImageBackground
        style={tailwind('flex-1')}
        source={assets_manifest?.PaymentSucess}
      >
        <View style={tailwind('flex-1 items-center justify-center')}>
          <Image
            style={{ width: 300, height: 200 }}
            source={assets_manifest?.Sucess}
            resizeMode="contain"
          />

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation?.navigate('Home');
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: 'Home' }],
              // });
            }}
            style={[
              tailwind('bg-green rounded-full py-3 my-3'),
              { width: '70%' },
            ]}
          >
            <Text style={tailwind('text-white text-center font-bold font-18')}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
