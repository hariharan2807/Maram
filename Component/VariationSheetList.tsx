import React from 'react';
import tailwind from '@tailwind';
import { View, Text, TouchableOpacity, Image } from 'react-native';
// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { errorBox } from '../workers/utils';
import assets_manifest from '@assets';

interface PropTypes {
  svar: any;
  setSvar: any;
  variations: any;
  // addon: any;
  name:string
}

export default function VariationSheetList(props: PropTypes) {
  // useRenderCount(`${"VariationListReenders"} Renders `)

  const navigation = useNavigation();
  // Yellowlog("props.addon",props.addon)
  // if (props.variations.length === 1) {
  //   // return <Text style={[tailwind("font-regular font-15")]}>NO Variations</Text>
  //   return null;
  // }
  // if (props.addon.length === 0) {
  //     return null;
  //    }
  // const isOutOfStock = (stock: number) => stock === 0;
  const handleVariationPress = (item: any) => {
    // Only allow selection if item has stock
    // if (item?.product_stock === 0) {
    //   errorBox('Out of Stock');
    //   // ToastAndroid.show('Out of Stock', ToastAndroid.SHORT);
    //   return;
    // }

    props.setSvar(item);
  };
  // console.log('props?.svar?.product_stock', props?.svar?.product_stock);
  return (
    <View style={[tailwind('mx-2')]}>
      <Text style={[tailwind('py-5 font-bold text-black font-16')]} numberOfLines={2}>
       {props?.name} 
      </Text>
      {props.variations.map((item: any,index:any) => {
        // const outOfStock = isOutOfStock(item.product_stock);

        return (
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => {
              handleVariationPress(item);
            }}
            // disabled={outOfStock}
            style={[tailwind('flex flex-row p-1 items-center')]}
            key={`${item.product_variation_id}_${index}`}
          >
            {item.product_price_id === props.svar.product_price_id ? (
              <Image
                style={[tailwind(''), { height: 25, width: 25 }]}
                source={assets_manifest?.radio}
                tintColor={'#80C659'}
              />
            ) : (
              //  <Icon
              //     name="radio-button-on-outline"
              //     style={[tailwind(''), { top: 2 }]}
              //     size={25}
              //     color="#45302B"
              //   />
              // <Icon
              //   name="radio-button-off-outline"
              //   style={[tailwind(''), { top: 2 }]}
              //   size={25}
              //   color="#45302B"
              // />
              <Image
                style={[tailwind(''), { height: 25, width: 25 }]}
                source={assets_manifest?.radio_button}
                tintColor={'#80C659'}
              />
            )}

            <Text style={[tailwind('font-medium px-4 font-17')]}>
              {item.product_variation}-{item.product_unit}
            </Text>
            <Text style={[tailwind('font-bold text-gray-600 font-14')]}>
              {`₹ `}
              {item.product_price}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
