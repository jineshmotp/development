import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import messaging from '@react-native-firebase/messaging';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import LoginOtpUI from '@/components/login/LoginOtpUI';
import { Container } from '@/custom/Container';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useLazyGetResendOtpQuery, useLazyGetUserinfoQuery, useVerifySignupOtpMutation } from '@/redux/login/loginService';
import { notificationToken } from '@/redux/Notification/notificationReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
const countTime: number = 60;

const SignupOtp = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'SIGNUP_OTP'>>();
  // console.log('route =====>', route);

  const navigation = useNavigation();
  const [sendOtpLoader, setSendOtpLoader] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>('');
  const [verifyMutation] = useVerifySignupOtpMutation({});
  const [getUserInfoData] = useLazyGetUserinfoQuery();
  const [sendingOtp, setSendingOtp] = useState<boolean>(true);
  const [count, setCount] = useState<number>(countTime);
  const [getResendOtp] = useLazyGetResendOtpQuery();

  // console.log('SignupOtp+++++++++', isSuccess);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    dispatch(notificationToken(fcmToken));
  };

  const updatedDataFn = () => {
    getUserInfoData({}).then(response => {
      if (response?.data?.status) {
        setSendOtpLoader(false);
        const role = route.params.role;
        // console.log('role =====>', role);

        switch (role) {
          case 'USER':
            navigation.navigate('ONBOARDING');
            break;
          case 'AGENT':
            navigation.navigate('BUILDER');
            break;
          case 'BUILDER':
            navigation.navigate('BUILDER');
            break;
        }
      } else {
        if (!response?.error?.status) {
          toast.show(response?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Please try once',
            },
            duration: 3000,
          });
        }
      }
    });
  };

  const verifyOtp = () => {
    verifyMutation({
      id: route.params.id,
      otp: otp,
      phone: route.params.phone,
    })
      .then(apiRes => {
        // console.log('first++++', apiRes);
        if (apiRes?.data?.access_token) {
          setTimeout(() => {
            updatedDataFn();
          }, 300);
        } else {
          if (!apiRes?.error?.status) {
            // console.log('first', apiRes?.error?.message);
            toast.show(apiRes?.error?.message || 'Something went wrong', {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Please try once',
              },
              duration: 3000,
            });
          }
        }
      })
      .catch(err => {
        console.log('errrrr', err);
      });
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    let timer;

    if (sendingOtp) {
      timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
    }

    //   // Clean up the timer when the component unmounts or recording becomes false
    return () => {
      clearInterval(timer);
    };
  }, [route, sendingOtp]);

  useEffect(() => {
    if (count === 0) {
      setCount(countTime);
      setSendingOtp(false);
    }
  }, [count]);

  const resendOtp = () => {
    const obj = {
      mobile_no: route?.params?.phone,
      isOtp: true,
    };
    getResendOtp(obj).then(res => {
      // console.log('getResendOtpgetResendOtp', res);
      if (res?.status==='fulfilled') {
        setSendingOtp(true);
        toast.show('Please check Inbox ', {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'OTP sent successfully',
          },
          duration: 2000,
        });
      } else {
        if (res?.error?.status === false) {
          toast.show(res?.error?.message || 'Something went wrong', {
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

  return (
    <Container hasHeader={true} backgroundColor="white" isTab={false}>
      <LoginOtpUI
        onPress={verifyOtp}
        phone={route?.params?.phone}
        resendOtp={resendOtp}
        isResendOtp={true}
        setOTP={e => setOTP(e)}
        verifyOtpLoader={sendOtpLoader}
        sendingOtp={sendingOtp}
        otp={otp}
        count={count}
      />
    </Container>
  );
};

export default SignupOtp;
