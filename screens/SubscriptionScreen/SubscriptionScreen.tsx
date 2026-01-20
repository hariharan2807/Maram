import { ScrollView, View } from 'react-native';
import React, { useCallback } from 'react';
import tailwind from '@tailwind';
import { Topbar } from '@Component';
import assets_manifest from '@assets';
import { ProductCart } from '../../Component/ProductCart';
import { decrementAction, incrementAction } from '@actions/userActions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export default function SubscriptionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
  return (
    <View style={[tailwind('h-full bg-white')]}>
      <Topbar title="My Subscriptions" type={3} />
      <ScrollView
        horizontal={false}
        style={[tailwind(' py-3')]}
        showsVerticalScrollIndicator={false}
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
    </View>
  );
}
