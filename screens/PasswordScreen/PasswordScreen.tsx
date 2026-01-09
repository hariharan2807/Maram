import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import tailwind from '@tailwind';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Topbar } from '@Component';
import { errorBox, infoBox } from '../../workers/utils';
import { getPasswordRemote, getResetPasswordRemote } from '@remote/userRemote';
import LottieView from 'lottie-react-native';
export default function PasswordScreen() {
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  console.log('routess------', route?.params?.mode, route?.params?.mobileno);
  // const PasswordCheck = async () => {
  //   if (!pass) {
  //     return errorBox('Enter Your Password');
  //   } else if (!rePass) {
  //     return errorBox('Enter Your Re-Password');
  //   } else if (pass !== rePass) {
  //     return errorBox('Mismatch Password and Re-Password');
  //   }
  //   setLoading(true);
  //   const Response =
  //     (await route?.params?.mode) === 'reset'
  //       ? getResetPasswordRemote({
  //           password: pass,
  //           password_confirmation: rePass,
  //           mobile_number: route?.params?.mobileno,
  //         })
  //       : getPasswordRemote({
  //           password: pass,
  //           password_confirmation: rePass,
  //         });
  //   console.log('response =-=-=-==-==', Response);
  //   if (Response?.status) {
  //     setLoading(false);
  //     infoBox(Response?.message);
  //     await navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'BottomTabNavigation' }],
  //     });
  //     console.log('setLoadingsetLoadingsetLoading', Response);
  //   } else {
  //     setLoading(false);
  //     route?.params?.mode === 'reset'
  //       ? errorBox(Response?.data?.message)
  //       : errorBox(Response?.res?.data?.message);
  //     console.log('ResponseResponseResponseResponseResponseResponse', Response);
  //   }
  // };
  const PasswordCheck = async () => {
    if (!pass) {
      return errorBox('Enter Your Password');
    } else if (!rePass) {
      return errorBox('Enter Your Re-Password');
    } else if (pass !== rePass) {
      return errorBox('Mismatch Password and Re-Password');
    }

    setLoading(true);

    try {
      let Response;

      if (route?.params?.mode === 'reset') {
        Response = await getResetPasswordRemote({
          password: pass,
          password_confirmation: rePass,
          mobile_number: route?.params?.mobileno,
        });
      } else {
        Response = await getPasswordRemote({
          password: pass,
          password_confirmation: rePass,
        });
      }

      // console.log('Response =', Response);

      if (Response?.status) {
        setLoading(false);
        infoBox(Response?.message);
        if (route?.params?.mode === 'reset') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabNavigation' }],
          });
        }
      } else {
        setLoading(false);

        const errMsg =
          // route?.params?.mode === 'reset'
          //   ? Response?.data?.message
          Response?.res?.data?.message;

        errorBox(errMsg || 'Something went wrong');
      }
    } catch (error) {
      console.log('Error in PasswordCheck:', error);
      setLoading(false);
      errorBox('Network error, please try again');
    }
  };

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <Topbar title="Set Password" type={1} />
      <ScrollView
        contentContainerStyle={tailwind('flex-grow justify-center')}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tailwind('items-center ')}>
          <Image
            style={{ height: 120, width: '70%' }}
            resizeMode="contain"
            source={require('../../assets/images/SplashLogo.png')}
          />
        </View>
        <View style={tailwind('items-center mt-5 mb-5')}>
          <LottieView
            source={require('../../assets/gif/Ironingwomenn.json')}
            autoPlay
            loop
            style={{ height: 180, width: '85%' }}
          />
          {/* <Image
            style={{ height: 180, width: '85%' }}
            resizeMode="contain"
            source={require('../../assets/images/Login.png')}
          /> */}
        </View>
        <Text
          style={tailwind('text-black font-bold text-2xl text-center mt-8')}
        >
          Password
        </Text>
        <View style={[tailwind('mt-6'), { width: '90%', alignSelf: 'center' }]}>
          <TextInput
            style={[
              tailwind('px-4 py-3 border rounded-xl font-semi text-black'),
              { borderColor: 'silver' },
            ]}
            placeholder="Enter Password"
            value={pass}
            onChangeText={txt => setPass(txt)}
            placeholderTextColor="gray"
          />
          <TextInput
            style={[
              tailwind('px-4 py-3 mt-4 border rounded-xl font-semi text-black'),
              { borderColor: 'silver' },
            ]}
            placeholder="Enter Re-Password"
            value={rePass}
            onChangeText={txt => setRePass(txt)}
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            onPress={() => {
              PasswordCheck();
              // navigation?.navigate('BottomTabNavigation');
            }}
            disabled={loading ? true : false}
            style={[
              tailwind('px-6 py-3 mt-6 rounded-2xl bg-primary'),
              { width: '100%' },
            ]}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={'white'} size={'small'} />
            ) : (
              <Text
                style={tailwind('text-white text-lg text-center font-semi')}
              >
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
