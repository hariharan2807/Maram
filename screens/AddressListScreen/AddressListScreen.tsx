import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import tailwind from '@tailwind';
import {
  AddressComponent,
  ButtonComponent,
  GlobalDialogModal,
  GlobalDialogModal1,
  Topbar,
} from '@Component';
import { useQuery } from 'react-query';
import { deleteAddressRemote, get_allAddressList } from '@remote/userRemote';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function AddressListScreen() {
  const navigation = useNavigation();
  const ID = useSelector((state: any) => state.user.user_id);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [address_id, setAddressId] = useState(null);
  const [editaddress_id, setEditaddressId] = useState(null);
  const deleteAddressModal = (id: any) => {
    setAddressId(id);
    setDeleteModal(true);
  };
  const editAddressModal = (id: any) => {
    setEditaddressId(id);
    setEditModal(true);
  };
  const Response = useQuery(
    ['get_allAddressList', ID ? ID : ''],
    get_allAddressList,
  );
  const deleteAddress = async () => {
    setDeleteModal(false);
    const response = await deleteAddressRemote({
      user_id: ID, // Changed from "ID" to "user_id"
      address_id: address_id,
    });
    if (response?.status === 'success') {
      // console.log('responseresponseresponsesuccess', response);

      Response.refetch();
      // dispatch(saveAddressesAction());
    } else {
      // navigation.navigate('GlobalModalScreen', {
      //   target: 'generic',
      //   title: 'Failed to Delete Address!',
      //   info: 'Please Check your Internet Connection',
      // });
    }
  };
  const EditAddress = async () => {
    setEditModal(false);
    navigation.navigate('AddAddressScreen', {
      user_address_id: editaddress_id,
    });
  };
  useFocusEffect(
    useCallback(() => {
      Response.refetch();
    }, []),
  );
  // console.log('ResponseResponseResponse', Response?.data?.GTS);
  return (
    <View style={[tailwind('bg-secondary h-full'), {}]}>
      <Topbar title="Address" type={3} />
      <View style={[tailwind('')]}>
        <ScrollView style={tailwind('')} showsVerticalScrollIndicator={false}>
          <AddressComponent
            editAddressModal={editAddressModal}
            deleteAddress={null}
            deleteAddressModal={deleteAddressModal}
            allUserAddressesQuery={Response}
          />
          <View style={[tailwind('h-40')]} />
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('AddAddressScreen');
        }}
        style={[tailwind('m-3 '), { position: 'absolute', bottom: 0 }]}
        activeOpacity={0.9}
      >
        <ButtonComponent disabled={false} title="+ ADD NEW" />
      </TouchableOpacity>
      <GlobalDialogModal1
        visible={deleteModal}
        setAlertModal={setDeleteModal}
        action={deleteAddress}
        title="Are you sure want to delete the address ?"
        subtitle=""
        target={0}
      />
      <GlobalDialogModal1
        visible={editModal}
        setAlertModal={setEditModal}
        action={EditAddress}
        title="Are you sure want to edit the address ?"
        subtitle=""
        target={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
