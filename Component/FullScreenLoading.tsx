import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import Topbar from './TopBar';

export default function FullScreenLoading () {
  return (
    <View  style={[tailwind('h-full bg-white ')]}>
      <Topbar title={'Loading ...'} type={3}/>

    <View
      style={[
        tailwind('h-full items-center'),
        { justifyContent: 'center' },
      ]}
    >
        <View  style={[tailwind(' items-center')]}>
        <ActivityIndicator color={'#45302B'} size={'large'} />
        <Text  style={[tailwind('mt-2 font-bold text-black font-18')]}>Fetching Data</Text>

        </View>
      
    </View>
    </View>

  );
};
