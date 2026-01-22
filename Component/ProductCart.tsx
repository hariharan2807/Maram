import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import tailwind from '@tailwind';
import QuantityActions from './QuantityActions';
import { useDispatch, useSelector } from 'react-redux';
import { errorBox, infoBox } from '../workers/utils';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import ImageViewer from './ImageViewer';
import assets_manifest from '@assets';
import AutoScrolling from 'react-native-auto-scrolling';
import { incrementAction, updateCart } from '@actions/userActions';
import VariationSheetList from './VariationSheetList';
import Entypo from 'react-native-vector-icons/Entypo';
import { get_AddFav } from '@remote/userRemote';
import GlobalDialogModal from './GlobalDialogModal';
interface Prototype {
  img: any;
  name: string;
  key: any;
  id: any;
  type: number;
  mismatch_id: string;
  product_price: any;
  product_type: boolean;
  is_favourite: number;
  refreshData: any;
  isopen: boolean;
  desigin_type: number;
  product_offer: any;
  subscribe: any;
  navigation: any;
}
export const ProductCart = (props: Prototype) => {
  const dispatch = useDispatch();
  let [svar, setSvar] = useState(
    props.product_price?.length ? props.product_price[0] : [],
  );
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(
    props?.is_favourite || 0,
  );
  let [modal, setModal] = useState(false);
  const ID = useSelector((state: any) => state.user.user_id);

  const CartState = useSelector((state: any) => state.user.cart);
  const previeousUid = useRef(null);
  const imageLargerRef = useRef(null);
  const RepeatRef = useRef(null);
  const ImageOnlyView = useRef(null);
  useEffect(() => {
    if (props?.enable) {
      setIsFavoriteLocal(1);
    } else {
      setIsFavoriteLocal(props?.is_favourite || 0);
    }
  }, [props?.is_favourite]);
  const handleFavoriteToggle = useCallback(async () => {
    try {
      // Optimistic update
      const newStatus = isFavoriteLocal === 1 ? 0 : 1;
      setIsFavoriteLocal(newStatus);

      // Call API
      const response = await get_AddFav({
        product_id: props.id,
        user_id: ID,
      });

      // console.log('API Response:', response);

      if (response.status === 'success') {
        infoBox(response?.message);
        // console.log("refreshDatarefreshDatarefreshData",response)
        // Success - trigger refetch to sync with server
        if (props?.refreshData) {
          props.refreshData?.refetch();
        }
      } else {
        // console.log('data=-=-=-=-=', response);
        setIsFavoriteLocal(isFavoriteLocal);

        errorBox('Login to enable this service');
        // Revert on failure
        // setIsFavoriteLocal(isFavoriteLocal);
        // console.log('Favorite toggle failed');
      }
    } catch (error) {
      // Revert on error
      setIsFavoriteLocal(isFavoriteLocal);
      console.log('Favorite toggle error:', error);
    }
  }, [props.id, isFavoriteLocal, ID, props?.refreshData]);
  const quantity = useSelector(state => {
    try {
      // Use optional chaining to avoid errors if svar is null/undefined
      const productPriceId = svar?.product_price_id;

      if (!productPriceId) {
        // console.log('No product_price_id found in svar');
        return 0;
      }

      let uuid = `${props.id}_${productPriceId}`;
      // console.log('Looking for UUID in cart:', uuid);

      // Find matching item in cart
      const match = state.user.cart.find(item => item.uuid === uuid);

      // console.log('Cart match found:', match);
      // console.log('Full cart:', state.user.cart);

      return match ? match.quantity : 0;
    } catch (err) {
      console.log('quantity err', err);
      return 0;
    }
  });
  const initiateDecrement = useCallback(() => {
    let uuid = `${props.id}_${svar?.product_price_id}`;

    props.decrement({ uuid });
  }, [props.id, props?.type, svar, svar?.product_price_id]);

  const initiateIncrement = useCallback(() => {
    (async () => {
      let uuid = `${props.id}_${svar?.product_price_id}`;
      let cartObj = {
        uuid: uuid,
        product_id: props.id,
        variation: svar,
        product_name: props.name,
        product_price: svar?.product_price,
        product_price_id: svar?.product_price_id,
        type: props?.type,
        mismatch_id: props?.type === 2 ? props?.mismatch_id : '0',
        image: props?.img,
        desigin_type: props?.desigin_type == 6 ? 4 : props?.desigin_type,
      };

      previeousUid.current = uuid;
      props.increment(Object.freeze(cartObj));
    })();
  }, [
    props?.id,
    props?.name,
    props?.type,
    props?.mismatch_id,
    props?.img,
    svar,
    svar?.product_price_id,
  ]);
  const Variation = () => {
    // ImageOnlyView?.current?.close();
console?.log("desigin_typedesigin_typedesigin_typedesigin_typedesigin_type1",props?.desigin_type)

    // MULTIPLE VARIATIONS
    if (props?.product_price?.length > 1) {
      const currentUuid = `${props.id}_${svar?.product_price_id}`;

      const isAlreadyInCart = CartState.some(item => item.uuid === currentUuid);

      if (isAlreadyInCart) {
        RepeatRef?.current?.open();
      } else {
        imageLargerRef?.current?.open();
      }
      return;
    }

    // SINGLE VARIATION
    if (CartState.length === 0) {
      initiateIncrement();
      return;
    }

    const hasMismatch = CartState.some(
      item => item.desigin_type !== (props?.desigin_type==6?4:props?.desigin_type),
    );
console.log("hasMismatch",hasMismatch)
    if (hasMismatch) {
      setModal(true);
      console.log("props?.desigin_typeprops?.desigin_typeprops?.desigin_type",props?.desigin_type)
    } else {
      initiateIncrement();
    }
  };

  const Close = () => {
    // Add selected variation to cart
    initiateIncrement();
    // Close modal
    imageLargerRef?.current?.close();
  };
  const Repeate = () => {
    initiateIncrement();
    // Close modal
    RepeatRef?.current?.close();
  };
  const choosehandle = () => {
    RepeatRef?.current?.close();
    imageLargerRef?.current?.open();
  };
  const resetCartandProceed = () => {
    dispatch(updateCart([]));
    setModal(false);

    // Add item AFTER clearing cart
    setTimeout(() => {
      initiateIncrement();
    }, 0);
  };

  return (
    <>
      {props?.desigin_type === 1 && (
        <View style={[tailwind('px-3')]}>
          <View style={[tailwind('my-2')]} key={props?.id}>
            <View
              style={[
                tailwind('flex-row items-center shadow-md rounded-xl'),
                { backgroundColor: 'white', width: '100%' },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                style={[tailwind('relative')]}
                // onPress={() => {
                //   ImageOnlyView?.current?.open();
                // }}
              >
                <Image
                  style={{
                    width: 110,
                    height: 110,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  source={{ uri: props?.img }}
                  defaultSource={assets_manifest?.placeholder}
                />

                {/* Offer Badge */}
                {props?.product_percentage !== '0' &&
                  props?.product_offer === '1' && (
                    <View
                      style={[
                        tailwind('absolute bottom-0  bg-red-600 px-2 py-1 '),
                        { zIndex: 10 },
                      ]}
                    >
                      <Text style={[tailwind('text-white font-bold font-12')]}>
                        {props?.product_percentage}% Offer
                      </Text>
                    </View>
                  )}

                {/* Favorite Heart - Top Right */}
              </TouchableOpacity>
              {/* <Image
                style={[
                  tailwind(''),
                  {
                    width: 110,
                    height: 110,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  },
                ]}
                resizeMode="cover"
                // source={assets_manifest?.img}
                source={{ uri: props?.img }}
                defaultSource={assets_manifest?.banner_loading}
              /> */}
              <View style={[tailwind('flex-1 ml-3 mr-3')]}>
                <View
                  style={[
                    tailwind('flex-row items-center justify-between '),
                    { width: '100%' },
                  ]}
                >
                  <View style={[tailwind('flex-row items-center flex-1'), {}]}>
                    <Image
                      source={
                        props?.product_type
                          ? assets_manifest?.nonvegimg
                          : assets_manifest?.vegimg
                      }
                      style={[tailwind(''), { width: 15, height: 15 }]}
                    />
                    <Text
                      style={[
                        tailwind('font-14 ml-2 font-bold text-black'),
                        { width: '85%' },
                      ]}
                      numberOfLines={1}
                    >
                      {props?.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[tailwind('px-3')]}
                    onPress={() => handleFavoriteToggle()}
                  >
                    {isFavoriteLocal === 1 ? (
                      // Filled heart when favorite
                      <Image
                        style={[tailwind(''), { height: 20, width: 20 }]}
                        source={assets_manifest?.heart}
                      />
                    ) : (
                      // <Entypo name="heart" color={'red'} size={20} />
                      // <Text style={[tailwind('text-red-500')]}>❤️</Text>
                      // Outline heart when not favorite
                      <Image
                        style={[tailwind(''), { height: 20, width: 20 }]}
                        source={assets_manifest?.heartoutLine}
                        tintColor={'red'}
                      />

                      // <Entypo name="heart-outlined" color={'red'} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[tailwind('  justify-between mt-2')]}>
                  <View>
                    <View style={[tailwind('flex-row items-center')]}>
                      <Text
                        style={[tailwind('font-16 font-bold text-gray-900')]}
                      >
                        ₹{svar?.product_price}
                      </Text>
                      {/* <Text
                        style={[
                          tailwind('ml-1 font-bold font-12 '),
                          { color: 'green' },
                        ]}
                      >
                        {props?.product_percentage !== '0' &&
                          props?.product_offer === '1' &&
                          `${props?.product_percentage}% Offer`}
                      </Text> */}
                    </View>

                    <View
                      style={[
                        tailwind('flex-row items-center'),
                        { justifyContent: 'space-between' },
                      ]}
                    >
                      <Text
                        style={[
                          tailwind(
                            `font-12 ${
                              !props?.isopen ? 'py-2' : ''
                            } text-black font-bold`,
                          ),
                        ]}
                      >
                        {svar?.product_variation} {''}
                        {svar?.product_unit}
                      </Text>
                      {props?.isOpen && (
                        <View style={[tailwind('')]}>
                          <QuantityActions
                            type={1}
                            id={props.id}
                            initiateIncrement={Variation}
                            initiateDecrement={initiateDecrement}
                            quantity={quantity}
                            product_message={''}
                            product_status={true}
                            variations={props?.product_price}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {props?.desigin_type === 2 && (
        <View
          style={[
            tailwind('mx-1 px-2 py-2 bg-secondary'),
            {
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#45302B',
              borderStyle: 'dotted',
            },
          ]}
          key={props?.id}
        >
          <View
            style={[
              // tailwind(' '),
              {
                // backgroundColor: 'pink',
                width: 130, // Fixed width for horizontal scroll
                // borderWidth: 1,
                // borderColor: 'transparent',
                // marginRight: 12, // Gap between cards
                // shadowColor: '#000',
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.1,
                // shadowRadius: 3,
                // elevation: 3,
              },
            ]}
          >
            {/* Image Container with Offer Badge */}
            <View style={[tailwind('relative')]}>
              <Image
                style={{
                  width: '100%',
                  height: 120,
                  resizeMode: 'cover',
                }}
                source={{ uri: props?.img }}
                defaultSource={assets_manifest?.placeholder}
              />

              {/* Offer Badge */}
              {props?.product_percentage !== '0' &&
                props?.product_offer === '1' && (
                  <View
                    style={[
                      tailwind('absolute bottom-0  bg-red-600 px-2 py-1 '),
                      { zIndex: 10 },
                    ]}
                  >
                    <Text style={[tailwind('text-white font-bold font-12')]}>
                      {props?.product_percentage}% Offer
                    </Text>
                  </View>
                )}

              {/* Favorite Heart - Top Right */}
            </View>

            {/* Product Details */}
            <View style={[tailwind('px-3 mt-2')]}>
              {/* Product Name */}
              <Text
                style={[tailwind('font-bold text-black font-14 mb-2')]}
                numberOfLines={2}
              >
                {props?.name}
              </Text>
              <View style={[tailwind('flex-row'), { width: '100%' }]}>
                <Text
                  style={[
                    tailwind('font-bold text-black font-16 mb-2'),
                    { width: '50%' },
                  ]}
                >
                  ₹{svar?.product_price}
                </Text>
                <Text
                  style={[
                    tailwind('text-center font-12 font-bold text-gray-700'),
                    { width: '50%' },
                  ]}
                >
                  {svar?.product_variation} {svar?.product_unit}
                </Text>
              </View>

              {/* Variation */}

              {/* ADD / Quantity Button */}
              {props?.isOpen && (
                <View style={[tailwind('items-center'), { width: '100%' }]}>
                  <QuantityActions
                    type={1}
                    desigin_type={1}
                    id={props.id}
                    initiateIncrement={Variation}
                    initiateDecrement={initiateDecrement}
                    quantity={quantity}
                    product_message={''}
                    product_status={true}
                    variations={props?.product_price}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )}
      {props?.desigin_type === 3 && (
        <View
          style={[
            tailwind(
              'mx-2 my-1 flex-row white-shadow bg-white  rounded-lg items-center',
            ),
            {
              width: 180, // 固定宽度确保水平滚动效果
              // shadowColor: '#000',
              // shadowOffset: { width: 0, height: 1 },
              // shadowOpacity: 0.1,
              // shadowRadius: 3,
              // elevation: 2,
            },
          ]}
          key={props?.id}
        >
          {/* 产品图片区域 */}
          <View style={[tailwind(' items-center'), {}]}>
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                borderRadius: 8,
              }}
              source={props?.img}
              defaultSource={assets_manifest?.placeholder}
            />
          </View>

          {/* 产品信息区域 */}
          <View style={[tailwind('px-3 pb-3')]}>
            <Text
              style={[
                tailwind('font-bold text-black text-sm mb-1 mt-1'),
                { width: 100 },
              ]}
              numberOfLines={2}
            >
              {props?.name}
            </Text>

            {props?.des && (
              <Text
                style={[tailwind('text-gray-600 text-xs')]}
                numberOfLines={2}
              >
                {props?.des}
              </Text>
            )}
          </View>
        </View>
      )}
      {props?.desigin_type === 4 && (
        <View
          style={[
            tailwind('py-3 rounded-xl mx-2 items-center'),
            {
              backgroundColor: 'white',
              width: 160,
              elevation: 4, // Android shadow
              shadowColor: '#000', // iOS shadow
              shadowOpacity: 0.15,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
            },
          ]}
        >
          {/* IMAGE */}
          <TouchableOpacity
            activeOpacity={0.9}
            // onPress={() => ImageOnlyView?.current?.open()}
          >
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 12, // FULL radius
              }}
              resizeMode="contain"
              source={props?.img}
              defaultSource={assets_manifest?.placeholder}
            />
          </TouchableOpacity>

          {/* DETAILS */}
          <View style={tailwind('mt-3 w-full px-3')}>
            <Text
              numberOfLines={1}
              style={tailwind('font-15 font-bold text-gray-900')}
            >
              {props?.name}
            </Text>

            <Text style={tailwind('font-12 text-gray-700 mt-1')}>
              {svar?.product_variation} {svar?.product_unit}
            </Text>

            {/* PRICE */}
            <View style={tailwind('flex-row items-center mt-2')}>
              <Text
                style={[tailwind('font-17 font-bold'), { color: '#F39F3E' }]}
              >
                ₹{svar?.product_price}
              </Text>

              {svar?.mrp_price && (
                <Text
                  style={tailwind('font-14 ml-2 text-gray-400 line-through')}
                >
                  ₹{svar?.mrp_price}
                </Text>
              )}
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              onPress={() => {
                if (!props?.subscribe) {
                  Variation();
                } else {
                  props?.navigation?.navigate('Subscription');
                }
              }}
              style={[
                tailwind('mt-3 py-2 rounded-full'),
                {
                  backgroundColor: props?.subscribe ? 'white' : '#F39F3E',
                  borderWidth: props?.subscribe ? 1 : 0,
                  borderColor: '#F39F3E',
                },
              ]}
            >
              <Text
                style={[
                  tailwind('text-center font-bold'),
                  { color: props?.subscribe ? '#F39F3E' : 'white' },
                ]}
              >
                {props?.subscribe ? 'View Details' : 'Subscribe'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {props?.desigin_type === 5 && (
        <View
          style={[
            tailwind('flex-row items-center rounded-xl mx-2 my-2 p-3'),
            {
              backgroundColor: 'white',
              // width: '80%',
              elevation: 3,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
            },
          ]}
        >
          {/* IMAGE */}
          <TouchableOpacity
            style={[tailwind(''), { width: '20%' }]}
            activeOpacity={0.9}
            // onPress={() => ImageOnlyView?.current?.open()}
          >
            <Image
              source={props?.img}
              defaultSource={assets_manifest?.placeholder}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 80,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>

          {/* DETAILS */}
          <View style={{ width: '80%', marginLeft: 12 }}>
            <Text
              numberOfLines={1}
              style={tailwind('font-15 font-bold text-gray-900')}
            >
              {props?.name}
            </Text>

            <Text style={tailwind('font-12 text-gray-600 mt-1')}>
              {svar?.product_variation} {svar?.product_unit}
            </Text>

            {/* PRICE */}
            <View style={[tailwind('flex-row')]}>
              <View style={tailwind('flex-row items-center mt-2')}>
                <Text
                  style={[tailwind('font-16 font-bold'), { color: '#F39F3E' }]}
                >
                  ₹{svar?.product_price}
                </Text>

                {svar?.mrp_price && (
                  <Text
                    style={tailwind('font-13 ml-2 text-gray-400 line-through')}
                  >
                    ₹{svar?.mrp_price}
                  </Text>
                )}
              </View>
              <View style={[tailwind('mr-3'), { marginLeft: 'auto' }]}>
                <QuantityActions
                  type={1}
                  id={props.id}
                  initiateIncrement={Variation}
                  initiateDecrement={initiateDecrement}
                  quantity={quantity}
                  product_message={''}
                  product_status={true}
                  variations={props?.product_price}
                />
              </View>
              {/* BUTTON */}
            </View>
          </View>
        </View>
      )}
      {props?.desigin_type === 6 && (
        <View
          style={[
            tailwind('flex-row items-center rounded-xl mx-2 my-2 p-3'),
            {
              backgroundColor: 'white',
              // width: '80%',
              elevation: 3,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
            },
          ]}
        >
          {/* IMAGE */}
          <TouchableOpacity
            style={[tailwind(''), { width: '20%' }]}
            activeOpacity={0.9}
            // onPress={() => ImageOnlyView?.current?.open()}
          >
            <Image
              source={props?.img}
              defaultSource={assets_manifest?.placeholder}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 80,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>

          {/* DETAILS */}
          <View style={{ width: '80%', marginLeft: 12 }}>
            <Text
              numberOfLines={1}
              style={tailwind('font-15 font-bold text-gray-900')}
            >
              {props?.name}
            </Text>

            <Text style={tailwind('font-12 text-gray-600 mt-1')}>
              {svar?.product_variation} {svar?.product_unit}
            </Text>

            {/* PRICE */}
            <View style={[tailwind('flex-row')]}>
              <View style={tailwind('flex-row items-center mt-2')}>
                <Text
                  style={[tailwind('font-16 font-bold'), { color: '#F39F3E' }]}
                >
                  ₹{svar?.product_price}
                </Text>

                {svar?.mrp_price && (
                  <Text
                    style={tailwind('font-13 ml-2 text-gray-400 line-through')}
                  >
                    ₹{svar?.mrp_price}
                  </Text>
                )}
              </View>
              <View style={[tailwind('mr-3'), { marginLeft: 'auto' }]}>
                <TouchableOpacity
                  onPress={() => {
                    if (!props?.subscribe) {
                      Variation();
                    } else {
                      props?.navigation?.navigate('Subscription');
                    }
                  }}
                  style={[
                    tailwind('mt-3 py-2 rounded-full'),
                    {
                      backgroundColor: props?.subscribe ? 'white' : '#F39F3E',
                      borderWidth: props?.subscribe ? 1 : 0,
                      borderColor: '#F39F3E',
                    },
                  ]}
                >
                  <Text
                    style={[
                      tailwind(`text-center ${props?.subscribe?'px-6':'px-3'} font-bold`),
                      { color: props?.subscribe ? '#F39F3E' : 'white' },
                    ]}
                  >
                    {props?.subscribe ? 'Pause' : 'Subscribe'}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* BUTTON */}
            </View>
          </View>
        </View>
      )}
      <Portal>
        <Modalize
          ref={imageLargerRef}
          useNativeDriver={true}
          modalTopOffset={100}
          adjustToContentHeight={true}
          disableScrollIfPossible={false}
          closeOnOverlayTap={true}
        >
          <ImageViewer image={props?.img} imageLargerRef={imageLargerRef} />
          <VariationSheetList
            svar={svar}
            variations={props?.product_price}
            setSvar={setSvar}
            name={props?.name}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={Close}
            style={[tailwind('flex bg-green p-3 m-3'), { borderRadius: 10 }]}
          >
            <Text
              style={[
                tailwind('font-bold uppercase text-white font-15 text-center'),
              ]}
            >
              Add Item
            </Text>
          </TouchableOpacity>
        </Modalize>
      </Portal>
      <Portal>
        <Modalize
          ref={RepeatRef}
          useNativeDriver={true}
          modalTopOffset={100}
          adjustToContentHeight={true}
          disableScrollIfPossible={false}
          closeOnOverlayTap={true}
        >
          <ImageViewer image={props.img} imageLargerRef={RepeatRef} />
          <View style={[tailwind('')]}>
            <View
              style={[
                tailwind('bg-gray-100 flex-row items-center justify-between'),
              ]}
            >
              <View style={[tailwind('px-2 py-2')]}>
                <Text style={[tailwind('font-bold text-black font-16')]}>
                  {props?.name}
                </Text>
                {/* {props.description && (
              <Text
                style={[
                  tailwind('font-medium text-gray capitalize font-14 py-1'),
                ]}>
                {props.description}
              </Text>
            )} */}
              </View>
            </View>

            <Text style={[tailwind('mx-3 my-3 font-bold text-black')]}>
              You already added this product in cart.
            </Text>
            <View style={[tailwind('flex-row items-center justify-between')]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  tailwind('border rounded-lg p-2 mb-5 mx-3'),
                  { width: '45%' },
                ]}
                onPress={choosehandle}
              >
                <Text style={[tailwind('font-bold font-14 text-center')]}>
                  i'll Choose
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  tailwind('rounded-lg p-2 mb-5 mr-4 '),
                  { backgroundColor: '#B51F1F', width: '45%' },
                ]}
                onPress={Repeate}
              >
                <Text
                  style={[tailwind('font-bold text-white font-14 text-center')]}
                >
                  Repeat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>

      {modal ? (
        <GlobalDialogModal
          visible={modal}
          setAlertModal={setModal}
          target={1}
          title="Replace Cart Item ?"
          // title=""
          subtitle={`This will replace all items in your cart with this item. OK ?`}
          // subtitle={'Do you want to add the other shop products in your cart ?'}
          action={resetCartandProceed}
        />
      ) : null}
    </>
  );
};
const SIZE = 60;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    width: SIZE,
    height: SIZE,
    position: 'relative',
    transform: [{ rotate: '-45deg' }],
  },
  left: {
    width: SIZE / 2,
    height: SIZE / 2,
    backgroundColor: 'red',
    borderRadius: SIZE / 4,
    position: 'absolute',
    top: 0,
    left: SIZE / 4,
  },
  right: {
    width: SIZE / 2,
    height: SIZE / 2,
    backgroundColor: 'red',
    borderRadius: SIZE / 4,
    position: 'absolute',
    top: SIZE / 4,
    right: 0,
  },
  bottom: {
    width: SIZE / 2,
    height: SIZE / 2,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    left: SIZE / 4,
  },
});
