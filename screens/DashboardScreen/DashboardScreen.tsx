import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
  Image,
  ScrollView,
  RefreshControl,
  Dimensions,
  SafeAreaView,
  Animated,
  ImageBackground,
} from 'react-native';
import tailwind from '@tailwind';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveAppcontrollAction,
  saveBranchction,
  saveLocationAction,
} from '@actions/appActions';
import assets_manifest from '@assets';
import Swiper from 'react-native-swiper';
import {
  CategoryIcon,
  LockIcon,
  NotificationIcon,
  SearchIcon,
  Subscription,
  ViewAllIcon,
} from '../../assets/icons';
import {
  CheckOutButton,
  FullScreenLoading,
  FullScreenLoading1,
  Loader,
  QuantityActions,
} from '@Component';
import { ProductCart } from '../../Component/ProductCart';
import {
  decrementAction,
  incrementAction,
  saveAddresses,
  saveUser,
} from '@actions/userActions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import {
  get_allAddressList,
  get_best_selling_product,
  get_CheckBranch,
  get_Live_Order,
  get_Offerproduct,
  get_Recommenedproduct,
  getAppControll,
  // getAppControllRemote,
  // getBannerRemote,
  // getMyProfileRemote,
  // getNotesRemote,
  // getProductListRemote,
  getBanner,
  getBottomBanner,
  getCategory,
  getGetUser1,
} from '@remote/userRemote';
import Feather from 'react-native-vector-icons/Feather';
import { getNotification } from '../../workers/localStorage';
import { useIsScreenReady } from '../../workers/customHooks';
import Modal from 'react-native-modal';
import AutoScrolling from 'react-native-auto-scrolling';
import LinearGradient from 'react-native-linear-gradient';
import {
  acquireGPSPermission,
  errorBox,
  getLocationCoords,
  isBranchOpen,
} from '../../workers/utils';
import { HomeTitle } from '../../screens/Component';

