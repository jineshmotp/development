import React, { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';

// import { LinearTextGradient } from 'react-native-text-gradient';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import { feature_list, hear_list } from '@/constants/function/more.helper';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectGlobalSearchKey, setGlobalSearchKey } from '@/redux/global/globalReducer';
import { useJointwaitlistaddingMutation } from '@/redux/global/globalService';
import { getReloadData } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

const WaitListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const getGlobalSearchKey = useAppSelector(selectGlobalSearchKey);

  const route = useRoute<RouteProp<RootStackParamList, 'WAITLIST_SCREEN'>>();

  // console.log('searchkey -->', getGlobalSearchKey);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');

  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');

  const [FeatureList, setFeatureList] = useState(feature_list);

  const [isFeature, setIsFeature] = useState(false);
  const [featureValue, setFeatureValue] = useState('');

  const [HearList, setHearList] = useState(hear_list);
  const [isHear, setIsHear] = useState(false);
  const [hearValue, setHearValue] = useState('');

  const [CommunicationMethod, setCommunicationMethod] = useState('');

  const [uploadWaitlistMutation] = useJointwaitlistaddingMutation({});

  // Define the control constraints
  const controlConstraints = {
    fName: {
      required: 'First Name is required',
      pattern: {
        value: /^[A-Za-z][A-Za-z ]*$/, // Ensure it starts with a letter and allows letters and spaces only
        message: 'First Name should only contain letters and spaces, and must start with a letter',
      },
      validate: value => {
        if (value.trim().length === 0) {
          return 'First Name cannot be empty';
        }
        if (/^[\s\d]/.test(value)) {
          // Check if the value starts with a space or digit
          return 'First Name cannot start with a space or number';
        }
        if (/[^A-Za-z\s]/.test(value)) {
          // Ensure no special characters are present
          return 'First Name should only contain letters and spaces';
        }
        return true;
      },
    },

    lName: {
      required: 'Last Name is required',
      pattern: {
        value: /^[A-Za-z][A-Za-z ]*$/, // Ensure it starts with a letter and allows letters and spaces only
        message: 'Last Name should only contain letters and spaces, and must start with a letter',
      },
      validate: value => {
        if (value.trim().length === 0) {
          return 'Last Name cannot be empty';
        }
        if (/^[\s\d]/.test(value)) {
          // Check if the value starts with a space or digit
          return 'Last Name cannot start with a space or number';
        }
        if (/[^A-Za-z\s]/.test(value)) {
          // Ensure no special characters are present
          return 'Last Name should only contain letters and spaces';
        }
        return true;
      },
    },

    mobileNo: {
      required: 'Mobile number is required',
      maxLength: { value: 10, message: 'Maximum length of 10 characters exceeded' },
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Invalid mobile number (must be 10 digits)',
      },
    },

    emailId: {
      required: false,
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Invalid email address format',
      },
    },

    featureValue: {
      required: 'Feature is required',
    },
  };

  const { field: fNameField } = useController({
    name: 'fName',
    control,
    defaultValue: '',
    rules: controlConstraints.fName,
  });

  const { field: lNameField } = useController({
    name: 'lName',
    control,
    defaultValue: '',
    rules: controlConstraints.lName,
  });

  const { field: emailIdField } = useController({
    name: 'emailId',
    control,
    defaultValue: '',
    rules: controlConstraints.emailId,
  });

  const { field: mobileNoField } = useController({
    name: 'mobileNo',
    control,
    defaultValue: '',
    rules: controlConstraints.mobileNo,
  });

  const { field: featureValueField } = useController({
    name: 'featureValue',
    control,
    defaultValue: '',
    rules: controlConstraints.featureValue,
  });

  useEffect(() => {
    console.log(' label -->', route?.params?.label);

    featureValueField.onChange(route?.params?.label);
    setFeatureValue(route?.params?.label);
  }, [route?.params?.label]);

  const onSubmit = data => {
    console.log(' submit value');

    let payval = {
      fname: fname,
      lname: lname,
      mobile_no: mobileNo,
      email: emailId,
      features: [featureValue],
      connect_via: [CommunicationMethod],
      found_via: [hearValue],
    };

    // console.log('payval value -->', payval);

    dispatch(setGlobalSearchKey(route?.params?.label));

    uploadWaitlistMutation(payval).then(response => {
      if (response?.data?.status) {
        dispatch(getReloadData({}));

        toast.show('Join the Waitlist', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Join the Waitlist added successfully',
          },
          duration: 3000,
        });

        setTimeout(() => {
          navigation.navigate('BOTTOM_TAB');
        }, 1000);
      } else {
        toast.show('Join the Waitlist', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: response?.error?.message,
          },
          duration: 3000,
        });
      }
    });
  };

  return (
    <Container hasHeader={true} backgroundColor="white" isTab={false}>
      <RNView style={styles.container}>
        <ScrollView>
          <RNView style={styles.JoinView}>
            <RNText style={styles.jointheWView}>
              Join the W<RNText style={styles.aitlistiew}>aitlist !!</RNText>
            </RNText>

            <RNText style={styles.WaitlistTxtView}>
              Lorem ipsum dolor sit amet rat sollicitudin euismod quis feugiat cenas vitae. Lorem ipsum dolor sit amet
              rat sollocitudin euismod quis feugiat cenas vitae.
            </RNText>
          </RNView>

          <RNView style={styles.WaitListView}>
            <RNView style={styles.WaitListInSideView}>
              <RNView style={styles.WaitListNameMainView}>
                <RNText style={styles.WaitListNameView}>First Name</RNText>

                <CommonInput
                  placeholder="Enter First Name"
                  placeholderColor={ColorTheme.gray2}
                  style={styles.inputStyle}
                  maxLength={20}
                  outlineStyle={[styles.outlineBorderStyle, errors.fName ? { borderColor: ColorTheme.red } : {}]}
                  value={fNameField.value}
                  onChangeText={(e: string) => {
                    setfName(e);
                    fNameField.onChange(e);
                  }}
                />
              </RNView>

              {errors.fName && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.fName?.message}
                />
              )}

              <RNView style={styles.WaitListNameMainView}>
                <RNText style={styles.WaitListNameView}>Last Name</RNText>
                <CommonInput
                  placeholder="Enter Last Name"
                  placeholderColor={ColorTheme.gray2}
                  style={styles.inputStyle}
                  maxLength={20}
                  outlineStyle={[styles.outlineBorderStyle, errors.lName ? { borderColor: ColorTheme.red } : {}]}
                  value={lname}
                  onChangeText={(e: string) => {
                    setlName(e);
                    lNameField.onChange(e);
                  }}
                />
              </RNView>

              {errors.lName && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.lName?.message}
                />
              )}

              <RNView style={styles.WaitListNameMainView}>
                <RNText style={styles.WaitListNameView}>Mobile Number</RNText>
                <CommonInput
                  placeholder="Enter Mobile Number"
                  keyboardType={'number-pad'}
                  placeholderColor={ColorTheme.gray2}
                  style={styles.inputStyle}
                  maxLength={10}
                  outlineStyle={[styles.outlineBorderStyle, errors.mobileNo ? { borderColor: ColorTheme.red } : {}]}
                  value={mobileNoField.value}
                  onChangeText={(e: string) => {
                    setMobileNo(e);
                    mobileNoField.onChange(e);
                  }}
                />
              </RNView>

              {errors.mobileNo && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.mobileNo?.message}
                />
              )}

              <RNView style={styles.WaitListNameMainView}>
                <RNText style={styles.WaitListNameView}>Email Address</RNText>
                <CommonInput
                  placeholder="Enter Email Address"
                  keyboardType={'email-address'}
                  placeholderColor={ColorTheme.gray2}
                  style={styles.inputStyle}
                  maxLength={50}
                  outlineStyle={[styles.outlineBorderStyle, errors.emailId ? { borderColor: ColorTheme.red } : {}]}
                  value={emailIdField.value}
                  onChangeText={(e: string) => {
                    setEmailId(e);
                    emailIdField.onChange(e);
                  }}
                />
              </RNView>

              {errors.emailId && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.emailId?.message}
                />
              )}

              <RNView style={styles.WaitListNameMainView}>
                <RNText style={styles.WaitListNameView}>Select Features</RNText>

                <Dropdown
                  style={[styles.dropdown, isFeature && { borderColor: ColorTheme.primaryColor }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={FeatureList}
                  maxHeight={300}
                  labelField="label"
                  valueField="label"
                  placeholder={!isFeature ? 'Select Features' : 'Select Features'}
                  value={featureValue}
                  onFocus={() => setIsFeature(true)}
                  onBlur={() => setIsFeature(false)}
                  onChange={item => {
                    setFeatureValue(item.label);
                    featureValueField.onChange(item.label);
                    setIsFeature(false);
                    clearErrors('featureValue');
                  }}
                />
              </RNView>

              {errors.featureValue && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.featureValue?.message}
                />
              )}

              <RNText style={styles.WaitListNameView}>Preferred mode of communication</RNText>
              <RNView style={styles.selectWESView}>
                <TouchableOpacity style={styles.CommunicationView} onPress={() => setCommunicationMethod('Whatsapp')}>
                  <RNView style={styles.CommunicationViewLeft}>
                    {CommunicationMethod === 'Whatsapp' && (
                      <RNImage
                        source={require('@/assets/images/More/buttontick.png')}
                        style={styles.CommunicationButtonImage}
                      />
                    )}
                  </RNView>

                  <RNView style={styles.CommunicationViewRight}>
                    <RNText
                      style={
                        CommunicationMethod === 'Whatsapp' ? styles.communicationLabelSelect : styles.communicationLabel
                      }>
                      Whatsapp
                    </RNText>
                  </RNView>
                </TouchableOpacity>

                <RNView style={styles.CommunicationViewGyap} />

                <TouchableOpacity style={styles.CommunicationView} onPress={() => setCommunicationMethod('Email')}>
                  <RNView style={styles.CommunicationViewLeft}>
                    {CommunicationMethod === 'Email' && (
                      <RNImage
                        source={require('@/assets/images/More/buttontick.png')}
                        style={styles.CommunicationButtonImage}
                      />
                    )}
                  </RNView>

                  <RNView style={styles.CommunicationViewRight}>
                    <RNText
                      style={
                        CommunicationMethod === 'Email' ? styles.communicationLabelSelect : styles.communicationLabel
                      }>
                      Email
                    </RNText>
                  </RNView>
                </TouchableOpacity>

                <RNView style={styles.CommunicationViewGyap} />

                <TouchableOpacity style={styles.CommunicationView} onPress={() => setCommunicationMethod('SMS')}>
                  <RNView style={styles.CommunicationViewLeft}>
                    {CommunicationMethod === 'SMS' && (
                      <RNImage
                        source={require('@/assets/images/More/buttontick.png')}
                        style={styles.CommunicationButtonImage}
                      />
                    )}
                  </RNView>

                  <RNView style={styles.CommunicationViewRight}>
                    <RNText
                      style={
                        CommunicationMethod === 'SMS' ? styles.communicationLabelSelect : styles.communicationLabel
                      }>
                      SMS
                    </RNText>
                  </RNView>
                </TouchableOpacity>
              </RNView>

              <RNView style={styles.SearchEngineColorView}>
                <RNText style={styles.SearchEngineHeaderView}>How did you hear about us ?</RNText>

                <Dropdown
                  style={[styles.dropdownGreen, isFeature && { borderColor: ColorTheme.primaryColor }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={HearList}
                  maxHeight={300}
                  labelField="label"
                  valueField="label"
                  placeholder={!isFeature ? 'How did you hear about us ?' : 'How did you hear about us ?'}
                  value={featureValue}
                  onFocus={() => setIsHear(true)}
                  onBlur={() => setIsHear(false)}
                  onChange={item => {
                    setHearValue(item.label);
                    setIsHear(false);
                  }}
                />
              </RNView>

              <LinearGradient
                colors={['#00B2A7', '#0094B4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: px(12),
                  marginTop: px(40),

                  marginHorizontal: px(5),

                  paddingVertical: px(10),
                  paddingHorizontal: px(12),
                  width: deviceWidth / 1.1,
                  height: px(40),
                  alignSelf: 'center',
                  backgroundColor: ColorTheme.transparent,
                }}>
                <TouchableOpacity
                  style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                  onPress={handleSubmit(onSubmit)}>
                  <RNText style={styles.SubmitTxt}>Submit</RNText>
                </TouchableOpacity>
              </LinearGradient>
            </RNView>
          </RNView>
        </ScrollView>
      </RNView>
    </Container>
  );
};

export default WaitListScreen;
