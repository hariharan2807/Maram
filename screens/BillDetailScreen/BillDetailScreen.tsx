import { Topbar } from '@Component';
import tailwind from '@tailwind';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { INDIAN } from '@constants/API_constants';
import { PendingIcon, TickIcon1 } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import assets_manifest from '@assets';
export default function BillDetailScreen() {
  const navigation = useNavigation();
  const BillHistory = [
    {
      order_date: 'Dec 2025',
      order_id: 10,
      order_string: 'Bill No#MA3948F3J492',
      total: 1085,
      Payment_status: 1,
    },
    {
      order_date: 'Jan 2026',
      order_id: 10,
      order_string: 'Bill No#MA3948F3J492',
      total: 2460,
      Payment_status: 0,
    },
  ];
  return (
    <View style={[tailwind('h-full bg-white')]}>
      <Topbar title="Pay Bill" type={3} />
      <ImageBackground
        style={[tailwind('flex-1'), { height: '100%', width: '100%' }]}
        source={assets_manifest?.background}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {BillHistory?.length
            ? BillHistory?.map((items: any, index: any) => {
                // console.log("items?.Payment_statusitems?.Payment_status",items?.Payment_status)
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('BillViewDetails', {
                        order_id: items?.order_id,
                        payment_status: items?.Payment_status,
                      });
                    }}
                    style={[
                      tailwind('bg-white  rounded-2xl mx-4 mt-5 shadow-s p-5'),
                    ]}
                    key={index}
                  >
                    <View style={[tailwind('flex-row')]}>
                      <Text style={[tailwind('font-bold font-16 text-black')]}>
                        {items?.order_date}
                      </Text>
                      <Text
                        style={[
                          tailwind('font-bold font-16 text-black'),
                          { marginLeft: 'auto' },
                        ]}
                      >
                        {items?.order_string}
                      </Text>
                    </View>
                    <View style={[tailwind('flex-row mt-3')]}>
                      <Text style={[tailwind('font-medium font-16 text-gray')]}>
                        Bill Value
                      </Text>
                      <Text
                        style={[
                          tailwind('font-bold font-16 text-gray-500'),
                          { marginLeft: 'auto' },
                        ]}
                      >
                        {INDIAN}
                        {items?.total}
                      </Text>
                    </View>
                    <View
                      style={[
                        tailwind('my-3'),
                        { height: 1, width: '100%', backgroundColor: 'silver' },
                      ]}
                    />
                    <View style={[tailwind('flex-row ')]}>
                      <View style={[tailwind('flex-row items-center')]}>
                        {items?.Payment_status == 1 ? (
                          <TickIcon1 />
                        ) : (
                          <PendingIcon />
                        )}
                        <Text
                          style={[
                            tailwind('font-medium ml-1 font-16 text-black'),
                          ]}
                        >
                          Payment{' '}
                          {items?.Payment_status == 1 ? 'Done' : 'Pending'}
                        </Text>
                      </View>

                      <Text
                        style={[
                          tailwind('font-bold font-16 text-green'),
                          { marginLeft: 'auto' },
                        ]}
                      >
                        View Details
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
