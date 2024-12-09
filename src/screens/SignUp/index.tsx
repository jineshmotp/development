import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';

import CheckBox from '@/components/common/CheckBox';
import { signUpConstants } from '@/constants/login';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useValidateSignupMutation } from '@/redux/signup/signupService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

import { styles } from './styles';

const loginSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Password is required"),
  fname: Yup.string().required('First name is is required'),
  lname: Yup.string().required('Last name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
});
const SignUp = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const route = useRoute<RouteProp<RootStackParamList, 'SIGNUP'>>();
  // console.log('route =====>', route);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [sendOtpLoader, setSendOtpLoader] = useState(false);
  const [userType, setUserType] = useState('');
  const [signUpMutation, { data, isLoading, isError, isSuccess }] = useValidateSignupMutation();
  // console.log('isSuccessisSuccessisSuccess', isSuccess);
  const handleOnSubmit = values => {
    setSendOtpLoader(true);
    signUpMutation({
      fname: values.fname,
      lname: values.lname,
      mobile_no: values.phone,
      role: route?.params?.role,
    }).then(apiRes => {
      // console.log('apiRes++++++++++++++', apiRes);
      if (apiRes?.data?.Status === 'Success' || apiRes?.data?.status === 'success') {
        setSendOtpLoader(false);
        navigation.navigate('SIGNUP_OTP', { phone: values.phone, id: apiRes?.data?.Details, role: route.params.role });
      } else {
        if (apiRes?.error?.status === false) {
          toast.show(apiRes?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Error',
            },
            duration: 3000,
          });
          setSendOtpLoader(false);
        } else {
          toast.show(apiRes?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Error',
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
      <KeyboardAvoidingView style={styles.keyboardView} behavior={'height'}>
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
              <RNView style={{ flexDirection: 'row', marginTop: px(20) }}>
                <RNView style={{ flex: 1 }}>
                  <Ionicons
                    onPress={() => navigation.goBack()}
                    style={{ alignSelf: 'center' }}
                    name="arrow-back"
                    size={24}
                    color="black"
                  />
                </RNView>
                <RNView style={{ flex: 5 }}>
                  <RNText style={styles.initialText}>Sign Up</RNText>
                </RNView>
              </RNView>
              <RNView style={styles.formPart}>
                <Formik
                  initialValues={{
                    // email: "",
                    fname: '',
                    lname: '',
                    phone: '',
                  }}
                  validationSchema={loginSchema}
                  // validateOnMount={true}
                  onSubmit={handleOnSubmit}>
                  {({ errors, touched, handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                      <CommonInput
                        label="First Name"
                        placeholder={'First Name'}
                        placeholderColor={'gray'}
                        value={values.fname}
                        onBlur={handleBlur('fname')}
                        onChangeText={handleChange('fname')}
                        style={styles.inputStyle}
                        contentStyle={{ textTransform: 'capitalize' }}
                      />
                      {errors.fname && touched?.fname && <RNText style={styles.errorText}>{errors.fname}</RNText>}
                      <CommonInput
                        label="Last Name"
                        placeholder={'Last Name'}
                        placeholderColor={'gray'}
                        value={values.lname}
                        onBlur={handleBlur('lname')}
                        onChangeText={handleChange('lname')}
                        style={styles.inputStyle}
                        contentStyle={{ textTransform: 'capitalize' }}
                      />
                      {errors.lname && touched.lname && <RNText style={styles.errorText}>{errors.lname}</RNText>}
                      <RNView style={styles.inputView}>
                        <RNView style={styles.numberView}>
                          <RNText style={styles.numberText}>+91</RNText>
                        </RNView>
                        <CommonInput
                          label="Mobile Number"
                          placeholder={'Enter your mobile number'}
                          placeholderColor={'gray'}
                          value={values.phone}
                          onBlur={handleBlur('phone')}
                          onChangeText={handleChange('phone')}
                          keyboardType={'phone-pad'}
                          style={styles.numberStyle}
                          maxLength={10}
                        />
                      </RNView>
                      {errors.phone && touched.phone && <RNText style={styles.errorText}>{errors.phone}</RNText>}

                      <RNView style={{ flexDirection: 'row' }}>
                        <CheckBox checked={isChecked} onPress={toggleCheckBox} isCheckBox={true} />
                        <RNView>
                          <RNText style={styles.agreeText}>I agree to </RNText>
                        </RNView>
                        <TouchableOpacity onPress={()=>{navigation.navigate('TERMS_AND_CONDITIONS')}}>
                          <RNText style={styles.termText}>terms and conditions</RNText>
                        </TouchableOpacity>
                      </RNView>
                      <CommonButton
                        title={'Send OTP'}
                        onPress={handleSubmit}
                        loading={sendOtpLoader}
                        disabled={!isChecked || !isValid || sendOtpLoader}
                        style={{
                          backgroundColor: !isChecked || sendOtpLoader || !isValid ? '#dcdedc' : ColorTheme.primary,
                          marginTop: px(20),
                        }}
                        textStyle={styles.btnStyle}
                      />
                    </>
                  )}
                </Formik>
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
