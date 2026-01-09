import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
const { width } = Dimensions.get('window');

export default function Loader(props: any) {
  const bannerWidth = width - 30; // small margin on sides
  const bannerHeight = 150;
  if (props?.type === 1) {
    return (
      <View style={[tailwind('bg-white px-3 py-2')]}>
        <ContentLoader
          speed={1.5}
          width={bannerWidth}
          height={bannerHeight}
          viewBox={`0 0 ${bannerWidth} ${bannerHeight}`}
          backgroundColor="#f0f0f0"
          foregroundColor="#e3e3e3"
        >
          {/* Banner Placeholder */}
          <Rect
            x="0"
            y="0"
            rx="15"
            ry="15"
            width={bannerWidth}
            height={bannerHeight}
          />

          {/* Optional text placeholder under banner */}
          <Rect
            x="10"
            y={bannerHeight + 10}
            rx="4"
            ry="4"
            width={bannerWidth * 0.6}
            height="12"
          />
        </ContentLoader>
      </View>
    );
  }
  return (
    <View style={[tailwind('bg-white px-3 py-2')]}>
      <ContentLoader
        speed={1.5}
        width={bannerWidth}
        height={bannerHeight}
        viewBox={`0 0 ${bannerWidth} ${bannerHeight}`}
        backgroundColor="#f0f0f0"
        foregroundColor="#e3e3e3"
      >
        {/* Banner Placeholder */}
        <Rect
          x="0"
          y="0"
          rx="15"
          ry="15"
          width={bannerWidth}
          height={bannerHeight}
        />

        {/* Optional text placeholder under banner */}
        <Rect
          x="10"
          y={bannerHeight + 10}
          rx="4"
          ry="4"
          width={bannerWidth * 0.6}
          height="12"
        />
      </ContentLoader>
    </View>
  );
}
