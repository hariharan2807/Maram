import { Text, TouchableOpacity, View } from 'react-native';
import React = require('react');
import tailwind from '@tailwind';
import { BagColor } from '../assets/icons';
import { useSelector } from 'react-redux';
interface CartCompType {
    CartState: any;
    totalQuantity:any
    navigation:any
  }
const CheckOutButton = (props: CartCompType) => {

  return (
    <View>
      {props?.CartState.length > 0 && (
        <View
          style={[tailwind(' mx-4 mb-4'), { position: 'absolute', bottom: 0 }]}
        >
          <View
            style={[
              tailwind(
                'flex-row justify-between bg-green rounded-xl items-center px-4 py-3 w-full',
              ),
              {
                // backgroundColor: '#24661E',
                borderRadius: 18,
              },
            ]}
          >
            <View style={[tailwind('flex-1 flex-row items-center')]}>
              <Text style={tailwind('font-bold text-white text-base')}>
                {props?.CartState?.length} Item{props?.CartState?.length > 1 ? 's' : ''}
                {' | '}
              </Text>
              <View
                style={[
                  tailwind(''),
                  { height: '100%', width: 2, backgroundColor: 'red' },
                ]}
              />
              <Text style={tailwind(' font-bold text-white text-base')}>
                ₹ {props?.totalQuantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props?.navigation?.navigate('Cart');
              }}
              activeOpacity={0.7}
              style={[
                tailwind(' flex-row items-center rounded-xl  py-1'),
                { backgroundColor: 'white' },
              ]}
            >
              <Text style={tailwind('text-primary px-3 py-2 flex font-bold ml-4')}>
                VIEW CART
              </Text>
              {/* <View style={[tailwind('px-2'), { marginLeft: 'auto' }]}>
                <BagColor color={'black'} />
              </View> */}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CheckOutButton;
