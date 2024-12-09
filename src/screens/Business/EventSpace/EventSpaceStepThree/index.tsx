import React, { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';

import BusinessCheckBox from '@/components/Business/BusinessCheckBox';
import BusinessClearAlert from '@/components/Business/BusinessClearAlert';
import BusinessHeaderGreen from '@/components/Business/BusinessHeaderGreen';
import HeaderBar from '@/components/common/HeaderBar';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import { cuisines_offered } from '@/constants/function/business.helper';
import { BusinessListingPayload } from '@/constants/function/business.payloadFunction';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  clearEventSpaceStepOne,
  clearEventSpaceStepThree,
  clearEventSpaceStepTwo,
  selectEventSpaceStepOne,
  selectEventSpaceStepThree,
  selectEventSpaceStepTwo,
  setEventSpaceStepThree,
} from '@/redux/business/businessReducer';
import { useEventSpaceListingAddingMutation } from '@/redux/business/businessService';
import { getUserData } from '@/redux/login/loginReducer';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { businessstyles } from '../../businessstyles';

const areaUnits = [
  { label: 'Sq ft', value: 'Sq ft' },
  { label: 'Sq yards', value: 'yards' },
  { label: 'Acres', value: 'Acres' },
  { label: 'Marla', value: 'Marla' },
  { label: 'Cents', value: 'Cents' },
  { label: 'Bigha', value: 'Bigha' },
  { label: 'Kottah', value: 'Kottah' },
  { label: 'Grounds', value: 'Grounds' },
  { label: 'Ares', value: 'Ares' },
];

