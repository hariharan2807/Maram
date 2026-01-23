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
  ImageBackground,
} from 'react-native';
import tailwind from '@tailwind';
import { GlobalDialogModal, Topbar } from '@Component';
import assets_manifest from '@assets';
import {
  AbountIcon,
  Address,
  BillHistoryIcon,
  CallIcon,
  ContactUsIcon,
  EditIcon,
  FeedBackIcon,
  Logout,
  MyOrderIcon,
  OrderStatusIcon,
  PayBillIcon,
  PrivacyPolicyIcon,
  RightIcon,
  SubscriptionIcontab,
  TermsCondtionIcon,
  TickIcon1,
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
import { INDIAN } from '@constants/API_constants';
const log = console.log;

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false);
  const [support, setSupport] = useState(false);

  const [deactivityModal, setDeactivityModal] = useState(false);

  const AppControll = useSelector((state: any) => state.app.app_controll);
  const location = useSelector((state: any) => state.app.locationState);
  const ID = useSelector((state: any) => state.user.user_id);
  const ProfileData = {
    user_name: 'Jayden Jackson',
    user_phone_number: '7348925084',
    user_email: 'Jack@jydn.com',
    bill_due_amount: 1745,
    subscriptions_count: 3,
    saved_address_count: 2,
    bill_history_count: 20,
    profile_image: '',
  };
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  const phoneUrl = Platform.select({
    ios: `telprompt:${AppControll?.contact_number}`,
    android: `tel:${AppControll?.contact_number}`,
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
  return (
    <View style={[tailwind('bg-white h-full')]}>
      <Topbar title="Account" type={3} />
      <ImageBackground
          style={[tailwind('flex-1'), { height: '100%', width: '100%' }]}
          source={assets_manifest?.background}
        >
      <ScrollView style={tailwind('flex-1 ')} showsVerticalScrollIndicator={false}>
        <View
          style={[tailwind('bg-white  rounded-2xl mx-4 mt-5 shadow-md p-5')]}
        >
          <View
            style={[
              tailwind('items-center flex-row'),
              { justifyContent: 'space-evenly' },
            ]}
          >
            <View style={[tailwind(''), { width: '15%' }]}>
              <Image
                style={[tailwind(''), { width: 50, height: 50 }]}
                resizeMode="contain"
                source={
                  ProfileData?.profile_image != ''
                    ? ProfileData?.profile_image
                    : assets_manifest?.Cancelled
                }
                defaultSource={assets_manifest?.Cancelled}
              />
            </View>
            <View style={[tailwind(''), { width: '70%' }]}>
              <Text style={tailwind('text-xl font-bold text-black')}>
                {ProfileData?.user_name}
              </Text>
              <View style={[tailwind('flex-row items-center my-2')]}>
                <Text style={tailwind('text-gray-500 mr-2  font-semi')}>
                  {ProfileData?.user_phone_number} | {ProfileData?.user_email}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[tailwind('')]}
              onPress={() => {
                navigation?.navigate('EditProfileScreen');
              }}
            >
              <EditIcon />
            </TouchableOpacity>
          </View>
          <View style={tailwind('mt-3')}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate('BillDetailScreen');
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
              <View style={tailwind('')}>
                <Image
                  style={[tailwind(''), { height: 24, width: 24 }]}
                  source={require('../../assets/icons/common/bank.png')}
                />
                <Text style={tailwind('my-2 font-bold font-15 text-black')}>
                  Pay Bill
                </Text>
                <Text style={tailwind('font-semi font-13 text-black')}>
                  Bill due amount {INDIAN} {ProfileData?.bill_due_amount}
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate('Subscriptions');
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
              <View style={tailwind('')}>
                <Image
                  style={[tailwind(''), { height: 24, width: 24 }]}
                  source={require('../../assets/icons/common/file.png')}
                />
                <Text style={tailwind('my-2 font-bold font-15 text-black')}>
                  My Subscription
                </Text>
                <Text style={tailwind('font-semi font-13 text-black')}>
                  {ProfileData?.subscriptions_count} subscriptions
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation?.navigate('BillDetailScreen');
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
              <View style={tailwind('')}>
                <Image
                  style={[tailwind(''), { height: 24, width: 24 }]}
                  source={require('../../assets/icons/common/clipboard.png')}
                />
                <Text style={tailwind('my-2 font-bold font-15 text-black')}>
                  Bill History
                </Text>
                <Text style={tailwind('font-semi font-13 text-black')}>
                  {ProfileData?.bill_history_count} bills
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
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
              <View style={tailwind('')}>
                <Image
                  style={[tailwind(''), { height: 24, width: 24 }]}
                  source={require('../../assets/icons/common/Address.png')}
                />
                <Text style={tailwind('my-2 font-bold font-15 text-black')}>
                  Delivery Address
                </Text>
                <Text style={tailwind('font-semi font-13 text-black')}>
                  {ProfileData?.saved_address_count} Saved Address
                </Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tailwind('mt-6 ')}>
          <Text style={[tailwind('font-bold text-black font-16  px-5')]}>
            Other Options
          </Text>
          <View
            style={[tailwind('bg-white  rounded-2xl mx-4 mt-5 shadow-md p-5')]}
          >
            <TouchableOpacity style={[tailwind('flex-row items-center py-2')]}>
              <FeedBackIcon />
              <Text style={tailwind('text-black ml-2  font-semi')}>
                Feedback
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[tailwind('flex-row items-center py-2')]}>
              <TermsCondtionIcon />
              <Text style={tailwind('text-black ml-2  font-semi')}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[tailwind('flex-row items-center py-2')]}>
              <PrivacyPolicyIcon />
              <Text style={tailwind('text-black ml-2  font-semi')}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[tailwind('flex-row items-center py-2')]}>
              <ContactUsIcon />
              <Text style={tailwind('text-black ml-2  font-semi')}>
                Contact Us
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[tailwind('flex-row items-center py-2')]}>
              <AbountIcon />
              <Text style={tailwind('text-black ml-2  font-semi')}>
                About us
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tailwind('mt-6 mb-6 px-5')}>
          <TouchableOpacity
            onPress={() => {
              setLogoutModal(true);
            }}
            style={tailwind('flex-row items-center mb-3')}
          >
            <Logout />
            <Text style={tailwind('ml-2 text-red-600 font-semi')}>Logout</Text>
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
      </ImageBackground>
    </View>
  );
}
