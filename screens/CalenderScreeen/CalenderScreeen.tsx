import { Topbar } from '@Component';
import tailwind from '@tailwind';
import { View, Text } from 'react-native';
import React from 'react';
export default function CalenderScreen() {
  return(
    <View>
        <Topbar  title='Calender' type={3}/>
    </View>
  )
}