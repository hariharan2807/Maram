import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import tailwind from '@tailwind';
// import {useSelector, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GlobalDialogModal } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
// import {getAddressid, saveAddressid} from '../../workers/localStorage';

export default function AddressComponent(props: any) {
  // const navigation = useNavigation();

  // const [deleteModal, setDeleteModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  // const [data, setData] = useState('');
  // const [ids, setIds] = useState();

  // const deleteAddress = async () => {
  //   setDeleteModal(false);
  //   props.deleteAddress(props.id);
  // };
  // const editAddress = async () => {
  //   setEditModal(false);
  //   navigation.navigate('AddressEditScreen', {
  //     user_address_id: props.user_address_id,
  //   });
  // };
  // useEffect(() => {
  //   (async () => {
  //     const Address = await getAddressid();
  //     setIds(Address);
  //   })();
  // }, [data]);
  // const handle = (pro: any) => {
  //   setData(pro?.items);
  //   saveAddressid(pro?.items);
  //   console.log('ite', data);
  //   props?.allUserAddressesQuery?.refetch();
  // };

  // return (
  //   <View style={[tailwind('mx-3 my-3 p-2')]}>
  //     <View style={[tailwind('border-b pb-4'), {borderColor: '#F2F2F2'}]}>
  //       <Text style={[tailwind('font-semibold font-16 py-4')]}>Addresses</Text>
  //       {/* <Image
  //           style={[tailwind('w-7 h-7')]}
  //           resizeMode="contain"
  //           source={assets.pin_target}
  //         /> */}
  //       <View style={[tailwind('px-4')]}>
  //         <Text style={[tailwind('font-bold uppercase  font-16')]}>
  //           {props.title}
  //         </Text>
  //         <Text
  //           style={[tailwind('font-regular font-15 py-2'), {color: '#828282'}]}>
  //           {props.address}
  //         </Text>
  //         {props?.alt_mobile_number ? (
  //           <View style={[tailwind('flex-row items-center py-1 pb-2')]}>
  //             <Icon name="call-outline" size={20} color="#828282" />
  //             <Text
  //               style={[
  //                 tailwind('font-medium text-black text-sm py-1 pl-2 mb-1'),

  //               ]}>
  //               {props?.alt_mobile_number}
  //             </Text>
  //           </View>
  //         ) : null}
  //         <View style={[tailwind('flex-row justify-between my-1')]}>
  //           <TouchableOpacity style={[tailwind('flex-row items-center')]}
  //           onPress={() => handle({items: props?.id})}>
  //             {ids == props?.id ? (
  //               <Icon
  //                 name="checkbox"
  //                 style={[tailwind(''), {top: 2}]}
  //                 size={25}
  //                 color="#B51F1F"
  //               />
  //             ) : (
  //               <Icon
  //                 name="square-outline"
  //                 style={[tailwind(''), {top: 2}]}
  //                 size={25}
  //                 color="#B51F1F"
  //               />
  //             )}
  //             <Text style={[tailwind('font-bold pl-2 font-14')]}>
  //               Default Address
  //             </Text>
  //           </TouchableOpacity>
  //           <View style={[tailwind('flex-row items-center mx-2')]}>
  //             <TouchableOpacity
  //               onPress={() => setEditModal(true)}
  //               style={[tailwind('')]}>
  //               <Text
  //                 style={[
  //                   tailwind('uppercase font-bold text-primary font-16'),
  //                 ]}>
  //                 Edit
  //               </Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               onPress={() => setDeleteModal(true)}
  //               style={[tailwind('px-4')]}>
  //               <Text
  //                 style={[
  //                   tailwind('uppercase font-bold font-16'),
  //                   {color: '#009A93'},
  //                 ]}>
  //                 Delete
  //               </Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     </View>

  //   </View>
  // );
  const [data, setData] = useState(0);
  const [trued, setTrued] = useState(false);
  const [ids, setIds] = useState();
  const navigation = useNavigation();

  const handle = (pro: any) => {
    setData(pro?.items);
    setTrued(false);
    // saveAddressid(pro?.items);
    // console.log('ite', data);
  };
  const handle1 = (pro: any) => {
    setTrued(true);
    // saveAddressid('');
    // console.log('ite', data);
  };
  // useEffect(() => {
  //   (async () => {
  //     const Address = await getAddressid();
  //     setIds(Address);
  //   })();
  // }, [data, trued]);
  //  console.log('iteee',props?.items)
  return (
    <View>
      <View style={[tailwind('my-3 mx-3')]}>
        {!props?.allUserAddressesQuery.isLoading &&
        !props?.allUserAddressesQuery.data?.GTS ? null : (
          <Text style={[tailwind('font-bold font-20')]}>Saved Addresses</Text>
        )}
      </View>
      {props?.allUserAddressesQuery?.data?.GTS
        ? props?.allUserAddressesQuery?.data?.GTS?.map((items: any) => {
            return (
              <View
                style={[
                  tailwind(
                    'mx-4 my-2 bg-white px-3 rounded-xl py-3 border-gray-200 border pb-2',
                  ),
                ]}
                key={items?.user_address_id}
              >
                <Text
                  style={[tailwind('font-bold uppercase  text-black font-18')]}
                >
                  {items?.user_address_name}
                </Text>
                <Text
                  style={[
                    tailwind('font-semi  font-14  pt-4'),
                    { color: 'black' },
                  ]}
                >
                  {items?.user_address_details}
                </Text>
                {items?.user_address_landmark && (
                  <Text
                    style={[
                      tailwind('font-bold  font-14'),
                      { color: 'black' },
                    ]}
                  >
                    {items?.user_address_landmark}
                  </Text>
                )}

                <View
                  style={[
                    tailwind('flex-row items-center my-3 justify-between pb-2'),
                  ]}
                >
                  <View style={[tailwind('flex-row items-center ')]}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        props?.editAddressModal(items?.user_address_id)
                      }
                      style={[tailwind('')]}
                    >
                      <Text
                        style={[
                          tailwind('uppercase font-bold font-18'),
                          {
                            color: 'silver',
                          },
                        ]}
                      >
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        props?.deleteAddressModal(items?.user_address_id)
                      }
                      style={[tailwind('px-4')]}
                    >
                      <Text
                        style={[
                          tailwind('uppercase font-bold font-18'),
                          { color: 'silver' },
                        ]}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        : null}
    </View>
  );
}
