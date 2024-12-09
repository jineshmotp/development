import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import { signUpConstants } from '@/constants/login';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, FONT } from '@/theme';
import { deviceHeight, px } from '@/utils';

import { styles } from './styles';

styles;

const SignUp = () => {
  const [mobileNo, setMobile] = useState<string>('');
  const navigation = useNavigation();
  return (
    <Container hasHeader={false}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={'height'}>
        <LinearGradient colors={['#F5FBFF', '#BCCBD7']} style={styles.gradientView}>
          <ScrollView style={{ height: deviceHeight }}>
            <RNView style={styles.logoView}>
              <RNImage
                source={require('@/assets/images/NearLuklogo/authentication_logo.png')}
                style={styles.logoStyle}
                resizeMode="contain"
              />
            </RNView>

            <RNView style={styles.mainContainer}>
              <RNView style={{ flex: 2 }}>
                <RNText style={styles.initialText}>Sign Up</RNText>
                <CommonInput
                  label="First Name"
                  placeholder={'First Name'}
                  placeholderColor={ColorTheme.gray}
                  value={mobileNo}
                  onChangeText={e => setMobile(e)}
                  style={styles.nameStyle}
                  maxLength={10}

                  // placeholderTextColor={"#f0f0f0"}
                />
                <CommonInput
                  label="Last Name "
                  placeholder={'Last Name'}
                  placeholderColor={ColorTheme.gray}
                  value={mobileNo}
                  onChangeText={e => setMobile(e)}
                  style={styles.surnameStyle}
                  maxLength={10}

                  // placeholderTextColor={"#f0f0f0"}
                />
              </RNView>
              <RNView style={styles.inputView}>
                <RNView style={{ flexDirection: 'row' }}>
                  <RNView style={styles.numberView}>
                    <RNText style={styles.numberText}>+91</RNText>
                  </RNView>
                  <CommonInput
                    label="Mobile Number"
                    placeholder={'Enter your mobile number'}
                    placeholderColor={ColorTheme.gray}
                    value={mobileNo}
                    onChangeText={e => setMobile(e)}
                    keyboardType={'phone-pad'}
                    style={styles.inputStyle}
                    maxLength={10}

                    // placeholderTextColor={"#f0f0f0"}
                  />
                </RNView>
                <RNView style={{ flexDirection: 'row', marginLeft: px(10) }}>
                  <RNView>
                    <RNText style={styles.agreeText}>I agree to </RNText>
                  </RNView>
                  <TouchableOpacity onPress={()=>{navigation.navigate('TERMS_AND_CONDITIONS')}}>
                    <RNText style={styles.termText}>terms and conditions</RNText>
                  </TouchableOpacity>
                </RNView>
              </RNView>
              <RNView style={{ alignItems: 'center', flex: 1.5 }}>
                <CommonButton
                  title={'Send OTP'}
                  // loading={sendOtpLoader}
                  // disabled={(mobileNo.match(/^\d{1,10}$/) ? false : true) || sendOtpLoader}
                  // style={{
                  //   backgroundColor:
                  //     (mobileNo.match(/^\d{1,10}$/) ? false : true) || sendOtpLoader ? '#f0f0f0' : ColorTheme.primary,
                  //   minHeight: 45,
                  // }}
                  // onPress={sendOtp}
                  textStyle={styles.BtnStyle}
                />
                <RNView style={styles.SignUpContainer}>
                  <RNText
                    style={{
                      fontSize: px(14),
                      fontFamily: FONT.PoppinsRegular,
                      color: ColorTheme.gray,
                    }}>
                    {signUpConstants.accAlready}
                    <RNText
                      onPress={() => navigation.navigate('Login')}
                      style={{
                        fontSize: px(14),
                        fontFamily: FONT.PoppinsRegular,
                        color: ColorTheme.primaryColor,
                      }}>
                      {signUpConstants.login}
                    </RNText>
                  </RNText>
                </RNView>
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

export default SignUp;
