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
import { NotificationIcon, SearchIcon, ViewAllIcon } from '../../assets/icons';
import {
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

export default function DashboardScreen() {
  const isReady = useIsScreenReady();
  const CartState = useSelector((state: any) => state.user.cart);
  const ID = useSelector((state: any) => state.user.user_id);
  const Branch = useSelector((state: any) => state.app.branch);

  // console.log('BranchBranchBranchBranchBranch', Branch);
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
  const Bottom_Banner = useQuery(['getBottomBanner'], getBottomBanner);

  const blinkOpacity = useRef(new Animated.Value(1)).current;

  const Category = useQuery(['getCategory', ID ? ID : ''], getCategory);
  const BestSelling = useQuery(
    ['get_best_selling_product', ID ? ID : ''],
    get_best_selling_product,
  );
  const Recommnded = useQuery(
    ['get_Recommenedproduct', ID ? ID : ''],
    get_Recommenedproduct,
  );
  const Offer_Product = useQuery(
    ['get_Offerproduct', ID ? ID : ''],
    get_Offerproduct,
  );
  const All_Address_List = useQuery(
    ['get_allAddressList', ID ? ID : ''],
    get_allAddressList,
    {
      enabled: !!ID,
    },
  );
  // console.log(
  //   'Offer_ProductOffer_ProductOffer_Product',
  //   All_Address_List?.data,
  // );
  const Live_Order = useQuery(
    ['get_Live_Order', ID ? ID : ''],
    get_Live_Order,
    {
      enabled: !!ID,
    },
  );
  // console.log('Live_OrderLive_Order', Live_Order?.data);
  const AppControll = useQuery(['getAppControllRemote'], getAppControll);
  const url = {
    instagram: 'https://www.instagram.com/bakerymaharaj',
    facebook: 'https://www.facebook.com/BakeryMaharaj"',
    youtube: 'https://www.youtube.com/@BakeryMaharaj',
    tv: 'https://bakerymaharaj.com/',
  };
  // console.log("AppControllAppControllAppControll",AppControll)
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
  

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (ID) {
          const Response = await getGetUser1({
            user_id: ID,
          });
          if (
            Response?.status &&
            Response?.GTS?.user_email &&
            Response?.GTS?.user_name
          ) {
            dispatch(saveUser(Response?.GTS));
          }
        }

        BestSelling?.refetch();
        Recommnded?.refetch();
        Offer_Product?.refetch();
        let recentNotification = await getNotification();
        if (recentNotification) {
          let notify = recentNotification.reverse();
          setNotification(notify);
        }
      })();
    }, []),
  );
  useEffect(() => {
    if (AppControll?.data?.status) {
      // console.log('AppControllAppControll', AppControll?.data?.GTS);
      dispatch(saveAppcontrollAction(AppControll?.data?.GTS));
    }
    if (All_Address_List?.data?.status === 'success') {
      dispatch(saveAddresses(All_Address_List?.data?.GTS));
    }
  }, [AppControll?.data, All_Address_List?.data]);
  useEffect(() => {
    const getdatass = notification.filter((ite: any) => ite?.status == false);
    if (getdatass) {
      setGetdata(getdatass);
    }
  }, [notification]);
  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkOpacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(blinkOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    blinkAnimation.start();
    return () => blinkAnimation.stop();
  }, [blinkOpacity]);

  const increment = useCallback((payload: any) => {
    dispatch(incrementAction(payload));
  }, []);
  const decrement = useCallback((payload: any) => {
    dispatch(decrementAction(payload));
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      All_Address_List?.refetch();
      AppControll?.refetch();
      Banner?.refetch();
      Offer_Product?.refetch();
      Recommnded?.refetch();
      BestSelling?.refetch();
      Category?.refetch();
    }, 5000);
  }, []);

  const isOpen = isBranchOpen(Branch);
  if (Banner?.isLoading) {
    return <FullScreenLoading1 />;
  }
  if (Category?.isLoading) {
    return <FullScreenLoading1 />;
  }
  if (BestSelling?.isLoading) {
    return <FullScreenLoading1 />;
  }
  if (Recommnded?.isLoading) {
    return <FullScreenLoading1 />;
  }
  if (Offer_Product?.isLoading) {
    return <FullScreenLoading1 />;
  }
  if (All_Address_List?.isLoading) {
    return <FullScreenLoading1 />;
  }
  if (Live_Order?.isLoading) {
    return <FullScreenLoading1 />;
  }
  if (Bottom_Banner?.isLoading) {
    return <FullScreenLoading1 />;
  }
  return (
    <View style={[tailwind('flex-1 bg-secondary'), {}]}>
      <View
        style={[
          tailwind('flex-row  bg-primary py-3 px-3 '),
          { justifyContent: 'space-between' },
        ]}
      >
        {/* Logo/Image on the left */}
        <Image
          source={assets_manifest?.homeimage}
          resizeMode="contain"
          style={{ height: 30, width: 100 }}
        />

        {/* Notification Bell on the right */}
        {getdata?.length ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NotificationScreen')}
            style={{ position: 'relative' }}
          >
            {/* Notification Icon */}
            <NotificationIcon color={'white'} size={25} />

            {/* Badge Count */}
            <View
              style={[
                tailwind(
                  'absolute -top-2 -right-2 rounded-full items-center justify-center',
                ),
                {
                  backgroundColor: 'white',
                  width: 20,
                  height: 20,
                  minWidth: 20,
                },
              ]}
            >
              <Text
                style={[
                  tailwind('font-bold text-xs'),
                  { color: '#3b82f6' }, // Use your primary color here
                ]}
              >
                {getdata?.length > 9 ? '9+' : getdata?.length}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <NotificationIcon color={'white'} size={25} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['green']}
          />
        }
      >
        <View style={tailwind('mb-3 py-3  relative')}>
          <LinearGradient
            colors={['#45302B', '#45302B', '#FFF9D8', '#FFF9D8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={tailwind('absolute inset-0 ')}
          />
          {Banner?.data?.GTS ? (
            <View style={tailwind('relative')}>
              {/* Gradient Background Layer */}

              {/* Banner Content on Top */}
              <View style={tailwind('relative z-10 p-1 ')}>
                <Swiper
                  style={tailwind('h-40')}
                  index={index}
                  showsPagination={true}
                  loop={true}
                  autoplay={true}
                  autoplayTimeout={4000}
                  paginationStyle={[tailwind(''), { bottom: -20 }]}
                  dot={
                    <View
                      style={tailwind(
                        'w-1.5 h-1.5 rounded-full bg-gray-400 mx-1',
                      )}
                    />
                  }
                  activeDot={
                    <View
                      style={tailwind(
                        'w-1.5 h-1.5 rounded-full bg-primary mx-1',
                      )}
                    />
                  }
                >
                  {Banner?.data?.GTS?.map((items: any, index: any) => {
                    //  console.log("itemsitemsitems",items)
                    return (
                      <TouchableOpacity
                        key={index}
                        style={tailwind('mx-1')}
                        disabled={items?.category_id ? false : true}
                        onPress={() => {
                          navigation?.navigate('CategoryScreen', {
                            id: items?.category_id,
                          });
                        }}
                      >
                        <Image
                          // source={assets_manifest?.banner_loading}
                          source={{ uri: items?.banner_image }}
                          style={[
                            tailwind('w-full h-40'),
                            {
                              borderRadius: 12, // Slightly less than 15 to show gradient border
                              resizeMode: 'cover',
                            },
                          ]}
                          defaultSource={assets_manifest?.banner_loading}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </Swiper>
              </View>
            </View>
          ) : null}
        </View>
        {Category?.data?.GTS?.length && (
          <View style={[tailwind('mx-3 my-3')]}>
            <Text style={[tailwind('text-primary font-16 font-bold')]}>
              Explore our Menu
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={tailwind('')}
            >
              {Category?.data?.GTS.map(category => (
                <TouchableOpacity
                  key={category.category_id}
                  style={[tailwind('mr-4 items-center'), { width: 70 }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation?.navigate('CategoryScreen', {
                      id: category?.category_id,
                    });
                  }}
                >
                  {/* Category Image Container */}
                  <View
                    style={tailwind(
                      'rounded-full mt-2 items-center justify-center',
                    )}
                  >
                    {category?.category_image && (
                      <Image
                        source={{ uri: category?.category_image }}
                        defaultSource={assets_manifest?.banner_loading}
                        style={[
                          tailwind(' rounded-full'),
                          {
                            borderWidth: 2,
                            width: 70,
                            height: 70,
                            borderColor: '#fbbf24', // Tailwind's yellow-500
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                            elevation: 3,
                          },
                        ]}
                        resizeMode="cover"
                      />
                    )}
                  </View>

                  {/* Category Name */}
                  <Text
                    style={[
                      tailwind(
                        'font-14 mt-1 font-bold  text-center text-black',
                      ),
                      // { fontWeight: 'bold' },
                    ]}
                  >
                    {category?.category_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {Offer_Product?.data?.GTS?.length && (
          <View>
            <View
              style={tailwind(
                'flex-row items-center mt-5 justify-between mb-4 px-4',
              )}
            >
              {/* Left Side: Image + Text */}
              <View style={tailwind('flex-row items-center')}>
                <Image
                  style={{ height: 18, width: 18 }}
                  // tintColor={'black'}
                  source={assets_manifest?.offer}
                />
                <Text style={tailwind('font-15 font-bold text-primary ml-2')}>
                  Offers
                </Text>
              </View>

              {/* Right Side: View All */}
              <TouchableOpacity
                style={[tailwind('flex-row items-center')]}
                onPress={() =>
                  navigation.navigate('ViewAllScreen', {
                    data: Offer_Product?.data?.GTS,
                    title: 'Offers Products',
                  })
                }
                activeOpacity={0.7}
              >
                <Text style={tailwind('text-gray-500 font-12  font-bold mr-1')}>
                  View All
                </Text>
                <ViewAllIcon />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={[tailwind('mx-3')]}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Offer_Product?.data?.GTS?.length
                ? Offer_Product?.data?.GTS?.map((items: any, index: any) => {
                    // console.log('ite', items);
                    return (
                      <ProductCart
                        type={1}
                        desigin_type={2}
                        id={items?.product_id}
                        img={items?.product_image}
                        name={items?.product_name}
                        key={`${items?.product_id}-${index}`}
                        increment={increment}
                        decrement={decrement}
                        product_price={items?.product_price}
                        is_favourite={items?.is_favourite}
                        product_type={items?.product_type === '0'}
                        refreshData={Recommnded}
                        isOpen={isOpen}
                        product_percentage={items?.product_percentage}
                        product_offer={items?.product_offer}
                      />
                    );
                  })
                : null}
            </ScrollView>
          </View>
        )}
        {Bottom_Banner?.data?.GTS ? (
          <View style={tailwind('relative mt-5')}>
            {/* Gradient Background Layer */}

            {/* Banner Content on Top */}
            <View style={tailwind('relative z-10 p-1 ')}>
              <Swiper
                style={tailwind('h-40')}
                index={index}
                showsPagination={true}
                loop={true}
                autoplay={true}
                autoplayTimeout={4000}
                paginationStyle={[tailwind(''), { bottom: -20 }]}
                dot={
                  <View
                    style={tailwind(
                      'w-1.5 h-1.5 rounded-full bg-gray-400 mx-1',
                    )}
                  />
                }
                activeDot={
                  <View
                    style={tailwind('w-1.5 h-1.5 rounded-full bg-primary mx-1')}
                  />
                }
              >
                {Bottom_Banner?.data?.GTS?.map((items: any, index: any) => {
                  //  console.log("itemsitemsitems",items)
                  return (
                    <TouchableOpacity
                      key={index}
                      style={tailwind('mx-1')}
                      disabled={items?.category_id ? false : true}
                      onPress={() => {
                        navigation?.navigate('CategoryScreen', {
                          id: items?.category_id,
                        });
                      }}
                    >
                      <Image
                        // source={assets_manifest?.banner_loading}
                        source={{ uri: items?.banner_image }}
                        style={[
                          tailwind('w-full h-40'),
                          {
                            borderRadius: 12, // Slightly less than 15 to show gradient border
                            resizeMode: 'cover',
                          },
                        ]}
                        defaultSource={assets_manifest?.banner_loading}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Swiper>
            </View>
          </View>
        ) : null}
        {BestSelling?.data?.GTS?.length && (
          <View
            style={tailwind(
              'flex-row items-center mt-10 justify-between mb-4 px-4',
            )}
          >
            <View style={tailwind('flex-row items-center')}>
              <Image
                style={{ height: 20, width: 20 }}
                tintColor={'black'}
                source={assets_manifest?.ic_recomend}
              />
              <Text style={tailwind('font-15 font-bold text-black ml-2')}>
                Best Selling
              </Text>
            </View>

            {/* Right Side: View All */}
            <TouchableOpacity
              style={[tailwind('flex-row items-center')]}
              onPress={() =>
                navigation.navigate('ViewAllScreen', {
                  data: BestSelling?.data?.GTS,
                  title: 'Best Selling Products',
                })
              }
              activeOpacity={0.7}
            >
              <Text style={tailwind('text-gray-500 font-12 font-bold mr-1')}>
                View All
              </Text>
              <ViewAllIcon />
            </TouchableOpacity>
          </View>
        )}
        {BestSelling?.data?.GTS?.length
          ? BestSelling?.data?.GTS?.map((items: any, index: any) => {
              // console.log("item=-=-==-",items)
              return (
                <ProductCart
                  type={1}
                  desigin_type={1}
                  id={items?.product_id}
                  img={items?.product_image}
                  name={items?.product_name}
                  key={`${items?.product_id}_${index}`}
                  increment={increment}
                  decrement={decrement}
                  product_price={items?.product_price}
                  is_favourite={items?.is_favourite}
                  product_type={items?.product_type === '0'}
                  refreshData={BestSelling}
                  isOpen={isOpen}
                  product_offer={items?.product_offer}
                  product_percentage={items?.product_percentage}
                />
              );
            })
          : null}

        {Recommnded?.data?.GTS?.length && (
          <View
            style={tailwind(
              'flex-row items-center mt-10 justify-between mb-4 px-4',
            )}
          >
            {/* Left Side: Image + Text */}
            <View style={tailwind('flex-row items-center')}>
              <Image
                style={{ height: 20, width: 20 }}
                tintColor={'black'}
                source={assets_manifest?.ic_recomend}
              />
              <Text style={tailwind('font-15 font-bold text-black ml-2')}>
                Recommended
              </Text>
            </View>

            {/* Right Side: View All */}
            <TouchableOpacity
              style={[tailwind('flex-row items-center')]}
              onPress={() =>
                navigation.navigate('ViewAllScreen', {
                  data: Recommnded?.data?.GTS,
                  title: 'Recommended Products',
                })
              }
              activeOpacity={0.7}
            >
              <Text style={tailwind('text-gray-500  font-12  font-bold mr-1')}>
                View All
              </Text>
              <ViewAllIcon />
            </TouchableOpacity>
          </View>
        )}
        {Recommnded?.data?.GTS?.length
          ? Recommnded?.data?.GTS?.map((items: any, index: any) => {
              // console.log('ite', items);
              return (
                <ProductCart
                  type={1}
                  desigin_type={1}
                  id={items?.product_id}
                  img={items?.product_image}
                  name={items?.product_name}
                  key={`${items?.product_id}-${index}`}
                  increment={increment}
                  decrement={decrement}
                  product_price={items?.product_price}
                  is_favourite={items?.is_favourite}
                  product_type={items?.product_type === '0'}
                  refreshData={Recommnded}
                  isOpen={isOpen}
                  product_percentage={items?.product_percentage}
                  product_offer={items?.product_offer}

                />
              );
            })
          : null}
        <View style={[tailwind(' items-center')]}>
          <Image
            source={assets_manifest?.homeimage}
            resizeMode="contain"
            style={{ height: 150, width: 150 }}
          />
        </View>
        <View
          style={[
            tailwind('py-5 px-4'),
            {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              backgroundColor: '#f2eeed',
            },
          ]}
        >
          <View
            style={[
              tailwind('flex-row items-center  '),
              { justifyContent: 'space-between' },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(url?.instagram);
              }}
              style={[
                tailwind('flex-row items-center border px-4 py-3 rounded-lg'),
                { width: '48%', borderWidth: 3, justifyContent: 'center' },
              ]}
              activeOpacity={0.7}
            >
              <Image
                style={{ height: 20, width: 20 }}
                source={assets_manifest?.instagram}
              />
              <Text style={tailwind('ml-2 text-center font-bold')}>
                Instagram
              </Text>
            </TouchableOpacity>

            {/* <View style={[tailwind('h-6 w-0.5 bg-gray-300')]} /> */}

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(url?.facebook);
              }}
              style={[
                tailwind('flex-row items-center border px-4 py-3 rounded-lg'),
                { width: '48%', borderWidth: 3, justifyContent: 'center' },
              ]}
              activeOpacity={0.7}
            >
              <Image
                style={{ height: 20, width: 20 }}
                source={assets_manifest?.facebook}
              />
              <Text style={tailwind('ml-2 text-center font-bold')}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              tailwind('flex-row items-center  mt-5'),
              { justifyContent: 'space-between' },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(url?.youtube);
              }}
              style={[
                tailwind('flex-row items-center border px-4 py-3 rounded-lg'),
                { width: '48%', borderWidth: 3, justifyContent: 'center' },
              ]}
              activeOpacity={0.7}
            >
              <Image
                style={{ height: 20, width: 20, borderRadius: 50 }}
                resizeMode="cover"
                source={assets_manifest?.youtube}
              />
              <Text style={tailwind('ml-2 text-center font-bold')}>Videos</Text>
            </TouchableOpacity>

            {/* <View style={[tailwind('h-6 w-0.5 bg-gray-300')]} /> */}

            <TouchableOpacity
              onPress={
                () => {
                  navigation?.navigate('WebViewScreen', {
                    title: '',
                    url: url?.tv,
                  });
                }
                // openLink(AppControll?.privacy_policy)
              }
              style={[
                tailwind('flex-row items-center border px-4 py-3 rounded-lg'),
                { width: '48%', borderWidth: 3, justifyContent: 'center' },
              ]}
              activeOpacity={0.7}
            >
              <Image
                style={{ height: 20, width: 20 }}
                source={assets_manifest?.tv}
              />
              <Text style={tailwind('ml-2 text-center font-bold')}>Media</Text>
            </TouchableOpacity>
          </View>
          <View style={[tailwind('h-10')]} />
        </View>

        {/* {ProductList?.data?.data?.length
          ? ProductList?.data?.data?.map((items: any, index: any) => {
              return (
                <ProductCart
                  type={1}
                  id={items?.product_id}
                  img={items?.product_image}
                  name={items?.product_name}
                  key={index}
                  increment={increment}
                  decrement={decrement}
                />
              );
            })
          : null}
        <View style={[tailwind('h-40')]} /> */}
      </ScrollView>

      {Live_Order?.data?.status === 'success' && (
        <View
          style={[tailwind(' mx-4 mb-4'), { position: 'absolute', bottom: 0 }]}
        >
          <Animated.View
            style={[
              tailwind(
                'flex-row justify-between bg-primary rounded-xl items-center px-4 py-3 w-full',
              ),
              {
                opacity: blinkOpacity,
              },
            ]}
          >
            <View style={[tailwind('flex-1 ')]}>
              <Text style={tailwind('font-bold text-white font-14')}>
                Your Order's has been Processing there
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('OrderListScreen', {
                  text: 'Active Orders',
                });
              }}
              activeOpacity={0.7}
              style={[
                tailwind(' flex-row rounded-xl px-4 py-2'),
                { backgroundColor: '#fccd00' },
              ]}
            >
              <Text style={tailwind('mr-1 text-black font-14 font-bold')}>
                VIEW
              </Text>
              <Image
                style={[tailwind(''), { height: 15, width: 15 }]}
                source={assets_manifest?.location}
                tintColor={'black'}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}
