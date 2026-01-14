import { View, Text } from 'react-native';
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const CalenderIcon = () => {
  return (
    <Svg width="42" height="44" viewBox="0 0 42 44" fill="none">
      <Rect width="42" height="44" rx="21" fill="#80C659" />
      <Path
        d="M30 21.5V18.8C30 17.1198 30 16.2798 29.673 15.638C29.3854 15.0735 28.9265 14.6146 28.362 14.327C27.7202 14 26.8802 14 25.2 14H16.8C15.1198 14 14.2798 14 13.638 14.327C13.0735 14.6146 12.6146 15.0735 12.327 15.638C12 16.2798 12 17.1198 12 18.8V27.2C12 28.8802 12 29.7202 12.327 30.362C12.6146 30.9265 13.0735 31.3854 13.638 31.673C14.2798 32 15.1198 32 16.8 32H21.5M30 20H12M25 12V16M17 12V16M27 31V25M24 28H30"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default CalenderIcon;
