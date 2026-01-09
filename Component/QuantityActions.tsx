import assets_manifest from '@assets';
import tailwind from '@tailwind';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
interface PropTypes {
  id: string;
  quantity: number;
  variationsdata(): any;
  initiateIncrement(): any;
  initiateDecrement(): any;
  product_status: boolean;
  product_message: any;
  type: number;
  customization: Boolean;
  variations: any;
}
export default function QuantityActions(props: PropTypes) {
  const { height, width } = useWindowDimensions();
  // console.log(
  //   'props?.variationsprops?.variationsprops?.variations',
  //   props?.variations,
  // );
  if (!props.product_status) {
    return (
      <>
        {props.type == 1 ? (
          <View
            style={[
              tailwind(
                'border border-gray-200 py-1  justify-center bg-white rounded-lg px-1',
              ),
              {
                width: '80%',
                marginLeft: 'auto',
              },
            ]}
          >
            <Text
              numberOfLines={2}
              style={[tailwind(' my-1  font-9 text-gray-500 text-center')]}
            >
              {props.product_message
                ? props.product_message
                : 'Not Available Right Now'}
            </Text>
          </View>
        ) : null}
        {props.type == 2 ? (
          <View
            style={[
              tailwind(
                'border border-gray-200 py-1 my-1 justify-center bg-white rounded-lg px-2 ',
              ),
              {
                height: width / 10,
                width: '85%',
              },
            ]}
          >
            <Text
              numberOfLines={1}
              style={[tailwind('py-1 font-15 text-gray-500 text-center')]}
            >
              {props.product_message
                ? props.product_message
                : 'Not Available Right Now'}
            </Text>
          </View>
        ) : null}
        {props.type == 3 ? (
          <View
            style={[
              tailwind(
                'border border-gray-200 py-1 px-2 justify-center bg-white rounded-lg mx-2',
              ),
              { height: width / 8, width: width / 4 },
            ]}
          >
            <Text numberOfLines={1} style={[tailwind('font-semi font-15 ')]}>
              {props.product_message
                ? props.product_message
                : 'Not Available Right Now'}
            </Text>
          </View>
        ) : null}
        {props.type != 1 && props.type != 2 && props.type != 3 ? (
          <View
            style={[
              tailwind(
                'border border-gray-200 py-1 my-1 justify-center bg-white rounded-lg px-1',
              ),
              {
                width: '48%',
              },
            ]}
          >
            <Text style={[tailwind('py-1 font-18 text-gray-500 text-center')]}>
              {props.product_message}
            </Text>
          </View>
        ) : null}
      </>
    );
  }
  if (props.type == 1) {
    return (
      <View style={[{ width: 110 }]}>
        {props.quantity > 0 ? (
          <View
            style={[
              tailwind(
                `flex-row items-center justify-between rounded-lg px-2 py-0.5`,
              ),
              {
                backgroundColor: '#45302B',
                width: props?.desigin_type === 1 ? '100%' : '80%',
                marginLeft: 'auto',
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.initiateDecrement}
              style={[
                tailwind('px-2 rounded-xl'),
                // { borderColor: '#24661E', borderWidth: 1 },
              ]}
            >
              <Text style={[tailwind('font-bold text-lg text-white'), {}]}>
                −
              </Text>
            </TouchableOpacity>
            <Text style={[tailwind('font-bold text-base'), { color: 'white' }]}>
              {props.quantity}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.initiateIncrement}
              style={[
                tailwind('px-2 rounded-xl'),
                // { borderColor: '#24661E', borderWidth: 1 },
              ]}
            >
              <Text style={[tailwind('font-bold text-lg'), { color: 'white' }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.initiateIncrement}
            style={[
              tailwind('py-1 rounded-lg border'),
              {
                backgroundColor: 'white',
                width: props?.desigin_type === 1 ? '100%' : '80%',
                alignItems: 'center',
                marginLeft: 'auto',
              },
            ]}
          >
            <Text
              style={[
                tailwind(' text-primary text-sm font-bold'),
                // { fontWeight: 'bold' },
              ]}
            >
              ADD
            </Text>
          </TouchableOpacity>
        )}
        {props?.variations?.length > 1 && props?.desigin_type !== 1 &&(
          <Text
            style={[
              tailwind(
                'text-center mt-1 ml-5 mb-1  font-bold text-center items-center text-gray-600 font-9',
              ),
            ]}
          >
            Customizable
          </Text>
        )}
      </View>
    );
  }
  if (props.type == 2) {
    return (
      <View style={[tailwind('w-full px-2')]}>
        <View style={[tailwind(`w-full items-end  rounded-lg bg-white `), {}]}>
          {props.quantity > 0 ? (
            <View
              style={[
                tailwind(`border rounded  my-1 w-full flex-row justify-between
                     border  border-primary rounded-lg`),
                { height: width / 10 },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={props.initiateDecrement}
                style={[
                  tailwind('px-2  justify-center rounded-l '),
                  {
                    width: '40%',
                  },
                ]}
              >
                <Text
                  style={[
                    tailwind('font-bold  font-20 '),
                    { color: '#5E6C84' },
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={props.variationsdata}
                style={[
                  tailwind('px-2 items-end justify-center rounded-r '),
                  {
                    width: '40%',
                  },
                ]}
              >
                <Text
                  style={[
                    tailwind('font-bold  font-20 '),
                    { color: '#5E6C84' },
                  ]}
                >
                  +
                </Text>
              </TouchableOpacity>
              <View style={[tailwind('absolute self-center'), { left: '45%' }]}>
                <Text
                  style={[
                    tailwind('font-bold my-1 font-15'),
                    { color: '#24661E' },
                  ]}
                >
                  {props?.quantity}
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[tailwind('my-1')]}
              onPress={props.initiateIncrement}
            >
              <Text>+ Add </Text>
            </TouchableOpacity>
          )}
        </View>
        {props.customization ? (
          <Text
            style={[
              tailwind(
                'w-full text-right font-regular my-1 text-gray-600 font-9',
              ),
            ]}
          >
            Customizable
          </Text>
        ) : (
          <Text
            style={[tailwind('w-full font-regular my-1  text-white font-9')]}
          >
            Customizable
          </Text>
        )}
      </View>
    );
  }
  if (props.type == 3) {
    return (
      <View style={[tailwind('px-2 ')]}>
        <View
          style={[
            tailwind(`  bg-white `),
            { height: width / 8, width: width / 4 },
          ]}
        >
          {props.quantity > 0 ? (
            <View
              style={[
                tailwind(
                  ` flex-row items-center justify-between  white-shadow rounded-lg `,
                ),
                { height: width / 8, width: width / 4 },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={props.initiateDecrement}
                style={[
                  tailwind('px-2    rounded-l-lg'),
                  {
                    width: '40%',
                  },
                ]}
              >
                <Text
                  style={[tailwind('font-bold font-20 '), { color: '#5E6C84' }]}
                >
                  -
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={props.variationsdata}
                style={[
                  tailwind('px-2  items-end  rounded-r-lg'),
                  {
                    width: '40%',
                  },
                ]}
              >
                <Text
                  style={[tailwind('font-bold font-20'), { color: '#5E6C84' }]}
                >
                  +
                </Text>
              </TouchableOpacity>
              <View
                style={[tailwind('absolute self-center'), { right: '45%' }]}
              >
                <Text
                  style={[tailwind('font-bold  font-15'), { color: '#24661E' }]}
                >
                  {props?.quantity}
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[tailwind('')]}
              onPress={props.variationsdata}
            >
              <Text>hari</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
  return (
    <View style={[tailwind('w-full px-2')]}>
      <View style={[tailwind(`w-full items-end  rounded-lg bg-white `), {}]}>
        {props.quantity > 0 ? (
          <View
            style={[
              tailwind(
                `flex-row my-1 py-1 w-full items-center justify-between   bg-white  white-shadow rounded`,
              ),
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.initiateDecrement}
              style={[
                tailwind('px-2'),
                {
                  borderColor: 'black',
                },
              ]}
            >
              <Text
                style={[tailwind('font-bold font-20 '), { color: '#5E6C84' }]}
              >
                -
              </Text>
            </TouchableOpacity>
            <Text
              style={[tailwind('font-bold my-1 font-15'), { color: '#24661E' }]}
            >
              {props?.quantity}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.variationsdata}
              style={[
                tailwind('px-2'),
                {
                  borderColor: 'gray',
                },
              ]}
            >
              <Text
                style={[tailwind('font-bold font-20'), { color: '#5E6C84' }]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[tailwind('my-1'), { paddingHorizontal: '5%' }]}
            onPress={props.initiateIncrement}
          ></TouchableOpacity>
        )}
      </View>
    </View>
  );
}
QuantityActions.propTypes = {
  quantity: PropTypes.number,
};
