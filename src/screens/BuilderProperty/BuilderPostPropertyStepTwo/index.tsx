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
  isEmpty,
  propertBhk,
  propertyCarpetArea,
  propertyFacing,
  types_of_washroom,
  types_of_washroom_coliving,
} from '@/constants/function/property.helper';
import { activateItemByKey, activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectPropertyStepTwoData, setPropertyStepTwoData } from '@/redux/builder/builderReducer';
import { RootStackParamList } from '@/routes/RootNavigator';

import { styles } from '../styles';

// selectPropertyStepTwoData

const BuilderPostPropertyStepTwo = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_TWO'>>();
  const toast = useToast();

  const iwant = route?.params?.post1?.iwant;
  let gated_community = route?.params?.post1?.gated_community;
  const property_type = route?.params?.post1?.property_type;
  const property_sub_type = route?.params?.post1?.property_sub_type;

  const currentStep = 2;

  const data = useAppSelector(selectPropertyStepTwoData);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [load, setLoad] = useState(true);
  const [propertyareaunits, setPropertyareaunits] = useState(propertyCarpetArea);
  const [propertyBhk, setPropertyBhk] = useState(propertBhk);

  const [furarr, setFurrarr] = useState([]);

  const [washroomDetails, setWashroomDetails] = useState(
    iwant !== 'Coliving' ? types_of_washroom : types_of_washroom_coliving
  );

  const [propertyfacingDetails, SetPropertyfacingDetails] = useState(propertyFacing);

  const [propertyDetails, setPropertyDetails]: any = useState({
    bhk: data?.bhk || '',
    balconies: data?.balconies || '',
    bathrooms: data?.bathrooms || '',
    borewell: data?.borewell || false,
    boundary_fencing: data?.boundary_fencing || false,

    coliving_type: data?.coliving_type || '',

    conference_hall_available: data?.conference_hall_available || false,

    conference_hall_count: data?.conference_hall_count ? String(data?.conference_hall_count) : '',

    corner_property: data?.corner_property || false,
    dining_area_available: data?.dining_area_available || false,

    floor_no: data?.floor_no || '',

    front_facing_road_width: data?.front_facing_road_width ? String(data?.front_facing_road_width) : '',

    front_facing_road_width_unit: data?.front_facing_road_width_unit || Object.keys(propertyareaunits)[0],

    furnishing_status: data?.furnishing_status || '',
    furnishing_items: data?.furnishing_items || '',

    gender_preference: data?.gender_preference || '',

    is_multi_level: data?.is_multi_level || false,

    kitchen_area_available: data?.kitchen_area_available || false,

    level_count: data?.level_count ? String(data?.level_count) : '',
    occupancy: data?.occupancy || '',
    pantry: data?.pantry || false,

    pooja_rooms: data?.pooja_rooms || false,

    private_cabin_available: data?.private_cabin_available || false,

    private_cabin_count: data?.private_cabin_count ? String(data?.private_cabin_count) : '',

    property_age: data?.property_age ? String(data?.property_age) : '',

    property_facing_array: data?.property_facing_array || '',

    servant_rooms: data?.servant_rooms || false,

    side_facing_road_width: data?.side_facing_road_width ? String(data?.side_facing_road_width) : '',
    side_facing_road_width_unit: data?.side_facing_road_width_unit || Object.keys(propertyareaunits)[0],

    store_rooms: data?.store_rooms || false,
    study_rooms: data?.study_rooms || false,

    total_floors: data?.total_floors ? String(data?.total_floors) : '',

    total_rooms_on_level: data?.total_rooms_on_level ? String(data?.total_rooms_on_level) : '',

    total_units_of_floors: data?.total_units_of_floors || '',

    units_on_floor: data?.units_on_floor || '',
    washroom: data?.washroom || '',

    no_of_units: data?.no_of_units || '',
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

  //###########################################################

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
  //#################################################################################################

  const onSubmit = data => {
    let retvalthree = 1;

    if (property_type === 'Residential') {
      if (propertyDetails.bhk === '') {
        retvalthree = 0;

        toast.show('Property Listing', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Please Select Room Details',
          },
          duration: 3000,
        });
      }
    }

    if (propertyDetails?.property_facing_array?.length < 1) {
      retvalthree = 0;

      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please Select Property Facing Details',
        },
        duration: 3000,
      });
    }

    if (
      (retvalthree === 1 && property_type !== 'Land or Plot') ||
      (property_type === 'Land or Plot' && gated_community === true && retvalthree === 1)
    ) {
      let post_two = {
        ...propertyDetails,
        furnishing_items: furarr.length > 0 ? furarr : '',
      };

      console.log('post two ', post_two);

      dispatch(setPropertyStepTwoData(post_two));

      navigation.navigate('BUILDER_POST_PROPERTY_THREE', {
        post2: {
          ...route?.params?.post1,
          ...propertyDetails,
          furnishing_items: furarr.length > 0 ? furarr : '',
        },
      });
    } else if (property_type === 'Land or Plot' && gated_community === false && retvalthree === 1) {
      let post_three = {
        ...propertyDetails,
      };

      dispatch(setPropertyStepTwoData(post_three));

      navigation.navigate('BUILDER_POST_PROPERTY_FOUR', {
        post3: {
          ...route?.params?.post1,
          ...propertyDetails,
        },
      });
    }

    // navigation.navigate('POST_PROPERTY_THREE', {
    //   post2: {
    //     ...route?.params?.post1,
    //     ...propertyDetails,
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
    setPropertyDetails({
      property_age: '',
      property_facing_array: '',

      bhk: '',

      floor_no: '',
      total_floors: '',

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
      no_of_units: '',
    });

    setPropertyBhk(propertBhk);

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

  //################################## UseEffect loading ###############################################################

  useEffect(() => {
    setTimeout(() => {
      // const isNotEmpty = obj => Object.keys(data).length > 0;
      // console.log('not empty -> ', isNotEmpty);

      if (isEmpty(data)) {
        setLoad(false);
      } else {
        setPropertyDetails({
          ...propertyDetails,
          bhk: data?.bhk || '',
          balconies: data?.balconies || '',
          bathrooms: data?.bathrooms || '',
          borewell: data?.borewell || false,
          boundary_fencing: data?.boundary_fencing || false,

          coliving_type: data?.coliving_type || '',

          conference_hall_available: data?.conference_hall_available || false,

          conference_hall_count: String(data?.conference_hall_count) || '',

          corner_property: data?.corner_property || false,
          dining_area_available: data?.dining_area_available || false,

          floor_no: data?.floor_no || '',

          front_facing_road_width: String(data?.front_facing_road_width) || '',

          front_facing_road_width_unit: data?.front_facing_road_width_unit || Object.keys(propertyareaunits)[0],

          furnishing_status: data?.furnishing_status || '',
          furnishing_items: data?.furnishing_items || '',

          gender_preference: data?.gender_preference || '',

          is_multi_level: data?.is_multi_level || false,

          kitchen_area_available: data?.kitchen_area_available || false,

          level_count: String(data?.level_count) || '',
          occupancy: data?.occupancy || '',
          pantry: data?.pantry || false,

          pooja_rooms: data?.pooja_rooms || false,

          private_cabin_available: data?.private_cabin_available || false,

          private_cabin_count: String(data?.private_cabin_count) || '',

          property_age: String(data?.property_age) || '',

          property_facing_array: data?.property_facing_array || '',

          servant_rooms: data?.servant_rooms || false,

          side_facing_road_width: String(data?.side_facing_road_width) || '',
          side_facing_road_width_unit: data?.side_facing_road_width_unit || Object.keys(propertyareaunits)[0],

          store_rooms: data?.store_rooms || false,
          study_rooms: data?.study_rooms || false,

          total_floors: String(data?.total_floors) || '',

          total_rooms_on_level: String(data?.total_rooms_on_level) || '',

          total_units_of_floors: data?.total_units_of_floors || '',

          units_on_floor: data?.units_on_floor || '',
          washroom: data?.washroom || '',
          no_of_units: data?.no_of_units || '',
        });

        const washroom_val = data?.washroom;
        const bhkval = data?.bhk;

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
      }

      setLoad(false);
    }, 800);
  }, [data]);

  //#################################################################################################

  const controlConstraints = {
    front_facing_road_width: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
    side_facing_road_width: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
    no_of_units: {
      required: propertyDetails?.no_of_units === '' ? 'Total number of units required' : false,
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },

    total_floors: {
      required:
        property_sub_type === 'Flat' || property_sub_type === 'Apartment' ? 'Total number of units required' : false,
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },

    property_facing_array: {
      required: false,
    },
  };

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

            {/* //################################## Washroom ################################################## */}
            {/* 
            <PropertyWashrooms
              control={control}
              controlConstraints={controlConstraints}
              data={washroomDetails}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForWashroomDetails}
            /> */}
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

export default BuilderPostPropertyStepTwo;
