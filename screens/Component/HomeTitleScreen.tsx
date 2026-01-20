import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import { CategoryIcon } from '../../assets/icons';
import assets_manifest from '@assets';
interface Prototype {
  title: string;
  viewAll: boolean;
  type: number;
  des: string;
  des_color: string;
  Image: any;
  navigation: any;
  data: any;
}
export const HomeTitle = (props: Prototype) => {
  const Navigate = () => {
    if (props?.type == 1) {
       props?.navigation?.navigate('ViewAllScreen', {
        data: props?.data,
        title: props?.title,
        desigin_type:6
      });
    } else if (props?.type == 2) {
      props?.navigation?.navigate('ViewAllScreen', {
        data: props?.data,
        title: props?.title,
        desigin_type:5
      });
    }
  };
  return (
    <View
      style={[
        tailwind('px-3  flex-row rounded-xl items-center   mx-3 mb-3 mt-3'),
      ]}
    >
      {props?.Image}
      <View>
        <View style={[tailwind('flex-row')]}>
          <Text style={tailwind('font-20 font-bold px-2')}>{props?.title}</Text>

          <Image
            source={assets_manifest?.leaves}
            style={[tailwind(''), { height: 20, width: 20 }]}
          />
        </View>
        {props?.des !== '' && (
          <Text
            style={[
              tailwind('font-13 font-bold px-2'),
              { color: props?.des_color },
            ]}
          >
            {props?.des}
          </Text>
        )}
      </View>

      {props?.viewAll && (
        <TouchableOpacity
          style={[tailwind(''), { marginLeft: 'auto' }]}
          onPress={Navigate}
        >
          <Text>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
