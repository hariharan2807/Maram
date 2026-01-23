import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CheckOutButton, Topbar } from '@Component';
import assets_manifest from '@assets';
import { ExtraProductIcon, SubscriptionIcon1 } from '../../assets/icons';
import tailwind from '@tailwind';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductCart } from '../../Component/ProductCart';
import { decrementAction, incrementAction } from '@actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export default function CategoryScreen() {
  const route = useRoute();
  const dispatch = useDispatch();
  const CartState = useSelector((state: any) => state.user.cart);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(
    route?.params?.items?.category_id
      ? route?.params?.items?.category_id == 3 ||
        route?.params?.items?.category_id == 1
        ? 1
        : 2
      : route?.params?.items?.category_id,
  );

  const Category = [
    {
      category_image: assets_manifest?.SubSction,
      category_name: 'Subscription Product',
      category_id: 1,
    },
    {
      category_image: assets_manifest?.Addon,
      category_name: 'Add On Product',
      category_id: 2,
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
  const CartStateValue = CartState?.filter(item => item?.desigin_type != 4);
  const totalQuantity = CartStateValue.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0,
  );
  return (
    <View style={styles.container}>
      <Topbar title="Category" type={3} />

      {/* CATEGORY TABS */}
      <View style={styles.tabContainer}>
        {Category.map(item => {
          const isActive = activeTab === item.category_id;

          return (
            <TouchableOpacity
              key={item.category_id}
              activeOpacity={0.8}
              onPress={() => setActiveTab(item.category_id)}
              style={styles.tabItem}
            >
              <View style={[tailwind('my-3')]}>
                {item.category_id == 1 ? (
                  <SubscriptionIcon1 />
                ) : (
                  <ExtraProductIcon />
                )}
              </View>

              {/* <Image
                source={item.category_image}
                style={[
                  styles.icon,
                  { tintColor: isActive ? '#F39F3E' : '#9CA3AF' },
                ]}
                resizeMode="contain"
              /> */}

              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? '#111827' : '#6B7280' },
                ]}
              >
                {item.category_name}
              </Text>

              {isActive && <View style={styles.activeLine} />}
            </TouchableOpacity>
          );
        })}
      </View>
      {activeTab === 1 && (
        <ScrollView
          // horizontal={true}
          style={[tailwind(' py-3')]}
          // showsHorizontalScrollIndicator={false}
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
                desigin_type={6}
                type={1}
                subscribe={items?.subscribe === 1}
                style={tailwind('mr-3')}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
      )}
      {activeTab === 2 && (
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
      )}
      {CartStateValue.length > 0 && (
        <CheckOutButton
          CartState={CartStateValue}
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
    backgroundColor: '#FFFFFF',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },

  tabItem: {
    width: '48%',
    alignItems: 'center',
    // paddingVertical: 12,
  },

  icon: {
    width: 32,
    height: 32,
    marginBottom: 6,
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  activeLine: {
    marginTop: 8,
    height: 3,
    width: '60%',
    backgroundColor: '#F39F3E',
    borderRadius: 2,
  },
});
