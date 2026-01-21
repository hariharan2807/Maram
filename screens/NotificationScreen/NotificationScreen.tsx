import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from '@tailwind';
import { Topbar } from '@Component';
import { useNavigation } from '@react-navigation/native';
import { getNotification, saveNotification } from '../../workers/localStorage';
export default function NotificationScreen() {
  const navigation = useNavigation();
  const [notification, setNotification] = useState([]);
  const [getdata, setGetdata] = useState([]);
  const [trued, setTrued] = useState(false);
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    (async () => {
      let recentNotification = await getNotification();
      // console.log('recentNotification------------>', recentNotification);
      if (recentNotification) {
        let notify = recentNotification.reverse();
        setNotification(notify);
        setTrued(false);
      }
    })();
  }, [trued]);
  useEffect(() => {
    const getdatass = notification.filter((ite: any) => ite?.status == false);
    if (getdatass) {
      setGetdata(getdatass);
    }
  }, [notification]);
  const navigationDecission = async (items: any) => {
    const iddata = notification?.findIndex(
      (ite: any) => ite?.order_id == items?.order_id,
    );
    notification[iddata].status = true;
    const updatedNotifications = notification.filter(
      (item: any) => item?.order_id == items?.order_id,
    );
    const saveNotifye = await saveNotification(updatedNotifications);
    const saveNotify = await saveNotification(notification);
    let recentNotification = await getNotification();
    if (recentNotification) {
      let notify = recentNotification.reverse();
      setNotification(notify);
    }
    if (items?.type == 1) {
      if (items?.type == 1) {
        navigation.navigate('OrderList', { order_id: items.order_id });
      }
    } else if (items?.type == 2) {
      navigation?.navigate('OrderStatusScreen', { order_id: items.order_id });
    }
  };
  const uniqueOrders = Object.values(
    getdata.reduce((acc, order) => {
      acc[order.order_id] = order;
      return acc;
    }, {}),
  );
  return (
    <View style={[tailwind('h-full bg-white')]}>
      <Topbar title="Notification" type={3} />
      {getdata?.length > 0 ? (
        <View style={[tailwind('p-2 px-3')]}>
          <Text style={[tailwind('font-semi font-17')]}>Notification</Text>
          {getdata?.length > 0 ? (
            <Text style={[tailwind('font-medium font-15 text-gray mt-2')]}>
              {getdata?.length} Unread Messages
            </Text>
          ) : null}
        </View>
      ) : null}
      <ScrollView style={tailwind(' h-full bg-white')}>
        {uniqueOrders?.length > 0 ? (
          uniqueOrders.map((item: any) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => navigationDecission(item)}
                  activeOpacity={0.7}
                  style={[
                    tailwind(
                      'border border-gray-300 mx-3 my-3 rounded-lg bg-white py-3',
                    ),
                  ]}
                >
                  <View
                    style={[
                      tailwind(
                        'flex-row items-center justify-between mx-3 my-2 border-b border-gray-300 pb-4',
                      ),
                    ]}
                  >
                    <Text style={[tailwind('font-bold font-13 text-red')]}>
                      {item?.type == 0
                        ? 'Order Notification'
                        : item?.type == 1
                        ? 'Order Notification'
                        : item?.type == 2
                        ? 'Order Notification'
                        : 'Order Notification'}
                    </Text>
                    <Text style={[tailwind('font-medium font-13 text-gray')]}>
                      {item?.date} {item?.time}
                    </Text>
                  </View>
                  <View style={[tailwind('flex-row items-center mx-3')]}>
                    {/* {item?.order_status == 0 ? (
                        <CancelIcon />
                      ) : item.order_status == 5 ? (
                        <TickIcon />
                      ) : (
                        <TickIcon />
                        //<InfoIcon />
                      )} */}
                    <Text style={[tailwind('font-bold font-15 px-3')]}>
                      {item?.title ? item?.title : item?.user_name}
                    </Text>
                  </View>
                  {item?.body ? (
                    <View style={[tailwind('mx-3 py-2')]}>
                      <Text
                        style={[tailwind('font-semi font-13 text-gray')]}
                      >
                        {item?.body}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={[tailwind(''), { flex: 1 ,marginTop:"50%"}]}>
            <View style={[tailwind('items-center justify-center')]}>
              {/* <Image
                resizeMode="contain"
                source={require('../../assets/images/noService.png')}
                style={{ width: width / 1.2, height: height / 2 }}
              /> */}
              <Text
                style={[tailwind('font-medium  font-17 pt-10 text-center')]}
              >
                No Notifications received yet
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  navigation?.navigate('Home');
                }}
                style={[
                  tailwind(
                    'bg-primary  items-center rounded-2xl justify-center mt-8',
                  ),
                  { width: width / 1.2 },
                ]}
              >
                <Text style={[tailwind('font-18 font-bold text-white py-4')]}>
                  {' '}
                  BACK TO HOME{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          // null
        )}
      </ScrollView>
    </View>
  );
}
