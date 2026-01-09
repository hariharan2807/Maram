import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import tailwind from '@tailwind';
import {
  FullScreenLoading,
  GlobalDialogModal,
  OrderListComponent,
  Topbar,
} from '@Component';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useQuery } from 'react-query';
import { get_All_Order } from '@remote/userRemote';
import assets_manifest from '@assets';
import { errorBox } from '../../workers/utils';
import { useSelector } from 'react-redux';
export default function OrderListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const ID = useSelector((state: any) => state.user.user_id);

  const [deactivityModal, setDeactivityModal] = useState(false);
  const [id, setId] = useState('');

  const OrderList = useQuery(['get_All_Order', ID ? ID : ''], get_All_Order);
  useFocusEffect(
    useCallback(() => {
      OrderList?.refetch();
    }, []),
  );
  if (OrderList?.isLoading) {
    return <FullScreenLoading />;
  }
  // const pendingOrders =
  //   OrderList?.data?.data?.filter(
  //     (order: any) => order?.order_status !== 'Delivered',
  //   ) || [];

  // const CompletedOrder =
  //   OrderList?.data?.data?.filter(
  //     (order: any) => order?.order_status === 'Delivered',
  //   ) || [];
  // // console.log('CompletedOrderCompletedOrder', CompletedOrder);
  // if (route?.params?.text === 'Completed Orders') {
  //   if (!CompletedOrder?.length) {
  //     return (
  //       <View style={[tailwind('h-full ')]}>
  //         <Topbar title={route?.params?.text} type={1} />
  //         <View
  //           style={[
  //             tailwind('items-center h-full'),
  //             { justifyContent: 'center' },
  //           ]}
  //         >
  //           <Image
  //             source={assets_manifest?.LogoNew}
  //             defaultSource={assets_manifest?.LogoNew}
  //             style={{
  //               width: 100,
  //               height: 100,
  //               borderRadius: 50,
  //               // borderWidth: 3,
  //               // borderColor: '#fff',
  //             }}
  //           />
  //           <Text style={[tailwind('text-black mt-5 font-bold font-16')]}>
  //             No Completed Orders Found
  //           </Text>
  //         </View>
  //       </View>
  //     );
  //   }
  // } else {
  //   if (!pendingOrders?.length) {
  //     return (
  //       <View style={[tailwind('h-full ')]}>
  //         <Topbar title={route?.params?.text} type={1} />
  //         <View
  //           style={[
  //             tailwind('items-center h-full'),
  //             { justifyContent: 'center' },
  //           ]}
  //         >
  //           <Image
  //             source={assets_manifest?.LogoNew}
  //             defaultSource={assets_manifest?.LogoNew}
  //             style={{
  //               width: 100,
  //               height: 100,
  //               borderRadius: 50,
  //               borderWidth: 3,
  //               borderColor: '#fff',
  //             }}
  //           />
  //           <Text style={[tailwind('text-black mt-5 font-bold font-16')]}>
  //             No Active Orders Found
  //           </Text>
  //         </View>
  //       </View>
  //     );
  //   }
  // }
  // const deactivateAction = async () => {
  //   setDeactivityModal(false);
  //   StatusUpdate(id);
  //   OrderList?.refetch();
  // };
  // const OpenModal = id => {
  //   setId(id);
  //   setDeactivityModal(true);
  // };
  if (!OrderList?.data?.GTS?.length) {
    return (
      <View style={[tailwind('h-full ')]}>
        <Topbar title={route?.params?.text} type={3} />
        <View
          style={[
            tailwind('items-center h-full'),
            { justifyContent: 'center' },
          ]}
        >
          <Image
            source={assets_manifest?.banner_loading}
            defaultSource={assets_manifest?.banner_loading}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
          <Text style={[tailwind('text-black mt-5 font-bold font-16')]}>
            No Active Orders Found
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[tailwind('h-full bg-secondary')]}>
      <Topbar title={route?.params?.text} type={3} />
      <ScrollView
        style={[tailwind('')]}
        showsVerticalScrollIndicator={false}
      >
        {OrderList?.data?.GTS?.filter(item => {
          const filterValue = item?.order_status; // Get the filter value
          return filterValue !== 0 && filterValue !== 5 && filterValue !== 6; // Keep only items where filter is NOT 0 AND NOT 5
        })?.map((items: any, index: any) => {
          return (
            <OrderListComponent
              key={items?.order_id || index}
              order_string={items?.order_string}
              booking_date={items?.booking_date}
              booking_time={items?.booking_time}
              order_status={items?.order_status}
              total_amount={items?.total_amount}
              id={items?.order_id}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
