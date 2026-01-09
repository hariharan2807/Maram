import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
export const ButtonComponent = (props: any) => {
  const { width, height } = Dimensions.get('window');
  const scaleFont = (size: number) => (width / 375) * size;
  return (
    <View
      style={[
        tailwind('px-6 py-4 mt-6 rounded-2xl bg-primary'),
        { width: width * 0.94 },
      ]}
      // activeOpacity={0.8}
    >
      <Text
        style={[
          tailwind('text-white text-center font-bold'),
          { fontSize: scaleFont(16) },
        ]}
      >
        {props?.title}
      </Text>
    </View>
  );
};
