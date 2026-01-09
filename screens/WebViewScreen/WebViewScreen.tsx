import tailwind from '@tailwind';
import { View } from 'react-native';
import React from 'react';
import { Topbar } from '@Component';
import { useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';



export default function WebViewScreen() {
  const route = useRoute();
  const { height: screenHeight } = Dimensions.get('window');
// In your component
const insets = useSafeAreaInsets();
const topbarHeight = 60; // Adjust based on your Topbar height
  return (
    <View style={[tailwind('flex-1')]}>
      <Topbar title={route?.params?.title} type={4} />
      <WebView
        source={{ uri: route?.params?.url }}
        style={{
          flex: 1,
          // Or use explicit height calculation:
          // height: screenHeight - topbarHeight - insets.top - insets.bottom
        }}
      />
    </View>
  );
}
