// Parent Component (PostProperty)
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BuilderListingPrice from '@/components/builder/BuilderListingPrice';
import Loader from '@/components/common/Loader';
import PropertyBroucher from '@/components/common/PropertyBroucher';
import PropertyHeader from '@/components/common/PropertyHeader';
import PropertyImages from '@/components/common/PropertyImages';
import PropertyVideos from '@/components/common/PropertyVideos';
import { price_additional_details } from '@/constants/function/property.helper';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectPropertyStepFourData, setPropertyStepFourData } from '@/redux/builder/builderReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from '../styles';

const BuilderPostPropertyStepFour = () => {
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_FOUR'>>();
  const currentStep = 4;

  const [load, setLoad] = useState(true);

  const iwant = route?.params?.post3?.iwant;

  const data = useAppSelector(selectPropertyStepFourData);
  // console.log(' data four ------>', data);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [additionalData, setAdditionalData]: any = useState(price_additional_details);

  const [propertyDiscription, setPropertyDiscription]: any = useState({
    floor_types: data?.floor_types || '',

    agreement_duration_month: data?.agreement_duration_month,
    booking_amount: data?.booking_amount ? String(data?.booking_amount) : '',

    expectedPrice_units: data?.expectedPrice_units || '',
    expected_rental: data?.expected_rental || '',

    feature_image: data?.feature_image || '',
    gallery: data?.gallery ? JSON.parse(JSON.stringify(data?.gallery)) : '',

    include_power_bill_charges: data?.include_power_bill_charges || false,
    include_water_bill_charges: data?.include_water_bill_charges || false,

    is_all_inclusive_price: data?.is_all_inclusive_price || false,
    is_annual_dues_paid: data?.is_annual_dues_paid || false,

    is_currently_under_loan: data?.is_currently_under_loan || false,
    is_notice_period: data?.is_notice_period || false,
    is_price_negotiable: data?.is_price_negotiable || false,
    is_rent_agreement: data?.is_rent_agreement || false,
    is_tax_excluded: data?.is_tax_excluded || false,

    lease_rent: data?.lease_rent ? String(data?.lease_rent) : '',
    lease_rent_duration: data?.lease_rent_duration || '',
    maintainance_per_month: data?.maintainance_per_month || '',
    maintenance_price: data?.maintenance_price ? String(data?.maintenance_price) : '',
    membership_charges: data?.membership_charges || '',

    notice_duration_month: data?.notice_duration_month ? String(data?.notice_duration_month) : '',
    notice_period: data?.notice_period || '',
    notice_period_month: data?.notice_period_month || '',

    ownership: data?.ownership || '',

    property_area: data?.property_area ? String(data?.property_area) : '',
    property_area_max: data?.property_area_max ? String(data?.property_area_max) : '',

    property_price: data?.property_price ? String(data?.property_price) : '',
    property_price_max: data?.property_price_max ? String(data?.property_price_max) : '',

    property_price_per_unit: data?.property_price_per_unit ? String(data?.property_price_per_unit) : '',
    property_price_per_unit_max: data?.property_price_per_unit_max ? String(data?.property_price_per_unit_max) : '',

    rent_agreement: data?.rent_agreement || '',
    rent_agreement_month: data?.rent_agreement_month || '',

    rent_amount: data?.rent_amount ? String(data?.rent_amount) : '',
    rented_time: data?.rented_time,
    rented_time_count: data?.rented_time_count || '',
    token_amount: data?.token_amount ? String(data?.token_amount) : '',

    token_amount_of_duration: data?.token_amount_of_duration || '',
    token_month: data?.token_month || '',

    property_broucher: data?.property_broucher ? JSON.parse(JSON.stringify(data?.property_broucher)) : [],
  });

  const [uploadbutton, setUploadButton] = useState(false);

  //##################################################################

  const onSubmit = data => {
    let retvalfive = 1;

    if (retvalfive === 1) {
      let post_four = {
        ...propertyDiscription,
      };

      dispatch(setPropertyStepFourData(post_four));

      navigation.navigate('BUILDER_POST_PROPERTY_FIVE', {
        post4: {
          ...route?.params?.post3,
          ...propertyDiscription,
        },
      });
    }
  };

  const gobackPost = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BOTTOM_TAB' }],
    });
  };

  const goClearPost = () => {
    setPropertyDiscription({
      ownership: '',

      is_price_negotiable: false,
      is_currently_under_loan: false,
      is_all_inclusive_price: false,
      is_annual_dues_paid: false,
      is_tax_excluded: false,

      include_power_bill_charges: false,
      include_water_bill_charges: false,

      expected_rental: '',
      booking_amount: '',
      membership_charges: '',
      maintenance_price: null,
      maintainance_per_month: '',

      property_area: '',
      property_area_max: '',

      property_price: '',
      property_price_max: '',

      property_price_per_unit: '',
      property_price_per_unit_max: '',

      lease_rent: '',
      lease_rent_duration: '',
      token_amount: null,
      token_month: '',

      token_amount_of_duration: '',
      rented_time: '',
      rent_amount: null,

      is_rent_agreement: false,
      agreement_duration_month: 0,
      is_notice_period: false,
      notice_duration_month: 0,

      rent_agreement: '',

      rent_agreement_month: '',

      rented_time_count: '',

      notice_period: '',
      notice_period_month: '',
      gallery: '',
      feature_image: '',

      property_layout: '',
      property_broucher: [],
    });

    setAdditionalData(price_additional_details);

    //   setLoad(false);
    // }, 800);
  };

  const gotonext = () => {
    onSubmit(propertyDiscription);
  };

  const gotoprevious = () => {
    navigation.goBack();
  };

  //########################### useEffect

  useEffect(() => {
    const imgval = data?.gallery ? JSON.parse(JSON.stringify(data?.gallery)) : '';

    setTimeout(() => {
      setPropertyDiscription({
        ...propertyDiscription,
        floor_types: data?.floor_types || '',

        agreement_duration_month: data?.agreement_duration_month,
        booking_amount: data?.booking_amount ? String(data?.booking_amount) : '',

        expectedPrice_units: data?.expectedPrice_units || '',
        expected_rental: data?.expected_rental || '',

        feature_image: data?.feature_image || '',
        gallery: imgval,

        include_power_bill_charges: data?.include_power_bill_charges || false,
        include_water_bill_charges: data?.include_water_bill_charges || false,

        is_all_inclusive_price: data?.is_all_inclusive_price || false,
        is_annual_dues_paid: data?.is_annual_dues_paid || false,

        is_currently_under_loan: data?.is_currently_under_loan || false,
        is_notice_period: data?.is_notice_period || false,
        is_price_negotiable: data?.is_price_negotiable || false,
        is_rent_agreement: data?.is_rent_agreement || false,
        is_tax_excluded: data?.is_tax_excluded || false,

        lease_rent: data?.lease_rent ? String(data?.lease_rent) : '',
        lease_rent_duration: data?.lease_rent_duration || '',
        maintainance_per_month: data?.maintainance_per_month || '',
        maintenance_price: data?.maintenance_price ? String(data?.maintenance_price) : '',
        membership_charges: data?.membership_charges || '',

        notice_duration_month: data?.notice_duration_month ? String(data?.notice_duration_month) : '',
        notice_period: data?.notice_period || '',
        notice_period_month: data?.notice_period_month || '',

        ownership: data?.ownership || '',

        property_area: data?.property_area ? String(data?.property_area) : '',
        property_area_max: data?.property_area_max ? String(data?.property_area_max) : '',

        property_price: data?.property_price ? String(data?.property_price) : '',
        property_price_max: data?.property_price_max ? String(data?.property_price_max) : '',

        property_price_per_unit: data?.property_price_per_unit ? String(data?.property_price_per_unit) : '',
        property_price_per_unit_max: data?.property_price_per_unit_max ? String(data?.property_price_per_unit_max) : '',

        rent_agreement: data?.rent_agreement || '',
        rent_agreement_month: data?.rent_agreement_month || '',

        rent_amount: data?.rent_amount ? String(data?.rent_amount) : '',
        rented_time: data?.rented_time,
        rented_time_count: data?.rented_time_count || '',
        token_amount: data?.token_amount ? String(data?.token_amount) : '',

        token_amount_of_duration: data?.token_amount_of_duration || '',
        token_month: data?.token_month || '',

        property_broucher: data?.property_broucher ? JSON.parse(JSON.stringify(data?.property_broucher)) : [],
      });

      //additional price details

      const price_additional_details = [
        {
          label: 'Price Negotiable',
          key: 'price_negotiable',
          active: data?.is_price_negotiable,
        },
        {
          label: 'Currently under Loan',
          key: 'currently_under_load',
          active: data?.is_currently_under_loan,
        },
        {
          label: 'All inclusive price',
          key: 'all_inclusinve_price',
          active: data?.is_all_inclusive_price,
        },
        {
          label: 'Annual Dues Paid',
          key: 'annual_dues_paid',
          active: data?.is_annual_dues_paid,
        },
        {
          label: 'Tax Excluded',
          key: 'tax_excluded',
          active: data?.is_tax_excluded,
        },
      ];

      setAdditionalData(price_additional_details);

      setLoad(false);
    }, 800);
  }, [data]);

  //#########################################################################################

  const controlConstraints = {
    property_area: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{1,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      validate: {
        isAreaMinValid: value => {
          // Convert the value to a number to ensure numerical comparison
          const numericValue = Number(value);
          // Check if the value is a valid number
          if (isNaN(numericValue)) {
            return 'Invalid number';
          }
          // Validate against property area
          return (
            numericValue <= propertyDiscription.property_area_max ||
            'Minimum Area value should be Less than Maximum Value'
          );
        },
      },
      required:
        iwant === 'Sell' && (propertyDiscription.property_area === '' || propertyDiscription.property_area === null)
          ? 'Minimum Area is required'
          : false,
    },

    property_area_max: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{1,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      validate: {
        isAreaMaxValid: value => {
          // Convert the value to a number to ensure numerical comparison
          const numericValue = Number(value);
          // Check if the value is a valid number
          if (isNaN(numericValue)) {
            return 'Invalid number';
          }
          // Validate against property area
          return (
            numericValue >= propertyDiscription.property_area || 'Minimum Area value should be Less than Maximum Value'
          );
        },
      },

      required:
        iwant === 'Sell' &&
        (propertyDiscription.property_area_max === '' || propertyDiscription.property_area_max === null)
          ? 'Maximum Area is required'
          : false,
    },

    property_price: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{0,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      validate: {
        isPriceMinValid: value => {
          // Convert the value to a number to ensure numerical comparison
          const numericValue = Number(value);
          // Check if the value is a valid number
          if (isNaN(numericValue)) {
            return 'Invalid number';
          }
          // Validate against property area
          return (
            numericValue <= propertyDiscription.property_price_max ||
            'Minimum Price value should be Less than Maximum Value'
          );
        },
      },
      required:
        iwant === 'Sell' && (propertyDiscription.property_price === '' || propertyDiscription.property_price === null)
          ? 'Minimum Property Price is required'
          : false,
    },

    property_price_max: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{0,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      validate: {
        isPriceMaxValid: value => {
          // Convert the value to a number to ensure numerical comparison
          const numericValue = Number(value);
          // Check if the value is a valid number
          if (isNaN(numericValue)) {
            return 'Invalid number';
          }
          // Validate against property area
          return (
            numericValue >= propertyDiscription.property_price ||
            'Minimum Price value should be Less than Maximum Value'
          );
        },
      },
      required:
        iwant === 'Sell' &&
        (propertyDiscription.property_price_max === '' || propertyDiscription.property_price_max === null)
          ? 'Maximum Property Price is required'
          : false,
    },

    property_price_per_unit: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{0,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      validate: {
        isPriceUnitMinValid: value => {
          // Convert the value to a number to ensure numerical comparison
          const numericValue = Number(value);
          // Check if the value is a valid number
          if (isNaN(numericValue)) {
            return 'Invalid number';
          }
          // Validate against property area
          return (
            numericValue <= propertyDiscription.property_price_per_unit_max ||
            'Minimum Price/sqft value should be Less than Maximum value'
          );
        },
      },
      required:
        iwant === 'Sell' &&
        (propertyDiscription.property_price_per_unit === '' || propertyDiscription.property_price_per_unit === null)
          ? 'Minimum Price/sqft value required'
          : false,
    },

    property_price_per_unit_max: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{0,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },

      validate: {
        isPriceUnitMaxValid: value => {
          // Convert the value to a number to ensure numerical comparison
          const numericValue = Number(value);
          // Check if the value is a valid number
          if (isNaN(numericValue)) {
            return 'Invalid number';
          }
          // Validate against property area
          return (
            numericValue >= propertyDiscription.property_price_per_unit ||
            'Minimum Price/sqft value should be Less than Maximum value'
          );
        },
      },
      required:
        iwant === 'Sell' &&
        (propertyDiscription.property_price_per_unit_max === '' ||
          propertyDiscription.property_price_per_unit_max === null)
          ? 'Maximum Price/sqft value required'
          : false,
    },

    maintenance_price: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{0,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
    },

    token_amount: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{0,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
    },

    rented_time: {
      required: iwant === 'Rent' && propertyDiscription.rented_time === '' ? 'Rent Duration is required' : false,
    },

    rent_amount: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{0,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      required:
        iwant === 'Rent' && (propertyDiscription.rent_amount === '' || propertyDiscription.rent_amount === null)
          ? 'Rent Amount is required'
          : false,
    },

    token_amount_of_duration: {
      required:
        iwant === 'Rent' && propertyDiscription.token_amount_of_duration === ''
          ? 'Token Amount duration is required'
          : false,
    },
  };

  //########################################

  if (load) {
    return <Loader size={'large'} />;
  }

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <PropertyHeader
        currentStep={currentStep}
        //bubbleclick={bubbleclick}
        onpressgo={gobackPost}
        goClearPost={goClearPost}
        gotonext={gotonext}
        gotoprevious={gotoprevious}
        label="Listing your property for Sale or Rent"
      />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
            <PropertyBroucher
              control={control}
              mandatory={false}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              errors={errors}
            />

            <BuilderListingPrice
              control={control}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              checkingData={route?.params?.post3}
              errors={errors}
              additioanlData={additionalData}
              clearErrors={clearErrors}
            />

            <PropertyImages
              control={control}
              mandatory={true}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              errors={errors}
            />

            <PropertyVideos
              control={control}
              mandatory={true}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              errors={errors}
              setUploadButton={setUploadButton}
            />
          </ScrollView>

          <CommonButton
            title="Save & continue"
            style={styles.buttonStyle}
            textStyle={{ color: ColorTheme.black }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Container>
  );
};

export default BuilderPostPropertyStepFour;
