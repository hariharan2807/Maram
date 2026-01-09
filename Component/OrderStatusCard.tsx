import assets from '@assets';
import tailwind from '@tailwind';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

interface PropTypes {
  status: any;
}

export default function OrderStatusCard(props: PropTypes) {
  return (
    <View style={[tailwind('my-2 ')]}>
      {props.status === 6 ? (
        <Status image={assets.fail} status={false} text="Pending" />
      ) : (
        <Status image={assets.is_success} status={true} text="Your Order has been placed in our end" />
      )}

      {props.status === 0 ? (
        <Status image={assets.fail} status={false} text="Cancelled" />
      ) : null}

      <Status
        image={assets.ic_status_prepared}
        status={props.status >= 3}
        text='Your order has been processing'
        // text="Order accepted by restaraunt"
      />
      <Status
        image={assets.ic_status_out_for_delivery}
        status={props.status >= 4}
        text='Your order has been ready and out of delivery'
        // text="Order Prepared"
      />
      <Status
        image={assets.is_delivered}
        last={true}
        status={props.status >=5}
        text='Your order has been delivered'
        // text="Order Delivered Successfully!"
      />
    </View>
  );
}
interface StatusType{
  status:boolean;
  image:number;
  text:string;
  last?:boolean;
}

const Status = (props: StatusType) => {
  const { width, height } = Dimensions.get('window');

  const scaleFont = (size: number) => (width / 375) * size;

  return (
    <View style={[tailwind('flex flex-col')]}>
      <View style={[tailwind('flex flex-row items-center')]}>
        {props.status ? (
          <Image
            resizeMode="contain"
            source={assets.img_tick_status}
            style={[tailwind(''), {width: 30, height: 30}]}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={props.image}
            style={[tailwind(''), {width: 30, height: 30}]}
          />
        )}
        <View>
          <Text
            style={[
              tailwind(`font-bold pl-3 capitalize  text-black`),{fontSize:scaleFont(14)}
              // {color: props?.status ? '#49A600' : '#BDBDBD'},
            ]}>
            {props.text}
          </Text>
        </View>
      </View>
      {props.last ? null : (
        <>
          <Text
            style={[tailwind('font-bold text-gray-400 font-8'), {left: 15}]}>
            |
          </Text>
          <Text
            style={[tailwind('font-bold text-gray-400 font-8'), {left: 15}]}>
            |
          </Text>
          <Text
            style={[
              tailwind('font-bold text-gray-400 font-8'),
              {left: 15, paddingBottom: 3},
            ]}>
            |
          </Text>
        </>
      )}
    </View>
  );
};
