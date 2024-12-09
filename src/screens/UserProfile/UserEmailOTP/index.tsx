import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import HeaderBar from '@/components/common/HeaderBar';
import OTPInputField from '@/components/common/OTPInputField';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserData, updateUserData } from '@/redux/login/loginReducer';
import { useEmailOtpVerifyMutation } from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';

import { styles } from './styles';

const UserEmailOTP = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const route = useRoute<RouteProp<RootStackParamList, 'USER_EMAIL_OTP'>>();
  const toast = useToast();
  const [code, setCode] = useState('');
  // const [verifyOtpLoader, setVerifyOtpLoader] = useState<boolean>(false);
  //   const [verifyMutation, , , ,] = useCallApi(Apis.geOtpVerifyForEmail);
  const [emailOtpMutation, { status, isLoading: verifyOtpLoader }] = useEmailOtpVerifyMutation();
  const [email, setemail] = useState<string>(route?.params?.email ? route?.params?.email : '');
  const [data, setData] = useState(userData);

  const verifyOtp = async () => {
    // console.log('repsood', {
    //   email_otp_id: route?.params?.id,
    //   email: route?.params?.email,
    //   otp: code,
    //   user_id: userData._id,
    // });
    emailOtpMutation({
      email_otp_id: route?.params?.id,
      email: route?.params?.email,
      otp: code,
      user_id: userData._id,
    }).then(response => {
      // console.log('otppage++++++++', response);
      if (response?.data?.status === 'success') {
        toast.show(response?.data?.message, {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 1000,
        });
        dispatch(
          updateUserData({
            email: email,
            isVerifiedEmail: true,
          })
        );
        navigation.goBack();
        navigation.goBack();
        // navigation.navigate('USER_EDIT_DETAILS');
      } else {
        if (response?.data?.status === 'failure') {
          toast.show('Please check Inbox', {
            type: 'warn_toast',
            animationDuration: 100,
            data: {
              title: 'Please enter valid OTP',
            },
            duration: 3000,
          });
        } else {
          toast.show(response?.error?.message || 'Something went wrong ', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Contact Info"
        // backIcon={<Entypo name="chevron-thin-left" size={24} color="black" />}
        backPress={() => navigation.goBack()}
      />

      <RNView style={styles.main}>
        <RNView style={styles.sectionContainer}>
          <DetailSectionHeader
            Heading={'Enter OTP'}
            btnText={''}
            editBtnFunction={() => {}}
            // headingTextStyle={{textTransform:"uppercase"}}
            headingText={true}
          />
          <RNView style={styles.topView}>
            <RNText style={styles.label}>{`OTP sent to ${email}`}</RNText>
          </RNView>
          <OTPInputField code={code} setCode={t => setCode(t)} />
        </RNView>
        {/* <RNView style={styles.otpTimeContainer}>
          <RNText style={{ textAlign: "left", fontSize: SIZES.small13 }}>
            Didn't receive OTP?
          </RNText>
          {sendingOtp && (
            <RNText
              style={{
                fontFamily: FONT.PoppinsRegular,
                fontSize: SIZES.small13,
              }}
            >
              {count}
            </RNText>
          )}

          <TouchableOpacity onPress={resendOtp} disabled={sendingOtp}>
            <RNText
              style={{
                alignSelf: "center",
                color: sendingOtp
                  ? ColorTheme.nearLukGray2
                  : ColorTheme.primary,
                fontFamily: FONT.PoppinsRegular,
                fontSize: SIZES.small13,
              }}
            >
              Resend OTP
            </RNText>
          </TouchableOpacity>
        </RNView> */}
        <RNView style={styles.mainBtn}>
          <CommonButton
            disabled={code.length === 6 ? verifyOtpLoader : true}
            onPress={verifyOtp}
            loaderColor="black"
            loading={verifyOtpLoader}
            title="Verify"
            style={code.length === 6 ? styles.btnStyle1 : styles.btnStyle}
            textStyle={styles.nextBtn}
          />
        </RNView>
      </RNView>
    </Container>
  );
};

export default UserEmailOTP;
