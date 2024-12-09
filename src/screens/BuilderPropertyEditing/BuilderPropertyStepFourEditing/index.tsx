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
import PropertyOwnership from '@/components/property/PropertyOwnership';
import PropertyPrice from '@/components/property/PropertyPrice';
import { price_additional_details } from '@/constants/function/property.helper';
import { propertyOwnership, propertyOwnership_landorplot } from '@/constants/function/property.helper';
import { activateItemByKey } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { useGetPropertyDetailsQuery } from '@/redux/property/propertyService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from '../styles';

const BuilderPropertyStepFourEditing = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_FOUR_EDITING'>>();
  const currentStep = 4;
  const toast = useToast();

  const iwant = route?.params?.post3?.iwant;
  const property_type = route?.params?.post3?.property_type;

  const { data } = useGetPropertyDetailsQuery({ property: route?.params?.post3?.BasicData?._id });

  // console.log(' data four editing ', data);

  //const data = JSON.parse(JSON.stringify(dataretrive));

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [load, setLoad] = useState(true);
  const [additionalData, setAdditionalData] = useState(price_additional_details);
  const [uploadCheck, setUploadCheckData] = useState();

  const [propertyOwner, setPropertyOwnership] = useState(
    property_type !== 'Land or Plot' ? propertyOwnership : propertyOwnership_landorplot
  );

  const imgval =
    (data?.data?.property?.gallery).length > 0 ? JSON.parse(JSON.stringify(data?.data?.property?.gallery)) : '';

  const [propertyDiscription, setPropertyDiscription]: any = useState({
    floor_types: data?.data?.property?.floor_types,

    agreement_duration_month: data?.data?.property?.agreement_duration_month,
    booking_amount: data?.data?.property?.booking_amount ? String(data?.data?.property?.booking_amount) : '',

    expectedPrice_units: data?.data?.property?.expectedPrice_units || '',
    expected_rental: data?.data?.property?.expected_rental || '',

    feature_image: data?.data?.property?.feature_image || '',
    gallery: imgval,

    include_power_bill_charges: data?.data?.property?.include_power_bill_charges || false,
    include_water_bill_charges: data?.data?.property?.include_water_bill_charges || false,

    is_all_inclusive_price: data?.data?.property?.is_all_inclusive_price || false,
    is_annual_dues_paid: data?.data?.property?.is_annual_dues_paid || false,

    is_currently_under_loan: data?.data?.property?.is_currently_under_loan || false,
    is_notice_period: data?.data?.property?.is_notice_period || false,
    is_price_negotiable: data?.data?.property?.is_price_negotiable || false,
    is_rent_agreement: data?.data?.property?.is_rent_agreement || false,
    is_tax_excluded: data?.data?.property?.is_tax_excluded || false,

    lease_rent: data?.data?.property?.lease_rent ? String(data?.data?.property?.lease_rent) : '',
    lease_rent_duration: data?.data?.property?.lease_rent_duration || '',
    maintainance_per_month: data?.data?.property?.maintainance_per_month || '',
    maintenance_price: data?.data?.property?.maintenance_price ? String(data?.data?.property?.maintenance_price) : '',
    membership_charges: data?.data?.property?.membership_charges || '',

    notice_duration_month: data?.data?.property?.notice_duration_month
      ? String(data?.data?.property?.notice_duration_month)
      : '',
    notice_period: data?.data?.property?.notice_period || '',
    notice_period_month: data?.data?.property?.notice_period_month || '',

    ownership: data?.data?.property?.ownership || '',

    property_area: data?.data?.property?.property_area ? String(data?.data?.property?.property_area) : '',
    property_area_max: data?.data?.property?.property_area_max ? String(data?.data?.property?.property_area_max) : '',

    property_price: data?.data?.property?.property_price ? String(data?.data?.property?.property_price) : '',
    property_price_max: data?.data?.property?.property_price_max
      ? String(data?.data?.property?.property_price_max)
      : '',

    property_area_units: data?.data?.property?.property_area_units || '',

    property_price_per_unit: data?.data?.property?.property_price_per_unit
      ? String(data?.data?.property?.property_price_per_unit)
      : '',

    property_price_per_unit_max: data?.data?.property?.property_price_per_unit_max
      ? String(data?.data?.property?.property_price_per_unit_max)
      : '',

    rent_agreement: data?.data?.property?.rent_agreement || '',
    rent_agreement_month: data?.data?.property?.rent_agreement_month || '',

    rent_amount: data?.data?.property?.rent_amount ? String(data?.data?.property?.rent_amount) : '',
    rented_time: data?.data?.property?.rented_time,
    rented_time_count: data?.data?.property?.rented_time_count || '',
    token_amount: data?.data?.property?.token_amount ? String(data?.data?.property?.token_amount) : '',

    token_amount_of_duration: data?.data?.property?.token_amount_of_duration || '',
    token_month: data?.data?.property?.token_month || '',
  });

  const [uploadbutton, setUploadButton] = useState(false);

  //############################ Ownership

  const activateKeyForOwnership = (item: any, key: string) => {
    const shallowCopy = [...propertyOwner];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    setPropertyDiscription({
      ...propertyDiscription,
      ownership: item.label,
    });
    setPropertyOwnership(updatedArr);
  };

  //##################################################################

  const onSubmit = data => {
    let retvalfive = 1;

    if (retvalfive === 1) {
      const post4 = {
        ...route?.params?.post3,
        ...propertyDiscription,
        BasicData: route?.params?.post3?.BasicData,
      };

      navigation.navigate('BUILDER_POST_PROPERTY_FIVE_EDITING', {
        post4: {
          ...route?.params?.post3,
          ...propertyDiscription,
          BasicData: route?.params?.post3?.BasicData,
        },
      });
    }

    // navigation.navigate('POST_PROPERTY_FIVE', {
    //   post4: {
    //     ...route?.params?.post3,
    //     ...propertyDiscription,
    //   },
    // });
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

      property_price: '',
      property_price_max: '',

      property_price_per_unit: '',
      property_price_per_unit_max: '',

      property_area: '',
      property_area_units: '',
      property_area_max: '',

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
    });

    setPropertyOwnership(property_type !== 'Land or Plot' ? propertyOwnership : propertyOwnership_landorplot);

    setAdditionalData(price_additional_details);
  };

  const gotonext = () => {
    onSubmit(propertyDiscription);
  };

  const gotoprevious = () => {
    navigation.goBack();
  };

  //#########################################################################################

  const controlConstraints = {
    // property_price: {
    //   maxLength: { value: 7, message: 'Maximum length of 7 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,7}$/,
    //     message: 'Invalid number (maximum be 7 digits)',
    //   },
    //   required:
    //     iwant === 'Sell' && (propertyDiscription.property_price === '' || propertyDiscription.property_price === null)
    //       ? 'Property Price is required'
    //       : false,
    // },
    // maintenance_price: {
    //   maxLength: { value: 7, message: 'Maximum length of 7 integer exceeded' },
    //   pattern: {
    //     value: /^\d{0,7}$/,
    //     message: 'Invalid number (maximum be 7 digits)',
    //   },
    // },
    // token_amount: {
    //   maxLength: { value: 7, message: 'Maximum length of 7 integer exceeded' },
    //   pattern: {
    //     value: /^\d{0,7}$/,
    //     message: 'Invalid number (maximum be 7 digits)',
    //   },
    // },
    // rented_time: {
    //   required: iwant === 'Rent' || iwant === 'Coliving' ? 'Rent Duration is required' : false,
    // },
    // rent_amount: {
    //   maxLength: { value: 7, message: 'Maximum length of 7 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,7}$/,
    //     message: 'Invalid number (maximum be 7 digits)',
    //   },
    //   required:
    //     (iwant === 'Rent' || iwant === 'Coliving') &&
    //     (propertyDiscription.rent_amount === '' || propertyDiscription.rent_amount === null)
    //       ? 'Rent Amount is required'
    //       : false,
    // },
    // token_amount_of_duration: {
    //   required:
    //     (iwant === 'Rent' || iwant === 'Coliving') && propertyDiscription.token_amount_of_duration === ''
    //       ? 'Token Amount duration is required'
    //       : false,
    // },
  };

  //############################## editing useEffect

  useEffect(() => {
    const imgval =
      (data?.data?.property?.gallery).length > 0 ? JSON.parse(JSON.stringify(data?.data?.property?.gallery)) : '';

    setTimeout(() => {
      setPropertyDiscription({
        ...propertyDiscription,
        floor_types: data?.data?.property?.floor_types || '',

        agreement_duration_month: data?.data?.property?.agreement_duration_month,
        booking_amount: data?.data?.property?.booking_amount ? String(data?.data?.property?.booking_amount) : '',

        expectedPrice_units: data?.data?.property?.expectedPrice_units || '',
        expected_rental: data?.data?.property?.expected_rental || '',

        feature_image: data?.data?.property?.feature_image || '',
        gallery: imgval,

        include_power_bill_charges: data?.data?.property?.include_power_bill_charges || false,
        include_water_bill_charges: data?.data?.property?.include_water_bill_charges || false,

        is_all_inclusive_price: data?.data?.property?.is_all_inclusive_price || false,
        is_annual_dues_paid: data?.data?.property?.is_annual_dues_paid || false,

        is_currently_under_loan: data?.data?.property?.is_currently_under_loan || false,
        is_notice_period: data?.data?.property?.is_notice_period || false,
        is_price_negotiable: data?.data?.property?.is_price_negotiable || false,
        is_rent_agreement: data?.data?.property?.is_rent_agreement || false,
        is_tax_excluded: data?.data?.property?.is_tax_excluded || false,

        lease_rent: data?.data?.property?.lease_rent ? String(data?.data?.property?.lease_rent) : '',
        lease_rent_duration: data?.data?.property?.lease_rent_duration || '',
        maintainance_per_month: data?.data?.property?.maintainance_per_month || '',
        maintenance_price: data?.data?.property?.maintenance_price
          ? String(data?.data?.property?.maintenance_price)
          : '',
        membership_charges: data?.data?.property?.membership_charges || '',

        notice_duration_month: data?.data?.property?.notice_duration_month
          ? String(data?.data?.property?.notice_duration_month)
          : '',
        notice_period: data?.data?.property?.notice_period || '',
        notice_period_month: data?.data?.property?.notice_period_month || '',

        ownership: data?.data?.property?.ownership || '',

        property_area: data?.data?.property?.property_area ? String(data?.data?.property?.property_area) : '',
        property_area_max: data?.data?.property?.property_area_max
          ? String(data?.data?.property?.property_area_max)
          : '',

        property_area_units: data?.data?.property?.property_area_units || '',

        property_price: data?.data?.property?.property_price ? String(data?.data?.property?.property_price) : '',
        property_price_max: data?.data?.property?.property_price_max
          ? String(data?.data?.property?.property_price_max)
          : '',

        property_price_per_unit: data?.data?.property?.property_price_per_unit
          ? String(data?.data?.property?.property_price_per_unit)
          : '',

        property_price_per_unit_max: data?.data?.property?.property_price_per_unit_max
          ? String(data?.data?.property?.property_price_per_unit_max)
          : '',

        rent_agreement: data?.data?.property?.rent_agreement || '',
        rent_agreement_month: data?.data?.property?.rent_agreement_month || '',

        rent_amount: data?.data?.property?.rent_amount ? String(data?.data?.property?.rent_amount) : '',
        rented_time: data?.data?.property?.rented_time,
        rented_time_count: data?.data?.property?.rented_time_count || '',
        token_amount: data?.data?.property?.token_amount ? String(data?.data?.property?.token_amount) : '',

        token_amount_of_duration: data?.data?.property?.token_amount_of_duration || '',
        token_month: data?.data?.property?.token_month || '',
      });

      //additional price details

      const price_additional_details = [
        {
          label: 'Price Negotiable',
          key: 'price_negotiable',
          active: data?.data?.property?.is_price_negotiable,
        },
        {
          label: 'Currently under Loan',
          key: 'currently_under_load',
          active: data?.data?.property?.is_currently_under_loan,
        },
        {
          label: 'All inclusive price',
          key: 'all_inclusinve_price',
          active: data?.data?.property?.is_all_inclusive_price,
        },
        {
          label: 'Annual Dues Paid',
          key: 'annual_dues_paid',
          active: data?.data?.property?.is_annual_dues_paid,
        },
        {
          label: 'Tax Excluded',
          key: 'tax_excluded',
          active: data?.data?.property?.is_tax_excluded,
        },
      ];

      setAdditionalData(price_additional_details);

      //image and videos

      //console.log("data length : ", dataObject["gallery"]);
      // if (data?.data?.property?.gallery !== undefined) {
      //   setUploadCheckData(data?.data?.property?.gallery);
      // }

      setLoad(false);
    }, 800);
  }, [data]);

  //#################################################

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
        label="Editing Builder Property"
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

export default BuilderPropertyStepFourEditing;
