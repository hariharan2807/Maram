import { View, Text } from 'react-native';
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const TickIcon = () => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Rect width="12" height="12" rx="6" fill="white" />
      <Path
        d="M3.07001 5.73365L5.20092 7.86456L8.93001 4.13547"
        stroke="#80C659"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default TickIcon;
