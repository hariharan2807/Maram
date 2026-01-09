import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import tailwind from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { getAppControll, getGetUser1 } from '@remote/userRemote';
import { getToken, getUser_id } from '../../workers/localStorage';
import {
  saveJWTTokenAction,
  saveUser,
  saveuseridAction,
} from '@actions/userActions';
import { useQuery } from 'react-query';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import assets_manifest from '@assets';
import { saveAppcontrollAction } from '@actions/appActions';
export default function InitialScreen() {
  const UserState = useSelector((state: any) => state.app.locationState);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { height, width } = Dimensions.get('window');
  const User_id = useSelector((state: any) => state.user.user_id);

  const AppControll = useQuery(['getAppControllRemote'], getAppControll);
  // console.log('AppControllAppControll', AppControll?.data);
  useEffect(() => {
    if (AppControll?.data?.status) {
      // console.log('AppControllAppControll', AppControll?.data?.GTS);

      dispatch(saveAppcontrollAction(AppControll?.data?.GTS));
    }
  }, [AppControll?.data]);
  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     try {
  //       // const Token = await getToken();
  //       // if (Token) {
  //       //   dispatch(saveJWTTokenAction(Token));
  //       //   const Data = await getMyProfileRemote();
  //       //   // console.log('DataDataDataDataDataDataData', Data?.data?.password_status);
  //       //   if (Data?.status) {
  //       //     dispatch(saveUser(Data?.data));
  //       //   }
  //       //   if (Data?.data?.password_status === 0) {
  //       //     await navigation.reset({
  //       //       index: 0,
  //       //       routes: [{ name: 'PasswordScreen' }],
  //       //     });
  //       //   } else {
  //       //     await navigation.reset({
  //       //       index: 0,
  //       //       routes: [{ name: 'BottomTabNavigation' }],
  //       //     });
  //       //   }
  //       // } else {
  //       //   await navigation.reset({
  //       //     index: 0,
  //       //     routes: [
  //       //       { name: 'LoginScreen', params: { type: 2, Forget: false } },
  //       //     ],
  //       //   });
  //       // }
  //       await navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'BottomTabNavigation' }],
  //       });
  //     } catch (err) {
  //       console.error('Navigation error:', err);
  //     }
  //   }, 4000);
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    // Wait 5 seconds before initializing
    const timer = setTimeout(() => {
      const initializeApp = async () => {
        const ID = await getUser_id();
        if (ID) {
          dispatch(saveuseridAction(ID));
  
          const Response = await getGetUser1({
            user_id: ID,
          });
          if (
            Response?.status &&
            Response?.GTS?.user_email &&
            Response?.GTS?.user_name
          ) {
            dispatch(saveUser(Response?.GTS));
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabNavigation' }],
            });
          } else {
            await navigation.reset({
              index: 0,
              routes: [{ name: 'EditProfileScreen' }],
            });
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabNavigation' }],
          });
        }
      };
      initializeApp();
    }, 5000); // 5000 milliseconds = 5 seconds
  
    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={[tailwind('flex')]}>
      {/* Logo at Top */}
      <View style={[tailwind('items-center '), { justifyContent: 'center' }]}>
        <Image
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
          source={assets_manifest?.initiallogo}
        />
      </View>

      {/* GIF - Increased height taking remaining space */}
      {/* <View style={[tailwind('mb-40')]}>
        <FastImage
          source={require('../../assets/gif/laundry.gif')}
          resizeMode={
            Platform?.OS == 'android'
              ? FastImage.resizeMode.cover
              : FastImage.resizeMode.center
          }
          style={{ height: '100%', width: '100%' }}
        />
      </View> */}
    </View>
  );
}
