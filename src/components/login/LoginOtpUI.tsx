import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { otpConstants } from '@/constants/login';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { styles } from '@/screens/LoginOtp/styles';
import { ColorTheme } from '@/theme';
import { deviceHeight, px } from '@/utils';

import OTPInputField from '../common/OTPInputField';

type Props = {
  phone?: string;
  onPress?: () => void;
  resendOtp?: () => void;
  setOTP?: (e: string) => void;
  otp?: string;
  sendingOtp?: boolean;
  verifyOtpLoader?: boolean;
  count?: number;
  isResendOtp?: boolean;
};
const LoginOtpUI: React.FC<Props> = ({
  phone,
  onPress,
  resendOtp,
  setOTP,
  otp,
  sendingOtp,
  verifyOtpLoader,
  count,
  isResendOtp = true,
}) => {
  const navigation = useNavigation();
  const animationRef = useRef<LottieView>(null);
  const [code, setCode] = useState('');
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(15, 60);
  }, []);

  return (
    <Container hasHeader={false}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={'height'} enabled>
        <LinearGradient colors={['#F5FBFF', '#BCCBD7']} style={styles.gradientView}>
          <ScrollView style={{ height: deviceHeight }} showsVerticalScrollIndicator={false}>
            <RNView style={styles.logoView}>
              <RNImage
                source={require('@/assets/images/NearLuklogo/authentication_logo.png')}
                style={styles.logoStyle}
                resizeMode="contain"
              />
            </RNView>
            <RNView style={styles.mainContainer}>
              <RNView style={{ flex: 4 }}>
                <RNText style={styles.initialText}>OTP Verification</RNText>
                <RNText style={styles.secondaryText}>
                  {otpConstants.otpDigit} {phone}
                </RNText>
                <RNView style={{ marginTop: px(30) }}>
                  <OTPInputField code={otp} setCode={t => setOTP(t)} />
                </RNView>
                {isResendOtp ? (
                  <RNView style={styles.otpTimeContainer}>
                    <RNText style={styles.noOtpText}>{otpConstants.noOtp}</RNText>
                    {sendingOtp && <RNText style={styles.countText}>{count}</RNText>}

                    <TouchableOpacity onPress={resendOtp} disabled={sendingOtp}>
                      <RNText
                        style={[
                          styles.sendOtpText,
                          { color: sendingOtp ? ColorTheme.nearLukGray2 : ColorTheme.primary },
                        ]}>
                        {otpConstants.reSend}
                      </RNText>
                    </TouchableOpacity>
                  </RNView>
                ) : (
                  <RNView></RNView>
                )}
              </RNView>
              <RNView style={{ flex: 2 }}>
                <CommonButton
                  disabled={otp.length === 6 ? verifyOtpLoader : true}
                  onPress={onPress}
                  loaderColor="black"
                  loading={verifyOtpLoader}
                  title="Verify OTP"
                  // style={otp.length === 6 ? styles.btnStyle1 : styles.btnStyle}
                  style={{
                    backgroundColor: otp.length === 6 ? ColorTheme.primaryColor : '#f0f0f0',
                    minHeight: 45,
                    alignSelf: 'center',
                  }}
                  textStyle={styles.btnStyle}
                />
                {/* <CommonButton
                  onPress={onPress}
                  title={'Submit'}
                  loading={verifyOtpLoader}
                  disabled={(otp?.match(/^\d{1,6}$/) ? false : true) || verifyOtpLoader}
                  style={{
                    backgroundColor:
                      (otp.match(/^\d{1,6}$/) ? false : true) || verifyOtpLoader ? '#f0f0f0' : ColorTheme.primary,
                    minHeight: 45,
                    alignSelf: 'center',
                  }}
                  textStyle={styles.btnStyle}
                /> */}
              </RNView>
            </RNView>
             <RNView style={styles.imageView}>
              <RNImage
                source={require('@/assets/images/NearLuklogo/authentication_image.png')}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </RNView>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginOtpUI;
