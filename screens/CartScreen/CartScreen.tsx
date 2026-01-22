import tailwind from '@tailwind';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  TextInput,
  ActivityIndicator,
  Linking,
  Alert,
  ImageBackground,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplyCoupon,
  ButtonComponent,
  ChangeAddress,
  CheckOutButton,
  InvoiceComponent,
  Topbar,
} from '@Component';
import CartComponent from '../../Component/CartComponent';
import {
  decrementAction,
  incrementAction,
  updateCart,
  updateCoupon,
  updateDelivery_charge,
  updateSelectedAddressAction,
} from '@actions/userActions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import assets_manifest from '@assets';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import RazorpayCheckout from 'react-native-razorpay';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { razorPayOrderObjBlueprint } from '../../constants/objects';
// import { getCreateOrderRemote } from '@remote/userRemote';
import {
  acquireGPSPermission,
  errorBox,
  getLocationCoords,
  infoBox,
  isBranchOpen,
} from '../../workers/utils';
import { saveBranchction, saveLocationAction } from '@actions/appActions';
import {
  get_allAddressList,
  get_Check_coupon,
  get_Check_Delivery_Address,
  get_CheckBranch,
  get_Delivery_Charge,
} from '@remote/userRemote';
import {
  EditIcon1,
  GiftBoxIcon,
  Location,
  LocationICon1,
} from '../../assets/icons';
import { useQuery } from 'react-query';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function CartScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const ID = useSelector((state: any) => state.user.user_id);
  const Branch = useSelector((state: any) => state.app.branch);
  const CartState1 = useSelector((state: any) => state.user.cart);
  const Address = useSelector((state: any) => state.user.userAddresses);
  const Delivery_charge = useSelector(
    (state: any) => state.user.delivery_chargs,
  );
  const Data = useSelector((state: any) => state.user.customized_dayss);
  console.log('AddressAddressAddressAddress', Address);
  const Couponstate = useSelector((state: any) => state.user.coupon);
  const AppControll = useSelector((state: any) => state.app.app_controll);
  const [visible, setVisible] = useState(false);
  const addressSheetRef = useRef(null);
  const [permission, setPermission] = useState(false);
  const [giftEnable, setGiftEnable] = useState(false);
  const [giftcontent, setGiftcontent] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const ResponseData = useRef(null);
  const CartState = CartState1?.filter(item => item?.desigin_type != 4);
  const totalQuantity = CartState.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );
  const openAppSettings = () => {
    Alert.alert(
      'Location Permission Required',
      'Please enable location permission from app settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Settings',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const requestPermission = async () => {
        const permission = await acquireGPSPermission();

        if (!isActive) return;

        if (permission?.status) {
          setPermission(true);

          const locationCoords = await getLocationCoords();

          if (locationCoords) {
            dispatch(saveLocationAction(locationCoords));

            const CheckBranch = await get_CheckBranch({
              latitude: locationCoords.latitude,
              longitude: locationCoords.longitude,
            });
            // console.log("CheckBranchCheckBranch",CheckBranch)
            if (CheckBranch?.branch) {
              dispatch(saveBranchction(CheckBranch.branch));
            }
          } else {
            const CheckBranch = await get_CheckBranch({
              latitude: '0.0',
              longitude: '0.0',
            });

            if (CheckBranch?.branch) {
              dispatch(saveBranchction(CheckBranch.branch));
            }
          }
        } else {
          setPermission(false);

          // 🚨 If permanently denied → open App Settings
          // if (permission?.isBlocked || permission?.neverAskAgain) {
          openAppSettings();
          // }
        }
      };

      requestPermission();

      return () => {
        isActive = false;
      };
    }, []),
  );
  useEffect(() => {
    const total = Number(totalQuantity) || 0;
    const minOrder = Number(Couponstate?.minimum_ordering_amount) || 0;
    if (Couponstate?.offer_id && total < minOrder) {
      console.log('Removing coupon - cart total below minimum');
      dispatch(updateCoupon(null));
    }
  }, [Couponstate, totalQuantity, dispatch]);
  const increment = useCallback((payload: any) => {
    dispatch(incrementAction(payload));
  }, []);
  const decrement = useCallback((uuid: any) => {
    dispatch(decrementAction(uuid));
  }, []);
  useEffect(() => {
    if (CartState?.length === 0) {
      // console.log('🛒 Cart is empty, removing coupon...');
      dispatch(updateCoupon(null));
    }
  }, [CartState, dispatch]);
  useEffect(() => {
    if (ID) {
      setSelectedAddress(Address?.[0]);
    }
  }, [ID]);

  const calculateDiscount = (
    productPrice,
    offerPercentage,
    maxDiscountAmount,
  ) => {
    const price = Number(productPrice) || 0;
    const percentage = Number(offerPercentage) || 0;
    const maxDiscount = Number(maxDiscountAmount) || 0;
    const calculatedDiscount = (price * percentage) / 100;
    return Math.min(calculatedDiscount, maxDiscount);
  };
  useEffect(() => {
    if (Couponstate?.offer_id && Couponstate?.offer_coupon) {
      const output = calculateDiscount(
        totalQuantity,
        Couponstate.offer_percentage,
        Couponstate.maximum_discount_amount,
      );
      if (output !== Couponstate.caluculate_amount) {
        // console?.log('Recalculating coupon discount:', output);

        dispatch(
          updateCoupon({
            ...Couponstate,
            caluculate_amount: output,
          }),
        );
      }
    }
  }, [totalQuantity, Couponstate?.offer_id]);
  useFocusEffect(
    useCallback(() => {
      // Check if cart is empty - if yes, skip delivery check
      if (CartState?.length === 0) {
        // console.log('Cart is empty, skipping delivery check');
        return;
      }

      // Create and immediately call the async function
      (async () => {
        setValue(false);
        // Validate required parameters
        if (
          !selectedAddress?.user_address_latitude ||
          !selectedAddress?.user_address_longitude
        ) {
          // console.log('Missing address coordinates');
          return;
        }

        if (!Branch?.branch_id || !ID) {
          // console.log('Missing branch_id or user ID');
          return;
        }

        try {
          // console.log('Checking delivery address...');

          const Response = await get_Check_Delivery_Address({
            branch_id: Branch.branch_id,
            latitude: selectedAddress
              ? selectedAddress?.user_address_latitude
              : '0.0',
            longitude: selectedAddress
              ? selectedAddress?.user_address_longitude
              : '0.0',
            user_id: ID,
          });
          if (Response?.status === 'success' || Response?.available) {
            dispatch(updateSelectedAddressAction(selectedAddress));
            const ResponseData = await get_Delivery_Charge({
              branch_id: Branch.branch_id,
              latitude: selectedAddress
                ? selectedAddress.user_address_latitude
                : '0.0',
              longitude: selectedAddress
                ? selectedAddress.user_address_longitude
                : '0.0',
              user_id: ID,
              total_amount: totalQuantity,
            });
            // console.log('ResponseDataResponseDataResponseData', ResponseData);

            if (ResponseData?.status === 'success') {
              dispatch(updateDelivery_charge(ResponseData));
            } else {
              dispatch(updateDelivery_charge(null));
            }
            // console.log('ResponseDataResponseDataResponseData', ResponseData);
          } else {
            errorBox(Response?.res?.data?.message);
            dispatch(updateDelivery_charge(null));

            addressSheetRef?.current?.open();
            dispatch(updateSelectedAddressAction(null));
          }
        } catch (error) {
          addressSheetRef?.current?.open();
          dispatch(updateSelectedAddressAction(null));
        }
      })();
      return () => {};
    }, [
      selectedAddress,
      Branch?.branch_id,
      ID,
      totalQuantity,
      value,
      CartState,
      dispatch,
    ]), // Add CartState to dependencies
  );
  const { width, height } = Dimensions.get('window');
  const scaleFont = (size: number) => (width / 375) * size;

  const Check = async () => {
    const cal = AppControll?.minimum_order <= totalQuantity;
    if (ID) {
      if (!cal) {
        // console.log(
        //   'AppControll?.minimum_order',
        //   AppControll?.minimum_order,
        //   totalQuantity,
        // );
        errorBox(
          `Minium order Sub-total to be Placed should be above ${AppControll?.minimum_order}`,
        );
        return;
      }
      const isOpen = isBranchOpen(Branch);
      if (isOpen) {
        if (Delivery_charge?.status === 'success') {
          navigation?.navigate('CheckoutScreen', { amount: Total });
        } else {
          addressSheetRef?.current?.open();
        }
      } else {
        errorBox(
          'The shop is currently closed. You can place orders for tomorrow.',
        );
      }
    } else {
      navigation?.navigate('LoginScreen');
    }
  };
  const ChangeAddressDetails = data => {
    setSelectedAddress(data);
    addressSheetRef?.current?.close();
  };

  const deliveryFee = Delivery_charge?.delivery_charge || 0;

  const Total =
    totalQuantity + deliveryFee - (Couponstate?.caluculate_amount || 0);
  return (
    <View style={tailwind('h-full bg-gray-50')}>
      <Topbar title="Your Cart" type={3} />

      {CartState?.length > 0 ? (
        <View style={tailwind('flex-1')}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tailwind('pb-32')}
          >
            {/* Cart Items Card */}
            <View
              style={[
                tailwind('mx-4 mt-4 bg-white rounded-2xl'),
                styles.cardShadow,
              ]}
            >
              {/* Header */}
              <View
                style={tailwind(
                  'flex-row justify-between items-center px-5 py-4 border-b border-gray-100',
                )}
              >
                <Text
                  style={[
                    tailwind('font-bold text-gray-800'),
                    { fontSize: scaleFont(18) },
                  ]}
                >
                  Cart Items
                </Text>
                <View
                  style={[
                    tailwind('px-3 py-1 rounded-full'),
                    { backgroundColor: '#F3F4F6' },
                  ]}
                >
                  <Text
                    style={[
                      tailwind('font-semibold'),
                      { fontSize: scaleFont(13), color: '#6B7280' },
                    ]}
                  >
                    {CartState.length}{' '}
                    {CartState.length === 1 ? 'Item' : 'Items'}
                  </Text>
                </View>
              </View>

              {/* Cart Items */}
              <View style={tailwind('px-4 py-2')}>
                {CartState?.map((item, index) => (
                  <View
                    key={`${item?.product_id}_${index}`}
                    style={[
                      tailwind('my-2'),
                      index < CartState.length - 1 &&
                        tailwind('border-b border-gray-50 pb-4'),
                    ]}
                  >
                    <CartComponent
                      isVeg={item.eggless === 0 || item.eggless === 1}
                      veg={item.eggless === 0}
                      quantity={item?.quantity}
                      image={item.image}
                      product_name={item?.product_name}
                      price={200}
                      id={item?.product_id}
                      offer={item?.offer}
                      is_favourite={item?.is_favourite}
                      description={item?.description}
                      product_image={item?.product_image}
                      variation={item?.variation}
                      increment={increment}
                      decrement={decrement}
                      color_variation={item.product_color_var}
                      item={item}
                      product_price={item?.product_price}
                      type={2}
                    />
                  </View>
                ))}
              </View>

              {/* Order Total */}
              {totalQuantity && (
                <View
                  style={[
                    tailwind('px-5 py-4 border-t border-gray-100'),
                    { backgroundColor: '#FAFAFA' },
                  ]}
                >
                  <View
                    style={tailwind('flex-row justify-between items-center')}
                  >
                    <Text
                      style={[
                        tailwind('font-bold text-gray-700'),
                        { fontSize: scaleFont(16) },
                      ]}
                    >
                      Subtotal
                    </Text>
                    <Text
                      style={[
                        tailwind('font-bold'),
                        { fontSize: scaleFont(18), color: '#F39F3E' },
                      ]}
                    >
                      ₹{totalQuantity}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Delivery Address Card */}
            {Address?.length > 0 ? (
              <View
                style={[
                  tailwind('mx-4 mt-4 bg-white rounded-2xl p-5'),
                  styles.cardShadow,
                ]}
              >
                <View
                  style={tailwind('flex-row justify-between items-center mb-3')}
                >
                  <View style={tailwind('flex-row items-center')}>
                    <LocationICon1 />
                    <Text
                      style={[
                        tailwind('ml-2 font-bold text-gray-800'),
                        { fontSize: scaleFont(16) },
                      ]}
                    >
                      Delivery Address
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => addressSheetRef?.current?.open()}
                  >
                    <Text
                      style={[
                        tailwind('font-semibold'),
                        { color: '#80C659', fontSize: scaleFont(14) },
                      ]}
                    >
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    tailwind('rounded-xl p-4 mt-2'),
                    { backgroundColor: '#F9FAFB' },
                  ]}
                >
                  <Text
                    style={[
                      tailwind('font-medium text-gray-700'),
                      { fontSize: scaleFont(14), lineHeight: 20 },
                    ]}
                  >
                    {Address?.[0]?.user_address_details}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tailwind('mx-4 mt-4 bg-white rounded-2xl p-5'),
                  styles.cardShadow,
                ]}
              >
                <View style={tailwind('flex-row items-center mb-3')}>
                  <LocationICon1 />
                  <Text
                    style={[
                      tailwind('ml-2 font-bold text-gray-800'),
                      { fontSize: scaleFont(16) },
                    ]}
                  >
                    Delivery Address
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation?.navigate('AddAddressScreen')}
                  style={[
                    tailwind('border-2 rounded-xl py-4 mt-2'),
                    { borderColor: '#80C659', borderStyle: 'dashed' },
                  ]}
                >
                  <Text
                    style={[
                      tailwind('text-center font-semibold'),
                      { fontSize: scaleFont(15), color: '#80C659' },
                    ]}
                  >
                    + Add Delivery Address
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          {/* Bottom Checkout Bar */}
          <View
            style={[
              tailwind('absolute bottom-0 left-0 right-0 bg-white'),
              styles.bottomBarShadow,
            ]}
          >
            <View style={tailwind('px-4 py-4')}>
              {/* Price Summary */}
              <View
                style={tailwind('flex-row justify-between items-center mb-3')}
              >
                <View>
                  <Text
                    style={[
                      tailwind('text-gray-600 mb-1'),
                      { fontSize: scaleFont(13) },
                    ]}
                  >
                    Total Amount
                  </Text>
                  <Text
                    style={[
                      tailwind('font-bold text-gray-900'),
                      { fontSize: scaleFont(20) },
                    ]}
                  >
                    ₹{Total}
                  </Text>
                </View>

                <TouchableOpacity
                  disabled={loading}
                  onPress={Check}
                  activeOpacity={0.8}
                  style={[
                    tailwind('rounded-xl px-8 py-4'),
                    { backgroundColor: loading ? '#D1D5DB' : '#80C659' },
                    styles.buttonShadow,
                  ]}
                >
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text
                      style={[
                        tailwind('text-white font-bold'),
                        { fontSize: scaleFont(16) },
                      ]}
                    >
                      Proceed to Checkout
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        // Empty Cart State
        <View style={tailwind('flex-1 justify-center items-center px-8')}>
          <Image
            style={{ height: 120, width: 120, marginBottom: 24, opacity: 0.8 }}
            source={assets_manifest?.cart1}
            resizeMode="contain"
          />
          <Text
            style={[
              tailwind('text-gray-800 font-bold text-center mb-2'),
              { fontSize: scaleFont(20) },
            ]}
          >
            Your Cart is Empty
          </Text>
          <Text
            style={[
              tailwind('text-gray-500 text-center mb-8'),
              { fontSize: scaleFont(14), lineHeight: 22 },
            ]}
          >
            Looks like you haven't added anything to your cart yet. Start
            shopping now!
          </Text>

          <TouchableOpacity
            style={[
              tailwind('rounded-xl px-12 py-4'),
              { backgroundColor: '#80C659', width: '100%', maxWidth: 300 },
              styles.buttonShadow,
            ]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Home')}
          >
            <Text
              style={[
                tailwind('text-white text-center font-bold'),
                { fontSize: scaleFont(16), textTransform: 'uppercase' },
              ]}
            >
              Explore
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Address Selection Modal */}
      <Modalize
        ref={addressSheetRef}
        modalTopOffset={200}
        adjustToContentHeight={true}
        HeaderComponent={
          <View
            style={tailwind(
              'flex-row justify-between items-center p-5 border-b border-gray-100',
            )}
          >
            <Text
              style={[
                tailwind('font-bold text-gray-800'),
                { fontSize: scaleFont(18) },
              ]}
            >
              Select Address
            </Text>
            <TouchableOpacity
              style={[
                tailwind('rounded-full px-4 py-2'),
                { backgroundColor: '#80C659' },
              ]}
              onPress={() => navigation?.navigate('AddAddressScreen')}
            >
              <Text
                style={[
                  tailwind('font-semibold text-white'),
                  { fontSize: scaleFont(14) },
                ]}
              >
                + Add New
              </Text>
            </TouchableOpacity>
          </View>
        }
        disableScrollIfPossible={false}
        closeOnOverlayTap={true}
      >
        {Address?.length &&
          selectedAddress &&
          Address?.map((item, index) => (
            <ChangeAddress
              key={`${item?.user_address_id}_${index}`}
              selectedAddress={selectedAddress}
              address_id={item?.user_address_id}
              user_address_name={item?.user_address_name}
              user_address_details={item?.user_address_details}
              action={ChangeAddressDetails}
              item={item}
              setValue={setValue}
            />
          ))}
      </Modalize>
    </View>
  );
}
const styles = {
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bottomBarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonShadow: {
    shadowColor: '#80C659',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};
