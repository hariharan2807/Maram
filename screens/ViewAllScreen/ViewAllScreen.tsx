import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import tailwind from '@tailwind';
import { CheckOutButton, Topbar } from '@Component';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ProductCart } from '../../Component/ProductCart';
import { decrementAction, incrementAction } from '@actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { BagColor } from '../../assets/icons';
import { acquireGPSPermission, errorBox, getLocationCoords, isBranchOpen } from '../../workers/utils';
import { saveBranchction, saveLocationAction } from '@actions/appActions';
import { get_CheckBranch } from '@remote/userRemote';

export default function ViewAllScreen() {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const CartState = useSelector((state: any) => state.user.cart);
  const Branch = useSelector((state: any) => state.app.branch);
  const [permission, setPermission] = useState(false);

  //   console.log('CartStateCartStateCartState', CartState);
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

  return (
    <View style={[tailwind('h-full bg-secondary'), {}]}>
      <Topbar title={route?.params?.title} type={3} />
      <ScrollView
        style={[tailwind('mt-3')]}
        showsVerticalScrollIndicator={false}
      >
        {route?.params?.data?.map((items: any, index: any) => {
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
              isOpen={isOpen}
              product_percentage={items?.product_percentage}
              product_offer={items?.product_offer}

            />
          );
        })}
        <View style={[tailwind('h-20')]} />
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
