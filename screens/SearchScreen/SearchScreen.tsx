import tailwind from '@tailwind';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import React, { useCallback, useState, useMemo } from 'react';
import { FullScreenLoading, Topbar } from '@Component';
import { ProductCart } from '../../Component/ProductCart';
import { decrementAction, incrementAction } from '@actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { BagColor, SearchIcon } from '../../assets/icons';
import { useQuery } from 'react-query';
import { get_CheckBranch, get_Get_all_Product } from '@remote/userRemote';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  acquireGPSPermission,
  errorBox,
  getLocationCoords,
  isBranchOpen,
} from '../../workers/utils';
import { saveBranchction, saveLocationAction } from '@actions/appActions';
export default function SearchScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [permission, setPermission] = useState(false);

  const ID = useSelector((state: any) => state.user.user_id);
  const Branch = useSelector((state: any) => state.app.branch);

  const CartState = useSelector((state: any) => state.user.cart);
  const totalQuantity = CartState.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );
  // console.log("CartStateCartState",CartState)
  const Response = useQuery(['get_Get_all_Product', ID], get_Get_all_Product);
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
    dispatch(incrementAction(payload));
  }, []);
  const decrement = useCallback((uuid: any) => {
    dispatch(decrementAction(uuid));
  }, []);
  const filteredData = useMemo(() => {
    const products = Response?.data?.GTS || []; // Default to empty array if no data

    if (!searchText.trim()) {
      return products; // Show all products when search is empty
    }

    // Filter products based on search text
    return products.filter(item =>
      item.product_name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, Response?.data?.GTS]);
  const isOpen = isBranchOpen(Branch);

  if (Response?.isLoading) {
    return <FullScreenLoading />;
  }
  console.log("ResponseResponseResponse",Response?.data)
  return (
    <View style={[tailwind('h-full bg-secondary')]}>
      <Topbar title="Search" type={3} />
      <View style={[tailwind('bg-primary')]}>
        <View
          style={[
            tailwind(
              'mx-3 px-3 my-3 items-center border bg-white flex-row rounded-xl ',
            ),
            { borderColor: 'silver' },
          ]}
        >
          <SearchIcon />
          <TextInput
            placeholder="Search Product.."
            placeholderTextColor={'gray'}
            value={searchText}
            onChangeText={setSearchText}
            style={[
              tailwind('font-15 ml-1 py-3 flex-1 font-semi text-gray'),
              { color: 'black' },
            ]}
          />
          {searchText?.length >= 1 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
              }}
            >
              <Ionicons name="close" size={20} color={'black'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item?.product_id}
        ListEmptyComponent={
          <View style={[tailwind('items-center'), { marginTop: '50%' }]}>
            <Feather color={'black'} size={30} name="search" />
            <Text
              style={[tailwind('text-center font-bold text-gray-500 mt-2')]}
            >
              No Items Available Now
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <ProductCart
            type={1}
            desigin_type={1}
            id={item?.product_id}
            img={item?.product_image}
            name={item?.product_name}
            key={`${item?.product_id}_${index}`}
            increment={increment}
            decrement={decrement}
            product_price={item?.product_price}
            is_favourite={item?.is_favourite}
            product_type={item?.product_type === '0'}
            refreshData={Response}
            isOpen={isOpen}
            product_percentage={item?.product_percentage}
            product_offer={item?.product_offer}

          />
        )}
        ListFooterComponent={<View style={[tailwind('h-40')]} />}
      />
      {CartState.length > 0 && (
        <View
          style={[tailwind(' mx-4 mb-4'), { position: 'absolute', bottom: 0 }]}
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
              <Text style={tailwind('font-bold text-white text-base')}>
                {CartState?.length} Item{CartState?.length > 1 ? 's' : ''}
                {' | '}
              </Text>
              <View
                style={[
                  tailwind(''),
                  { height: '100%', width: 2, backgroundColor: 'red' },
                ]}
              />
              <Text style={tailwind(' font-bold text-white text-base')}>
                ₹ {totalQuantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('Cart');
              }}
              activeOpacity={0.7}
              style={[
                tailwind('border  flex-row items-center rounded-xl  py-1'),
                { borderWidth: 2, backgroundColor: '#FFCC01' },
              ]}
            >
              <Text style={tailwind('text-primary flex font-bold ml-4')}>
                VIEW CART
              </Text>
              <View style={[tailwind('px-2'), { marginLeft: 'auto' }]}>
                <BagColor color={'black'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
