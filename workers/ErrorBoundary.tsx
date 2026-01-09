import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';
import tailwind from '@tailwind';
import assets from '@assets';

/**
 * This is the fallback UI shown when an error occurs.
 */
const ErrorFallback = ({ error, onRestart }: any) => {
  const sendStackTrace = useCallback(() => {
    console.log('Crash Report:', error);
  }, [error]);

  return (
    <View style={[tailwind('flex flex-col justify-between h-full bg-white')]}>
      <Text>{String(error?.message || error)}</Text>
      <View style={[tailwind('flex flex-col items-center justify-center')]}>
        <Image
          resizeMode="contain"
          style={[tailwind('w-32 h-32')]}
          source={assets.sad_face}
        />
        <Text style={[tailwind('font-regular font-20 py-2')]}>
          Unexpected happened
        </Text>
        <Text
          style={[tailwind('font-regular text-xs text-center text-gray py-2')]}
        >
          There was an unhandled exception. Please contact developers for
          assistance.
        </Text>
      </View>
      <View
        style={[
          tailwind('flex flex-col justify-between items-center mx-6 py-10'),
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onRestart}
          style={[tailwind('border border-blue-700 p-3 my-2 w-full')]}
        >
          <Text style={[tailwind('font-regular font-15 text-center')]}>
            Restart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={sendStackTrace}
          style={[tailwind('bg-secondary p-3 my-2 w-full')]}
        >
          <Text
            style={[tailwind('font-regular font-15 text-center text-white')]}
          >
            Send Crash Report
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ErrorBoundary = ({ children }: any) => {
  const [error, setError] = useState<Error | null>(null);

  const onRestart = () => {
    RNRestart.Restart();
  };
  try {
    if (error) {
      throw error;
    }
    return children;
  } catch (err: any) {
    setError(err);
    return <ErrorFallback error={err} onRestart={onRestart} />;
  }
};

export default ErrorBoundary;
