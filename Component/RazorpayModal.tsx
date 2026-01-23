import React, { useState } from 'react';
import tailwind from '@tailwind';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import assets from '@assets';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { errorBox } from '../workers/utils';
import { get_Razorpay } from '@remote/userRemote';
import { razorPayObjCreator } from '../workers/orderObjCreator';
import RazorpayCheckout from 'react-native-razorpay';
import { useSelector } from 'react-redux';

interface PropTypes {
  target: number;
  visible: boolean;
  title: string;
  subtitle?: string;
  action?(): void;
  setVisible?: any;
}
export default function RazorpayModal(props: PropTypes) {
  const navigation = useNavigation();
  const AppControll = useSelector((state: any) => state.app.app_controll);

  const [value, setValue] = useState('');
  const [errmessage, setErrmessage] = useState('');

  const closeModal = () => {
    if (props.setVisible) {
      props.setVisible(false);
    }
  };
  const Action = async () => {
    if (!value) {
      setErrmessage('Please Enter Your Amount');
      setTimeout(() => {
        setErrmessage('');
      }, 2000);
      return;
    }

    const Razorpay = await get_Razorpay({
      amount: value,
      order_id: '908',
    });
    console.log('hari haran 12121212', Razorpay);

    if (Razorpay?.GTS?.id) {
      let rzOrder = razorPayObjCreator(
        // 'rzp_test_RufpRBgf2spPr6',
        AppControll?.razorpay_merchant_key,
        Razorpay?.GTS?.amount,
        Razorpay?.GTS?.id,
        Razorpay?.GTS?.receipt,
        // order_string?.current,
      );
      if (rzOrder) {
        let a = true;
        try {
          RazorpayCheckout.open(rzOrder)
            .then(async (success: any) => {
              console.log('successsuccesssuccess', success);
              const payloadData = {
                order_id: order_id?.current,
                payment_status: '1',
                payment_message: 'success',
                payment_type: 'Razorpay',
                razorPayId: success.razorpay_order_id,
                razorpay_order_id: success.razorpay_payment_id,
                user_id: ID?.toString(),
              };
              // const OrderStatusDetail = await get_OrderStatus(payloadData);
              // setSuccesserror(true);
              // setVisible(true);
            })
            .catch(async (err: any) => {
              // setSuccesserror(false);
              props?.setVisible(false);
              // console.log('errerrerrerrerrerrerr', err);
            });
        } catch (error) {}
      }
    }
  };
  //   const OnlinePayment = async (payment: string) => {
  //       const Razorpay = await get_Razorpay({
  //         amount: value,
  //         // order_id: payment,
  //       });
  //       if (Razorpay?.GTS?.id) {
  //         let rzOrder = razorPayObjCreator(
  //           'rzp_test_RufpRBgf2spPr6',
  //         //   AppControll?.razorpay_merchant_key,
  //           Razorpay?.GTS?.amount,
  //           Razorpay?.GTS?.id,
  //           Razorpay?.GTS?.receipt,
  //           // order_string?.current,
  //         );
  //         if (rzOrder) {
  //           let a = true;
  //           try {
  //             RazorpayCheckout.open(rzOrder)
  //               .then(async (success: any) => {
  //                 console.log('successsuccesssuccess', success);
  //                 const payloadData = {
  //                   order_id: order_id?.current,
  //                   payment_status: '1',
  //                   payment_message: 'success',
  //                   payment_type: 'Razorpay',
  //                   razorPayId: success.razorpay_order_id,
  //                   razorpay_order_id: success.razorpay_payment_id,
  //                   user_id: ID?.toString(),
  //                 };
  //                 // const OrderStatusDetail = await get_OrderStatus(payloadData);
  //                 // setSuccesserror(true);
  //                 // setVisible(true);
  //               })
  //               .catch(async (err: any) => {
  //                 // setSuccesserror(false);
  //                 // setVisible(true);
  //                 // console.log('errerrerrerrerrerrerr', err);
  //               });
  //           } catch (error) {}
  //         }
  //       }
  //       // console.log('RazorpayRazorpayRazorpayRazorpayRazorpay', Razorpay);
  //     };
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={200}
      animationOutTiming={150}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      scrollHorizontal={true}
      onBackdropPress={closeModal}
    >
      <View style={tailwind('bg-white rounded-xl')}>
        <View style={[tailwind('p-3 my-5')]}>
          <TextInput
            value={value}
            onChangeText={e => {
              setValue(e);
            }}
            style={[
              tailwind(
                'bg-white rounded-xl px-3  flex-grow font-bold text-black py-3 border',
              ),
            ]}
            placeholder="Enter your Amount"
            placeholderTextColor={'black'}
          />
          {errmessage && (
            <Text
              style={[tailwind('font-14 text-red mt-5 font-bold text-center')]}
            >
              {errmessage}
            </Text>
          )}
        </View>
        <View
          style={[tailwind('flex flex-row justify-between items-center'), {}]}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={[
              tailwind('p-3 flex-grow bg-gray-200'),
              { borderBottomLeftRadius: 10 },
            ]}
          >
            <Text style={[tailwind('text-center font-bold text-black')]}>
              CANCEL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Action();
            }}
            style={[
              tailwind('p-3 flex-grow bg-green'),
              { borderBottomRightRadius: 10 },
            ]}
          >
            <Text style={[tailwind('text-center font-bold text-white')]}>
              PAY NOW
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
