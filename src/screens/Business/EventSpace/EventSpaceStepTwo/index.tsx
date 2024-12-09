import React, { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';

import AvailabilityTimeComponent from '@/components/Business/AvailabilityTimeComponent';
import BusinessCheckBox from '@/components/Business/BusinessCheckBox';
import BusinessClearAlert from '@/components/Business/BusinessClearAlert';
import BusinessHeaderGreen from '@/components/Business/BusinessHeaderGreen';
import HeaderBar from '@/components/common/HeaderBar';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectEventSpaceStepTwo, setEventSpaceStepTwo } from '@/redux/business/businessReducer';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { businessstyles } from '../../businessstyles';

const EventSpaceStepTwo = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [bookingAmount, setBookingamount] = useState('');

  const [submitLoader, setSubmitLoader] = useState(false);

  const [vegvalue, SetVegValue] = useState(false);
  const [vegamount, SetVegAmount] = useState(0);

  const [nonvegvalue, SetNonVegValue] = useState(false);
  const [nonvegamount, SetNonVegAmount] = useState(0);

  const [selectAllDays, SetSelectAllDays] = useState(false);

  const [showBusinessCancel, setShowBusinessCancel] = useState(false);

  const eventSpaceTwo = useAppSelector(selectEventSpaceStepTwo);

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

  // Define the control constraints
  const controlConstraints = {
    bookingAmount: {
      required: 'Booking Amount is required',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Booking Amount must be a valid integer with no spaces or special characters',
      },
      minLength: {
        value: 1,
        message: 'Booking Amount must have at least 1 digit',
      },
      maxLength: {
        value: 10, // Adjust this based on your requirement
        message: 'Booking Amount must not exceed 10 digits',
      },
    },

    vegamount: {
      required: vegvalue ? 'The amount for vegetarian food is required' : false,
      pattern: vegvalue
        ? {
            value: /^[0-9]+$/,
            message: 'Food Amount must be a valid integer with no spaces or special characters',
          }
        : false,
      minLength: vegvalue
        ? {
            value: 1,
            message: 'Food Amount must have at least 1 digit',
          }
        : false,
      maxLength: vegvalue
        ? {
            value: 10,
            message: 'Food Amount must not exceed 10 digits',
          }
        : false,
    },
    nonvegamount: {
      required: nonvegvalue ? 'The amount for non-vegetarian food is required' : false,
      pattern: nonvegvalue
        ? {
            value: /^[0-9]+$/,
            message: 'Food Amount must be a valid integer with no spaces or special characters',
          }
        : false,
      minLength: nonvegvalue
        ? {
            value: 1,
            message: 'Food Amount must have at least 1 digit',
          }
        : false,
      maxLength: nonvegvalue
        ? {
            value: 10,
            message: 'Food Amount must not exceed 10 digits',
          }
        : false,
    },
  };

  const { field: bookingAmountField } = useController({
    name: 'bookingAmount',
    control,
    defaultValue: '',
    rules: controlConstraints.bookingAmount,
  });

  const { field: vegamountField } = useController({
    name: 'vegamount',
    control,
    defaultValue: '',
    rules: controlConstraints.vegamount,
  });

  const { field: nonvegamountField } = useController({
    name: 'nonvegamount',
    control,
    defaultValue: '',
    rules: controlConstraints.nonvegamount,
  });

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
    if (vegvalue === false) {
      clearErrors('vegamount');
      SetVegAmount(null);
      vegamountField.onChange(null);
    }
  }, [vegvalue]);

  useEffect(() => {
    if (nonvegvalue === false) {
      clearErrors('nonvegamount');
      SetNonVegAmount(null);
      nonvegamountField.onChange(null);
    }
  }, [nonvegvalue]);

  useEffect(() => {
    // SetApplyAll(false);
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
    // SetSelectAllDays(false);

    const firstDay = operationTimings[0];
    console.log(' firvalue-->', firstDay);

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
          timings: day.day === firstDay.day ? firstDay.timings : [{ start_time: '', close_time: '', slot: 0 }], // Reset timings for all days except the first day
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
    if (eventSpaceTwo && Object.keys(eventSpaceTwo).length === 0) {
      console.log('The object is empty');
    } else {
      const foodType = eventSpaceTwo?.food_type || [];

      if (foodType.includes('Veg')) {
        SetVegValue(true);
        SetNonVegValue(false); // Optional: reset non-veg value if Veg is present
      } else if (foodType.includes('Non Veg')) {
        SetNonVegValue(true);
        SetVegValue(false); // Optional: reset veg value if Non Veg is present
      } else {
        // Optionally handle the case where neither Veg nor Non Veg is present
        SetVegValue(false);
        SetNonVegValue(false);
      }

      if (eventSpaceTwo?.non_veg_per_plate) {
        SetNonVegAmount(parseInt(eventSpaceTwo?.non_veg_per_plate, 10));
        nonvegamountField.onChange(eventSpaceTwo?.non_veg_per_plate.toString());
      }

      if (eventSpaceTwo?.veg_per_plate) {
        SetVegAmount(parseInt(eventSpaceTwo?.veg_per_plate, 10));
        vegamountField.onChange(eventSpaceTwo?.veg_per_plate.toString());
      }

      setBookingamount(parseInt(eventSpaceTwo?.min_booking_price, 10));
      bookingAmountField.onChange(eventSpaceTwo?.min_booking_price.toString());

      const operationTimingsNew = eventSpaceTwo?.operation_timings || [];
      if (operationTimingsNew.length > 0) {
        const updatedTimings = operationTimings.map(day => operationTimingsNew.find(p => p.day === day.day) || day);
        SetOperationTimings(updatedTimings);
      }
    }
  }, [eventSpaceTwo]);

  const handleSubmitClear = () => {
    setShowBusinessCancel(true);
  };

  const handleAlertOK = () => {
    setShowBusinessCancel(false);
    navigation.goBack();
  };

  const onSubmit = data => {
    setSubmitLoader(false);

    // console.log(' operation timings --->', JSON.stringify(operationTimings));

    if (vegvalue === true || nonvegvalue === true) {
      const filteredTimings = operationTimings.filter(day => day.isActive);

      // console.log(' operation timings --->', JSON.stringify(filteredTimings));

      let foodtypevalue = [];

      let foodtype;
      if (nonvegvalue) {
        foodtype = 'Non Veg';
        foodtypevalue.push('Non Veg');
      } else if (vegvalue) {
        foodtype = 'Veg';
        foodtypevalue.push('Veg');
      }

      let post_two = {
        food_type: foodtypevalue,
        veg_per_plate: vegamount,
        non_veg_per_plate: nonvegamount,
        min_booking_price: bookingAmount,
        operation_timings: filteredTimings,
      };

      // console.log(' step two-->', JSON.stringify(post_two));

      dispatch(setEventSpaceStepTwo(post_two));

      navigation.navigate('EVENT_SPACE_STEPTHREE');
    } else {
      toast.show('Event Space Listing', {
        type: 'error_toast',
        animationDuration: 100,
        data: {
          title: 'You should select Atleast One Food option',
        },
        duration: 3000,
      });
    }
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
            pageno={2}
            totalstepno="3"
            stepheading="Pricing & Availability"
          />

          <RNView style={[businessstyles.formContainer, { marginTop: px(8) }]}>
            <RNText style={businessstyles.businessText}>
              Pricing <RNText style={businessstyles.labelTextMandatory}>*</RNText>
            </RNText>

            <RNView style={businessstyles.transparentContainer}>
              <RNView style={businessstyles.checkboxContainer}>
                <RNView style={businessstyles.checkboxLeftView}>
                  <BusinessCheckBox
                    SetValue={() => SetVegValue(!vegvalue)}
                    value={vegvalue}
                    label="Veg"
                    colorThemes={ColorTheme.checkboxcolorGreen}
                  />
                </RNView>

                <RNView style={businessstyles.checkboxcenterView}>
                  <RNView style={businessstyles.checkboxcenterLine} />
                </RNView>

                <RNView style={businessstyles.AmountRightView}>
                  <CommonInput
                    placeholder="Enter Amount"
                    keyboardType="number-pad"
                    disabled={!vegvalue}
                    placeholderColor={ColorTheme.gray2}
                    style={[businessstyles.inputStyle, { width: deviceWidth / 3 }]}
                    maxLength={6}
                    outlineStyle={[
                      businessstyles.outlineBorderStyle,
                      errors.vegamount ? { borderColor: ColorTheme.red } : {},
                    ]}
                    value={vegamountField.value}
                    onChangeText={text => {
                      SetVegAmount(text);
                      vegamountField.onChange(text);
                    }}
                  />
                </RNView>

                <RNView style={businessstyles.checkboxcenterOtherView}></RNView>
              </RNView>

              {errors.vegamount && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.vegamount?.message}
                />
              )}

              <RNView style={businessstyles.checkboxContainer}>
                <RNView style={businessstyles.checkboxLeftView}>
                  <BusinessCheckBox
                    SetValue={() => SetNonVegValue(!nonvegvalue)}
                    value={nonvegvalue}
                    label="Non Veg"
                    colorThemes={ColorTheme.checkboxcolorRed}
                  />
                </RNView>

                <RNView style={businessstyles.checkboxcenterView}>
                  <RNView style={businessstyles.checkboxcenterLine} />
                </RNView>

                <RNView style={businessstyles.AmountRightView}>
                  <CommonInput
                    placeholder="Enter Amount"
                    keyboardType="number-pad"
                    disabled={!nonvegvalue}
                    placeholderColor={ColorTheme.gray2}
                    style={[businessstyles.inputStyle, { width: deviceWidth / 3 }]}
                    maxLength={6}
                    outlineStyle={[
                      businessstyles.outlineBorderStyle,
                      errors.nonvegamount ? { borderColor: ColorTheme.red } : {},
                    ]}
                    value={nonvegamountField.value}
                    onChangeText={text => {
                      SetNonVegAmount(text);
                      nonvegamountField.onChange(text);
                    }}
                  />
                </RNView>

                <RNView style={businessstyles.checkboxcenterOtherView}></RNView>
              </RNView>

              {errors.nonvegamount && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.nonvegamount?.message}
                />
              )}

              <RNText style={businessstyles.labelText}>
                Event space booking Amount <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>
              <CommonInput
                placeholder="Event space booking Amount"
                keyboardType="number-pad"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={7}
                outlineStyle={[
                  businessstyles.outlineBorderStyle,
                  errors.bookingAmount ? { borderColor: ColorTheme.red } : {},
                ]}
                value={bookingAmountField.value}
                onChangeText={text => {
                  setBookingamount(text);
                  bookingAmountField.onChange(text);
                }}
              />

              {errors.bookingAmount && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.bookingAmount?.message}
                />
              )}
            </RNView>

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

export default EventSpaceStepTwo;
