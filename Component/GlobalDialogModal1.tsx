import React from 'react';
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
}
export default function GlobalDialogModal1(props: PropTypes) {
  const navigation = useNavigation();
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
      <View style={tailwind('bg-white rounded')}>
        <View style={[tailwind('px-3 mt-3')]}>
          <Text style={[tailwind('font-16 text-black  font-bold')]}>
            {props.title}
          </Text>
        </View>
        <View
          style={[
            tailwind('flex flex-row px-3 py-4 justify-between items-center'),
          ]}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={[tailwind('py-3  bg-primary rounded-xl'), { width: '48%' }]}
          >
            <Text
              style={[tailwind('text-center font-16 font-bold text-white')]}
            >
              CANCEL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.action}
            style={[
              tailwind('py-3 rounded-xl border-gray-500 bg-white border'),
              { width: '48%' },
            ]}
          >
            <Text
              style={[
                tailwind('text-center font-16 font-bold'),
                { color: 'red' },
              ]}
            >
              YES, PROCEED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
