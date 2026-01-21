import { Topbar } from '@Component';
import tailwind from '@tailwind';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUser_id } from '../../workers/localStorage';
import { getGetUser, getGetUser1, getUpdate_user } from '@remote/userRemote';
import { useQuery } from 'react-query';
import { errorBox } from '../../workers/utils';
import { saveUser } from '@actions/userActions';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const User_id = useSelector((state: any) => state.user.user_id);
  const UserResponse = useQuery(['getUpdate_user', User_id], getGetUser);
  // console.log('UserResponseUserResponseUserResponse', UserResponse?.data);
  //   const get_user_id=useSelector()
  useEffect(() => {
    if (UserResponse?.isSuccess && UserResponse?.data) {
      setName(UserResponse?.data?.GTS?.user_name || '');
      setAlternateMobile(
        UserResponse?.data?.GTS?.user_alternate_phone_number || '',
      );
      setEmail(UserResponse?.data?.GTS?.user_email || '');
    }
  }, [UserResponse?.isSuccess, UserResponse?.data]);
  const Edit = async () => {
    const id = await getUser_id();
    if (!name) {
      errorBox('Invalid Username');
      return;
    } else if (!email) {
      errorBox('Invalid User Email');
      return;
    }
    if (alternateMobile) {
      const Response =
        UserResponse?.data?.GTS?.user_phone_number !== `+91${alternateMobile}`;
      if (alternateMobile?.length != 10) {
        errorBox('Invalid Alternative Mobile Number');
        return;
      } else if (!Response) {
        errorBox('User Login Mobile number same to Alterative Mobile Number ');
        return;
      }
    }

    setLoading(true);
    const Response = await getUpdate_user({
      user_id: id,
      alt_mobile_number: alternateMobile,
      email: email,
      mobile_number: UserResponse?.data?.GTS?.user_phone_number,
      name: name,
    });

    if (Response) {
      setLoading(false);
      //   UserResponse?.refetch();
      const Response = await getGetUser1({
        user_id: id,
      });
      dispatch(saveUser(Response?.GTS));
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabNavigation' }],
      });
      // console.log('ResponseResponseResponse', Response);
    } else {
      setLoading(false);
    }
  };
  return (
    <View style={tailwind('flex-1 bg-white')}>
      <Topbar title="Edit Profile" type={3} />

      <View style={tailwind('flex-1 px-6')}>
        <View style={tailwind('items-center  mt-10')}>
          <Image
            style={{ width: 200, height: 200, marginTop: 20 }}
            source={require('../../assets/images/img_login.png')}
            resizeMode="contain"
          />
        </View>
        <View style={tailwind('pt-8')}>
          {/* Name Field */}
          <View style={tailwind('mb-3')}>
            <TextInput
              style={tailwind(
                'border border-gray-300 rounded-full bg-white text-black px-5 py-3 text-gray-900 ',
              )}
              placeholder="Your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={tailwind('mb-3')}>
            <View
              style={tailwind(
                'flex-row items-center border border-gray-300 rounded-full bg-white pl-4 pr-5',
              )}
            >
              <Text style={tailwind('text-black font-bold text-lg')}>+91</Text>
              <View style={tailwind('w-px h-6 bg-gray-300 mx-3')} />
              <TextInput
                style={tailwind('flex-1 py-3 text-black text-base')}
                placeholder="Alternative Mobile Number"
                placeholderTextColor="#9CA3AF"
                value={alternateMobile}
                onChangeText={setAlternateMobile}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>
          {/* Email Field */}
          <View style={tailwind('mb-3')}>
            <TextInput
              style={tailwind(
                'border border-gray-300 rounded-full bg-white text-black px-5 py-3 text-gray-900 ',
              )}
              placeholder="Your Email Address"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Alternate Mobile */}

          {/* Continue Button */}
          <TouchableOpacity
            onPress={() => {
              Edit();
            }}
            disabled={loading ? true : false}
            style={tailwind('bg-green rounded-full py-4 items-center mt-3')}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size={'small'} color={'#45302B'} />
            ) : (
              <Text
                style={[
                  tailwind('text-white font-18 font-bold'),
                  { textTransform: 'uppercase' },
                ]}
              >
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;
