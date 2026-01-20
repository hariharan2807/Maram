import { View, Text } from 'react-native';
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const TickIcon1 = () => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Rect width="12" height="12" rx="6" fill="#80C659" />
      <Path
        d="M3.07007 5.73368L5.20098 7.86459L8.93007 4.1355"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default TickIcon1;
