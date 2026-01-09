import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tailwind from '../tailwind';
import { BackIcon, SearchIcon, SearchIcons } from '../assets/icons';
import assets_manifest from '@assets';
import Feather from 'react-native-vector-icons/Feather';

interface TopbarType {
  title: string;
  type: number;
}

const Topbar = (props: TopbarType) => {
  const navigation = useNavigation();
  if (props.type === 1) {
    return (
      <View
        style={[
          tailwind('flex-row items-center  px-3 '),
          {
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'silver',
          },
        ]}
      >
        <TouchableOpacity
          style={[tailwind(' px-3 py-3 ')]}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
        >
          <BackIcon />
        </TouchableOpacity>
        <View style={[tailwind('flex-1 '), { marginRight: 10 }]}>
          <Text
            style={[
              tailwind(' py-4 text-primary font-medium font-15'),
              { textAlign: 'right' },
            ]}
          >
            {props?.title}
          </Text>
        </View>
      </View>
    );
  } else if (props.type === 2) {
    return (
      <View style={[tailwind('flex-row items-center bg-white '), {}]}>
        {/* <BackIcon color={'#0A8E45'} /> */}
        <View style={[tailwind('flex-1 '), { marginRight: 10 }]}>
          <Text
            style={[
              tailwind(' py-4 text-primary font-medium font-15'),
              { textAlign: 'right' },
            ]}
          >
            {props?.title}
          </Text>
        </View>
      </View>
    );
  } else if (props?.type === 4) {
    return (
      <View style={[tailwind('flex-row items-center bg-primary '), {}]}>
        <TouchableOpacity
          style={[tailwind('ml-3')]}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
        >
          <BackIcon />
        </TouchableOpacity>
        <Image
          style={[tailwind(''), { height: 40, width: 300 }]}
          resizeMode="contain"
          source={assets_manifest?.homeimage}
        />
        {/* <View style={[tailwind('flex-1 mr-3')]}>
          <Text
            numberOfLines={1}
            style={[
              tailwind(' py-4 text-white font-bold font-15 w-full'),
              { textAlign: 'right' },
            ]}
          >
            {props?.title}
          </Text>
        </View> */}
      </View>
    );
  } else if (props?.type === 5) {
    return (
      <View
        style={[
          tailwind('flex-row items-center bg-primary '),
          { justifyContent: 'space-between' },
        ]}
      >
        <TouchableOpacity
          style={[tailwind('ml-3')]}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={[tailwind(' mr-3')]}>
          <Text
            numberOfLines={1}
            style={[
              tailwind(' py-4 text-white font-bold font-15 w-full'),
              { textAlign: 'right' },
            ]}
          >
            {props?.title}
          </Text>
        </View>
        <TouchableOpacity
          style={[tailwind('mx-3')]}
          onPress={() => {
            navigation?.navigate('SearchScreen');
          }}
        >
          <SearchIcons color={'white'} />

          {/* <Feather color={'white'} size={20} name="search" /> */}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={[tailwind('flex-row items-center bg-primary '), {}]}>
        <TouchableOpacity
          style={[tailwind('ml-3')]}
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
        >
          <BackIcon />
        </TouchableOpacity>
        <View style={[tailwind('flex-1 mr-3')]}>
          <Text
            numberOfLines={1}
            style={[
              tailwind(' py-4 text-white font-bold font-15 w-full'),
              { textAlign: 'right' },
            ]}
          >
            {props?.title}
          </Text>
        </View>
      </View>
    );
  }
};

export default Topbar;
