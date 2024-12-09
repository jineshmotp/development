import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import CustomAlertWrapper from '@/components/common/CustomAlertWrapper';
import ModalWrapper from '@/components/common/ModalWrapper';
import LoginOtpUI from '@/components/login/LoginOtpUI';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserData, resetLogin } from '@/redux/login/loginReducer';
import { useDeleteAccountMutation } from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';
import { MMKV_KEYS, removeMMKVItem } from '@/utils/mmkv';

import { styles } from './styles';

const DeleteAccount = () => {
  const userId = useAppSelector(getUserData)?._id;
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [deletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOTP] = useState<string>('');
  const route = useRoute<RouteProp<RootStackParamList, 'DELETE_ACCOUNT'>>();
  const [deleteAccMutation] = useDeleteAccountMutation();
  const [text, setText] = useState('');

  const verifyOtp = () => {};
  //  const verifyOtp = () => {
  //     setVerifyOtpLoader(true);
  //     verifyOtpMutation({
  //       id: otpId,
  //       mobile_no: route?.params?.phone,
  //       otp,
  //       isOtp: false,
  //     })
  //       .then(apiRes => {
  //         if (apiRes?.data?.access_token) {
  //           setToken(apiRes?.data?.access_token);
  //         } else {
  //           if (!apiRes?.error?.status) {
  //             setVerifyOtpLoader(false);
  //             toast.show(apiRes?.error?.message, {
  //               type: 'error_toast',
  //               animationDuration: 100,
  //               data: {
  //                 title: 'Message',
  //               },
  //               duration: 3000,
  //             });
  //           }
  //         }
  //       })
  //       .catch(err => {
  //         setVerifyOtpLoader(false);
  //         // console.log('error+++', err.response);
  //       });
  //   };

  const sendOtp = () => {
    setOpenModal(true);
  };
  //   const sendOtp = () => {
  //     setSendOtpLoader(true);
  //     // console.log('sendOTP', {
  //     //   mobile_no: mobileNo,
  //     //   isOtp: true,
  //     // });

  //     loginMutation({
  //       mobile_no: mobileNo,
  //       isOtp: true,
  //     }).then(apiRes => {
  //       if (apiRes?.data?.Status === 'Success' || apiRes?.data?.status === 'success') {
  //         setSendOtpLoader(false);

  //         toast.show('Please check Inbox ', {
  //           type: 'success_toast',
  //           animationDuration: 100,
  //           data: {
  //             title: 'OTP sent successfully',
  //           },
  //           duration: 2000,
  //         });
  //         navigation.navigate('LOGIN_OTP', { phone: mobileNo, id: apiRes?.data?.Details });
  //       } else {
  //         if (apiRes?.error?.status === false) {
  //           toast.show("You don't have an account", {
  //             type: 'info_toast',
  //             animationDuration: 100,
  //             data: {
  //               title: 'Please register',
  //             },
  //             duration: 3000,
  //           });
  //           setSendOtpLoader(false);
  //         } else {
  //           toast.show(apiRes?.error?.message || 'Something went wrong', {
  //             type: 'error_toast',
  //             animationDuration: 100,
  //             data: {
  //               title: 'Auth message',
  //             },
  //             duration: 3000,
  //           });
  //           setSendOtpLoader(false);
  //         }
  //       }
  //     });
  //   };
  const deleteUserAccount = () => {
    const payload = {
      user_id: [userId],
      reason: text,
    };
    // console.log('payload', payload);
    deleteAccMutation(payload).then(response => {
      // console.log('response', response);
      if (response?.data?.success) {
        setShowDeletePopup(false);
        removeMMKVItem(MMKV_KEYS.ACCESS_TOKEN);
        removeMMKVItem(MMKV_KEYS.REFRESH_TOKEN);
        dispatch(resetLogin({}));
        toast.show('Your Account has been deleted', {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Account Deleted',
          },
          duration: 3000,
        });
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };
  return (
    <Container hasHeader={false} isTab={false} backgroundColor="white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <RNView style={{ justifyContent: 'center', alignItems: 'center', width: deviceWidth }}>
            <RNImage
              source={require('@/assets/images/userProfile/deleteAccount.png')}
              style={{ width: deviceWidth / 1.09, height: deviceWidth / 1.09 }}
            />
            <RNView style={{ width: deviceWidth / 1.09 }}>
              <RNText style={{ fontFamily: FONT.PoppinsBold, fontSize: SIZES.xLarge, color: ColorTheme.danger }}>
                Permanent Delete Your Account
              </RNText>
              <RNText style={{ fontSize: SIZES.small13, color: ColorTheme.black, marginVertical: SIZES.medium15 }}>
                To permanently delete your account, an OTP verification process is necessary for security reasons.
              </RNText>
              <RNText style={{ fontSize: SIZES.small13, color: ColorTheme.black, marginVertical: SIZES.medium15 }}>
                An OTP will be sent to your registered mobile number. After verifying the OTP, your account will be
                permanently deleted within 48 hours, ensuring complete removal of your data. So, please ensure that you
                have backed up any important information before proceeding.
              </RNText>
              <RNView style={{ marginVertical: px(10) }}>
                <TextInput
                  value={route?.params?.phone}
                  editable={false}
                  style={{
                    width: deviceWidth / 1.09,
                    height: px(45),
                    borderColor: ColorTheme.gray2,
                    borderWidth: 0.5,
                    borderRadius: px(10),
                    paddingHorizontal: px(10),
                    color: ColorTheme.gray2,
                  }}
                />
              </RNView>
              <RNView style={{ marginVertical: px(10) }}>
                <TextInput
                  placeholder="Enter reason of delete account"
                  value={text}
                  style={{
                    width: deviceWidth / 1.09,
                    minHeight: px(70),
                    borderColor: ColorTheme.black,
                    borderWidth: 0.5,
                    borderRadius: px(10),
                    paddingHorizontal: px(10),
                    color: ColorTheme.black,
                    textAlign: 'auto',
                    textAlignVertical: 'top',
                  }}
                  onChangeText={t => setText(t)}
                />
              </RNView>
            </RNView>
          </RNView>
        </ScrollView>
      </KeyboardAvoidingView>
      <RNView style={styles.btnView}>
        <CommonButton
          disabled={false}
          onPress={() => navigation.goBack()}
          loaderColor="black"
          //   loading={loader}
          title="Cancel"
          style={styles.btnStyle}
          textStyle={styles.btnText}
        />
        <CommonButton
          disabled={false}
          onPress={() => setShowDeletePopup(true)}
          loaderColor="black"
          //   loading={loader}
          title="Delete User"
          style={[styles.btnStyle, { backgroundColor: ColorTheme.primary }]}
          textStyle={styles.btnText}
        />
      </RNView>
      <CustomAlertWrapper
        onClose={() => setShowDeletePopup(false)}
        openModal={deletePopup}
        text={'Are you sure you want to delete account ?'}
        head={'Delete Account'}>
        <PropertyCategoryChips
          item={{ label: 'Cancel', active: true }}
          containerStyle={{
            flex: 1,
          }}
          onPress={() => {
            setShowDeletePopup(!deletePopup);
          }}
          style={{
            backgroundColor: 'white',
          }}
        />
        <PropertyCategoryChips
          item={{ label: 'Delete' }}
          containerStyle={{
            flex: 1,
          }}
          onPress={deleteUserAccount}
          style={{
            backgroundColor: 'red',
          }}
          textStyle={{
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      </CustomAlertWrapper>
      <ModalWrapper
        header={true}
        onClose={() => {
          setOpenModal(!openModal);
        }}
        visible={openModal}>
        <RNView style={{ marginTop: px(50) }}>
          <LoginOtpUI
            onPress={verifyOtp}
            phone={route?.params?.phone}
            // resendOtp={resendOtp}
            setOTP={e => setOTP(e)}
            // verifyOtpLoader={verifyOtpLoader}
            // sendingOtp={sendingOtp}
            isResendOtp={false}
            otp={otp}
            // count={count}
          />
        </RNView>
      </ModalWrapper>
    </Container>
  );
};

export default DeleteAccount;
