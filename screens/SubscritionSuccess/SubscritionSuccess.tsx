import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import { Topbar } from '@Component';
import assets_manifest from '@assets';
import { useNavigation } from '@react-navigation/native';
export default function SubscritionSuccess() {
  const navigation = useNavigation();
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <Topbar title="Subscription Successful" type={3} />

      <ImageBackground
        style={tailwind('flex-1')}
        source={assets_manifest?.background}
        resizeMode="cover"
      >
        <View style={tailwind('flex-1 justify-between px-6 pb-10')}>
          {/* Main Content - Centered */}
          <View style={tailwind('flex-1 justify-center items-center')}>
            {/* Success Image */}
            <Image
              style={{ width: 250, height: 250 }}
              source={assets_manifest?.SubscriptionSuccesss}
              resizeMode="contain"
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTabNavigation' }],
              });
            }}
            style={[
              tailwind('rounded-full py-4 items-center justify-center'),
              {
                // backgroundColor: '',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                borderWidth: 1,
                borderColor: '#10B981',
                elevation: 5,
              },
            ]}
            activeOpacity={0.8}
          >
            <Text
              style={[tailwind(' font-bold text-lg'), { color: '#10B981' }]}
            >
              {/* Continue */}
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
