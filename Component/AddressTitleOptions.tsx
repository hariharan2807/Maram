import React from 'react';
import tailwind from '@tailwind';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

interface PropTypes {
  title: string;
  setTitle: any;
}

export default function AddressTitleOptions(props: PropTypes) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={[tailwind('flex  flex-row items-center justify-between mx-3')]}
      >
        <TouchableOpacity
          onPress={() => props.setTitle('Home')}
          style={[
            tailwind(
              `px-4 flex-grow rounded py-2 ${
                props.title === 'Home'
                  ? 'bg-primary'
                  : 'bg-white border  border-gray-500'
              }`,
            ),
          ]}
        >
          <Text
            style={[
              tailwind(
                `font-bold text-center font-15 ${
                  props.title === 'Home' ? 'text-white' : 'text-black'
                }`,
              ),
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.setTitle('Work')}
          style={[
            tailwind(
              `px-4 flex-grow mx-3 rounded py-2 ${
                props.title === 'Work'
                  ? 'bg-primary'
                  : 'bg-white border  border-gray-500'
              }`,
            ),
          ]}
        >
          <Text
            style={[
              tailwind(
                `font-bold text-center font-15 ${
                  props.title === 'Work' ? 'text-white' : 'text-black'
                }`,
              ),
            ]}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.setTitle('')}
          style={[
            tailwind(
              `px-4 flex-grow rounded py-2 ${
                props.title !== 'Home' && props.title !== 'Work'
                  ? 'bg-primary'
                  : 'bg-white border  border-gray-500'
              }`,
            ),
          ]}
        >
          <Text
            style={[
              tailwind(
                `font-bold text-center font-15 ${
                  props.title !== 'Home' && props.title !== 'Work'
                    ? 'text-white'
                    : 'text-black'
                }`,
              ),
            ]}
          >
            {' '}
            Other
          </Text>
        </TouchableOpacity>
      </View>
      <View  style={[tailwind(' my-2 mt-5 px-2')]}>
      <CustomTitle value={props.title} setTitle={props.setTitle} />

      </View>
      {/* {props.title !== 'Home' && props.title !== 'Work' ? ( */}
      {/* ) : null} */}
    </>
  );
}

const CustomTitle = (props: any) => {
  return (
    <View style={[tailwind('flex  flex-row  ')]}>
      <TextInput
        value={props.value}
        onChangeText={e => props.setTitle(e)}
        // autoFocus={true}
        placeholder="My Office, Home.,"
        placeholderTextColor={'black'}
        style={[tailwind('bg-gray-200 rounded text-black  flex-grow p-3 font-bold')]}
      />
    </View>
  );
};

AddressTitleOptions.propTypes = {
  text: PropTypes.string,
  //   optionalBool: PropTypes.bool,
  //   optionalFunc: PropTypes.func,
  //   optionalNumber: PropTypes.number,
  //   optionalObject: PropTypes.object,
};
