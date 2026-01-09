import { View, Text } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M10.5243 10.5075L14.3334 14.3166"
        stroke="#808080"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.57377 12.1308C9.65208 12.1308 12.1475 9.63532 12.1475 6.55701C12.1475 3.4787 9.65208 0.983238 6.57377 0.983238C3.49546 0.983238 1 3.4787 1 6.55701C1 9.63532 3.49546 12.1308 6.57377 12.1308Z"
        stroke="#808080"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default SearchIcon;
