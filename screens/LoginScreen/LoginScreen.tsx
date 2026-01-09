import { Topbar } from '@Component';
import tailwind from '@tailwind';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { errorBox } from '../../workers/utils';
import { getLogin } from '@remote/userRemote';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (mobileNumber.length !== 10 || !mobileNumber) {
      errorBox('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    const Response = await getLogin({
      fcm: 'test',
      mobile: '+91' + mobileNumber,
    });
    if (Response?.status) {
      setLoading(false);

      navigation?.navigate('OtpScreen', {
        user_id: Response?.user_id,
        mobileNumber: mobileNumber,
      });
    } else {
      console.log("ResponseResponse",Response)
      errorBox(Response?.res?.data?.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Topbar title="Login" type={3} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content - Now centered */}
          <View style={styles.content}>
            {/* Title Section - Centered */}
            <View style={[tailwind('items-center'), { marginBottom: 20 }]}>
              <Image
                style={{ width: 200, height: 200 }}
                source={require('../../assets/images/img_login.png')}
              />
            </View>

            <View style={styles.titleContainer}>
              <Text style={[tailwind('font-18 font-bold'),styles.mainTitle]}>Login</Text>
              <Text style={[tailwind('font-16 font-bold'),styles.subTitle]}>with mobile number</Text>
            </View>

            <Text style={[tailwind('font-13 font-semi'),styles.instruction]}>
              Enter your 10 digit mobile number.{'\n'}We will send you OTP to
              verify
            </Text>

            {/* Mobile Input Field - Centered */}
            <View style={[styles.inputContainer, { width: '100%' }]}>
              <View
                style={[
                  tailwind(
                    'flex-row items-center border border-gray-300 rounded-full px-4 bg-white',
                  ),
                  { height: 50 },
                ]}
              >
                <Text style={tailwind('text-gray-800 font-bold text-lg')}>
                  +91
                </Text>
                <View style={tailwind('h-6 w-px bg-gray-300 mx-3')} />
                <TextInput
                  style={[
                    tailwind('flex-1 font-14 font-semi text-black'),
                    { paddingVertical: 0 },
                  ]}
                  placeholder="Enter 10 digit mobile number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
              </View>
            </View>

            {/* Login Button - Centered */}
            <TouchableOpacity
              style={[
                tailwind('rounded-full'),
                styles.loginButton,
                styles.buttonActive,
                { width: '100%' },
              ]}
              onPress={handleLogin}
              disabled={!loading ? false : true}
            >
              {loading ? (
                <ActivityIndicator color={'white'} size={'small'} />
              ) : (
                <Text style={[tailwind('font-16 font-bold'),styles.buttonText]}>LOGIN</Text>
              )}
            </TouchableOpacity>

            {/* Terms & Conditions - Centered */}
            <Text style={[tailwind('font-14 font-bold'),styles.termsText]}>
              By continuing you agree to the{'\n'}
              <Text style={styles.termsLink}>
                Terms and Condition Swiss Bakers
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// Styles matching your image exactly
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9D8',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Centers content vertically
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center', // Centers all child elements horizontally
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  mainTitle: {
    // fontSize: 18,
    // fontWeight: '700',
    color: '#45302B',
    marginBottom: 4,
  },
  subTitle: {
    // fontSize: 16,
    // fontWeight: '700',
    color: '#45302B',
  },
  instruction: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20, // Added spacing
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
    width: '100%', // Ensures full width for centering
  },
  loginButton: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%', // Makes button full width
  },
  buttonActive: {
    backgroundColor: '#45302B',
  },
  buttonText: {
    color: '#FFFFFF',
    // fontSize: 16,
    // fontWeight: '600',
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#45302B',
    // fontWeight: '500',
  },
});

export default LoginScreen;
