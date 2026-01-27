import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  // SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Topbar } from '@Component';
import { getLogin } from '@remote/userRemote';
import { errorBox } from '../../workers/utils';
import tailwind from '@tailwind';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { height } = useWindowDimensions();
  const handleLogin = async () => {
    if (mobileNumber.length !== 10) {
      errorBox('Please enter a valid 10 digit mobile number');
      return;
    }

    setLoading(true);

    try {
      const response = await getLogin({
        fcm: 'test',
        mobile: '+91' + mobileNumber,
      });
      // console.log("responseresponseresponse",response)

      if (response?.status) {
        navigation.navigate('OtpScreen', {
          user_id: response?.user_id,
          mobileNumber:mobileNumber,
        });
      } else {
        errorBox(response?.res?.data?.message || 'Login failed');
      }
    } catch (error) {
      errorBox('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Topbar title="Login" type={3} /> */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../../assets/icons/common/Login1.png')}
            style={[tailwind(''), { width: '100%', height: height / 1.8 }]}
            // style={styles.loginImage}
            resizeMode="cover"
          />

          {/* FORM CARD */}
          <View style={styles.card}>
            <Text style={styles.mainTitle}>Login</Text>
            <Text style={styles.instruction}>
              Enter your 10 digit mobile number. We will send you an OTP to
              verify.
            </Text>

            {/* MOBILE INPUT */}
            <View style={styles.inputField}>
              <Text style={styles.countryCodeText}>+91</Text>
              <View style={styles.divider} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter mobile number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                returnKeyType="done"
              />
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                (mobileNumber.length < 10 || loading) && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={mobileNumber.length < 10 || loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Next</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By signing in you agree to our{' '}
              <Text style={styles.termsLink}>Terms & Conditions</Text>
            </Text>
          </View>
        </ScrollView>
        <View style={[tailwind('h-20')]} />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    // padding: 24,
    alignItems: 'center',
  },
  loginImage: {
    width: 220,
    height: 220,
    marginVertical: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    padding: 24,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#45302B',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#45302B',
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  loginButton: {
    backgroundColor: '#80C659',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
});

export default LoginScreen;
