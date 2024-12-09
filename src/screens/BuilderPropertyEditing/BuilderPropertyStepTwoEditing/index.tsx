// Parent Component (PostProperty)
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BuilderListingCorner from '@/components/builder/BuilderListingCorner';
import BuilderListingFacing from '@/components/builder/BuilderListingFacing';
import BuilderListingFloorNo from '@/components/builder/BuilderListingFloorNo';
import BuilderListingRooms from '@/components/builder/BuilderListingRooms';
import NumberofUnits from '@/components/builder/NumberofUnits';
import Loader from '@/components/common/Loader';
import PropertyHeader from '@/components/common/PropertyHeader';
import {
  Coliving_occupance,
  coliving_types,
  furnishingItems,
  propertBalcony,
  propertBathroom,
  propertBhk,
  propertyCarpetArea,
  propertyExtras,
  propertyFacing,
  propertyFurninshig,
  propertyGenderType,
  types_of_washroom,
  types_of_washroom_coliving,
} from '@/constants/function/property.helper';
import { activateItemByKey, activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { useGetPropertyDetailsQuery } from '@/redux/property/propertyService';
import { RootStackParamList } from '@/routes/RootNavigator';

import { styles } from '../styles';

const BuilderPropertyStepTwoEditing = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_TWO_EDITING'>>();
  const toast = useToast();
  const iwant = route?.params?.post1?.iwant;
  let gated_community = route?.params?.post1?.gated_community;
  const property_type = route?.params?.post1?.property_type;
  const property_sub_type = route?.params?.post1?.property_sub_type;
  const transaction_type_new = route?.params?.post1?.transaction_type_new;
  const { data } = useGetPropertyDetailsQuery({ property: route?.params?.post1?.BasicData?._id });
  //const data = JSON.parse(JSON.stringify(dataretrive));
  //console.log(' post 1 data : ', route?.params?.post1);

  //console.log(' data value -------->: ', data);

  const currentStep = 2;

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [propertyareaunits, setPropertyareaunits] = useState(propertyCarpetArea);
  const [propertyBhk, setPropertyBhk] = useState(propertBhk);

  const [furarr, setFurrarr] = useState([]);
  const [propertyfacingDetails, SetPropertyfacingDetails] = useState(propertyFacing);

  const [load, setLoad] = useState(true);

  const [washroomDetails, setWashroomDetails] = useState(
    iwant !== 'Coliving' ? types_of_washroom : types_of_washroom_coliving
  );

  const [propertyDetails, setPropertyDetails]: any = useState({
    bhk: data?.data?.property?.bhk || '',
    balconies: data?.data?.property?.balconies || '',
    bathrooms: data?.data?.property?.bathrooms || '',
    borewell: data?.data?.property?.borewell || false,
    boundary_fencing: data?.data?.property?.boundary_fencing || false,

    coliving_type: data?.data?.property?.coliving_type || '',

    conference_hall_available: data?.data?.property?.conference_hall_available || false,

    conference_hall_count: data?.data?.property?.conference_hall_count
      ? String(data?.data?.property?.conference_hall_count)
      : '',

    corner_property: data?.data?.property?.corner_property || false,
    dining_area_available: data?.data?.property?.dining_area_available || false,

    floor_no: data?.data?.property?.floor_no || '',

    front_facing_road_width: data?.data?.property?.front_facing_road_width
      ? String(data?.data?.property?.front_facing_road_width)
      : '',

    front_facing_road_width_unit:
      data?.data?.property?.front_facing_road_width_unit || Object.keys(propertyareaunits)[0],

    furnishing_status: data?.data?.property?.furnishing_status || '',
    furnishing_items: data?.data?.property?.furnishing_items || '',

    gender_preference: data?.data?.property?.gender_preference || '',

    is_multi_level: data?.data?.property?.is_multi_level || false,

    kitchen_area_available: data?.data?.property?.kitchen_area_available || false,

    level_count: data?.data?.property?.level_count ? String(data?.data?.property?.level_count) : '',
    occupancy: data?.data?.property?.occupancy || '',
    pantry: data?.data?.property?.pantry || false,

    pooja_rooms: data?.data?.property?.pooja_rooms || false,

    private_cabin_available: data?.data?.property?.private_cabin_available || false,

    private_cabin_count: data?.data?.property?.private_cabin_count
      ? String(data?.data?.property?.private_cabin_count)
      : '',

    property_age: data?.data?.property?.property_age ? String(data?.data?.property?.property_age) : '',

    property_facing_array: data?.data?.property?.property_facing_array || '',

    servant_rooms: data?.data?.property?.servant_rooms || false,

    side_facing_road_width: data?.data?.property?.side_facing_road_width
      ? String(data?.data?.property?.side_facing_road_width)
      : '',
    side_facing_road_width_unit: data?.data?.property?.side_facing_road_width_unit || Object.keys(propertyareaunits)[0],

    store_rooms: data?.data?.property?.store_rooms || false,
    study_rooms: data?.data?.property?.study_rooms || false,

    total_floors: data?.data?.property?.total_floors ? String(data?.data?.property?.total_floors) : '',

    total_rooms_on_level: data?.data?.property?.total_rooms_on_level
      ? String(data?.data?.property?.total_rooms_on_level)
      : '',

    total_units_of_floors: data?.data?.property?.total_units_of_floors || '',

    units_on_floor: data?.data?.property?.units_on_floor || '',
    washroom: data?.data?.property?.washroom || '',
    no_of_units: data?.data?.property?.no_of_units ? String(data?.data?.property?.no_of_units) : '',
  });

  //####################################### Bhk / Room

  const activateKeyForBhk = (item: any, child: any) => {
    const shallowCopy = [...propertyBhk];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    setPropertyDetails({
      ...propertyDetails,
      bhk: item.label,
    });

    setPropertyBhk(updatedArr);
  };

  //####################### Facing ####################################

  const activateKeyForFacing = (item: any) => {
    // console.log(key);
    const shallowCopy = [...propertyfacingDetails];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    //console.log(newFiltered[0]);

    // Filter newFiltered to include only the selected items
    const selectedItems = newFiltered.filter((item: any) => item.active);

    // Extract labels from selected items
    const selectedLabels = selectedItems.map((item: any) => item.label);

    setPropertyDetails({
      ...propertyDetails,
      property_facing_array: selectedLabels,
    });

    //console.log('Facing ---: ', selectedLabels);

    SetPropertyfacingDetails(updatedArr);
  };

  const activateKeyForFacingLoading = (activelist: any[]) => {
    if (activelist.length > 0) {
      SetPropertyfacingDetails(activelist);
    }
  };

  //########################################### Washroom

  const activateKeyForWashroomDetails = (item: any, child: any) => {
    const shallowCopy = [...washroomDetails];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    setPropertyDetails({
      ...propertyDetails,
      washroom: item.label,
    });

    setWashroomDetails(updatedArr);
  };

  //#################################################################################################

  const onSubmit = data => {
    let retvalthree = 1;

    if (property_type === 'Residential') {
      if (propertyDetails.bhk === '' && transaction_type_new !== 'Bareshell') {
        retvalthree = 0;

        toast.show('Property Listing', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Please Room Details',
          },
          duration: 3000,
        });
      }
    }

    if (
      (retvalthree === 1 && property_type !== 'Land or Plot') ||
      (property_type === 'Land or Plot' && gated_community === true && retvalthree === 1)
    ) {
      // console.log(' page 2 Details : ', propertyDetails);

      navigation.navigate('BUILDER_POST_PROPERTY_THREE_EDITING', {
        post2: {
          ...route?.params?.post1,
          ...propertyDetails,
          furnishing_items: furarr.length > 0 ? furarr : '',
          BasicData: route?.params?.post1?.BasicData,
        },
      });
    } else if (property_type === 'Land or Plot' && gated_community === false && retvalthree === 1) {
      //console.log(' page 2 Details : ', propertyDetails);

      navigation.navigate('BUILDER_POST_PROPERTY_FOUR_EDITING', {
        post3: {
          ...route?.params?.post1,
          ...propertyDetails,
          BasicData: route?.params?.post1?.BasicData,
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
    setPropertyDetails({
      property_age: '',
      property_facing_array: '',

      bhk: '',

      floor_no: '',
      total_floors: null,

      total_units_of_floors: null,
      units_on_floor: null,

      balconies: '',
      bathrooms: '',

      pooja_rooms: false,
      servant_rooms: false,
      study_rooms: false,
      store_rooms: false,

      is_multi_level: false,
      level_count: null,

      total_rooms_on_level: null,

      kitchen_area_available: false,

      dining_area_available: false,

      conference_hall_available: false,
      conference_hall_count: null,

      private_cabin_available: false,
      private_cabin_count: null,

      pantry: false,
      borewell: false,

      washroom: '',

      corner_property: false,

      boundary_fencing: false,
      front_facing_road_width: null,
      side_facing_road_width: null,

      front_facing_road_width_unit: Object.keys(propertyareaunits)[0],
      side_facing_road_width_unit: Object.keys(propertyareaunits)[0],

      coliving_type: '',
      occupancy: '',

      furnishing_status: '',
      furnishing_items: '',

      gender_preference: '',
    });

    setPropertyBhk(propertBhk);

    setWashroomDetails(iwant !== 'Coliving' ? types_of_washroom : types_of_washroom_coliving);

    setWashroomDetails(iwant !== 'Coliving' ? types_of_washroom : types_of_washroom_coliving);

    //facing
    let facing_list = [
      {
        label: 'East',
        value: 'East',
        key: 'east',
        active: false,
      },
      {
        label: 'West',
        value: 'West',
        key: 'west',
        active: false,
      },
      {
        label: 'South',
        value: 'South',
        key: 'south',
        active: false,
      },
      {
        label: 'North',
        value: 'North',
        key: 'north',
        active: false,
      },
      {
        label: 'North-East',
        value: 'North-East',
        key: 'north-east',
        active: false,
      },
      {
        label: 'South-East',
        value: 'South-East',
        key: 'south-east',
        active: false,
      },
      {
        label: 'South-West',
        value: 'South-West',
        key: 'south-west',
        active: false,
      },
      {
        label: 'West-North',
        value: 'West-North',
        key: 'west-north',
        active: false,
      },
    ];

    activateKeyForFacingLoading(facing_list);
  };

  const gotonext = () => {
    onSubmit(propertyDetails);
  };

  const gotoprevious = () => {
    navigation.goBack();
  };

  //#################################################################################################

  const controlConstraints = {
    // level_count: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // property_area: {
    //   maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,10}$/,
    //     message: 'Invalid number (maximum be 10 digits)',
    //   },
    //   required:
    //     iwant !== 'Coliving' && (propertyDetails.property_area === '' || propertyDetails.property_area === null),
    // },
    // carpet_area: {
    //   maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
    //   // validate: isCarpetAreaValid,
    //   pattern: {
    //     value: /^\d{1,10}$/,
    //     message: 'Invalid number (maximum be 10 digits)',
    //   },
    // },
    // undivided_share: {
    //   maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
    //   // validate: isCarpetAreaValid,
    //   pattern: {
    //     value: /^\d{1,10}$/,
    //     message: 'Invalid number (maximum be 10 digits)',
    //   },
    // },
    // total_units_of_floors: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // front_facing_road_width: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // side_facing_road_width: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // units_on_floor: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // conference_hall_count: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // private_cabin_count: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // total_rooms_on_level: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
    // total_floors: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    //   required:
    //     ((property_sub_type === 'Hospitality' &&
    //       // iwant === "Sell" &&
    //       transaction_type_new !== 'Bareshell') ||
    //       (property_sub_type === 'Industrial' && property_type !== 'Land or Plot') ||
    //       property_sub_type === 'Office_Space' ||
    //       property_sub_type === 'Shop_And_Retail' ||
    //       property_sub_type === 'Educational' ||
    //       (property_type === 'Residential' &&
    //         property_sub_type !== 'Villa' &&
    //         property_sub_type !== 'Independent House' &&
    //         property_sub_type !== 'Farm House' &&
    //         property_sub_type !== 'Guest House' &&
    //         property_type !== 'Land or Plot') ||
    //       (iwant === 'Coliving' && property_sub_type !== 'Villa' && property_sub_type !== 'Independent House')) &&
    //     (propertyDetails.total_floors === null || propertyDetails.total_floors === '')
    //       ? 'Total floor required'
    //       : false,
    // },
    // floor_no: {
    //   required:
    //     ((property_sub_type === 'Hospitality' &&
    //       // iwant === "Sell" &&
    //       transaction_type_new !== 'Bareshell') ||
    //       (property_sub_type === 'Industrial' && property_type !== 'Land or Plot') ||
    //       property_sub_type === 'Office_Space' ||
    //       property_sub_type === 'Shop_And_Retail' ||
    //       property_sub_type === 'Educational' ||
    //       (property_type === 'Residential' &&
    //         property_sub_type !== 'Villa' &&
    //         property_sub_type !== 'Independent House' &&
    //         property_sub_type !== 'Farm House' &&
    //         property_sub_type !== 'Guest House' &&
    //         property_type !== 'Land or Plot') ||
    //       (iwant === 'Coliving' && property_sub_type !== 'Villa' && property_sub_type !== 'Independent House')) &&
    //     propertyDetails.floor_no === ''
    //       ? 'Floor Number is required'
    //       : false,
    // },
    // property_facing: {
    //   required: iwant !== 'Coliving' && propertyDetails.property_facing === '' ? 'Property Face is required' : false,
    // },
    // property_age: {
    //   required: iwant !== 'Coliving' && propertyDetails.property_age === '' ? 'Property Facing is required' : false,
    // },
  };

  //####################################### Edit useEffects

  useEffect(() => {
    setTimeout(() => {
      setPropertyDetails({
        ...propertyDetails,
        bhk: data?.data?.property?.bhk || '',
        balconies: data?.data?.property?.balconies || '',
        bathrooms: data?.data?.property?.bathrooms || '',
        borewell: data?.data?.property?.borewell || false,
        boundary_fencing: data?.data?.property?.boundary_fencing || false,

        coliving_type: data?.data?.property?.coliving_type || '',

        conference_hall_available: data?.data?.property?.conference_hall_available || false,

        conference_hall_count: data?.data?.property?.conference_hall_count
          ? String(data?.data?.property?.conference_hall_count)
          : '',

        corner_property: data?.data?.property?.corner_property || false,
        dining_area_available: data?.data?.property?.dining_area_available || false,

        floor_no: data?.data?.property?.floor_no || '',

        front_facing_road_width: data?.data?.property?.front_facing_road_width
          ? String(data?.data?.property?.front_facing_road_width)
          : '',

        front_facing_road_width_unit:
          data?.data?.property?.front_facing_road_width_unit || Object.keys(propertyareaunits)[0],

        furnishing_status: data?.data?.property?.furnishing_status || '',
        furnishing_items: data?.data?.property?.furnishing_items || '',

        gender_preference: data?.data?.property?.gender_preference || '',

        is_multi_level: data?.data?.property?.is_multi_level || false,

        kitchen_area_available: data?.data?.property?.kitchen_area_available || false,

        level_count: data?.data?.property?.level_count ? String(data?.data?.property?.level_count) : '',
        occupancy: data?.data?.property?.occupancy || '',
        pantry: data?.data?.property?.pantry || false,

        pooja_rooms: data?.data?.property?.pooja_rooms || false,

        private_cabin_available: data?.data?.property?.private_cabin_available || false,

        private_cabin_count: data?.data?.property?.private_cabin_count
          ? String(data?.data?.property?.private_cabin_count)
          : '',

        property_age: data?.data?.property?.property_age ? String(data?.data?.property?.property_age) : '',

        property_facing_array: data?.data?.property?.property_facing_array || '',

        servant_rooms: data?.data?.property?.servant_rooms || false,

        side_facing_road_width: data?.data?.property?.side_facing_road_width
          ? String(data?.data?.property?.side_facing_road_width)
          : '',
        side_facing_road_width_unit:
          data?.data?.property?.side_facing_road_width_unit || Object.keys(propertyareaunits)[0],

        store_rooms: data?.data?.property?.store_rooms || false,
        study_rooms: data?.data?.property?.study_rooms || false,

        total_floors: data?.data?.property?.total_floors ? String(data?.data?.property?.total_floors) : '',

        total_rooms_on_level: data?.data?.property?.total_rooms_on_level
          ? String(data?.data?.property?.total_rooms_on_level)
          : '',

        total_units_of_floors: data?.data?.property?.total_units_of_floors || '',

        units_on_floor: data?.data?.property?.units_on_floor || '',
        washroom: data?.data?.property?.washroom || '',
        no_of_units: data?.data?.property?.no_of_units ? String(data?.data?.property?.no_of_units) : '',
      });

      const washroom_val = data?.data?.property?.washroom;
      const bhkval = data?.data?.property?.bhk;

      //console.log("occupancy val ", occupancy_val);

      //washroom

      const washroom_ActiveIndex = washroomDetails.findIndex(item => item.key === washroom_val);

      if (washroom_ActiveIndex !== -1) {
        const shallowCopy = [...washroomDetails];
        const updatedArr = activateItemByKey(shallowCopy, washroom_val);
        setWashroomDetails(updatedArr);
      }

      //bhk

      const bhkActiveIndex = propertyBhk.findIndex(item => item.label === bhkval);
      if (bhkActiveIndex !== -1) {
        activateKeyForBhk(propertyBhk[bhkActiveIndex], propertyBhk[bhkActiveIndex].child);
      }

      //property facing

      propertyDetails.property_facing_array.forEach(element => {
        propertyfacingDetails.forEach(item => {
          if (element === item.label) {
            item.active = true;
          }
        });
      });

      activateKeyForFacingLoading(propertyfacingDetails);

      setLoad(false);
    }, 800);
  }, [data]);

  //###############################################################

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
            <BuilderListingRooms
              control={control}
              controlConstraints={controlConstraints}
              data={propertyBhk}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForBhk}
            />

            {/* //#################### Number of units ####################### */}

            <NumberofUnits
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              clearErrors={clearErrors}
            />

            {/* //#################### Total floor number ####################### */}

            <BuilderListingFloorNo
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              clearErrors={clearErrors}
            />

            {/* //###################### Corner Property ########################## */}

            <BuilderListingCorner
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            {/* //########################### Property Facing ########################################## */}

            <BuilderListingFacing
              control={control}
              controlConstraints={controlConstraints}
              data={propertyfacingDetails}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              clearErrors={clearErrors}
              activefunction={activateKeyForFacing}
            />
          </ScrollView>

          <CommonButton
            title="Save & continue"
            style={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Container>
  );
};

export default BuilderPropertyStepTwoEditing;
