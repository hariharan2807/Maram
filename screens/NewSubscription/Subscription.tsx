import tailwind from '@tailwind';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Topbar } from '@Component';
import assets_manifest from '@assets';
import {
  CheckIcon,
  EditIcon1,
  LocationICon1,
  SubscriptionIcon,
} from '../../assets/icons';
import { ChangePlan } from '../../screens/Component';
export default function Subscription() {
  const [plan, setPlan] = useState(false);
  const ProductData1 = {
    category_name: 'Farm Fresh Natural Milk',
    eggless: '0',
    is_favourite: 0,
    product_id: '100',
    product_image: assets_manifest?.milk1,
    product_name: 'Farm Fresh Natural Milk',
    product_offer: '0',
    product_percentage: '0',
    plan: 'Daily',
    Quantity: 2,
    Delivered_Orders: 25,
    product_variation: '0.5 ',
    product_unit: 'Litre',
    product_recommended: '0',
    product_type: '1',
    timeslot: '0',
    subscribe: 1,
    Remaining_Orders: 5,
    subscription_date: '01/01/2025',
    delivery_address:
      '1st, Gandhi Ind Est, L.J.X Cross Road,Thooraipakkam, Chennai - 600112',
  };
  return (
    <View style={[tailwind('h-full bg-white')]}>
      <Topbar title="Subscription" type={3} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('pb-2')}
      >
        <View
          style={[
            tailwind(
              'items-center mt-5 py-5 bg-white rounded-xl white-shadow mx-3',
            ),
          ]}
        >
          <Image
            style={[tailwind(''), { width: 200, height: 170 }]}
            resizeMode="contain"
            source={ProductData1?.product_image}
          />
          <Text style={[tailwind('mb-3 font-bold font-18 mt-8 text-black')]}>
            {ProductData1?.product_name}
          </Text>
          <Text style={[tailwind('mb-3 font-bold font-16 text-gray-500')]}>
            {' '}
            {ProductData1?.product_variation}
            {ProductData1?.product_unit} / Days
          </Text>
          {ProductData1?.subscription_date && (
            <View style={[tailwind('flex-row items-center mb-3')]}>
              <SubscriptionIcon />
              <Text style={[tailwind('ml-2 font-14 text-gray-500')]}>
                Subscribed from
              </Text>
              <Text style={[tailwind('ml-1 font-14 font-bold text-gray-500')]}>
                {ProductData1?.subscription_date}
              </Text>
            </View>
          )}

          {ProductData1?.plan && (
            <View style={[tailwind('flex-row mb-5 items-center')]}>
              <Text style={[tailwind('font-bold font-16 text-gray-500 ')]}>
                Your Plan :{' '}
              </Text>
              <Text style={[tailwind('font-bold font-18 ')]}>
                {ProductData1?.plan}
              </Text>
            </View>
          )}

          <View
            style={[
              tailwind('flex-row items-center px-3 mb-5'),
              { justifyContent: 'space-between', width: '100%' },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setPlan(true);
              }}
              style={[
                tailwind('rounded-xl border'),
                {
                  backgroundColor: '#fff2e0',
                  width: '31%',
                  borderColor: '#f39f3e',
                },
              ]}
            >
              <Text
                style={[
                  tailwind('px-3 py-3 font-15 font-bold text-center'),
                  { color: '#f39f3e' },
                ]}
              >
                Change Plan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tailwind('rounded-xl border'),
                {
                  backgroundColor: '#fff2e0',
                  width: '31%',
                  borderColor: '#f39f3e',
                },
              ]}
            >
              <Text
                style={[
                  tailwind('px-3 py-3 font-15 font-bold text-center'),
                  { color: '#f39f3e' },
                ]}
              >
                Change Quantity
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tailwind('rounded-xl border'),
                {
                  backgroundColor: '#fff2e0',
                  width: '31%',
                  borderColor: '#f39f3e',
                },
              ]}
            >
              <Text
                style={[
                  tailwind('px-3 py-5 font-15 font-bold text-center'),
                  { color: '#f39f3e' },
                ]}
              >
                Pause {''}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              tailwind('mx-4 py-3 rounded-full items-center justify-center'),
              {
                borderWidth: 1.5,
                borderColor: '#EF4444', // red-500
                backgroundColor: 'white',
                width: '95%',
              },
            ]}
          >
            <Text style={[tailwind('font-16 font-bold'), { color: '#EF4444' }]}>
              Unsubscribe
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={[tailwind('flex-row my-3 py-3 px-3 ')]}>
            <CheckIcon />
            <Text style={[tailwind('font-bold text-black font-18 ml-2')]}>
              This Month item Detail
            </Text>
          </View>
          <View
            style={[
              tailwind('flex-row items-center px-3'),
              { justifyContent: 'space-between', width: '100%' },
            ]}
          >
            <View
              style={[
                tailwind('items-center white-shadow py-5 rounded-xl'),
                { width: '48%' },
              ]}
            >
              <Text style={[tailwind('font-bold font-18')]}>
                Delivered Orders
              </Text>
              <View style={[tailwind('flex-row my-3 items-center')]}>
                <Text style={[tailwind('font-bold font-22 text-black')]}>
                  {ProductData1?.Delivered_Orders}
                </Text>
                <Text style={[tailwind('ml-1 font-bold text-gray-500')]}>
                  {ProductData1?.product_unit}
                </Text>
              </View>
            </View>
            <View
              style={[
                tailwind('items-center white-shadow py-5 rounded-xl'),
                { width: '48%' },
              ]}
            >
              <Text style={[tailwind('font-bold font-18')]}>
                Remaining Orders
              </Text>
              <View style={[tailwind('flex-row my-3 items-center')]}>
                <Text style={[tailwind('font-bold font-22 text-black')]}>
                  {ProductData1?.Delivered_Orders}
                </Text>
                <Text style={[tailwind('ml-1 font-bold text-gray-500')]}>
                  {ProductData1?.product_unit}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[tailwind('mx-5 my-5 white-shadow px-3 py-5 rounded-xl')]}
          >
            <View style={[tailwind('flex-row items-center')]}>
              <LocationICon1 />
              <Text style={[tailwind('ml-2 font-bold font-20 text-black')]}>
                Delivery Address
              </Text>
              <TouchableOpacity style={[tailwind(''), { marginLeft: 'auto' }]}>
                <EditIcon1 />
              </TouchableOpacity>
            </View>
            <View style={[tailwind('rounded-xl px-3 my-3 py-3 white-shadow')]}>
              <Text style={[tailwind('font-bold text-black py-3')]}>
                {ProductData1?.delivery_address}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <ChangePlan
        visible={plan}
        setAlertModal={setPlan}
        title="Change Plan"
        action={() => {}}
        plan={ProductData1?.plan}
      />
    </View>
  );
}
