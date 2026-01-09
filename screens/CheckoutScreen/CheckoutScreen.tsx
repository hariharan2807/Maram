import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { useQuery } from 'react-query';
import {
  get_Create_order,
  get_OrderStatus,
  get_Payment,
  get_Razorpay,
} from '@remote/userRemote';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreenLoading, Topbar } from '@Component';
import assets_manifest from '@assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import { errorBox } from '../../workers/utils';
import { razorPayObjCreator } from '../../workers/orderObjCreator';
import RazorpayCheckout from 'react-native-razorpay';
import Modal from 'react-native-modal';
import tailwind from '@tailwind';
import {
  updateCart,
  updateCoupon,
  updateDelivery_charge,
  updateSelectedAddressAction,
} from '@actions/userActions';

export default function CheckoutScreen() {
  const { width, height } = Dimensions.get('window');
  const order_id = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const routes = useRoute();
  const ID = useSelector((state: any) => state.user.user_id);
  const Branch = useSelector((state: any) => state.app.branch);
  const CartState = useSelector((state: any) => state.user.cart);
  const DeloiveryCharge = useSelector(
    (state: any) => state.user.delivery_chargs?.delivery_charge,
  );
  console.log("DeloiveryChargeDeloiveryCharge",DeloiveryCharge)
  const Couponstate = useSelector((state: any) => state.user.coupon);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const selected_address = useSelector(
    (state: any) => state.user.selected_address,
  );
  const AppControll = useSelector((state: any) => state.app.app_controll);
  const [visible, setVisible] = useState(false);
  const [successerror, setSuccesserror] = useState(true);

  const PaymentList = useQuery(['get_Payment', ID], get_Payment, {
    refetchInterval: 5000,
  });
  const scaleFont = (size: number) => (width / 375) * size;

  if (PaymentList?.isLoading) {
    return <FullScreenLoading />;
  }
  // console.log('AppControllAppControll', AppControll);
  const paymentMethods = PaymentList?.data?.GTS || [];
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const currentDate = getCurrentDate();

  const Variation = CartState.map((item: any) => ({
    eggless: item?.eggless || '0',
    eggless_amount: item?.eggless_amount || '0',
    no_quantity: item?.quantity?.toString() || '0',
    product_id: item?.product_id?.toString() || '',
    recipe_price:
      item?.product_price?.toString() ||
      item?.variation?.product_price?.toString() ||
      '0',
    variation:
      item?.variation?.product_variation && item?.variation?.product_unit
        ? `${item?.variation?.product_variation} ${item?.variation?.product_unit}`
        : '',
    variation_id:
      item?.product_price_id?.toString() ||
      item?.variation?.product_price_id?.toString() ||
      '',
  }));
  const recipe_total_amount = CartState.reduce((sum: number, item: any) => {
    return (
      sum + parseFloat(item?.product_price || 0) * parseInt(item?.quantity || 0)
    );
  }, 0);
  const deliveryCharge = parseFloat(DeloiveryCharge || 0);
  const discountAmount = parseFloat(Couponstate?.caluculate_amount || 0);
  const total_amount = recipe_total_amount + deliveryCharge - discountAmount;

  const Payload = {
    address_id: selected_address?.user_address_id,
    birthday_hint: '',
    birthday_img: '',
    branch_id: Branch?.branch_id,
    coupon_applied: discountAmount?.toString(),
    delivery_charge: DeloiveryCharge?.toString(),
    delivery_date: currentDate,
    message: routes?.params?.massege,
    payment_type: selectedPayment?.payment_method_name,
    variation: Variation,
    recipe_total_amount: recipe_total_amount.toString(),
    total_amount: (total_amount + parseFloat('0')).toString(),
    user_id: ID?.toString() || '',
    os: Platform?.OS === 'android' ? 0 : 1,
  };
  const OnlinePayment = async (payment: string) => {
    const Razorpay = await get_Razorpay({
      amount: Payload?.total_amount,
      order_id: payment,
    });
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
              const OrderStatusDetail = await get_OrderStatus(payloadData);
              setSuccesserror(true);
              setVisible(true);
            })
            .catch(async (err: any) => {
              setSuccesserror(false);
              setVisible(true);
              // console.log('errerrerrerrerrerrerr', err);
            });
        } catch (error) {}
      }
    }
    // console.log('RazorpayRazorpayRazorpayRazorpayRazorpay', Razorpay);
  };
  const handlePlaceOrder = async () => {
    // razorpay_merchant_id,
    // razorpay_merchant_key
    if (!selectedPayment) {
      errorBox('Please select a payment method');
      return;
    }
    const Response = await get_Create_order(Payload);
    // console.log('ResponseResponseResponse', Response?.order_id);
    if (Response?.order_id) {
      order_id.current = Response?.order_id;
      if (selectedPayment?.payment_method_id == 1) {
        const payloadData = {
          order_id: Response?.order_id,
          payment_status: '1',
          payment_message: 'success',
          payment_type: 'Cash on Delivery',
          razorPayId: '',
          razorpay_order_id: '',
          user_id: ID?.toString(),
        };
        const OrderStatusDetail = await get_OrderStatus(payloadData);
        if (OrderStatusDetail?.order_id) {
          setSuccesserror(true);
          setVisible(true);
        }
        console.log(
          'OrderStatusDetailOrderStatusDetailOrderStatusDetail',
          OrderStatusDetail,
        );
      } else {
        OnlinePayment(Response?.order_id);
      }
    } else {
      errorBox('Order Failed!');
      order_id.current = null;
    }
  };
  const CloseCart = async () => {
    const payloadData = {
      order_id: order_id?.current,
      payment_status: '0',
      payment_message: 'Cancelled',
      payment_type: 'Razorpay',
      razorPayId: '',
      razorpay_order_id: '',
      user_id: ID?.toString(),
    };
    const OrderStatusDetail = await get_OrderStatus(payloadData);
    // console.log('OrderStatusDetailOrderStatusDetail', OrderStatusDetail);
    if (OrderStatusDetail?.order_id) {
      dispatch(updateCart([]));
      dispatch(updateDelivery_charge(null));
      dispatch(updateSelectedAddressAction(null));
      dispatch(updateCoupon(null));
      setVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabNavigation' }],
      });
    }
  };
  const CashOnDelivery = async () => {
    const payloadData = {
      order_id: order_id?.current,
      payment_status: '1',
      payment_message: 'success',
      payment_type: 'Cash on Delivery',
      razorPayId: '',
      razorpay_order_id: '',
      user_id: ID?.toString(),
    };
    const OrderStatusDetail = await get_OrderStatus(payloadData);
    if (OrderStatusDetail?.order_id) {
      setSuccesserror(true);
      setVisible(true);
    }
  };
  const OnPlaced = async () => {
    dispatch(updateCart([]));
    dispatch(updateDelivery_charge(null));
    dispatch(updateSelectedAddressAction(null));
    dispatch(updateCoupon(null));
    setVisible(false);
navigation?.navigate('SingleOrderScreen',{order_id: order_id?.current,screen:false})
    // navigation.reset({
    //   index: 1,
    //   routes: [
    //     {
    //       name: 'SingleOrderScreen',
    //       params: { order_id: order_id?.current },
    //     },
    //   ],
    // });
  };
  //  const Data= paymentMethods?.some(
  //     item => item.payment_method_id === '1' && item?.payment_method_status !=="0",
  //   )
  //   console.log("DataData",Data,PaymentList?.data?.GTS)
  const renderPaymentOption = (method: any) => {
    const isSelected =
      selectedPayment?.payment_method_id === method.payment_method_id;
    const isRazorpay = method.payment_method_name
      .toLowerCase()
      .includes('razorpay');

    return (
      <TouchableOpacity
        key={method?.payment_method_id}
        style={[
          styles.paymentOption,
          isSelected && styles.paymentOptionSelected,
        ]}
        onPress={() => setSelectedPayment(method)}
        activeOpacity={0.7}
      >
        <View style={styles.paymentOptionContent}>
          {isRazorpay ? (
            <View style={styles.razorpayContainer}>
              <Image
                source={assets_manifest?.img_razorpay}
                style={styles.razorpayLogo}
                resizeMode="contain"
              />
              {/* <Text style={styles.razorpayText}>Razorpay</Text> */}
            </View>
          ) : (
            <Text style={[styles.paymentText]}>
              {method.payment_method_name}
            </Text>
          )}

          {isSelected && (
            <View style={styles.checkmarkContainer}>
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Topbar title="Check out Payment" type={3} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose your Payment Option</Text>

        <View style={styles.paymentOptionsContainer}>
          {paymentMethods.map(
            (method: any) =>
              method.payment_method_status === '1' &&
              renderPaymentOption(method),
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={visible}
        animationInTiming={200}
        animationOutTiming={150}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        scrollHorizontal={true}
        onBackdropPress={() => {
          setVisible(true);
        }}
        onBackButtonPress={() => {
          setVisible(true);
        }}
      >
        <View style={tailwind('bg-white rounded')}>
          <View style={[tailwind('py-5 items-center')]}>
            {!successerror && (
              <Text
                style={[
                  tailwind(' my-5 text-red text-center  font-bold'),
                  { fontSize: scaleFont(30) },
                ]}
              >
                Failure
              </Text>
            )}
            <Image
              style={[
                tailwind(''),
                { height: 200, width: 200, marginTop: '10%' },
              ]}
              source={
                successerror
                  ? assets_manifest?.img_otp
                  : assets_manifest?.warning
              }
              resizeMode="contain"
            />
            {successerror ? (
              <View style={[tailwind('items-center')]}>
                <Text
                  style={[
                    tailwind(' my-5 text-black  font-bold'),
                    { fontSize: scaleFont(30) },
                  ]}
                >
                  Success
                </Text>
                <Text
                  style={[
                    tailwind('  text-gray-400  font-bold'),
                    { fontSize: scaleFont(14), width: '50%' },
                  ]}
                >
                  Your Order has been
                </Text>
                <Text
                  style={[
                    tailwind('  text-gray-400 pb-2 font-bold'),
                    { fontSize: scaleFont(14), width: '50%' },
                  ]}
                >
                  placed Successfully
                </Text>

                <View
                  style={[
                    tailwind(
                      'flex mx-3 mt-5 mb-3 flex-row justify-between items-center',
                    ),
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      OnPlaced();
                    }}
                    // onPress={props.action}
                    style={[
                      tailwind('p-3 mx-5 rounded-xl flex-grow bg-primary'),
                    ]}
                  >
                    <Text
                      style={[
                        tailwind('text-center font-bold text-white'),
                        { textTransform: 'uppercase' },
                      ]}
                    >
                      Track Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={[tailwind('items-center mt-5')]}>
                {/* <Text
                  style={[
                    tailwind(' my-5 text-black  font-bold'),
                    { fontSize: scaleFont(30) },
                  ]}
                >
                  Some technical troubles around with 
                </Text> */}
                <Text
                  style={[
                    tailwind('  text-gray-400  font-bold'),
                    { fontSize: scaleFont(14) },
                  ]}
                >
                  Some technical troubles around with
                </Text>
                <Text
                  style={[
                    tailwind('  text-gray-400  font-bold'),
                    { fontSize: scaleFont(14) },
                  ]}
                >
                  serve, Please Try Again
                </Text>

                <View
                  style={[
                    tailwind(
                      'flex mx-3 mt-5 mb-3 flex-row justify-between items-center',
                    ),
                  ]}
                >
                  {paymentMethods?.some(
                    item =>
                      item.payment_method_id === '1' &&
                      item?.payment_method_status !== '0',
                  ) && (
                    <TouchableOpacity
                      onPress={CashOnDelivery}
                      style={[
                        tailwind(
                          'p-3 mx-5 rounded-xl flex-grow bg-white border',
                        ),
                      ]}
                    >
                      <Text
                        style={[
                          tailwind('text-center font-bold text-black'),
                          { textTransform: 'uppercase' },
                        ]}
                      >
                        Cash On Delivery
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={[
                    tailwind(
                      'flex mx-3 mt-5 mb-3 flex-row justify-between items-center',
                    ),
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      CloseCart();
                    }}
                    style={[
                      tailwind('p-3 mx-5 rounded-xl flex-grow bg-primary'),
                    ]}
                  >
                    <Text
                      style={[
                        tailwind('text-center font-bold text-white'),
                        { textTransform: 'uppercase' },
                      ]}
                    >
                      Close Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    color: '#888888',
    marginBottom: 30,
    fontWeight: '500',
    textAlign: 'left',
  },
  paymentOptionsContainer: {
    gap: 20,
    width: '100%',
  },
  paymentOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentOptionSelected: {
    borderColor: '#6B4423',
    backgroundColor: '#FFF9F0',
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkmarkContainer: {
    marginLeft: 12,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  razorpayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  razorpayLogo: {
    width: 130,
    height: 30,
    marginRight: 10,
  },
  razorpayText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#072654',
  },
  paymentText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F5E6D3',
  },
  placeOrderButton: {
    backgroundColor: '#4A3728',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
