import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';

import CheckBox from '@/components/common/CheckBox';
import { loginConstants } from '@/constants/login';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useValidateLoginMutation } from '@/redux/login/loginService';
import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, px } from '@/utils';

import { styles } from './styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [sendOtpLoader, setSendOtpLoader] = useState<boolean>(false);
  const [mobileNo, setMobile] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loginMutation] = useValidateLoginMutation();

  const fetchData = async () => {
    console.log('checkign in the issueee');

    const resp = await fetch('https://msassoadmin.myschoolapp.in/getCollegeCode?domainName=msassoadmin.myschoolapp.in');
    const data = await resp.json();
    console.log('ching on the res Dataaaa', JSON.stringify(data));
  };

  const sendOtp = () => {
    setSendOtpLoader(true);
    loginMutation({
      mobile_no: mobileNo,
      isOtp: true,
    }).then(apiRes => {
      // console.log('apiRes =======>', apiRes);

      if (apiRes?.data?.Status === 'Success' || apiRes?.data?.status === 'success') {
        setSendOtpLoader(false);
        toast.show('Please check Inbox ', {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'OTP sent successfully',
          },
          duration: 2000,
        });
        navigation.navigate('LOGIN_OTP', { phone: mobileNo, id: apiRes?.data?.Details });
      } else {
        if (apiRes?.error?.status === false) {
          toast.show("You don't have an account", {
            type: 'info_toast',
            animationDuration: 100,
            data: {
              title: 'Please register',
            },
            duration: 3000,
          });
          setSendOtpLoader(false);
        } else {
          toast.show(apiRes?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Auth message',
            },
            duration: 3000,
          });
          setSendOtpLoader(false);
        }
      }
    });
  };

  const toggleCheckBox = () => {
    setIsChecked(prevState => !prevState);
  };

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
              <RNView style={{ flex: 1 }}>
                <RNText style={styles.initialText}>Sign In</RNText>
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
                  />
                </RNView>
                <RNView style={{ flexDirection: 'row', marginLeft: px(10) }}>
                  <CheckBox checked={isChecked} onPress={toggleCheckBox} isCheckBox={true} />
                  <RNView>
                    <RNText style={styles.agreeText}>I agree to </RNText>
                  </RNView>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TERMS_AND_CONDITIONS');
                    }}>
                    <RNText style={styles.termText}>terms and conditions</RNText>
                  </TouchableOpacity>
                </RNView>
              </RNView>
              <RNView style={{ alignItems: 'center', flex: 1 }}>
                <CommonButton
                  title={'Next'}
                  loading={sendOtpLoader}
                  disabled={!(mobileNo.length === 10 && isChecked) || sendOtpLoader} // Update button disable condition
                  style={{
                    backgroundColor:
                      !(mobileNo.length === 10 && isChecked) || sendOtpLoader ? '#f0f0f0' : ColorTheme.primary, // Update button style
                    minHeight: 45,
                  }}
                  onPress={sendOtp}
                  textStyle={styles.BtnStyle}
                />
                <RNView style={styles.SignUpContainer}>
                  <RNText
                    style={{
                      fontSize: px(14),
                      fontFamily: FONT.PoppinsRegular,
                      color: ColorTheme.gray,
                    }}>
                    {loginConstants.noAccount}
                    <RNText
                      onPress={() => navigation.navigate('CATEGORY')}
                      style={{
                        fontSize: px(14),
                        fontFamily: FONT.PoppinsRegular,
                        color: ColorTheme.primaryColor,
                      }}>
                      {loginConstants.gotoSignUp}
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

export default LoginScreen;
