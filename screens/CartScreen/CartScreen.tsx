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
import { GiftBoxIcon, Location } from '../../assets/icons';
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
  // console.log('DataDataDataData', Data);
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
          navigation?.navigate('CheckoutScreen', { massege: giftcontent });
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
    <View style={[tailwind('h-full bg-white')]}>
      <Topbar title="Your Cart" type={3} />
      {CartState?.length > 0 ? (
        <View style={tailwind('flex-1 w-full')}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              tailwind('pb-20 mt-3'),
              { paddingBottom: height * 0.1 },
            ]}
          >
            <View style={[tailwind('flex-row mx-5')]}>
              {CartState.length > 0 && (
                <Text
                  style={[
                    tailwind('font-bold  my-2 text-black'),
                    { fontSize: scaleFont(16) },
                  ]}
                >
                  Items
                </Text>
              )}
              {CartState.length > 0 && (
                <Text
                  style={[
                    tailwind('font-bold  my-2 text-black'),
                    { fontSize: scaleFont(14), marginLeft: 'auto' },
                  ]}
                >
                  {CartState.length} Items
                </Text>
              )}
            </View>

            {CartState?.map((item: any, index: number) => (
              <View
                key={index}
                style={[tailwind('mx-3 my-1  rounded-xl'), { backgroundColor: '#ffffff' }]}
              >
                <CartComponent
                  isVeg={item.eggless == 0 || item.eggless == 1}
                  veg={item.eggless == 0}
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
            <ApplyCoupon navigation={navigation} />
            <View style={[tailwind(' px-5 py-3 my-3')]}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setGiftEnable(!giftEnable);
                }}
                style={[tailwind('flex-row items-center')]}
              >
                <Image
                  style={[
                    tailwind(''),
                    {
                      height: 18,
                      width: 18,
                    },
                  ]}
                  source={
                    giftEnable
                      ? assets_manifest?.checkbox
                      : assets_manifest?.unchecked
                  }
                />

                <Text style={[tailwind('px-2 font-bold text-black')]}>
                  Have a Gifting Message
                </Text>
              </TouchableOpacity>
              {giftEnable && (
                <View
                  style={[
                    tailwind(
                      'flex-row items-center rounded-xl bg-white   px-3 my-3',
                    ),
                  ]}
                >
                  <GiftBoxIcon />
                  <TextInput
                    style={[
                      tailwind('text-black font-bold py-3 '),
                      { width: '90%' },
                    ]}
                    onChangeText={txt => {
                      setGiftcontent(txt);
                    }}
                    value={giftcontent}
                    placeholderTextColor={'gray'}
                    placeholder="Enter Your Gift Content"
                  />
                </View>
              )}
            </View>
            <View style={[tailwind('mx-3 px-3 ')]}>
              <Text
                style={[
                  tailwind('font-bold text-primary'),
                  { fontSize: scaleFont(16) },
                ]}
              >
                Payment Details
              </Text>
              <InvoiceComponent
                totalQuantity={totalQuantity}
                Couponstate={Couponstate}
                Total={Total}
                Delivery_charge={Delivery_charge}
                //  scaleFont={scaleFont}
              />
            </View>
            {Address?.length && (
              <View style={[tailwind('flex-row items-center px-5 py-2')]}>
                <Text
                  style={[
                    tailwind('font-bold text-primary'),
                    { fontSize: scaleFont(16) },
                  ]}
                >
                  Delivery Address
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    addressSheetRef?.current?.open();
                  }}
                  style={[tailwind(''), { marginLeft: 'auto' }]}
                >
                  <Text
                    style={[
                      tailwind('font-bold font-12 text-black'),
                      { color: 'green', textDecorationLine: 'underline' },
                    ]}
                  >
                    Change Address
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {selectedAddress && (
              <View
                style={[tailwind('bg-white rounded-xl mx-3  my-1 px-3 '), {}]}
              >
                <View
                  style={[tailwind('flex-row items-center'), { width: '100%' }]}
                >
                  <View style={[tailwind('items-center'), { width: '15%' }]}>
                    <Image
                      style={[tailwind(''), { height: 40, width: 40 }]}
                      source={assets_manifest?.locationpin}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={[tailwind('my-2'), { width: '85%' }]}>
                    <Text style={[tailwind('font-bold text-black font-15')]}>
                      {selectedAddress?.user_address_name}
                    </Text>
                    <Text style={[tailwind('font-bold font-10 mt-1')]}>
                      {selectedAddress?.user_address_details}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            <View style={[tailwind('h-20')]} />
          </ScrollView>
          <View>
            {CartState.length > 0 && (
              <View
                style={[
                  tailwind(' mx-4 mb-4'),
                  { position: 'absolute', bottom: 0 },
                ]}
              >
                <View
                  style={[
                    tailwind(
                      'flex-row justify-between bg-primary rounded-xl items-center px-4 py-3 w-full',
                    ),
                    {
                      // backgroundColor: '#24661E',
                      borderRadius: 18,
                    },
                  ]}
                >
                  <View style={[tailwind('flex-1 flex-row items-center')]}>
                    <Text
                      style={[
                        tailwind('font-bold text-white  font-15'),
                        { textTransform: 'uppercase' },
                      ]}
                    >
                      To Pay {''}
                    </Text>
                    <View
                      style={[
                        tailwind(''),
                        { height: '100%', width: 2, backgroundColor: 'red' },
                      ]}
                    />
                    <Text style={tailwind(' font-bold text-white text-base')}>
                      ₹ {Total}
                    </Text>
                  </View>
                  <TouchableOpacity
                    disabled={!loading ? false : true}
                    onPress={() => {
                      Check();
                    }}
                    activeOpacity={0.7}
                    style={[
                      tailwind(
                        'border  flex-row items-center rounded-xl  py-2',
                      ),
                      { borderWidth: 2, backgroundColor: '#FFCC01' },
                    ]}
                  >
                    {loading ? (
                      <ActivityIndicator
                        color={'white'}
                        size={'small'}
                        style={[tailwind('px-8')]}
                      />
                    ) : (
                      <Text
                        style={tailwind('text-primary flex font-bold px-8 ')}
                      >
                        Continue
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={[
            tailwind('flex-1 items-center  px-5'),
            { justifyContent: 'center' },
          ]}
        >
          <Image
            style={{
              height: 80,
              width: 80,
              marginBottom: 10,
            }}
            source={assets_manifest?.cart1}
            resizeMode="contain"
          />
          <Text
            style={[
              tailwind(
                'text-gray-500 font-14 font-bold text-center items-center mb-8 px-5',
              ),
              { lineHeight: 20, justifyContent: 'center' },
            ]}
          >
            Looks like you haven't added anything to your cart yet
          </Text>

          <TouchableOpacity
            style={[
              tailwind('bg-primary px-8 py-3 mb-5 rounded-full'),
              { width: '100%', position: 'absolute', bottom: 10 },
            ]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Home')} // Or your explore screen
          >
            <Text
              style={tailwind('text-white text-center font-bold text-base')}
            >
              EXPLORE
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modalize
        ref={addressSheetRef}
        modalTopOffset={200}
        adjustToContentHeight={true}
        HeaderComponent={
          <View
            style={[
              tailwind('flex flex-row justify-between items-center p-3 my-3'),
            ]}
          >
            <Text
              style={[
                tailwind('font-medium text-gray font-17 font-bold'),
                // { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
              ]}
            >
              Select Delivery Address
            </Text>
            <TouchableOpacity
              style={[tailwind('bg-primary px-2 py-2 rounded-full')]}
              onPress={() => {
                navigation?.navigate('AddAddressScreen');
              }}
              // onPress={props.navigateToAddressAdd}
            >
              <Text
                style={[
                  tailwind('font-medium font-14 text-white font-bold'),
                  // { fontWeight: Platform?.OS === 'android' ? 'normal' : '500' },
                ]}
              >
                Add Address
              </Text>
            </TouchableOpacity>
          </View>
        }
        disableScrollIfPossible={false}
        closeOnOverlayTap={true}
      >
        {Address?.length &&
          selectedAddress &&
          Address?.map((item: any, index: any) => {
            return (
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
            );
          })}
      </Modalize>
    </View>
  );
}
