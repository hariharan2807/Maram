import React, { useState } from 'react';
import tailwind from '@tailwind';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import assets from '@assets';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
interface PropTypes {
  target: number;
  visible: boolean;
  title: string;
  subtitle?: string;
  action?(): void;
  setAlertModal?: any;
  plan: string;
}
export default function ChangePlan(props: PropTypes) {
  const navigation = useNavigation();
  const [selectedCat, setSelectedCat] = useState(null);
  const closeModal = () => {
    if (props.setAlertModal) {
      props.setAlertModal(false);
    }
  };
  return (
    <Modal
      isVisible={props.visible}
      animationInTiming={200}
      animationOutTiming={150}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      scrollHorizontal={true}
      onBackdropPress={closeModal}
    >
      <View style={tailwind('bg-white rounded-xl')}>
        <View style={[tailwind('p-3')]}>
          <Text style={[tailwind('text-lg text-black pb-2 font-bold')]}>
            {props.title}
          </Text>
        </View>
        <View
          style={[
            tailwind('mx-4 mb-4 flex-row items-center'),
            { justifyContent: 'space-between' },
          ]}
        >
          {['Alternate Days', 'Customized', 'Daily']
            .filter(plan => plan !== props?.plan)
            .map(plan => (
              <TouchableOpacity
                key={plan}
                onPress={() => setSelectedCat(plan)}
                activeOpacity={0.8}
                style={[
                  tailwind('py-3 rounded-full items-center'),
                  {
                    width: '48%',
                    backgroundColor:
                      selectedCat === plan ? '#80C659' : '#F3F4F6',
                  },
                ]}
              >
                <Text
                  style={[
                    tailwind('font-bold'),
                    { color: selectedCat === plan ? 'white' : '#374151' },
                  ]}
                >
                  {plan}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <Text style={tailwind('mt-6 text-gray-400 font-16')}>
          Choose Start Date
        </Text>

        <TouchableOpacity
          onPress={() => setCalenderOpen(true)}
          style={[
            tailwind('mt-2 flex-row items-center px-4 py-4 rounded-full'),
            {
              borderWidth: 1,
              borderColor: '#E5E7EB',
              backgroundColor: '#fff',
            },
          ]}
        >
          <Text style={tailwind('text-gray-800 font-16')}>
            {subscription_start_date?.[0] || 'Select Date'}
          </Text>

          <View style={{ marginLeft: 'auto' }}>
            <CalenderIcon />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