export default function DashboardScreen() {
  const isReady = useIsScreenReady();
  const CartState = useSelector((state: any) => state.user.cart);
  const ID = useSelector((state: any) => state.user.user_id);
  const Branch = useSelector((state: any) => state.app.branch);
  const dispatch = useDispatch();
  const [permission, setPermission] = useState(false);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleData, setVisibleData] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [notification, setNotification] = useState([]);
  const [getdata, setGetdata] = useState([]);
  const { width } = Dimensions.get('window');
  const Profile = useSelector((state: any) => state.user.userInfo);
  const Banner = useQuery(['getBannerRemote'], getBanner);
  const url = {
    instagram: 'https://www.instagram.com/bakerymaharaj',
    facebook: 'https://www.facebook.com/BakeryMaharaj"',
    youtube: 'https://www.youtube.com/@BakeryMaharaj',
    tv: 'https://bakerymaharaj.com/',
  };
  // console.log("BannerBannerBanner",Banner)
  const DailyData = [
    {
      name: 'Farm Fresh Natural Milk',
      image: assets_manifest?.milk1,
      des: '2 Litres',
    },
    {
      name: 'Curd',
      image: assets_manifest?.milk,
      des: '250 ml',
    },
  ];
  const Category = [
    {
      image: assets_manifest?.SubSction,
    },
    {
      image: assets_manifest?.Addon,
    },
  ];
  const ProductData = [
    {
      category_name: 'Farm Fresh Natural Milk',
      // eggless: '0',
      // is_favourite: 0,
      product_id: '84',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      // product_offer: '0',
      // product_percentage: '0',
      product_price: [
        {
          product_price_id: '729',
          product_variation: '0.5 ',
          product_unit: 'Litre',
          product_price: 25,
          mrp_price: 30.5,
        },
      ],
      // product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 1,
    },
    {
      category_name: 'Farm Fresh Natural Milk',
      eggless: '0',
      is_favourite: 0,
      product_id: '84',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      product_offer: '0',
      product_percentage: '0',
      product_price: [
        {
          product_price_id: '729',
          product_variation: '0.5 ',
          product_unit: 'Litre',
          product_price: 25,
          mrp_price: 10,
        },
      ],
      product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 0,
    },
    {
      category_name: 'Farm Fresh Natural Milk',
      eggless: '0',
      is_favourite: 0,
      product_id: '84',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      product_offer: '0',
      product_percentage: '0',
      product_price: [
        {
          product_price_id: '729',
          product_variation: '500 ',
          product_unit: 'ml',
          product_price: 45,
          mrp_price: 60.5,
        },
        {
          product_price_id: '729',
          product_variation: '250 ',
          product_unit: 'ml',
          product_price: 30,
          mrp_price: 40.0,
        },
      ],
      product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 0,
    },
  ];
  const ProductData1 = [
    {
      category_name: 'Farm Fresh Natural Milk',
      eggless: '0',
      is_favourite: 0,
      product_id: '100',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      product_offer: '0',
      product_percentage: '0',
      product_price: [
        {
          product_price_id: '729',
          product_variation: '0.5 ',
          product_unit: 'Litre',
          product_price: 25,
          mrp_price: 30.5,
        },
      ],
      product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 1,
    },
    {
      category_name: 'Farm Fresh Natural Milk',
      eggless: '0',
      is_favourite: 0,
      product_id: '101',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      product_offer: '0',
      product_percentage: '0',
      product_price: [
        {
          product_price_id: '729',
          product_variation: '0.5 ',
          product_unit: 'Litre',
          product_price: 25,
          mrp_price: 30.5,
        },
      ],
      product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 1,
    },
    {
      category_name: 'Farm Fresh Natural Milk',
      eggless: '0',
      is_favourite: 0,
      product_id: '110',
      product_image: assets_manifest?.milk1,
      product_name: 'Farm Fresh Natural Milk',
      product_offer: '0',
      product_percentage: '0',
      product_price: [
        {
          product_price_id: '729',
          product_variation: '500 ',
          product_unit: 'ml',
          product_price: 45,
          mrp_price: 60.5,
        },
        {
          product_price_id: '739',
          product_variation: '250 ',
          product_unit: 'ml',
          product_price: 30,
          mrp_price: 40.0,
        },
      ],
      product_recommended: '0',
      product_type: '1',
      timeslot: '0',
      subscribe: 0,
    },
  ];
  const CartStateValue = CartState?.filter(item => item?.desigin_type != 4);
  const totalQuantity = CartStateValue.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );
  const swiperRef = useRef(null);
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
  const increment = useCallback((payload: any) => {
    if (payload?.desigin_type == 4) {
      dispatch(incrementAction(payload));
      navigation?.navigate('NewSubscription');
    } else {
      dispatch(incrementAction(payload));
    }
  }, []);
  const decrement = useCallback((payload: any) => {
    dispatch(decrementAction(payload));
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, []);

  const isOpen = isBranchOpen(Branch);
  if (Banner?.isLoading) {
    return <FullScreenLoading1 />;
  }
  return (
    <View style={[tailwind('flex-1'), {}]}>
      <View
        style={[
          tailwind('flex-row items-center py-3 px-4'),
          {
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
        ]}
      >
        <Image
          source={assets_manifest?.homeimage}
          resizeMode="contain"
          style={{ height: 40, width: 100 }}
        />
        <View style={tailwind('flex-1')} />
        {getdata?.length ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NotificationScreen')}
            style={{ position: 'relative' }}
          >
            <NotificationIcon color={'#333'} size={24} />
            <View
              style={[
                tailwind(
                  'absolute -top-1 -right-1 rounded-full items-center justify-center',
                ),
                {
                  backgroundColor: '#EF4444',
                  width: 18,
                  height: 18,
                  borderWidth: 1.5,
                  borderColor: 'white',
                },
              ]}
            >
              <Text style={[tailwind('font-bold text-xs'), { color: 'white' }]}>
                {getdata?.length > 9 ? '9+' : getdata?.length}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <NotificationIcon color={'#666'} size={24} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={{ backgroundColor: '#FAFAFA' }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#F39F3E']}
            tintColor="#F39F3E"
          />
        }
      >
        <ImageBackground
          style={[tailwind('flex-1'), { height: '100%', width: '100%' }]}
          source={assets_manifest?.background}
        >
          <View style={tailwind('px-4 py-5')}>
            <TouchableOpacity
              style={[
                tailwind(
                  'flex-row items-center white-shadow px-4 py-3 rounded-full',
                ),
                {
                  backgroundColor: 'white',
                  // shadowColor: '#000',
                  // shadowOffset: { width: 0, height: 1 },
                  // shadowOpacity: 0.05,
                  // shadowRadius: 2,
                  // elevation: 2,
                },
              ]}
              activeOpacity={0.8}
            >
              <SearchIcon color="#666" />
              <Text
                style={[tailwind('ml-3 text-gray-500 text-sm'), { flex: 1 }]}
              >
                Search Your Products
              </Text>
            </TouchableOpacity>
          </View>
          {Banner?.data?.GTS?.length > 0 && (
            <View style={tailwind('mb-4 px-4')}>
              <Swiper
                style={tailwind('h-48')}
                index={index}
                showsPagination={true}
                loop={true}
                autoplay={true}
                autoplayTimeout={4000}
                paginationStyle={{ bottom: 10 }}
                dot={
                  <View
                    style={tailwind('w-2 h-2 rounded-full bg-gray-300 mx-1')}
                  />
                }
                activeDot={
                  <View
                    style={tailwind('w-6 h-2 rounded-full bg-primary mx-1')}
                  />
                }
              >
                {Banner.data.GTS.map((items, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    disabled={!items?.category_id}
                    onPress={() => {
                      // navigation?.navigate('CategoryScreen', {
                      //   id: items?.category_id,
                      // });
                    }}
                    style={[tailwind(''), { padding: 5 }]}
                  >
                    <Image
                      source={{ uri: items?.banner_image }}
                      style={[
                        tailwind('w-full  h-full'),
                        {
                          borderRadius: 12,
                          resizeMode: 'cover',
                        },
                      ]}
                      defaultSource={assets_manifest?.banner_loading}
                    />
                  </TouchableOpacity>
                ))}
              </Swiper>
            </View>
          )}
          {DailyData?.length > 0 && (
            <View style={tailwind('px-4 mb-4')}>
              <View
                style={[
                  tailwind('rounded-xl p-4'),
                  {
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#F39F3E',
                  },
                ]}
              >
                <View
                  style={tailwind('flex-row items-center justify-between mb-4')}
                >
                  <View>
                    <Text style={tailwind('text-lg font-bold text-gray-900')}>
                      Your Next Day Delivery
                    </Text>
                    {/* <Text style={tailwind('text-sm text-gray-500 mt-1')}>
                Order by 8 PM, delivered tomorrow
              </Text> */}
                  </View>
                  <View style={tailwind('items-end')}>
                    <Text style={tailwind('text-base font-bold text-primary')}>
                      25 Oct | Mon
                    </Text>
                    {/* <Text style={tailwind('text-sm text-gray-600')}>Monday</Text> */}
                  </View>
                </View>

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={tailwind('pb-1')}
                >
                  {DailyData.map((items, index) => (
                    <ProductCart
                      key={index}
                      name={items?.name}
                      img={items?.image}
                      des={items?.des}
                      desigin_type={3}
                      style={tailwind('mr-3')}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
          {Category?.length > 0 && (
            <View style={tailwind('')}>
              <HomeTitle
                Image={<CategoryIcon />}
                title="Shop by Category"
                viewAll={false}
                des={''}
                type={1}
                des_color={'black'}
              />
              <View
                style={tailwind(
                  'flex-row px-4 py-1 flex-wrap justify-between ',
                )}
              >
                {Category.map((items, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tailwind('rounded-xl'),
                      {
                        width: '50%',
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {}}
                  >
                    <Image
                      style={[
                        tailwind(' mb-3'),
                        { resizeMode: 'contain', width: '100%', height: 200 },
                      ]}
                      source={items?.image}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {ProductData?.length > 0 && (
            <View>
              <HomeTitle
                Image={<Subscription />}
                title="Subscription Product"
                viewAll={true}
                des={'Subscribe & get everyday delivery'}
                type={1}
                des_color={'#F39F3E'}
                navigation={navigation}
                data={ProductData}
              />
              <ScrollView
                horizontal={true}
                style={[tailwind(' py-3')]}
                showsHorizontalScrollIndicator={false}
              >
                {ProductData?.map((items: any, index: any) => {
                  return (
                    <ProductCart
                      key={index}
                      id={items?.product_id}
                      key={`${items?.product_id}_${index}`}
                      increment={increment}
                      decrement={decrement}
                      name={items?.product_name}
                      img={items?.product_image}
                      product_price={items?.product_price}
                      des={items?.des}
                      desigin_type={4}
                      type={1}
                      subscribe={items?.subscribe === 1}
                      style={tailwind('mr-3')}
                      navigation={navigation}
                    />
                  );
                })}
              </ScrollView>
            </View>
          )}
          {ProductData1?.length > 0 && (
            <View style={[tailwind('my-3')]}>
              <HomeTitle
                Image={<LockIcon />}
                title="Add On Products"
                viewAll={true}
                des={'Order before 4 pm & get delivered next day'}
                type={2}
                des_color={'#80C659'}
                navigation={navigation}
                data={ProductData1}
              />
              <ScrollView
                // horizontal={true}
                style={[tailwind(' py-3')]}
                // showsHorizontalScrollIndicator={false}
              >
                {ProductData1?.map((items: any, index: any) => {
                  return (
                    <ProductCart
                      key={index}
                      id={items?.product_id}
                      key={`${items?.product_id}_${index}`}
                      increment={increment}
                      decrement={decrement}
                      name={items?.product_name}
                      img={items?.product_image}
                      product_price={items?.product_price}
                      des={items?.des}
                      desigin_type={5}
                      type={1}
                      subscribe={items?.subscribe === 1}
                      style={tailwind('mr-3')}
                      navigation={navigation}
                    />
                  );
                })}
              </ScrollView>
            </View>
          )}
        </ImageBackground>

        <View style={tailwind('h-24')} />
      </ScrollView>
      {CartStateValue.length > 0 && (
        <CheckOutButton
          CartState={CartStateValue}
          totalQuantity={totalQuantity}
          navigation={navigation}
        />
      )}
    </View>
    // </ImageBackground>
  );
}
