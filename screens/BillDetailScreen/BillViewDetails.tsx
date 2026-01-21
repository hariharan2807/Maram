import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import { Topbar } from '@Component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PendingIcon, TickIcon1 } from '../../assets/icons';
import { INDIAN } from '@constants/API_constants';
import assets_manifest from '@assets';
export default function BillViewDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const BillHistory = {
    date: 'Jan 2022',
    order_id: 'MA3948F3J492',
    order_string: 'Bill No#MA3948F3J492',
    total: 1725,
    payment_status: 1,
    items: [
      {
        product_name: 'Farm Fresh Milk',
        variation_unit: 'Litre',
        variation_name: '40',
        price: '35',
        quantity: 1,
        subtotal: 1085,
        product_image: assets_manifest?.Cancelled,
      },
      {
        product_name: 'Farm Fresh Milk',
        variation_unit: 'Litre',
        variation_name: '8',
        price: '25',
        quantity: 1,
        subtotal: 640,
        product_image: assets_manifest?.Cancelled,
      },
      {
        product_name: 'Farm Fresh Milk',
        variation_unit: 'Litre',
        variation_name: '3',
        price: '25',
        quantity: 1,
        subtotal: 75,
        product_image: assets_manifest?.Cancelled,
      },
    ],
    bill_details: {
      sub_total: 1800,
    },
  };
  const subscriptionItems = BillHistory.items.filter(
    item => item.type === 'subscription',
  );
  const renderItemsSection = items => (
    <View style={tailwind('mb-4')}>
      {items.map((item, index) => (
        <View
          key={index}
          style={[
            tailwind('flex-row items-center py-3 border-b border-gray-100'),
            index === items.length - 1 && tailwind('border-b-0'),
          ]}
        >
          <View
            style={[
              tailwind('rounded-lg overflow-hidden'),
              { width: 60, height: 60 },
            ]}
          >
            <Image
              style={tailwind('w-full h-full')}
              resizeMode="cover"
              source={item.product_image}
            />
          </View>

          <View style={tailwind('flex-1 ml-3')}>
            <Text style={tailwind('font-semi text-base text-gray-800')}>
              {item.product_name}
            </Text>
            <Text style={tailwind('text-sm text-gray-600 mt-1')}>
              {item.variation_name} {item.variation_unit}
            </Text>
          </View>

          <View style={tailwind('items-end')}>
            <Text style={tailwind('text-sm text-gray-600')}>
              {INDIAN}
              {item.price} x {item.quantity} {item.variation_unit}
            </Text>
            <Text style={tailwind('font-semi text-base text-gray-800 mt-1')}>
              {INDIAN}
              {item.subtotal}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
  //   console.log('route?.params?.payment_status11', route?.params?.payment_status);
  return (
    <View style={tailwind('flex-1 bg-gray-50')}>
      <Topbar
        title={route?.params?.payment_status == 1 ? 'Bill Detail' : 'Pay Bill'}
        type={3}
      />
      <ImageBackground
        style={[tailwind('flex-1'), { height: '100%', width: '100%' }]}
        source={assets_manifest?.background}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tailwind('flex-1')}
          contentContainerStyle={tailwind('pb-6')}
        >
          <View
            style={tailwind('bg-white mx-4 mt-4 rounded-2xl p-4   shadow-s')}
          >
            <View style={tailwind('flex-row justify-between items-start mb-3')}>
              <Text style={tailwind('font-bold text-lg text-gray-800')}>
                {BillHistory.date}
              </Text>
              <Text
                style={tailwind('font-bold text-lg text-gray-800 text-right')}
              >
                {BillHistory.order_string}
              </Text>
            </View>

            <View style={tailwind('flex-row items-center')}>
              {route?.params?.payment_status === 1 ? (
                <View
                  style={tailwind(
                    'flex-row items-center bg-green-50 px-3 py-1 rounded-full',
                  )}
                >
                  <TickIcon1 />
                  <Text style={tailwind('font-medium text-green-700 ml-2')}>
                    Payment Done
                  </Text>
                </View>
              ) : (
                <View
                  style={tailwind(
                    'flex-row items-center bg-yellow-50 px-3 py-1 rounded-full',
                  )}
                >
                  <PendingIcon />
                  <Text style={tailwind('font-medium text-yellow-700 ml-2')}>
                    Payment Pending
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View
            style={tailwind('bg-white mx-4 mt-4 rounded-2xl p-4   shadow-s')}
          >
            <View
              style={tailwind('flex-row justify-between items-center mb-4')}
            >
              <Text style={tailwind('font-bold text-xl text-gray-800')}>
                Items
              </Text>
              <Text style={tailwind('text-sm font-semi text-gray-500')}>
                {BillHistory.items.length} Items
              </Text>
            </View>
            {/* {subscriptionItems.length > 0 && */}
            {renderItemsSection(BillHistory?.items)}
          </View>
          <View
            style={tailwind('bg-white mx-4 mt-4 rounded-2xl p-4   shadow-s')}
          >
            <Text style={tailwind('font-bold text-xl text-gray-800 mb-4')}>
              Bill Details
            </Text>

            <View style={tailwind('')}>
              <View style={tailwind('flex-row justify-between')}>
                <Text style={tailwind('text-gray-600')}>Sub Total</Text>
                <Text style={tailwind('text-gray-800')}>
                  {INDIAN}
                  {BillHistory.bill_details.sub_total}
                </Text>
              </View>

              <View style={tailwind('h-px bg-gray-200 my-2')} />

              <View style={tailwind('flex-row justify-between')}>
                <Text style={tailwind('font-bold text-lg text-gray-800')}>
                  Grand Total
                </Text>
                <Text style={tailwind('font-bold text-lg text-gray-800')}>
                  {INDIAN}
                  {BillHistory.bill_details.sub_total}
                </Text>
              </View>
            </View>
          </View>

          {BillHistory.payment_status !== 1 && (
            <View style={tailwind('mx-4 mt-6')}>
              <TouchableOpacity
                style={tailwind(
                  'bg-blue-600 py-4 rounded-xl items-center justify-center',
                )}
                onPress={() => {}}
              >
                <Text style={tailwind('text-white font-semi text-lg')}>
                  Pay Now {INDIAN}
                  {BillHistory.total}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        
      </ImageBackground>
      {route?.params?.payment_status == 0 && (
          <View
            style={[
              tailwind('flex-row items-center  py-3 px-5'),
              { borderTopWidth: 1, borderTopColor: 'silver' },
            ]}
          >
            <Text style={[tailwind('font-bold font-18')]}>To Pay</Text>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('CheckoutScreen', {
                  amount: BillHistory?.bill_details?.sub_total,
                });
              }}
              style={[
                tailwind('py-3 px-5 rounded-full bg-green'),
                { marginLeft: 'auto' },
              ]}
            >
              <Text style={[tailwind('text-white font-bold font-15')]}>
                Pay {INDIAN} {BillHistory?.bill_details?.sub_total}
              </Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
}
