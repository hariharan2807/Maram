import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import tailwind from '@tailwind';
import { GlobalDialogModal, Topbar } from '@Component';
import assets_manifest from '@assets';
import {
  CallIcon,
  Logout,
  MyOrderIcon,
  OrderStatusIcon,
  RightIcon,
} from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { removeToken, removeUser_id } from '../../workers/localStorage';
import RNRestart from 'react-native-restart';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { get_DeleteAccount } from '@remote/userRemote';
const log = console.log;

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false);
  const [support, setSupport] = useState(false);

  const [deactivityModal, setDeactivityModal] = useState(false);
  const ProfileData = useSelector((state: any) => state.user.userInfo);
  const AppControll = useSelector((state: any) => state.app.app_controll);
  const location = useSelector((state: any) => state.app.locationState);
  const ID = useSelector((state: any) => state.user.user_id);

  // console.log(
  //   'locationlocationlocationlocationlocation',
  //   AppControll?.contact_number,
  // );
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  const phoneUrl = Platform.select({
    ios: `telprompt:${AppControll?.contact_number}`, // Shows confirmation dialog
    android: `tel:${AppControll?.contact_number}`, // Directly dials
  });
  const logout = async () => {
    setLogoutModal(false);
    await removeUser_id();
    RNRestart.Restart();
  };
  const deactivateAction = async () => {
    const Response = await get_DeleteAccount({
      user_id: ID,
    });
    setDeactivityModal(false);
    await removeUser_id();

    RNRestart.Restart();
  };
  // console.log("AppControll?.terms_contion",AppControll)
  return (
    <View style={[tailwind('bg-secondary h-full')]}>
      <Topbar title="Account" type={3} />
      <ScrollView style={tailwind('flex-1 ')}>
        <View
          style={[tailwind('bg-secondary rounded-2xl mx-4 mt-5 shadow-md p-5')]}
        >
          <View style={[tailwind('items-center')]}>
            <Text style={tailwind('text-xl font-bold text-black')}>
              {ProfileData?.user_name}
            </Text>
            <View style={[tailwind('flex-row items-center my-2')]}>
              <Text style={tailwind('text-gray-500 mr-2  font-semi')}>
                {ProfileData?.user_phone_number}
              </Text>
              <Image
                tintColor={'green'}
                style={[tailwind(''), { height: 20, width: 20 }]}
                source={assets_manifest?.verify1}
              />
            </View>

            {/* <MaterialIcons name="verified" color={'green'} size={20} /> */}
            <TouchableOpacity
              style={[tailwind('')]}
              onPress={() => {
                navigation?.navigate('EditProfileScreen');
              }}
            >
              <Text style={tailwind('text-green mt-1 font-bold')}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={tailwind('mt-3')}>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('FavoriteScreen');
              }}
              style={[
                tailwind(
                  'flex-row items-center shadow-md justify-between rounded-xl px-4 py-4 mb-3',
                ),
                {
                  backgroundColor: 'white',
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                },
              ]}
            >
              <View style={tailwind('flex-row items-center')}>
                <Image
                  style={[tailwind(''), { height: 20, width: 20 }]}
                  source={assets_manifest?.heartoutLine}
                />
                {/* <Entypo name="heart-outlined" color={'gray'} size={20} /> */}
                <Text style={tailwind('ml-3  font-bold font-15 text-black')}>
                  My Favourite
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('OrderListScreen', {
                  text: 'Active Orders',
                });
              }}
              style={[
                tailwind(
                  'flex-row items-center shadow-md justify-between rounded-xl px-4 py-4 mb-3',
                ),
                {
                  backgroundColor: 'white',
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                },
              ]}
            >
              <View style={tailwind('flex-row items-center')}>
                <Image
                  style={[tailwind(''), { height: 20, width: 20 }]}
                  source={assets_manifest?.my_order}
                />
                <Text style={tailwind('ml-3  font-bold font-15 text-black')}>
                  Order Status
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('OrderHistoryScreeen', {
                  text: 'order History',
                });
              }}
              style={[
                tailwind(
                  'flex-row items-center shadow-md justify-between rounded-xl px-4 py-4 mb-3',
                ),
                {
                  backgroundColor: 'white',
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                },
              ]}
            >
              <View style={tailwind('flex-row items-center')}>
                <Image
                  style={[tailwind(''), { height: 20, width: 20 }]}
                  source={assets_manifest?.cart1}
                />
                <Text style={tailwind('ml-3 font-bold font-15 text-black')}>
                  My Orders
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('AddressListScreen');
              }}
              style={[
                tailwind(
                  'flex-row items-center shadow-md justify-between rounded-xl px-4 py-4 mb-3',
                ),
                {
                  backgroundColor: 'white',
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                },
              ]}
            >
              <View style={tailwind('flex-row items-center')}>
                <Image
                  style={[tailwind(''), { height: 20, width: 20 }]}
                  source={assets_manifest?.address}
                />
                <Text style={tailwind('ml-3  font-bold font-15 text-black')}>
                  Address
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
          </View>
          <View style={tailwind('mt-6')}>
            <TouchableOpacity
              onPress={
                () => {
                  setSupport(true);
                  // navigation?.navigate('WebViewScreen', {
                  //   title: 'Terms & Conditions',
                  //   url: AppControll?.terms_contion,
                  // });
                }

                // openLink(AppControll?.terms_contion)
              }
            >
              <Text style={tailwind('text-gray-500 mb-3  font-bold')}>
                Customer Suport
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => {
                  navigation?.navigate('WebViewScreen', {
                    title: 'Privacy Policy',
                    url: AppControll?.privacy_policy,
                  });
                }
                // openLink(AppControll?.privacy_policy)
              }
            >
              <Text style={tailwind('text-gray-500 mb-3 font-bold')}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => {
                  navigation?.navigate('WebViewScreen', {
                    title: 'Terms & Conditions',
                    url: AppControll?.terms_and_conditions,
                  });
                }

                // openLink(AppControll?.terms_contion)
              }
            >
              <Text style={tailwind('text-gray-500 mb-3 font-bold')}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => {
                  navigation?.navigate('WebViewScreen', {
                    title: 'About us',
                    url: AppControll?.about_us,
                  });
                }

                // onPress={() => openLink(AppControll.about_us)
              }
            >
              <Text style={tailwind('text-gray-500 mb-3 font-bold')}>
                About us
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tailwind('mt-6')}>
            <TouchableOpacity
              onPress={() => {
                setLogoutModal(true);
              }}
              style={tailwind('flex-row items-center mb-3')}
            >
              <Logout />
              <Text style={tailwind('ml-2 text-red-600 font-semi')}>
                Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind('flex-row items-center')}
              onPress={() => {
                setDeactivityModal(true);
              }}
            >
              <Logout />
              <Text style={tailwind('ml-2 text-red-600 font-semi')}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={support}
        animationInTiming={200}
        animationOutTiming={150}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        scrollHorizontal={true}
        onBackdropPress={() => {
          setSupport(false);
        }}
      >
        <View style={tailwind('bg-white rounded')}>
          <View style={[tailwind('p-3')]}>
            <Text
              style={[
                tailwind('text-lg text-center text-black pb-2 font-bold'),
              ]}
            >
              Customer Support
            </Text>
          </View>
          <View
            style={[
              tailwind('flex px-3 py-3 flex-row justify-between items-center'),
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setSupport(false);
                Linking.openURL(
                  `whatsapp://send?phone=${AppControll?.contact_number}`,
                );
              }}
              style={[
                tailwind('p-3  border flex-row items-center rounded-xl'),
                { width: '48%', justifyContent: 'center' },
              ]}
            >
              <Image
                style={[tailwind(''), { height: 20, width: 20 }]}
                source={assets_manifest?.whatsapp}
              />
              <Text
                style={[
                  tailwind('text-center ml-1 font-15 font-bold text-black'),
                ]}
              >
                Whatsapp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSupport(false);
                Linking.openURL(phoneUrl);
              }}
              style={[
                tailwind('p-3 flex-row items-center border rounded-xl'),
                { width: '48%', justifyContent: 'center' },
              ]}
            >
              <CallIcon />
              {/* <Ionicons name="call" color="black" size={20} /> */}
              <Text
                style={[
                  tailwind('text-center ml-1 font-15 font-bold text-black'),
                ]}
              >
                Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <GlobalDialogModal
        target={1}
        title="Do you want to Logout from the Application ?"
        visible={logoutModal}
        setAlertModal={setLogoutModal}
        action={logout}
      />
      <GlobalDialogModal
        target={1}
        title="Do you want to Delete the Sunshine Account ?"
        visible={deactivityModal}
        setAlertModal={setDeactivityModal}
        action={deactivateAction}
      />
    </View>
  );
}
