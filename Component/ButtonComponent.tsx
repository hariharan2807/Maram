import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
export const ButtonComponent = (props: any) => {
  const { width, height } = Dimensions.get('window');
  const scaleFont = (size: number) => (width / 375) * size;
  return (
    <View
      style={[
        tailwind('px-6 py-4 mt-6 rounded-full'),
        { width: width * 0.94,borderColor:"#80C659",borderWidth:2},
      ]}
      // activeOpacity={0.8}
    >
      <Text
        style={[
          tailwind('text-white text-center text-green font-bold'),
          { fontSize: scaleFont(16) },
        ]}
      >
        {props?.title}
      </Text>
    </View>
  );
};
