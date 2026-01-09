import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import tailwind from '@tailwind';
import { CheckOutButton, FullScreenLoading, Topbar } from '@Component';
import { useQuery } from 'react-query';
import { get_CheckBranch, get_FavList } from '@remote/userRemote';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCart } from '../../Component/ProductCart';
import { decrementAction, incrementAction } from '@actions/userActions';
import assets_manifest from '@assets';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  acquireGPSPermission,
  errorBox,
  getLocationCoords,
  isBranchOpen,
} from '../../workers/utils';
import { saveBranchction, saveLocationAction } from '@actions/appActions';

export default function FavoriteScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [permission, setPermission] = useState(false);

  const ID = useSelector((state: any) => state.user.user_id);
  const Branch = useSelector((state: any) => state.app.branch);

  const CartState = useSelector((state: any) => state.user.cart);
  const totalQuantity = CartState.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );

  const FavList = useQuery(['get_FavList', ID ? ID : ''], get_FavList);
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
  const decrement = useCallback((payload: any) => {
    dispatch(decrementAction(payload));
  }, []);
  const isOpen = isBranchOpen(Branch);

  if (FavList?.isLoading) {
    return <FullScreenLoading />;
  }
  //   console?.log('FavListFavListFavList', FavList?.data);
  return (
    <View style={[tailwind('h-full bg-secondary'), {}]}>
      <Topbar title="Favorite Product" type={3} />
      <ScrollView
        style={[tailwind('mt-3')]}
        showsVerticalScrollIndicator={false}
      >
        {FavList?.data?.GTS?.length ? (
          FavList?.data?.GTS?.map((items: any, index: any) => {
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
                refreshData={FavList}
                enable={true}
                isOpen={isOpen}
                product_percentage={items?.product_percentage}
                product_offer={items?.product_offer}

              />
            );
          })
        ) : (
          <View
            style={[
              tailwind('h-full items-center  px-5'),
              { justifyContent: 'center', marginTop: '50%' },
            ]}
          >
            <Image
              style={[tailwind(''), { height: 50, width: 50 }]}
              source={assets_manifest?.heartoutLine}
            />
            {/* <Entypo name="heart-outlined" color={'gray'} size={50} /> */}
            <Text
              style={[
                tailwind(
                  'text-gray-500 mt-3 font-bold text-center items-center mb-8 px-5',
                ),
                { fontSize: 18, lineHeight: 20, justifyContent: 'center' },
              ]}
            >
              Looks like you haven't Favourite anything
            </Text>
          </View>
        )}
        <View style={[tailwind('h-10')]} />
      </ScrollView>
      {CartState.length > 0 && (
        <CheckOutButton
          CartState={CartState}
          totalQuantity={totalQuantity}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
