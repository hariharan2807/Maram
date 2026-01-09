import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import tailwind from '@tailwind';
import { AddressTitleOptions, Topbar } from '@Component';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  acquireGPSPermission,
  errorBox,
  getLocationCoords,
} from '../../workers/utils';
import {
  googleReverseCodingRemote,
  reverseGeoCodeRemote,
} from '../../constants/geoLocation';
import MapView from 'react-native-maps';
import assets_manifest from '@assets';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { saveAddresses } from '@actions/userActions';
import {
  get_Add_UserAddress,
  get_allAddressList,
  get_allAddressList1,
} from '@remote/userRemote';
import { useDispatch, useSelector } from 'react-redux';

export default function EditAddressScreen() {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const route = useRoute();
  const ID = useSelector((state: any) => state.user.user_id);

  const [localLocation, setLocalLocation] = useState(null);
  const [title, setTitle] = useState('Home');
  const [landmark, setLandmark] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const MAP_HEIGHT = height / 2.7;
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const init = async () => {
        try {
          // 1️⃣ Check GPS permission
          const permissionRes = await acquireGPSPermission();
          if (!permissionRes?.status) {
            navigation.navigate('GlobalModalScreen', {
              target: 'noGPSPermission',
            });
            return;
          }

          // 2️⃣ If editing existing address
          if (route?.params?.user_address_id) {
            const addressList = await get_allAddressList1(ID);
            const list = addressList?.GTS || [];

            const selectedAddress = list.find(
              item =>
                String(item.user_address_id) ===
                String(route.params.user_address_id),
            );

            if (
              selectedAddress &&
              selectedAddress.latitude &&
              selectedAddress.longitude &&
              isActive
            ) {
              setLocalLocation({
                latitude: Number(selectedAddress.latitude),
                longitude: Number(selectedAddress.longitude),
                latitudeDelta: 0.0065,
                longitudeDelta: 0.0065,
              });

              setTitle(selectedAddress.user_address_name || '');
              setLandmark(selectedAddress.user_address_landmark || '');
              setAddress(selectedAddress.user_address_details || '');
              return; // ⛔ STOP HERE
            }
          }

          // 3️⃣ Else → Use current GPS location
        // //   const locationCoords = await getLocationCoords();
        // //   if (locationCoords && isActive) {
        // //     setLocalLocation({
        // //       latitude: Number(locationCoords.latitude),
        // //       longitude: Number(locationCoords.longitude),
        // //       latitudeDelta: 0.0065,
        // //       longitudeDelta: 0.0065,
        // //     });

        // //     const reverseData = await reverseGeoCodeRemote(locationCoords);
        // //     setAddress(reverseData?.display_name || '');
        //   }
        } catch (error) {
          console.log('Map init error:', error);
        }
      };

      init();

      return () => {
        isActive = false;
      };
    }, [route?.params?.user_address_id, ID]),
  );

  const onRegionChangedinMap = async newLocation => {
    setLocalLocation({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      latitudeDelta: newLocation.latitudeDelta,
      longitudeDelta: newLocation.longitudeDelta,
    });

    // 🔹 Optional: debounce this in real apps
    const reverseData = await reverseGeoCodeRemote({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
    });

    if (reverseData?.display_name) {
      setAddress(reverseData.display_name);
    }
  };

  const submitAddress = async () => {
    if (title && address) {
      setLoading(true);
      const response = await get_Add_UserAddress({
        user_id: ID,
        address_name: title,
        landmark: landmark,
        address: address,
        latitude: localLocation?.latitude,
        longitude: localLocation?.longitude,
      });

      setLoading(false);
      if (response) {
        const All_Address_List = await get_allAddressList1(ID);
        dispatch(saveAddresses(All_Address_List?.GTS));

        navigation.goBack();
      } else {
        setTimeout(() => {
          errorBox('Address resident type is already exists in your account');
        }, 1000);
      }
    } else {
      errorBox('Title, Address all are Required');
      // navigation.navigate('GlobalModalScreen', {
      //   target: 'generic',
      //   title: 'All Inputs are Required',
      //   info: 'Title, Address and Landmark all are Required',
      // });
    }
  };
  const SubTitle = (props: any) => {
    return (
      <View style={[tailwind(' p-2 my-1')]}>
        <Text style={[tailwind('font-bold text-black text-base')]}>
          {props.text}
        </Text>
      </View>
    );
  };

  const LandmarkInput = (props: any) => {
    return (
      <View style={[tailwind('px-2')]}>
        <TextInput
          value={props.value}
          onChangeText={e => props.setLandmark(e)}
          style={[
            tailwind(
              'bg-gray-200 rounded p-2 flex-grow font-bold text-black py-3',
            ),
          ]}
        />
      </View>
    );
  };

  const AddressInput = props => {
    return (
      <View style={[tailwind('px-2')]}>
        <TextInput
          multiline={true}
          onChangeText={e => props.setAddress(e)}
          height={80}
          value={props.value}
          style={[
            tailwind(
              'bg-gray-200 rounded p-2 flex-grow font-bold text-black py-3',
            ),
          ]}
        />
      </View>
    );
  };
  const MapMarker = (props: any) => {
    const { height, width } = useWindowDimensions();
    const MAP_HEIGHT = height / 2.5;
    const MARKER_TOP_OFFSET = MAP_HEIGHT / 2.6;
    const MARKER_WIDTH_OFFSET = width / 2 - 18;
    return (
      <View
        style={[
          tailwind('absolute  rounded-full'),
          { top: MARKER_TOP_OFFSET, left: MARKER_WIDTH_OFFSET },
        ]}
      >
        <Image
          source={assets_manifest.locationpin}
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
        />
      </View>
    );
  };
  return (
    <View style={[tailwind('h-full bg-secondary'), {}]}>
      <Topbar title="Add Address" type={3} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
      >
        {localLocation ? (
          <View style={{ height: MAP_HEIGHT }}>
            <MapView
              ref={mapRef}
              initialRegion={{
                latitude: parseFloat(localLocation.latitude),
                longitude: parseFloat(localLocation.longitude),
                latitudeDelta: parseFloat(localLocation.latitudeDelta),
                longitudeDelta: parseFloat(localLocation.longitudeDelta),
              }}
              // customMapStyle={mapStyle}
              showsUserLocation={true}
              showsMyLocationButton={true}
              zoomControlEnabled={true}
              loadingEnabled={true}
              onRegionChangeComplete={newLocation => {
                onRegionChangedinMap(newLocation);
              }}
              style={{ height: MAP_HEIGHT }}
            >
              {/* <Marker
                                coordinate={{
                                    latitude: localLocation?.latitude,
                                    longitude: localLocation?.longitude,
                                }}></Marker> */}
            </MapView>
          </View>
        ) : (
          <MapLoading />
        )}
        <MapMarker />
        <View style={[tailwind('mx-3')]}>
          <SubTitle text="Resident Type" />
          <AddressTitleOptions title={title} setTitle={setTitle} />
          <SubTitle text="Address" />
          <AddressInput
            multiline={true}
            value={address}
            setAddress={setAddress}
          />
          <SubTitle text="Landmark" />
          <LandmarkInput value={landmark} setLandmark={setLandmark} />
        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        onPress={submitAddress}
        style={[
          tailwind(
            ' w-full flex flex-row items-center justify-center p-3 rounded-xl ',
          ),
        ]}
      >
        {/* <ButtonComponent disabled={loading} text="SAVE ADDRESS" /> */}
        <View
          style={[
            tailwind(
              'w-full flex flex-row items-center justify-center p-3 rounded-xl ',
            ),
            { backgroundColor: '#000000' },
          ]}
        >
          {loading ? (
            <ActivityIndicator
              color="white"
              size="small"
              style={[tailwind('ml-3')]}
            />
          ) : null}
          <Text
            style={[
              tailwind(' text-white font-bold text-center font-15 px-2'),
              { fontWeight: Platform.OS === 'android' ? '' : 'bold' },
            ]}
          >
            SAVE ADDRESS
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const MapLoading = () => {
  return (
    <View
      style={[
        tailwind('bg-white'),
        { height: Dimensions.get('window').height / 2 },
      ]}
    >
      <Text style={[tailwind('text-base text-center font-regular py-4')]}>
        Loading ...
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -22.5 }, { translateY: -45 }],
  },
});
