import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import HeaderBar from '@/components/common/HeaderBar';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyGetEmailAvailQuery, useSentOtpEmailMutation } from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const EditUserEmail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EDIT_USER_EMAIL'>>();
  const toast = useToast();
  const userData = useAppSelector(getUserData);
  //   console.log('userDatauserDatauserData', userData);
  const [email, setemail] = useState<string>(route?.params?.email || '');
  const [emailErr, setEmailErr] = useState({ status: false, message: '' });
  const [sendOtpLoader, setSendOtpLoader] = useState(false);
  const [checkEmailAvail] = useLazyGetEmailAvailQuery();
  const [sentEmailOTPMutation, { data, status }] = useSentOtpEmailMutation();
  // console.log('sentEmailOTPMutation', status);
  useEffect(() => {
    setemail(userData?.email);
    validateEmail(userData?.email);
  }, [route?.params]);

  const sendOtp = async () => {
    navigation.navigate('USER_EMAIL_OTP', {
      email: email,
      id: '438568746',
    });
    setSendOtpLoader(true);
    sentEmailOTPMutation({
      email,
      fname: userData?.fname,
      lname: userData?.lname,
      user_id: userData?._id,
    }).then(apiRes => {
      // console.log(`/users/send-otp-email`, apiRes);
      if (apiRes?.data?.status) {
        setSendOtpLoader(false);
        toast.show('Please check Inbox ', {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'OTP sent successfully',
          },
          duration: 2000,
        });
        navigation.navigate('USER_EMAIL_OTP', {
          email: email,
          id: apiRes?.data?.id,
        });
      } else {
        // console.log('sentEmailOTPMutation error catch', apiRes);
        setSendOtpLoader(false);
        if (apiRes?.error?.status === false) {
          toast.show(apiRes?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Auth message',
            },
            duration: 3000,
          });
        } else {
          toast.show('Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Auth message',
            },
            duration: 3000,
          });
        }
      }
    });
  };
  const validateEmail = async (text: string) => {
    // console.log('texxxxxxx', text);
    let value = false;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(text)) {
      // console.log('testedd', text);
      // const url = `/users/find-by-email/${text}`;
      // const apiRes = await Api.get(url);
      checkEmailAvail(text).then(apiRes => {
        // console.log('apiresponse++++++++++', apiRes);
        if (apiRes?.data?.status) {
          // console.log('email verifiedddd+++++ exist');
          value = false;
          setEmailErr({
            status: apiRes.data.status,
            message: 'Email is already exist',
          });
        } else {
          value = true;
          setEmailErr({
            status: apiRes?.data?.status,
            message: 'Email is Available',
          });
        }
      });
    }
    return value;
  };

  const commonInputCallBack = useCallback(() => {
    return (
      <CommonInput
        onChangeText={text => {
          setemail(text);
          validateEmail(text);
        }}
        value={email}
        keyboardType={'email-address'}
        label="Enter your mail Id"
        placeholder="Enter mail id"
        placeholderColor={ColorTheme.gray2}
        style={styles.inputStyle}
        labelStyle={styles.labelStyle}
      />
    );
  }, [email]);
  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Contact Info"
        // backIcon={<Entypo name="chevron-thin-left" size={24} color="black" />}
        backPress={() => navigation.goBack()}
      />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <RNView style={styles.main}>
          <RNView style={styles.sectionContainer}>
            <DetailSectionHeader Heading={'Email ID'} btnText={''} editBtnFunction={() => {}} />
            {commonInputCallBack()}
            <RNView style={styles.errorContainer}>
              {emailErr.status ? (
                <RNText style={styles.unAvailable}>{emailErr.message}</RNText>
              ) : (
                <RNText style={styles.available}>{emailErr.message}</RNText>
              )}
            </RNView>
            <RNView style={styles.mainBtn}>
              <CommonButton
                disabled={sendOtpLoader || emailErr.status}
                onPress={sendOtp}
                loaderColor="black"
                loading={sendOtpLoader}
                title="Send OTP"
                style={sendOtpLoader || emailErr.status ? styles.btnStyle : styles.btnSucStyle}
                textStyle={styles.nextBtn}
              />
            </RNView>
          </RNView>
        </RNView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default EditUserEmail;
