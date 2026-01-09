import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from '@tailwind';
import {
  FullScreenLoading,
  GlobalDialogModal1,
  OrderStatusCard,
  Topbar,
} from '@Component';
import assets from '@assets';
import Modal from 'react-native-modal';
import assets_manifest from '@assets';
import { errorBox, infoBox } from '../../workers/utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackIcon, CallIcon, GiftBoxIcon } from '../../assets/icons';
import { useQuery } from 'react-query';
// import SelectDropdown from 'react-native-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { get_Cancel_Order, getSingleOrderRemote } from '@remote/userRemote';
import { useSelector } from 'react-redux';
export default function SingleOrderScreen() {
  const { width, height } = Dimensions.get('window');
  const ID = useSelector((state: any) => state.user.user_id);
  const AppControll = useSelector((state: any) => state.app.app_controll);
  const [support, setSupport] = useState(false);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancel, setCancel] = useState(false);

  const [rs, setRs] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const scaleFont = (size: number) => (width / 375) * size;

  const Response = useQuery(
    ['getSingleOrderRemote', ID, route?.params?.order_id],
    getSingleOrderRemote,
    { refetchInterval: 5000 },
  );
  // console.log('valuevaluevaluevaluevaluevalue', Response?.data?.GTS);
  const phoneUrl = Platform.select({
    ios: `telprompt:${AppControll?.contact_number}`, // Shows confirmation dialog
    android: `tel:${AppControll?.contact_number}`, // Directly dials
  });
  // useEffect(() => {
  //   const onBackPress = () => {
  //     console.log('Back button pressed');
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'BottomTabNavigation' }],
  //     });
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     onBackPress,
  //   );

  //   return () => backHandler.remove();
  // }, [navigation]);
  const Data = Response?.data?.GTS;
  const CancelOrder = async () => {
    setCancel(false);
    const Response = await get_Cancel_Order({
      user_id: ID,
      order_id: route?.params?.order_id,
    });
    if (Response?.status === 'success') {
      infoBox('Order Cancelled Successfully!');
    }
    console.log('ResponseResponse', Response);
    // if(Response)
  };
  // const mismatchedItems =
  //   Data?.details?.filter((item: any) => item?.type === 0) || []

  if (Response?.isLoading) {
    return <FullScreenLoading />;
  }
  console?.log('ResponseResponseResponse', route?.params?.screen);
  return (
    <View style={[tailwind('h-full bg-secondary')]}>
      {/* <Topbar title="Order Status" type={3} /> */}
      <View style={[tailwind('flex-row items-center bg-primary '), {}]}>
        <TouchableOpacity
          style={[tailwind('ml-3')]}
          onPress={() => {
            if (route?.params?.screen === false) {
              // Reset navigation to HomeScreen
              navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTabNavigation' }],
              });
            } else if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
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
            Order Status
          </Text>
        </View>
      </View>
      <ScrollView
        style={[tailwind(' my-3 py-3 px-3')]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            tailwind('flex-row '),
            {
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: 'silver',
            },
          ]}
        >
          <View style={[tailwind('py-3')]}>
            <Text
              style={[
                tailwind('font-bold text-gray-500'),
                {
                  fontSize: scaleFont(15),
                },
              ]}
            >
              Order ID
            </Text>
            <Text
              style={[
                tailwind('font-bold mt-2'),
                {
                  fontSize: scaleFont(15),
                },
              ]}
            >
              {Response?.data?.GTS?.order_string}
            </Text>
          </View>
          <View style={[tailwind('py-3'), {}]}>
            <Text
              style={[
                tailwind('font-bold text-gray-500'),
                {
                  fontSize: scaleFont(15),
                  marginLeft: 'auto',
                },
              ]}
            >
              Date & Time
            </Text>
            <Text
              style={[
                tailwind('font-bold mt-2'),
                {
                  fontSize: scaleFont(15),
                },
              ]}
            >
              {Response?.data?.GTS?.booking_date}{' '}
              {Response?.data?.GTS?.booking_time}
            </Text>
          </View>
        </View>
        {[0, 5].includes(Response?.data?.GTS?.order_status) && (
          <View
            style={[
              tailwind('flex-row my-3 mb-5'),
              {
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: 'silver',
              },
            ]}
          >
            <View style={[tailwind('py-3')]}>
              <Text
                style={[
                  tailwind('font-bold text-gray-500'),
                  {
                    fontSize: scaleFont(15),
                  },
                ]}
              >
                Payment Type
              </Text>
              <Text
                style={[
                  tailwind('font-bold mt-2'),
                  {
                    fontSize: scaleFont(15),
                  },
                ]}
              >
                {Response?.data?.GTS?.payment_type}
              </Text>
            </View>
            <View style={[tailwind('py-3'), {}]}>
              <Text
                style={[
                  tailwind('font-bold text-gray-500'),
                  {
                    fontSize: scaleFont(15),
                    marginLeft: 'auto',
                  },
                ]}
              >
                Status
              </Text>
              <Text
                style={[
                  tailwind('font-bold mt-2'),
                  {
                    fontSize: scaleFont(15),
                    color:
                      Response?.data?.GTS?.order_status === 0 ? 'red' : 'green',
                  },
                ]}
              >
                {Response?.data?.GTS?.order_status === 0
                  ? 'Cancelled'
                  : 'Delivered'}{' '}
              </Text>
            </View>
          </View>
        )}
        {Response?.data.GTS?.order_status !== 0 &&
          Response?.data.GTS?.order_status !== 5 && (
            <View>
              <Text
                style={[
                  tailwind('my-5 font-bold mt-5'),
                  { fontSize: scaleFont(18) },
                ]}
              >
                Order Status
              </Text>
              <OrderStatusCard status={Response?.data.GTS?.order_status} />
              {Response?.data.GTS?.order_status < 3 && (
                <TouchableOpacity
                  onPress={() => {
                    setCancel(true);
                  }}
                  style={[
                    tailwind('py-3 my-5 bg-white border rounded-full'),
                    { borderColor: 'red' },
                  ]}
                >
                  <Text
                    style={[
                      tailwind('text-center font-bold text-red'),
                      { fontSize: scaleFont(18), textTransform: 'uppercase' },
                    ]}
                  >
                    Cancel Order
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>
            {Response?.data.GTS?.order_status === 0 ||
            Response?.data.GTS?.order_status === 5
              ? 'Items Added'
              : 'Items In Cart'}
          </Text>
          {Response?.data.GTS?.variation?.map((item, index) => (
            <View
              key={index}
              style={[tailwind('rounded-xl white-shadow'), styles.cartItem]}
            >
              <Image
                source={{ uri: item.product_image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <View style={styles.productMeta}>
                  <Text style={styles.variationText}>{item.variation}</Text>
                  <Text style={styles.quantityText}>{item.quantity} qty</Text>
                </View>
                <Text style={styles.productPrice}>₹{item.product_price}</Text>
              </View>
            </View>
          ))}
        </View>
        {Response?.data.GTS?.order_status !== 0 &&
          Response?.data.GTS?.order_status !== 5 && (
            <TouchableOpacity
              style={styles.complaintSection}
              onPress={() => {
                setSupport(true);
              }}
            >
              <View style={styles.radioButton} />
              <Text style={styles.complaintText}>Have a complaint?</Text>
            </TouchableOpacity>
          )}

        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.paymentSection}>
          {Response?.data.GTS?.recipe_total_amount !== '0' && (
            <View style={styles.paymentRow}>
              <Text style={[tailwind('font-bold font-14'),styles.paymentLabel]}>Sub Total</Text>
              <Text style={styles.paymentValue}>
                ₹ {Response?.data.GTS?.recipe_total_amount}
              </Text>
            </View>
          )}
          {Response?.data.GTS?.delivery_charge !== '0' && (
            <View style={styles.paymentRow}>
              <Text style={[tailwind('font-bold font-14'),styles.paymentLabel]}>
                Delivery and Other charges
              </Text>
              <Text style={styles.paymentValue}>
                ₹ {Response?.data.GTS?.delivery_charge}
              </Text>
            </View>
          )}
          {Response?.data.GTS?.coupon_applied !== '0' && (
            <View style={styles.paymentRow}>
              <Text style={[tailwind('font-bold font-14'),styles.paymentLabel, { color: '#22C55E' }]}>
                Coupon Discount
              </Text>
              <Text style={[styles.paymentValue, { color: '#22C55E' }]}>
                ₹ {Response?.data.GTS?.coupon_applied}
              </Text>
            </View>
          )}
          {Response?.data.GTS?.total_amount !== '0' && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ₹ {Response?.data.GTS?.total_amount}
              </Text>
            </View>
          )}
        </View>

        {Response?.data.GTS?.message !== '' && (
          <View style={[tailwind('mt-3 mb-3')]}>
            <Text style={styles.sectionTitle}>Message</Text>
            <View
              style={[
                tailwind('flex-row items-center rounded-xl bg-white   px-3 '),
              ]}
            >
              <GiftBoxIcon />
              <Text
                style={[
                  tailwind('text-black font-bold py-3 px-2'),
                  { width: '90%' },
                ]}
              >
                {Response?.data.GTS?.message}
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Delivery Address</Text>

        <View style={[tailwind('rounded-xl'), styles.addressSection]}>
          <Text style={styles.addressText}>
            {Response?.data.GTS?.user?.address}
          </Text>
        </View>
        <View style={[tailwind('h-20')]} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarLabel}>Total</Text>
        <Text style={styles.bottomBarValue}>
          ₹ {Response?.data.GTS?.total_amount}
        </Text>
      </View>
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
          <View style={[tailwind('p-3 mt-3')]}>
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
              tailwind(
                'flex px-3 py-3 mb-5 flex-row justify-between items-center',
              ),
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
                tailwind('p-3  flex-row items-center rounded-xl white-shadow'),
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
                tailwind('p-3 flex-row items-center rounded-xl white-shadow'),
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
      <GlobalDialogModal1
        visible={cancel}
        setAlertModal={setCancel}
        action={CancelOrder}
        title="Are you sure want to Cancel This Order ?"
        subtitle=""
        target={0}
      />
    </View>
  );
}
// statusConfig.ts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#44403C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  orderInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  labelText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  orderIdText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
  },
  dateTimeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  orderStatusSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    // paddingHorizontal: 10,
    marginBottom: 16,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCircleActive: {
    backgroundColor: '#22C55E',
  },
  statusCircleInactive: {
    backgroundColor: '#E5E7EB',
  },
  statusIcon: {
    fontSize: 20,
  },
  statusText: {
    marginLeft: 16,
    fontSize: 15,
    color: '#6B7280',
    flex: 1,
  },
  statusTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  dashedLineContainer: {
    marginLeft: 24,
    height: 32,
    justifyContent: 'center',
  },
  dashedLine: {
    width: 2,
    height: 32,
    borderLeftWidth: 2,
    borderLeftColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: '#EF4444',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
  cartSection: {
    backgroundColor: '#FFFFFF',
    // marginHorizontal: 5,
    marginTop: 15,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    marginTop: 12,
    // borderWidth:1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  productMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  variationText: {
    fontSize: 14,
    color: '#000',
    marginRight: 12,
  },
  quantityText: {
    fontSize: 14,
    color: '#6B7280',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  complaintSection: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingVertical: 16,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 12,
  },
  complaintText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  paymentSection: {
    backgroundColor: '#FFFFFF',
    // marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#000',
  },
  paymentValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  addressSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  addressText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  landmarkText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  bottomBar: {
    backgroundColor: '#45302B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    position: 'absolute',
    margin: 10,
    borderRadius: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBarLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomBarValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});
