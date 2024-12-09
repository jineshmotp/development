import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import messaging from '@react-native-firebase/messaging';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

// import 'core-js/stable/atob';
// import 'core-js/stable/atob';
// import 'core-js/stable/atob';
import LoginOtpUI from '@/components/login/LoginOtpUI';
import { Container } from '@/custom/Container';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getLoginStatus, updateLoginStatus, updateUserData } from '@/redux/login/loginReducer';
import { useGetUserDataQuery, useLazyGetResendOtpQuery, useValidateLoginOTPMutation } from '@/redux/login/loginService';
import { getFcToken, notificationToken } from '@/redux/Notification/notificationReducer';
import { useLoginNotificationMutation } from '@/redux/Notification/notificationService';
import { selectedRole } from '@/redux/onboarding/onboardingReducer';
import { RootStackParamList } from '@/routes/RootNavigator';

const countTime: number = 60;
const LoginOtp = () => {
  const getFcmTokens = useAppSelector(getFcToken);
  const route = useRoute<RouteProp<RootStackParamList, 'LOGIN_OTP'>>();
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>('');
  // console.log('token =====>', token);

  const [verifyOtpLoader, setVerifyOtpLoader] = useState(false);
  const [otp, setOTP] = useState<string>('');
  const [sendingOtp, setSendingOtp] = useState<boolean>(true);
  const [count, setCount] = useState<number>(countTime);
  const [otpId, setOtpId] = useState<string>('' || route?.params?.id);

  const [verifyOtpMutation, { data }] = useValidateLoginOTPMutation({});
  const { data: userData, isSuccess } = useGetUserDataQuery({}, { skip: !token, refetchOnMountOrArgChange: !!token });
  // const [getRefreshData] = useLazyGetRefreshTokenQuery({});
  const [getResendOtp] = useLazyGetResendOtpQuery();
  // const loginData = useAppSelector(state => state.login);
  // console.log('userData ========>', userData);
  // console.log('userData ========>', userData?.data?.role);

  const [loginMutation] = useLoginNotificationMutation();

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    // console.log('fcmToken+++++', fcmToken);
    dispatch(notificationToken(fcmToken));
  };

  const callNotification = () => {
    const payload = {
      userId: userData?.data?._id,
      deviceType: Platform.OS,
      token: getFcmTokens,
    };
    // console.log('patdnsjkgngkj', payload);
    loginMutation(payload).then(res => {
      // console.log('dsngjnjdksgn', res);
      if (res?.data?.status) {
        if (userData?.data?.is_onboarding_completed) {
          setToken('');
          dispatch(updateLoginStatus(true));
        } else {
          const role = userData?.data?.role;
          // console.log('role selected default========>', role);
          dispatch(selectedRole(role));
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
        }
      } else {
        setToken('');
        dispatch(updateLoginStatus(true));
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setVerifyOtpLoader(false);
      callNotification();
    } else {
      setVerifyOtpLoader(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    getToken();
  }, []);

  const verifyOtp = () => {
    setVerifyOtpLoader(true);
    verifyOtpMutation({
      id: otpId,
      mobile_no: route?.params?.phone,
      otp,
      isOtp: false,
    })
      .then(apiRes => {
        // console.log('cheing on otp resposne=======>>>>>',JSON.stringify(apiRes));
        
        if (apiRes?.data?.access_token) {
          setToken(apiRes?.data?.access_token);
        } else {
          if (!apiRes?.error?.status) {
            setVerifyOtpLoader(false);
            toast.show(apiRes?.error?.message, {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Message',
              },
              duration: 3000,
            });
          }
        }
      })
      .catch(err => {
        setVerifyOtpLoader(false);
        // console.log('error+++', err.response);
      });
  };
  const resendOtp = () => {
    const obj = {
      mobile_no: route?.params?.phone,
      isOtp: true,
    };
    getResendOtp(obj).then(res => {
      // console.log('getResendOtpgetResendOtp', res);
      if (res?.status) {
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

  return (
    <LoginOtpUI
      onPress={verifyOtp}
      phone={route?.params?.phone}
      resendOtp={resendOtp}
      setOTP={e => setOTP(e)}
      verifyOtpLoader={verifyOtpLoader}
      sendingOtp={sendingOtp}
      isResendOtp={true}
      otp={otp}
      count={count}
    />
  );
};

export default LoginOtp;
