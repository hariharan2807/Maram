import { Topbar } from '@Component';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  getGetUser,
  getGetUser1,
  getLogin,
  getOtpVerify,
} from '@remote/userRemote';
import tailwind from '@tailwind';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { errorBox } from '../../workers/utils';
import { saveUser_id } from '../../workers/localStorage';
import { useDispatch } from 'react-redux';
import { saveUser, saveuseridAction } from '@actions/userActions';

const OtpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { mobileNumber } = route.params || { mobileNumber: '+91 9876543210' };
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);
  const handleOtpChange = (value, index) => {
    if (value.length > 1) {
      const pastedOtp = value.split('');
      const newOtp = [...otp];
      pastedOtp.forEach((digit, i) => {
        if (index + i < 4 && /^\d+$/.test(digit)) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const lastFilledIndex = newOtp.findIndex(d => d === '');
      const focusIndex =
        lastFilledIndex === -1 ? 3 : Math.min(lastFilledIndex, 3);
      inputRefs.current[focusIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (canResend) {
      const Response = await getLogin({
        fcm: 'test',
        mobile: route?.params?.mobileNumber,
      });
      if (Response?.status) {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }

      //   Alert.alert('OTP Sent', 'New OTP has been sent to your mobile number');
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      errorBox('Please enter complete 4-digit PIN');
      return;
    }
    setLoading(true);
    const response = await getOtpVerify({
      otp: enteredOtp, // Send as string: "5800" (if all digits filled)
      user_id: route?.params?.user_id,
    });
    console.log("ResponseData",response)
    if (response?.status) {
      setLoading(false);

      await saveUser_id(route?.params?.user_id);
      dispatch(saveuseridAction(route?.params?.user_id));
      const ResponseData = await getGetUser1({
        user_id: route?.params?.user_id,
      });
      if (
        ResponseData?.status &&
        ResponseData?.GTS?.user_name &&
        ResponseData?.GTS?.user_email
      ) {
        dispatch(saveUser(ResponseData?.data));
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTabNavigation' }],
        });
      } else {
        setLoading(false);

        navigation?.navigate('EditProfileScreen');
        // errorBox(ResponseData?.res?.data?.message);
        // return;
      }
    } else {
      setLoading(false);

      //   console.log('ResponseDataResponseDataResponseData', response);
      errorBox(response?.res?.data?.message);
    }
    // console.log('responseresponseresponseresponse', response);
    // OTP verification logic here
    // console.log('Verifying PIN:', enteredOtp);
    // navigation.replace('HomeScreen');
  };

  // Check if all 4 digits are filled
  const isOtpComplete = otp.join('').length === 4;

  return (
    <View style={styles.container}>
      {/* <Topbar title="OTP" type={3} /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Image Section - Will stay in place */}
            <View style={tailwind('items-center ')}>
              <Image
                source={require('../../assets/icons/common/Login1.png')}
                style={[
                  tailwind(''),
                  {
                    width: '100%',
                    height: height / 2,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  },
                ]}
                // style={styles.loginImage}
                resizeMode="cover"
              />
            </View>

            {/* Rest of your content remains the same */}
            <View style={styles.header}>
              <Text
                style={[tailwind('font-20 font-bold py-3 px-5'), styles.title]}
              >
                Verfiy OTP
              </Text>
              <Text style={[tailwind('font-13 font-bold py-3 px-5')]}>
                Enter OTP Sent To Your Phone Number +91 784 253 ****
              </Text>
              {/* <Text style={styles.subtitle}>Enter the 4-digit code sent to your mobile</Text> */}
            </View>

            <View style={styles.otpContainer}>
              {[0, 1, 2, 3].map(index => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    otp[index] ? styles.otpInputFilled : styles.otpInputEmpty,
                  ]}
                  value={otp[index]}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textContentType="oneTimeCode"
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[
                tailwind('rounded-full'),
                styles.verifyButton,
                styles.buttonActive,
              ]}
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={'white'} size={'small'} />
              ) : (
                <Text
                  style={[
                    tailwind('font-16 font-bold'),
                    styles.verifyButtonText,
                  ]}
                >
                  Verify OTP
                </Text>
              )}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              By signing in you agree to our{' '}
              <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
            {/* <View style={styles.timerContainer}>
              <Text style={[tailwind('font-16 font-bold'), styles.timerText]}>
                Seconds remaining: {timer.toString().padStart(2, '0')}
              </Text>
            </View>

            <View style={styles.resendContainer}>
              <Text style={[tailwind('font-14 font-semi'), styles.resendText]}>
                Didn't get the code yet?
              </Text>
              <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
                <Text
                  style={[
                    tailwind('font-14 font-bold'),
                    canResend ? styles.resendActive : styles.resendInactive,
                  ]}
                >
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    // paddingHorizontal: 24,
    // paddingVertical: 40,
    justifyContent: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  termsLink: {
    color: '#F39F3E',
    fontWeight: '600',
  },
  header: {
    // alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    // fontSize: 20,
    // fontWeight: '700',
    color: '#45302B',
    // marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mobileNumberText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  mobileNumber: {
    fontWeight: '600',
    color: '#1F2937',
  },
  //   otpContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     marginBottom: 24,
  //     // paddingHorizontal: 30, // Increased left-right space
  //     // marginHorizontal: 10, // Extra margin on sides
  //   },
  //   otpInput: {
  //     width: 65, // Slightly wider
  //     height: 65,
  //     borderWidth: 2,
  //     borderRadius: 12,
  //     fontSize: 24,
  //     fontWeight: '700',
  //     textAlign: 'center',
  //     marginHorizontal: 8, // Space between boxes
  //   },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 30,
  },

  otpInput: {
    width: 60,
    height: 60,

    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    // paddingBottom: 3, // Space above bottom border
  },

  otpInputEmpty: {
    borderWidth: 2,
    borderRadius: 50,
    // borderBottomColor: '#D1D5DB', // Gray bottom border
    backgroundColor: 'transparent',
    color: '#6B7280',
  },

  otpInputFilled: {
    borderWidth: 2,
    borderRadius: 50,
    // borderBottomColor: '#45302B', // Blue bottom border
    backgroundColor: 'transparent',
    color: '#1F2937',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  timerText: {
    // fontSize: 16,
    color: 'black',
    // fontWeight: '500',
  },
  verifyButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20, // Button also has side space
  },
  buttonActive: {
    backgroundColor: '#80C659',
  },
  buttonInactive: {
    backgroundColor: '#9CA3AF',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    // fontSize: 16,
    // fontWeight: '600',
    letterSpacing: 0.5,
  },
  resendContainer: {
    alignItems: 'center',
    marginHorizontal: 20, // Resend section also has side space
  },
  resendText: {
    // fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resendActive: {
    color: '#3B82F6',
  },
  resendInactive: {
    color: '#9CA3AF',
  },
});

export default OtpScreen;
