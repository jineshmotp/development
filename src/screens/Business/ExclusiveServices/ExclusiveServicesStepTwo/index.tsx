import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import AvailabilityTimeComponent from '@/components/Business/AvailabilityTimeComponent';
import BusinessCheckBox from '@/components/Business/BusinessCheckBox';
import BusinessClearAlert from '@/components/Business/BusinessClearAlert';
import DocumentBoxComponent from '@/components/Business/DocumentBoxComponent';
import ServicesHeaderGreen from '@/components/Business/ServicesHeaderGreen';
import HeaderBar from '@/components/common/HeaderBar';
import PropertyImageVideoSheet from '@/components/common/PropertyImageVideoSheet';
import { BusinessListingPayload } from '@/constants/function/business.payloadFunction';
import { imagevideoextention } from '@/constants/function/property.helper';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  clearExclusiveServiceStepOne,
  clearExclusiveServiceStepTwo,
  selectExclusiveServiceStepOne,
  selectExclusiveServiceStepTwo,
  setExclusiveServiceStepTwo,
} from '@/redux/business/businessReducer';
import { useExclusiveServiceListingAddingMutation } from '@/redux/business/businessService';
import { getUserData } from '@/redux/login/loginReducer';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { businessstyles } from '../../businessstyles';

const ExclusiveServicesStepTwo = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [submitLoader, setSubmitLoader] = useState(false);

  const [selectAllDays, SetSelectAllDays] = useState(false);

  const exclusiveServiceOne = useAppSelector(selectExclusiveServiceStepOne);
  const exclusiveServiceTwo = useAppSelector(selectExclusiveServiceStepTwo);

  const [operationTimings, SetOperationTimings] = useState([
    { day: 'Monday', timings: [{ start_time: '', close_time: '', slot: 0 }], isActive: false },
    { day: 'Tuesday', timings: [{ start_time: '', close_time: '', slot: 0 }], isActive: false },
    { day: 'Wednesday', timings: [{ start_time: '', close_time: '', slot: 0 }], isActive: false },
    { day: 'Thursday', timings: [{ start_time: '', close_time: '', slot: 0 }], isActive: false },
    { day: 'Friday', timings: [{ start_time: '', close_time: '', slot: 0 }], isActive: false },
    { day: 'Saturday', timings: [{ start_time: '', close_time: '', slot: 0 }], isActive: false },
    { day: 'Sunday', timings: [{ start_time: '', close_time: '', slot: 0 }], isActive: false },
  ]);

  const [applyAll, SetApplyAll] = useState(false);

  const [uploadExclusiveServiceListingAddingMutation, { status }] = useExclusiveServiceListingAddingMutation({});
  const selectedUserData = useAppSelector(getUserData);

  const [loadingPricingUpload, setLoadingPricingUpload] = useState(false);
  const [uploadPricingItems, setUploadPricingItems] = useState([]);
  const [BottomPricingSheet, setBottomPricingSheet] = useState(false);
  const [showBusinessCancel, setShowBusinessCancel] = useState(false);
  // Initialize useForm
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  //##################### Control Constrain

  const updateTimingForDay = (day, index, newTiming) => {
    // console.log(' new timings--->', day, index, newTiming);

    SetOperationTimings(prevTimings =>
      prevTimings.map(timing =>
        timing.day === day
          ? {
              ...timing,

              timings: timing.timings.map((t, i) => (i === 0 ? { ...t, ...newTiming } : t)),
            }
          : timing
      )
    );
  };
  const onUpdateavailable = day => {
    SetOperationTimings(prevTimings =>
      prevTimings.map(timing =>
        timing.day === day
          ? {
              ...timing,
              isActive: !timing.isActive, // Toggle the active status
              timings: timing.isActive
                ? [] // Reset timings if already active
                : [{ start_time: '9 AM', close_time: '6 PM', slot: 0 }], // Set default timings if not active
            }
          : timing
      )
    );

    // console.log('Active status updated for', day);
  };

  useEffect(() => {
    SetApplyAll(false);
    if (selectAllDays) {
      const updatedTimings = operationTimings.map(day => ({
        ...day,
        isActive: true,
        timings: [{ start_time: '9 AM', close_time: '6 PM', slot: 0 }],
      }));
      SetOperationTimings(updatedTimings);
    } else {
      const updatedTimings = operationTimings.map(day => ({
        ...day,
        isActive: false,
        timings: [{ start_time: '', close_time: '', slot: 0 }],
      }));
      SetOperationTimings(updatedTimings);
    }
  }, [selectAllDays]);

  useEffect(() => {
    SetSelectAllDays(false);
    // Find the first day (e.g., 'Monday') to copy timings from
    const firstDay = operationTimings[0];
    // console.log(' firvalue-->', firstDay);

    if (applyAll) {
      if (firstDay) {
        // Copy the timings from the first day to all days
        const updatedTimings = operationTimings.map(day => ({
          ...day,
          isActive: firstDay.isActive, // Set isActive based on the first day
          timings: firstDay.timings, // Copy timings from the first day
        }));
        SetOperationTimings(updatedTimings);
      }
    } else {
      if (firstDay) {
        // Reset all days to default state except the first day
        const updatedTimings = operationTimings.map(day => ({
          ...day,
          isActive: day.day === firstDay.day ? firstDay.isActive : false, // Keep first day's isActive
          timings: [{ start_time: '', close_time: '', slot: 0 }], // Reset timings for all days except the first day
        }));
        SetOperationTimings(updatedTimings);
      }
    }
  }, [applyAll]);

  useEffect(() => {
    // console.log(' operation timings7777777', JSON.stringify(operationTimings));
    console.log('test');
  }, [operationTimings]);

  useEffect(() => {
    if (exclusiveServiceTwo && Object.keys(exclusiveServiceTwo).length === 0) {
      console.log('The object is empty');
    } else {
      // setBookingamount(parseInt(eventSpaceTwo?.min_booking_price, 10));
      // bookingAmountField.onChange(eventSpaceTwo?.min_booking_price.toString());

      const operationTimingsNew = exclusiveServiceTwo?.operation_timings || [];
      if (operationTimingsNew.length > 0) {
        const updatedTimings = operationTimings.map(day => operationTimingsNew.find(p => p.day === day.day) || day);
        SetOperationTimings(updatedTimings);
      }
    }
  }, [exclusiveServiceTwo]);

  const handleSubmitClear = () => {
    setShowBusinessCancel(true);
  };

  const handleAlertOK = () => {
    setShowBusinessCancel(false);
    navigation.goBack();
  };

  const onhandlePricingType = () => {
    setBottomPricingSheet(true);
  };

  const onSubmit = data => {
    setSubmitLoader(false);

    console.log(' operation timings --->', JSON.stringify(operationTimings));

    const filteredTimings = operationTimings.filter(day => day.isActive);

    let post_two = {
      operation_timings: filteredTimings,
      business_owner: selectedUserData?._id,
      rate_card: uploadPricingItems[0],
    };

    // console.log(' post two --->', post_two);

    dispatch(setExclusiveServiceStepTwo(post_two));

    let payloadvalue = {
      ...exclusiveServiceOne,
      ...exclusiveServiceTwo,
    };

    const payload = BusinessListingPayload(payloadvalue);

    console.log(' payload for exclusive service-->', payload);

    uploadExclusiveServiceListingAddingMutation(JSON.stringify(payload)).then(response => {
      if (response?.data?.status) {
        let profiledata = {
          _id: payload?._id,
          business_name: payload?.business_name,
          profile_pic: payload?.profile_pic,
        };

        // console.log(profiledata);

        Alert.alert('Event Space Listing', 'Evet Space Added successfully', [
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearExclusiveServiceStepOne());
              dispatch(clearExclusiveServiceStepTwo());

              navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
                profiledata: profiledata,
              });
            },
          },
        ]);
      } else {
        console.log(' Error --->', response);
        toast.show('Business Listing', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: response?.error?.message,
          },
          duration: 3000,
        });
      }
    });

    // console.log(' exclusive payload', payloadvalue);
  };

  const handleImageClick = (typeval: boolean) => {
    console.log('type val--->', typeval);

    if (typeval) {
      navigation.navigate('GALLERY_PREVIEW', {
        images: uploadPricingItems,
        index: 0,
        hasHeader: true,
        headerName: 'Price Card',
      });
    } else {
      // console.log(' pdf url -->', uploadItems);

      navigation.navigate('DOCUMENT_PREVIEW', {
        images: uploadPricingItems, // PDF URIs passed here
        index: 0, // Set initial index (not needed in this simple setup)
        hasHeader: true,
        headerName: 'Price Card',
      });
    }
  };

  const deleteImageClick = () => {
    setUploadPricingItems(null);
  };

  useEffect(() => {
    console.log('  uploadItems--->');
  }, [uploadPricingItems]);

  useEffect(() => {
    console.log(' uploading api-->');
  }, [loadingPricingUpload]);

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Event Space Listing"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={businessstyles.keyboardView} behavior={'padding'} enabled>
        <ScrollView style={businessstyles.topScrollStyle} showsVerticalScrollIndicator={false}>
          <ServicesHeaderGreen
            heading="Exclusive Service Details"
            description="Create an Exclusive Services Business with details. You can change them at any time."
            pageno={1}
            totalstepno="2"
            stepheading="Pricing & Availability"
          />

          <RNView style={[businessstyles.formContainer, { marginTop: px(8) }]}>
            <RNText style={businessstyles.businessText}>Pricing</RNText>

            <TouchableOpacity style={businessstyles.documentStyle} onPress={onhandlePricingType}>
              <RNText style={businessstyles.documentTextStyle}>Upload Rate card</RNText>
              <Feather name="upload" size={20} color={ColorTheme.gray} style={businessstyles.documentUploadIcon} />
            </TouchableOpacity>

            {loadingPricingUpload ? (
              <ActivityIndicator />
            ) : (
              uploadPricingItems?.map((img: any, index: number) => (
                <DocumentBoxComponent
                  loading={loadingPricingUpload}
                  handleClick={() => handleImageClick(imagevideoextention(img))}
                  deleteClick={() => deleteImageClick()}
                  item={img}
                  type={imagevideoextention(img)}
                />
              ))
            )}

            <RNText style={businessstyles.businessText}>Availability</RNText>

            <RNView style={businessstyles.transparentContainer}>
              <AvailabilityTimeComponent
                key={0}
                dayvalue="Monday"
                styleChanges={{ marginTop: px(20) }}
                available={operationTimings[0].isActive}
                onUpdate={newTiming => updateTimingForDay(operationTimings[0].day, 0, newTiming)}
                onUpdateavailable={() => onUpdateavailable(operationTimings[0].day)}
                TimeValue={operationTimings[0].timings}
              />

              <RNView style={businessstyles.checkboxContainer}>
                <RNView style={[businessstyles.checkboxLeftView, { backgroundColor: ColorTheme.transparent }]}>
                  <BusinessCheckBox
                    SetValue={() => SetSelectAllDays(!selectAllDays)}
                    value={selectAllDays}
                    label="Select all days"
                    styleChanges={{ backgroundColor: ColorTheme.transparent, borderColor: ColorTheme.transparent }}
                    // colorThemes={ColorTheme.checkboxcolorGreen}
                  />
                </RNView>
                <RNView style={businessstyles.checkboxcenterView} />
                <RNView style={businessstyles.checkboxcenterOtherView} />

                <RNView
                  style={[
                    businessstyles.checkboxRightView,
                    { justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' },
                  ]}>
                  <BusinessCheckBox
                    SetValue={() => SetApplyAll(!applyAll)}
                    value={applyAll}
                    label="Apply to all"
                    styleChanges={{ backgroundColor: ColorTheme.transparent, borderColor: ColorTheme.transparent }}
                    // colorThemes={ColorTheme.checkboxcolorRed}
                  />
                </RNView>
              </RNView>

              {operationTimings.slice(1).map((dayTiming, index) => (
                <AvailabilityTimeComponent
                  key={index + 1}
                  dayvalue={dayTiming.day}
                  styleChanges={{ marginTop: index === 0 ? 0 : px(20) }}
                  available={dayTiming.isActive}
                  onUpdateavailable={() => onUpdateavailable(dayTiming.day)}
                  onUpdate={newTiming => updateTimingForDay(dayTiming.day, index + 1, newTiming)}
                  TimeValue={dayTiming.timings}
                />
              ))}
            </RNView>

            <PropertyImageVideoSheet
              showBottomSheet={BottomPricingSheet}
              imgArray={uploadPricingItems}
              setLoading={setLoadingPricingUpload}
              setImageArray={data => setUploadPricingItems(data)}
              setshowBottomSheet={setBottomPricingSheet}
              photos={true}
              loading={loadingPricingUpload}
              uploaddocument={true}
              multiSelect={false}
            />

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

export default ExclusiveServicesStepTwo;
