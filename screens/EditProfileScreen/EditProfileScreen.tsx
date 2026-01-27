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
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUser_id } from '../../workers/localStorage';
import { getGetUser, getGetUser1, getUpdate_user } from '@remote/userRemote';
import { useQuery } from 'react-query';
import { errorBox } from '../../workers/utils';
import { saveUser } from '@actions/userActions';
import { useNavigation } from '@react-navigation/native';
import assets_manifest from '@assets';

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
    <View style={tailwind('flex-1 bg-gray-50')}>
      <Topbar title="Edit Profile" type={3} />

      <ScrollView style={tailwind('flex-1')}>
        {/* Profile Picture Section */}
        <View style={tailwind('items-center py-8')}>
          <View style={tailwind('relative')}>
            <Image
              style={{ width: 200, height: 200, marginTop: 20 }}
              source={require('../../assets/images/homeimage.png')}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Form Container */}
        <View style={tailwind('px-5')}>
          {/* Form Fields Container */}
          <View style={tailwind('bg-white rounded-2xl p-5 mb-6 ')}>
            {/* Name Field */}
            <View style={tailwind('mb-4')}>
              <Text style={tailwind('text-gray-600 text-sm font-medium mb-1')}>
                Name
              </Text>
              <TextInput
                style={tailwind(
                  'border border-gray-200 rounded-xl px-4 py-3 text-gray-900',
                )}
                placeholder="Your name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Alternate Mobile Field */}
            <View style={tailwind('mb-4')}>
              <Text style={tailwind('text-gray-600 text-sm font-medium mb-1')}>
                Alternate Mobile
              </Text>
              <View
                style={tailwind(
                  'flex-row items-center border border-gray-200 rounded-xl px-4 py-3',
                )}
              >
                <Text style={tailwind('text-gray-700 font-medium')}>+91</Text>
                <TextInput
                  style={tailwind('flex-1 ml-3 text-gray-900')}
                  placeholder="Mobile number"
                  placeholderTextColor="#9CA3AF"
                  value={alternateMobile}
                  onChangeText={setAlternateMobile}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={tailwind('mb-2')}>
              <Text style={tailwind('text-gray-600 text-sm font-medium mb-1')}>
                Email Address
              </Text>
              <TextInput
                style={tailwind(
                  'border border-gray-200 rounded-xl px-4 py-3 text-gray-900',
                )}
                placeholder="Your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={tailwind('')}>
            <TouchableOpacity
              onPress={Edit}
              disabled={loading}
              style={[
                tailwind('rounded-xl py-4 items-center'),
                loading ? tailwind('bg-gray-300') : tailwind('bg-green'),
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#45302B" />
              ) : (
                <Text style={tailwind('text-white font-semi text-lg')}>
                  Save Profile
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
