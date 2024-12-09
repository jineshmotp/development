import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserData, updateLoginStatus } from '@/redux/login/loginReducer';
import { getBuilderData, getSelectedRole, getUserOnboardingData } from '@/redux/onboarding/onboardingReducer';
import { useUserOnboardingMutation } from '@/redux/onboarding/onboardingService';
import { useGetCitiesQuery } from '@/redux/onboarding/onboardingService';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const OnBoardingFour = () => {
  const navigation = useNavigation();
  const [onboardingMutation] = useUserOnboardingMutation();
  const role = useAppSelector(getSelectedRole);
  const dispatch = useAppDispatch();
  const { data: preferenceCity } = useGetCitiesQuery({});
  const userData = useAppSelector(getUserData);
  const wholeData = useAppSelector(getUserOnboardingData);
  const totalData = useAppSelector(getBuilderData);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDateInputFocused, setIsDateInputFocused] = useState(false); // Track if date input is focused

  const handleFocus = () => {
    Keyboard.dismiss();
    if (!showCityModal) {
      setShowCityModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowCityModal(false);
  };

  const handleCitySelect = city => {
    // console.log('city =====>', selectedCities);

    // Toggle selection of city
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(item => item !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }

    // Close keyboard when city is selected
    Keyboard.dismiss();
  };

  const handleDateConfirm = date => {
    setSelectedDate(date.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
    setIsDateTimePickerVisible(false);
    setIsDateInputFocused(false); // Reset focus state
  };

  const handleCloseDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
    setIsDateInputFocused(false); // Reset focus state
  };

  const convertObjectToArrStr = (arrData: any[]) => {
    return arrData?.map(item => item?.value);
  };

  const postOnboarding = (val: boolean) => {
    let payload: any = {};

    if (role === 'USER') {
      payload = {
        user_sub_role: wholeData?.stepOneData?.userRole,
        looking_for: convertObjectToArrStr(wholeData?.stepTwoData?.userLooking),
        property_preference: convertObjectToArrStr(wholeData?.stepThreeData?.userPreference),
      };
    } else if (role === 'AGENT') {
      payload = {
        company_name: totalData?.stepOneData?.fname,
        bio: totalData?.stepOneData?.description,
        operating_since: totalData?.stepOneData?.optSince,
        languages: convertObjectToArrStr(totalData?.stepTwoData?.languages),
        rera_id: totalData?.stepTwoData?.rera ? totalData?.stepTwoData?.rera : null,
        AGENT: {
          deal_transaction_type: ['New'], // Modify as per your requirement
        },
        deal_property_type: convertObjectToArrStr(totalData?.stepThreeData?.propertyType),
        operating_location: [{ city: 'Hyderabad', locality: ['Abids', 'Afzal Gunj', 'Adikmet', 'Aghapura'] }],
        referral_code: totalData?.stepFourData?.refCode,
      };
    } else if (role === 'BUILDER') {
      payload = {
        company_name: totalData?.stepOneData?.fname,
        bio: totalData?.stepOneData?.description,
        operating_since: totalData?.stepOneData?.optSince,
        languages: convertObjectToArrStr(totalData?.stepTwoData?.languages),
        rera_id: totalData?.stepTwoData?.rera ? totalData?.stepTwoData?.rera : null,
        BUILDER: {
          builder_type: convertObjectToArrStr(totalData?.stepThreeData?.buildType),
        },
        deal_property_type: convertObjectToArrStr(totalData?.stepThreeData?.propertyType),
        operating_location: [{ city: 'Hyderabad', locality: ['Abids', 'Afzal Gunj', 'Adikmet', 'Aghapura'] }],
        referral_code: totalData?.stepFourData?.refCode,
      };
    }

    const convertRequiredPayload = (payload: any) => {
      // Example implementation to filter out empty or null values
      const filteredPayload: any = {};
      Object.keys(payload).forEach(key => {
        if (payload[key] !== undefined && payload[key] !== null) {
          filteredPayload[key] = payload[key];
        }
      });
      return filteredPayload;
    };

    const filteredPayload = convertRequiredPayload(payload);
    // console.log('filteredPayload =======>', filteredPayload);

    onboardingMutation(filteredPayload).then(res => {
      // console.log('res =======>', res);

      if (res?.data?.status) {
        dispatch(updateLoginStatus(true));
        // navigation.navigate('BOTTOM_TAB');
        // navigation.goBack();
        // Alert.alert('hello')
      } else {
        console.log('Error in onboarding builder', res);
      }
    });
  };

  return (
    <Container hasHeader={false} isTab={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <RNView style={styles.mainContainer}>
          <RNView style={styles.stepContainer}>
            <RNText style={styles.stepText}>Step 4 of 4</RNText>
            <RNText style={styles.lineText}>What is your Preferred Location ?</RNText>
          </RNView>
          <ScrollView>
            <RNView style={styles.searchParentContainer}>
              <RNView style={styles.searchContainer}>
                <RNView style={styles.searchChild}>
                  <AntDesign name="search1" size={15} color="black" />
                  <TextInput
                    placeholderTextColor={ColorTheme.gray}
                    placeholder="Select City"
                    onFocus={handleFocus}
                    style={styles.textInput}
                  />
                </RNView>
              </RNView>
            </RNView>

            {/* Modal for city selection */}
            <Modal visible={showCityModal} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
              <Pressable style={styles.modalBackground} onPress={handleCloseModal}>
                <RNView style={styles.modalContainer}>
                  <FlatList
                    data={preferenceCity?.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity key={index} onPress={() => handleCitySelect(item)}>
                        <RNText style={[styles.renderText, selectedCities.includes(item) && styles.selectedText]}>
                          {item}
                        </RNText>
                      </TouchableOpacity>
                    )}
                  />
                </RNView>
              </Pressable>
            </Modal>

            {/* Display selected cities as buttons */}
            <RNView style={styles.selectedCitiesContainer}>
              {selectedCities.map((city, index) => (
                <RNView key={index} style={styles.selectedCityButton}>
                  <RNText style={styles.selectedCityText}>{city}</RNText>
                  {/* <AntDesign
                    onPress={item => handleCitySelect(item)}
                    name="close"
                    size={15}
                    color="white"
                    style={{ marginTop: 2 }}
                  /> */}
                </RNView>
              ))}
            </RNView>

            {/* Display selected date and open calendar on press */}

            <CommonInput
              label="Preferred Move in Date"
              placeholder="Preferred Move in Date"
              placeholderColor={ColorTheme.gray2}
              value={selectedDate}
              maxLength={50}
              onFocus={() => {
                setIsDateTimePickerVisible(true);
                Keyboard.dismiss();
              }}
              style={styles.inputStyle}
            />

            <DateTimePickerModal
              isVisible={isDateTimePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={handleCloseDateTimePicker}
              minimumDate={new Date()}
            />
          </ScrollView>
          <RNView
            style={{
              backgroundColor: ColorTheme.white,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 30,
            }}>
            <CommonButton
              onPress={() => navigation.goBack()}
              title={'Back'}
              style={styles.buttonContainer}
              textStyle={styles.BtnStyle}
            />
            <CommonButton
              // onPress={() => dispatch(updateLoginStatus(true))}
              onPress={postOnboarding}
              title={'Finish'}
              style={styles.nextContainer}
              textStyle={styles.nextStyle}
            />
          </RNView>
        </RNView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default OnBoardingFour;