const EventSpaceStepThree = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const selectedUserData = useAppSelector(getUserData);

  const [submitLoader, setSubmitLoader] = useState(false);

  const [panelvalue, SetPanelValue] = useState(false);
  const [outsidervalue, SetOutsiderValue] = useState(false);

  const [alcoholValue, SetAlcoholValue] = useState(null);

  const [decorationValue, SetDecorationValue] = useState(null);

  const [cuisines, SetCuisines] = useState(cuisines_offered);
  const [cuisinesValues, SetCuisinesValues] = useState([]);
  const [cuisinesValuesEdited, SetCuisinesValuesEdited] = useState([]);

  const [vegvalue, SetVegValue] = useState(false);
  const [nonvegvalue, SetNonVegValue] = useState(false);

  const [showBusinessCancel, setShowBusinessCancel] = useState(false);

  const [roomCount, SetRoomCount] = useState('');

  const eventSpaceOne = useAppSelector(selectEventSpaceStepOne);
  const eventSpaceTwo = useAppSelector(selectEventSpaceStepTwo);
  const eventSpaceThree = useAppSelector(selectEventSpaceStepThree);

  const [uploadEventSpaceListingAddingMutation, { status }] = useEventSpaceListingAddingMutation({});

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();

  // Define the control constraints
  const controlConstraints = {
    roomCount: {
      required: false,
      pattern: {
        value: /^[0-9]+$/,
        message: 'Room Count must be a valid integer with no spaces or special characters',
      },
      minLength: {
        value: 1,
        message: 'Room Count must have at least 1 digit',
      },
      maxLength: {
        value: 10, // Adjust this based on your requirement
        message: 'Room Count must not exceed 10 digits',
      },
    },
  };

  const { field: roomCountField } = useController({
    name: 'roomCount',
    control,
    defaultValue: '',
    rules: controlConstraints.roomCount,
  });

  useEffect(() => {
    if (eventSpaceThree && Object.keys(eventSpaceThree).length === 0) {
      console.log('The object is empty');
    } else {
      // console.log('The object is not empty', JSON.stringify(eventSpaceThree));

      SetCuisinesValuesEdited(eventSpaceThree?.cuisine);

      if (eventSpaceThree?.alcohol_availability === 'Yes') {
        SetAlcoholValue('Yes');
      }

      if (eventSpaceThree?.alcohol_availability === 'No') {
        SetAlcoholValue('No');
      }

      if (eventSpaceThree?.decoration === 'Outsiders Allowed') {
        SetDecorationValue('Outsiders Allowed');
      }
      if (eventSpaceThree?.decoration === 'Panel Only') {
        SetDecorationValue('Panel Only');
      }

      SetRoomCount(eventSpaceThree?.total_no_rooms);
      roomCountField.onChange(eventSpaceThree?.total_no_rooms.toString());
    }
  }, [eventSpaceThree]);

  useEffect(() => {
    const updatedList = cuisines.map(item =>
      cuisinesValuesEdited.includes(item.label) ? { ...item, isActive: true } : item
    );

    SetCuisines(updatedList);
  }, [cuisinesValuesEdited]);

  const handleSubmitClear = () => {
    setShowBusinessCancel(true);
  };

  const handleAlertOK = () => {
    setShowBusinessCancel(false);
    navigation.goBack();
  };

  const onSubmit = data => {
    // console.log(' event space-->');
    setSubmitLoader(false);

    let post_three = {
      cuisine: cuisinesValues,
      decoration: decorationValue,
      alcohol_availability: alcoholValue,
      total_no_rooms: roomCount,
      business_owner: selectedUserData?._id,
    };

    dispatch(setEventSpaceStepThree(post_three));

    let payloadvalue = {
      ...eventSpaceOne,
      ...eventSpaceTwo,
      ...post_three,
    };

    // console.log(' event space one--->', eventSpaceOne);

    const payload = BusinessListingPayload(payloadvalue);

    // console.log(' event space-->', JSON.stringify(payload));

    uploadEventSpaceListingAddingMutation(JSON.stringify(payload)).then(response => {
      if (response?.data?.status) {
        let profiledata = {
          _id: payload?._id,
          business_name: payload?.business_name,
          profile_pic: payload?.profile_pic,
        };

        console.log(profiledata);

        Alert.alert('Event Space Listing', 'Evet Space Added successfully', [
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearEventSpaceStepOne());
              dispatch(clearEventSpaceStepTwo());
              dispatch(clearEventSpaceStepThree());

              navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
                profiledata: profiledata,
              });
            },
          },
        ]);
      } else {
        console.log(' Error --->', response);
        toast.show('Property Listing', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: response?.error?.message,
          },
          duration: 3000,
        });
      }
    });
  };

  const handleCuisinePress = (item: any) => {
    const updatedArr = cuisines.map(cuisinesd =>
      cuisinesd.key === item.key ? { ...cuisinesd, isActive: !cuisinesd.isActive } : cuisinesd
    );

    SetCuisines(updatedArr);

    const newFiltered = updatedArr.filter((item: any) => item.isActive === true);

    const selectedLabels = newFiltered.map(item => item.label);

    SetCuisinesValues(selectedLabels);
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Event Space Listing"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={businessstyles.keyboardView} behavior={'padding'} enabled>
        <ScrollView style={businessstyles.topScrollStyle} showsVerticalScrollIndicator={false}>
          <BusinessHeaderGreen
            heading="Tell us about your Event Space"
            description="Create an Event Space Business with details. You can change them at any time."
            pageno={3}
            totalstepno="3"
            stepheading="Other Details"
          />

          <RNView style={[businessstyles.formContainer, { marginTop: px(8) }]}>
            <RNText style={businessstyles.businessText}>Catering Details</RNText>

            <RNView style={businessstyles.transparentContainer}>
              {/* <RNText style={businessstyles.labelText}>
                Catering Availability <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>

              <RNView style={businessstyles.checkboxContainer}>
                <RNView style={businessstyles.checkboxLeftView}>
                  <BusinessCheckBox
                    SetValue={() => SetVegValue(!vegvalue)}
                    value={vegvalue}
                    label="Veg"
                    colorThemes={ColorTheme.checkboxcolorGreen}
                  />
                </RNView>
                <RNView style={businessstyles.checkboxcenterView} />

                <RNView style={businessstyles.checkboxRightView}>
                  <BusinessCheckBox
                    SetValue={() => SetNonVegValue(!nonvegvalue)}
                    value={nonvegvalue}
                    label="Non Veg"
                    colorThemes={ColorTheme.checkboxcolorRed}
                  />
                </RNView>
                <RNView style={businessstyles.checkboxcenterOtherView} />
              </RNView> */}

              <RNText style={businessstyles.labelText}>Cuisines Offered</RNText>
              {Array.from({ length: Math.ceil(cuisines.length / 3) }, (_, rowIndex) => (
                <RNView key={rowIndex} style={businessstyles.rowContainer}>
                  {cuisines.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, index) => (
                    <TouchableOpacity
                      key={item?.key}
                      style={[businessstyles.touchableContainer, item.isActive && businessstyles.selectedCategory]}
                      onPress={() => handleCuisinePress(item)}>
                      <RNText
                        style={[businessstyles.touchableButtonText, item.isActive && businessstyles.selectedText]}>
                        {item?.label}
                      </RNText>
                    </TouchableOpacity>
                  ))}
                  {/* Fill remaining slots with empty touchable areas */}
                  {Array.from({ length: 3 - cuisines.slice(rowIndex * 3, rowIndex * 3 + 3).length }).map((_, index) => (
                    <TouchableOpacity
                      key={`empty-${rowIndex}-${index + cuisines.slice(rowIndex * 3, rowIndex * 3 + 3).length}`}
                      style={[
                        businessstyles.touchableContainer,
                        { backgroundColor: ColorTheme.transparent, elevation: 0 },
                      ]}
                    />
                  ))}
                </RNView>
              ))}

              <RNText style={businessstyles.labelText}>Alcohol Availability</RNText>

              <RNView style={businessstyles.checkboxContainer}>
                <RNView style={businessstyles.checkboxLeftView}>
                  <BusinessCheckBox
                    SetValue={() => SetAlcoholValue('Yes')}
                    value={alcoholValue === 'Yes'}
                    label="Yes"
                  />
                </RNView>

                <RNView style={businessstyles.checkboxcenterView} />

                <RNView style={businessstyles.AmountRightView}>
                  <BusinessCheckBox SetValue={() => SetAlcoholValue('No')} value={alcoholValue === 'No'} label="No" />
                </RNView>

                <RNView style={businessstyles.checkboxcenterOtherView} />
              </RNView>
            </RNView>

            <RNText style={businessstyles.businessText}>Decoration Policy</RNText>
            <RNView style={businessstyles.transparentContainer}>
              <RNView style={businessstyles.checkboxContainer}>
                <RNView style={businessstyles.checkboxLeftView}>
                  <BusinessCheckBox
                    SetValue={() => SetDecorationValue('Panel Only')}
                    value={decorationValue === 'Panel Only'}
                    label="Panel Only"
                  />
                </RNView>

                <RNView style={businessstyles.checkboxcenterView} />

                <RNView style={businessstyles.AmountRightView}>
                  <BusinessCheckBox
                    SetValue={() => SetDecorationValue('Outsiders Allowed')}
                    value={decorationValue === 'Outsiders Allowed'}
                    label="Outsiders Allowed"
                    styleChanges={{ minWidth: deviceWidth / 2.5 }}
                  />
                </RNView>
                <RNView style={businessstyles.checkboxcenterOtherView} />
              </RNView>
            </RNView>

            <RNText style={businessstyles.businessText}>Rooms Availability</RNText>
            <RNView style={businessstyles.transparentContainer}>
              <RNText style={businessstyles.labelText}>Count of Rooms</RNText>
              <CommonInput
                placeholder="Count of Rooms"
                keyboardType="number-pad"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={2}
                outlineStyle={businessstyles.outlineBorderStyle}
                value={roomCountField.value}
                onChangeText={text => {
                  SetRoomCount(text);
                  roomCountField.onChange(text);
                }}
              />

              {errors.roomCount && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.roomCount?.message}
                />
              )}
            </RNView>

            <BusinessClearAlert
              showBusinessCancel={showBusinessCancel}
              setShowBusinessCancel={setShowBusinessCancel}
              title={'Business Listing'}
              subtitle={'Do you want to go Previous step ?'}
              handleAlertOK={handleAlertOK}
            />

            <RNView style={businessstyles.submitView}>
              <CommonButton
                title={'Cancel'}
                onPress={handleSubmitClear}
                style={[businessstyles.submitContainer, { backgroundColor: ColorTheme.transparent }]}
                textStyle={[businessstyles.touchableText, { color: '#333333' }]}
                loading={submitLoader}
              />

              <CommonButton
                title={'Next'}
                onPress={handleSubmit(onSubmit)}
                style={businessstyles.submitContainer}
                textStyle={businessstyles.touchableText}
                loading={submitLoader}
              />
            </RNView>
          </RNView>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default EventSpaceStepThree;
