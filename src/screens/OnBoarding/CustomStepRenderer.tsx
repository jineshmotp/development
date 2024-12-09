import React, { useState } from 'react';
import { FlatList, Platform, TextInput, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { CircleIcon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import useLocation from '@/custom/Location';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserData, updateLoginStatus } from '@/redux/login/loginReducer';
import { useLazyGetUserDataQuery, useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { getFcToken } from '@/redux/Notification/notificationReducer';
import { useLoginNotificationMutation } from '@/redux/Notification/notificationService';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { PropertyTypes, staticData } from './Constants';
import { styles } from './styles';

type Props = {
  currentStep: number;
  changeStep: any;
  apiData: any;
  setApiData: any;
};

const CustomStepRenderer: React.FC<Props> = ({ ...props }) => {
  const { city, state, country, pincode } = useLocation();
  const { currentStep, changeStep, apiData, setApiData } = props;
  const currentData = staticData[currentStep];
  const toast = useToast();
  const getFcmTokens = useAppSelector(getFcToken);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const selectUserData: any = useAppSelector(getUserData);
  const [updateUserDataMutation] = useUpdateUserDetailsMutation();
  const [getUserInfo] = useLazyGetUserDataQuery();
  const [foundVia, setFoundVia] = useState('');
  const [referCode, setReferCode] = useState('');
  const [signUpMutation] = useLoginNotificationMutation();
  const callNotification = userData => {
    const payload = {
      userId: userData?.data?._id,
      deviceType: Platform.OS,
      token: getFcmTokens,
    };
    signUpMutation(payload).then(res => {
      if (res?.data?.status) {
        dispatch(updateLoginStatus(true));
      } else {
        dispatch(updateLoginStatus(true));
      }
    });
  };

  const step3Data = () => {
    let temp = [];
    apiData.intreseted_property &&
      apiData.intreseted_property.forEach(element => {
        temp = temp.concat(PropertyTypes[element]);
      });
    return temp;
  };

  const renderData = currentStep === 3 ? step3Data() : currentData.data;

  const onClickOfButton = (item: any, selectedBool: boolean) => {
    if (currentData.apiKey === 'user_type' || currentData.apiKey === 'property_preference') {
      setApiData({ ...apiData, [currentData.apiKey]: item.key });
    } else {
      let tempArr = apiData[currentData.apiKey] !== undefined ? [...apiData[currentData.apiKey]] : [];
      if (selectedBool) {
        tempArr.splice(tempArr.indexOf(item.key), 1);
      } else {
        tempArr.push(item.key);
      }
      setApiData({ ...apiData, [currentData.apiKey]: [...tempArr] });
    }
  };

  const renderButtons = (item: any, index: number) => {
    let selectedBool = false;
    let disappearBool = false;
    if (currentData.apiKey === 'user_type' || currentData.apiKey === 'property_preference') {
      selectedBool = apiData[currentData.apiKey] === item.key;
    } else {
      selectedBool = apiData[currentData.apiKey] !== undefined && apiData[currentData.apiKey].includes(item.key);
    }
    if (
      apiData['user_type'] !== undefined &&
      apiData['user_type'] === 'Buyer' &&
      currentStep === 2 &&
      item.key === 'Coliving'
    ) {
      disappearBool = true;
    }
    return disappearBool ? (
      <></>
    ) : (
      <CommonButton
        key={item.label}
        title={item.label}
        onPress={() => onClickOfButton(item, selectedBool)}
        style={{
          marginBottom: px(10),
          width: currentStep === 3 ? deviceWidth / 2.45 : deviceWidth / 1.2,
          backgroundColor: selectedBool ? ColorTheme.primary : ColorTheme.white,
          marginLeft: currentStep === 3 && index % 2 ? px(10) : 0,
        }}
        textStyle={{ color: selectedBool ? ColorTheme.white : ColorTheme.black, opacity: selectedBool ? 1 : 0.6 }}
      />
    );
  };

  const onSubmit = () => {
    //validations for both selection and code

    if (foundVia && foundVia.length === 0) {
      toast.show('Please select one option to submit ', {
        type: 'info_toast',
        animationDuration: 100,
        data: {
          title: 'Message',
        },
        duration: 2000,
      });
    } else if (foundVia === 'Reffered by' && referCode.length === 0) {
      toast.show('Please enter Referral Code to submit ', {
        type: 'info_toast',
        animationDuration: 100,
        data: {
          title: 'Message',
        },
        duration: 2000,
      });
    } else {
      apiData.found_via =
        foundVia === 'Reffered by' ? { source: foundVia, referral_code: referCode } : { source: foundVia };
      updateUserDataMutation({
        userId: selectUserData?._id,
        updateDetails: {
          ...apiData,
          city: city,
          state: state,
          country: country,
          pincode: pincode,
        },
      }).then((response: any) => {
        if (response?.data?.status) {
          getUserInfo({}).then(response => {
            if (response?.data?.status) {
              callNotification(response?.data);
            }
          });
        } else {
          toast.show(response?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: '',
            },
            duration: 3000,
          });
        }
      });
    }
  };

  return (
    <RNView style={{ flex: 1 }}>
      <RNText style={styles.heading}>
        {currentStep === 1 ? `Hi, ${selectUserData?.fname}! Tell us more about you` : currentData.heading}
      </RNText>
      <RNView style={{ flex: 1, marginVertical: px(15) }}>
        <RNText style={styles.label}>{currentData.label}</RNText>
        <RNText style={styles.subLabel}>
          {currentData.apiKey === 'user_type' || currentData.apiKey === 'property_preference' || currentStep === 4
            ? '(Pick one option)'
            : '(Select all relevant options)'}
        </RNText>
        <RNView style={{ flex: 1 }}>
          {currentStep === 4 ? (
            <>
              <RadioGroup
                value={foundVia}
                onChange={item => {
                  setFoundVia(item);
                  setReferCode('');
                }}>
                <VStack space="sm">
                  {renderData.map((item: any) => {
                    return (
                      <Radio key={item.key} value={item.key} style={{ marginBottom: px(10) }}>
                        <RadioIndicator
                          style={{ borderColor: foundVia === item.key ? ColorTheme.primary : ColorTheme.white }}
                          mr="$2">
                          <RadioIcon style={{ color: ColorTheme.primary }} as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel style={{ color: ColorTheme.white }}>{item.label}</RadioLabel>
                      </Radio>
                    );
                  })}
                </VStack>
              </RadioGroup>
              {foundVia === 'Reffered by' && (
                <TextInput
                  numberOfLines={1}
                  placeholder={`Enter Referral Code`}
                  onChangeText={e => setReferCode(e)}
                  autoCapitalize="characters"
                  value={referCode}
                  style={styles.referInput}
                />
              )}
            </>
          ) : (
            <FlatList
              key={currentStep}
              data={renderData}
              extraData={renderData}
              renderItem={({ item, index }) => renderButtons(item, index)}
              keyExtractor={item => item.key}
              numColumns={currentStep === 3 ? 2 : 1}
            />
          )}
        </RNView>
      </RNView>
      <RNView style={styles.actionPanel}>
        {currentStep === 1 ? (
          <RNView />
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (currentStep === 1.1) {
                changeStep(1);
              } else if (currentStep === 2 && apiData['user_type'] !== undefined && apiData['user_type'] === 'Owner') {
                changeStep(1.1);
              } else {
                changeStep(currentStep - 1);
              }
            }}>
            <RNText style={styles.actionButton}>{'< Back'}</RNText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            var disableBool =
              apiData[currentData.apiKey] === undefined ||
              (apiData[currentData.apiKey] && apiData[currentData.apiKey].length === 0);
            if (currentStep === 4) {
              onSubmit();
            } else if (
              currentStep === 1 &&
              apiData[currentData.apiKey] !== undefined &&
              apiData[currentData.apiKey] === 'Owner' &&
              !disableBool
            ) {
              changeStep(1.1);
            } else if (currentStep === 1.1 && !disableBool) {
              changeStep(2);
            } else if (!disableBool) {
              changeStep(currentStep + 1);
            }
          }}>
          <RNText style={styles.actionButton}>{currentStep === 4 ? 'Submit' : 'Next >'}</RNText>
        </TouchableOpacity>
      </RNView>
    </RNView>
  );
};

export default CustomStepRenderer;
