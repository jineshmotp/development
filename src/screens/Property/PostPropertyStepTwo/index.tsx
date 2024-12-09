// Parent Component (PostProperty)
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import Loader from '@/components/common/Loader';
import PropertyHeader from '@/components/common/PropertyHeader';
// import { selectPropertyStepTwoData, setPropertyStepTwoData } from '@/redux/listing/listingReducer';
// import { RootState } from '@/';
import PropertyAge from '@/components/property/PropertyAge';
import PropertyArea from '@/components/property/PropertyArea';
import PropertyBalconies from '@/components/property/PropertyBalconies';
import PropertyBathrooms from '@/components/property/PropertyBathrooms';
import PropertyColivingGenderPreference from '@/components/property/PropertyColivingGenderPreference';
import PropertyColivingOccupancy from '@/components/property/PropertyColivingOccupancy';
import PropertyColivingType from '@/components/property/PropertyColivingType';
import PropertyCorner from '@/components/property/PropertyCorner';
import PropertyDetailsSection from '@/components/property/PropertyDetailsSection';
import PropertyExtra from '@/components/property/PropertyExtra';
import PropertyFacing from '@/components/property/PropertyFacing';
import PropertyFloorNo from '@/components/property/PropertyFloorNo';
import PropertyFurnishing from '@/components/property/PropertyFurnishing';
import PropertyFurnishingStatusModel from '@/components/property/PropertyFurnitureStatusModel';
import PropertyKitchenDinningArea from '@/components/property/PropertyKitchDinningArea';
import PropertyLevelCount from '@/components/property/PropertyLevelCount';
import PropertyRoomCount from '@/components/property/PropertyRoomCount';
import PropertyRooms from '@/components/property/PropertyRooms';
import PropertyTotalUnits from '@/components/property/PropertyTotalUnits';
import PropertyWashrooms from '@/components/property/PropertyWashrooms';
import {
  Coliving_occupance,
  coliving_types,
  furnishingItems,
  isEmpty,
  propertBalcony,
  propertBathroom,
  propertBhk,
  propertyCarpetArea,
  propertyExtras,
  propertyFurninshig,
  propertyGenderType,
  types_of_washroom,
  types_of_washroom_coliving,
} from '@/constants/function/property.helper';
import { activateItemByKey, activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectPropertyStepTwoData, setPropertyStepTwoData } from '@/redux/listing/listingReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { loginApi } from '@/services/endpoints';

import { styles } from '../styles';

// selectPropertyStepTwoData

const PostPropertyStepTwo = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'POST_PROPERTY_TWO'>>();
  const toast = useToast();
  const iwant = route?.params?.post1?.iwant;
  let gated_community = route?.params?.post1?.gated_community;
  const property_type = route?.params?.post1?.property_type;
  const property_sub_type = route?.params?.post1?.property_sub_type;
  const transaction_type_new = route?.params?.post1?.transaction_type_new;

  const currentStep = 2;

  const data = useAppSelector(selectPropertyStepTwoData);

  // const propertyStepTwoData = useSelector((state: RootState) => selectPropertyStepTwoData(state));

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
  const [colivingTypes, setColivingTypes] = useState(coliving_types);
  const [genderType, setGenderType] = useState(propertyGenderType);

  const [colivingoccupancy, setColivingOccupancy] = useState(Coliving_occupance);
  const [propertyBalcony, setPropertyBalcony] = useState(propertBalcony);
  const [propertyBathroom, setPropertyBathroom] = useState(propertBathroom);
  const [propertyExtra, setPropertyExtras] = useState(propertyExtras);

  const [furrStoredkey, setToogleStoredKey] = useState('');

  const [furnishingItemsList, setFurnishingItemsList] = useState(furnishingItems);
  const [propertyFurnishing, setPropertyFurninshing] = useState(propertyFurninshig);
  const [ToogleModalFurnishing, setToogleModalFurnishing] = useState(false);
  const [furarr, setFurrarr] = useState([]);

  const [furnishingStatus, setFurnishingStatus] = useState([]);

  const [washroomDetails, setWashroomDetails] = useState(
    iwant !== 'Coliving' ? types_of_washroom : types_of_washroom_coliving
  );

  const [propertyDetails, setPropertyDetails]: any = useState({
    bhk: data?.bhk || '',
    balconies: data?.balconies || '',
    bathrooms: data?.bathrooms || '',
    borewell: data?.borewell || false,
    boundary_fencing: data?.boundary_fencing || false,

    carpet_area: data?.carpet_area ? String(data.carpet_area) : '',

    carpet_area_units: data?.carpet_area_units || Object.keys(propertyareaunits)[0],

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
    property_area: data?.property_area ? String(data?.property_area) : '',
    property_area_units: data?.property_area_units || Object.keys(propertyareaunits)[0],

    property_facing: data?.property_facing || '',

    servant_rooms: data?.servant_rooms || false,

    side_facing_road_width: data?.side_facing_road_width ? String(data?.side_facing_road_width) : '',
    side_facing_road_width_unit: data?.side_facing_road_width_unit || Object.keys(propertyareaunits)[0],

    store_rooms: data?.store_rooms || false,
    study_rooms: data?.study_rooms || false,

    total_floors: data?.total_floors ? String(data?.total_floors) : '',

    total_rooms_on_level: data?.total_rooms_on_level ? String(data?.total_rooms_on_level) : '',

    total_units_of_floors: data?.total_units_of_floors || '',
    undivided_share: data?.undivided_share ? String(data?.undivided_share) : '',

    undivided_share_units: data?.undivided_share_units || Object.keys(propertyareaunits)[0],
    units_on_floor: data?.units_on_floor || '',
    washroom: data?.washroom || '',
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

  // ############################### Exra key acive key

  const activateKeyForExtras = (item: any) => {
    //console.log("item val ", item);

    const shallowCopy = [...propertyExtra];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newData = updatedArr.filter((item: any) => item.active === true);

    // console.log("value-------------------- ", item.label, " ", item.active);

    if (item.label === 'Pooja Room') {
      setPropertyDetails({
        ...propertyDetails,
        pooja_rooms: !propertyDetails.pooja_rooms,
      });
    }

    if (item.label === 'Servant Room') {
      setPropertyDetails({
        ...propertyDetails,
        servant_rooms: !propertyDetails.servant_rooms,
      });
    }

    if (item.label === 'Study Room') {
      setPropertyDetails({
        ...propertyDetails,
        study_rooms: !propertyDetails.study_rooms,
      });
    }

    if (item.label === 'Store Room') {
      setPropertyDetails({
        ...propertyDetails,
        store_rooms: !propertyDetails.store_rooms,
      });
    }

    //setPropertyDetails({ ...propertyDetails, property_extras: newData });

    setPropertyExtras(updatedArr);
  };

  const activateKeyForExtrasClear = (activelist: any[]) => {
    if (activelist.length > 0) {
      setPropertyExtras(activelist);
    }
  };

  const activateKeyForExtrasLoading = (activelist: any[]) => {
    if (activelist.length > 0) {
      setPropertyExtras(activelist);

      //console.log("mainlist : ", activelist);
    }
  };

  //########################################## Balcony

  const activateKeyForBalcony = (item: any, key: string) => {
    const shallowCopy = [...propertyBalcony];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    setPropertyDetails({ ...propertyDetails, balconies: item.label });
    setPropertyBalcony(updatedArr);
  };

  //####################################### Bathrooms

  const activateKeyForBathroom = (item: any, key: string) => {
    //console.log(' item val : ', item.value);

    const shallowCopy = [...propertyBathroom];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    setPropertyDetails({ ...propertyDetails, bathrooms: item.label });
    setPropertyBathroom(updatedArr);
  };

  //################################# Coliving type

  const activateKeyForColiving = (item: any, child: any) => {
    const shallowCopy = [...colivingTypes];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    //console.log("value :", item.label);

    setPropertyDetails({
      ...propertyDetails,
      coliving_type: item.label,
    });
    setColivingTypes(updatedArr);
  };

  //############################### occupancy

  const activateColivingTypeOccupance = (item: any, child: any) => {
    const shallowCopy = [...colivingoccupancy];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    setPropertyDetails({ ...propertyDetails, occupancy: item.label });

    setColivingOccupancy(updatedArr);
  };

  //################################ Gender Preference

  const activateKeyForzGender = (item: string) => {
    const shallowCopy = [...genderType];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);

    setGenderType(updatedArr);

    // Filter newFiltered to include only the selected items
    const selectedItems = newFiltered.filter((item: any) => item.active);

    // Extract labels from selected items
    const selectedLabels = selectedItems.map((item: any) => item.label);

    setPropertyDetails({
      ...propertyDetails,
      gender_preference: selectedLabels,
    });
  };

  const activateKeyForzGenderLoading = (activelist: any[]) => {
    if (activelist.length > 0) {
      setGenderType(activelist);
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

  //############################################# Furnishing Status

  const activateKeyForFurnishing = (item: any) => {
    if (item !== null || item !== '') {
      if (item.key === 'furnished' || item.key === 'semi_frunished') {
        setToogleStoredKey(item.key);
        setToogleModalFurnishing(true);
      }

      if (item.key === 'un_furnished') {
        setFurrarr([]);
      }
      //console.log(item.label);

      const shallowCopy = [...propertyFurnishing];
      const updatedArr = activateItemByKey(shallowCopy, item.key);
      console.log(updatedArr);

      setPropertyDetails({
        ...propertyDetails,
        furnishing_status: item.label,
      });
      setPropertyFurninshing(updatedArr);
      setFurnishingStatus(item);
    } else {
      setPropertyDetails({
        ...propertyDetails,
        furnishing_status: '',
      });

      setFurnishingStatus();

      setPropertyFurninshing(propertyFurninshig);
    }
  };

  //#################################################################################################

  const onSubmit = data => {
    let retvalthree = 1;
    setToogleModalFurnishing(false);

    if (iwant === 'Coliving') {
      retvalthree = 1;

      if (
        propertyDetails.bhk === '' &&
        property_sub_type !== 'PG' &&
        property_sub_type !== 'Coliving space' &&
        property_sub_type !== 'Hostel'
      ) {
        retvalthree = 0;

        //const errors = {};
        // errors["bhk_val"] = "Enter Floor number";

        toast.show('Property Listing', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Please Select Property Type Rooms',
          },
          duration: 3000,
        });
      }

      if (propertyDetails.coliving_type === '') {
        retvalthree = 0;

        //const errors = {};
        // errors["coliving_type_val"] = "Enter Floor number";

        toast.show('Property Listing', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Please Select Coliving Type',
          },
          duration: 3000,
        });
      }

      if (propertyDetails.coliving_type === 'Shared_room' && propertyDetails.occupancy === '') {
        retvalthree = 0;

        //const errors = {};
        // errors["occupancy_val"] = "Enter Floor number";

        toast.show('Property Listing', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Please Select Occupancy',
          },
          duration: 3000,
        });
      }

      if (propertyDetails.gender_preference === '' || propertyDetails.gender_preference === null) {
        retvalthree = 0;

        //const errors = {};
        // errors["gender_preference_val"] = "Enter Floor number";
        toast.show('Property Listing', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Please select Gender',
          },
          duration: 3000,
        });
      }
    }

    if (property_type === 'Residential') {
      if (propertyDetails.bhk === '' && transaction_type_new !== 'Bareshell') {
        retvalthree = 0;

        toast.show('Property Listing', {
          type: 'warn_toast',
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
      let post_two = {
        ...propertyDetails,
        furnishing_items: furarr.length > 0 ? furarr : '',
      };

      // console.log('post two ', post_two);

      dispatch(setPropertyStepTwoData(post_two));

      navigation.navigate('POST_PROPERTY_THREE', {
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

      navigation.navigate('POST_PROPERTY_FOUR', {
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
      property_facing: '',

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

      property_area: null,
      property_area_units: Object.keys(propertyareaunits)[0],

      carpet_area: null,
      carpet_area_units: Object.keys(propertyareaunits)[0],

      coliving_type: '',
      occupancy: '',

      undivided_share: null,
      undivided_share_units: Object.keys(propertyareaunits)[0],

      furnishing_status: '',
      furnishing_items: '',

      gender_preference: '',
    });

    setPropertyBhk(propertBhk);
    setToogleModalFurnishing(false);
    setPropertyBalcony(propertBalcony);
    setPropertyBathroom(propertBathroom);
    setPropertyFurninshing(propertyFurninshig);
    setFurrarr([]);
    setColivingTypes(coliving_types);
    setGenderType(propertyGenderType);
    setWashroomDetails(iwant !== 'Coliving' ? types_of_washroom : types_of_washroom_coliving);
    setColivingOccupancy(Coliving_occupance);
    activateKeyForExtrasClear(propertyExtras);
  };

  const gotonext = () => {
    onSubmit(propertyDetails);
    setToogleModalFurnishing(false);
  };

  const gotoprevious = () => {
    navigation.goBack();
    setToogleModalFurnishing(false);
  };

  //################################## UseEffect loading ###############################################################

  // useEffect(() => {
  //   setTimeout(() => {
  //     // const isNotEmpty = obj => Object.keys(data).length > 0;
  //     // console.log('not empty -> ', isNotEmpty);

  //     if (isEmpty(data)) {
  //       setLoad(false);
  //     } else {
  //       setPropertyDetails({
  //         ...propertyDetails,
  //         bhk: data?.bhk || '',
  //         balconies: data?.balconies || '',
  //         bathrooms: data?.bathrooms || '',
  //         borewell: data?.borewell || false,
  //         boundary_fencing: data?.boundary_fencing || false,

  //         carpet_area: String(data?.carpet_area) || '',

  //         carpet_area_units: data?.carpet_area_units || Object.keys(propertyareaunits)[0],

  //         coliving_type: data?.coliving_type || '',

  //         conference_hall_available: data?.conference_hall_available || false,

  //         conference_hall_count: String(data?.conference_hall_count) || '',

  //         corner_property: data?.corner_property || false,
  //         dining_area_available: data?.dining_area_available || false,

  //         floor_no: data?.floor_no || '',

  //         front_facing_road_width: String(data?.front_facing_road_width) || '',

  //         front_facing_road_width_unit: data?.front_facing_road_width_unit || Object.keys(propertyareaunits)[0],

  //         furnishing_status: data?.furnishing_status || '',
  //         furnishing_items: data?.furnishing_items || '',

  //         gender_preference: data?.gender_preference || '',

  //         is_multi_level: data?.is_multi_level || false,

  //         kitchen_area_available: data?.kitchen_area_available || false,

  //         level_count: String(data?.level_count) || '',
  //         occupancy: data?.occupancy || '',
  //         pantry: data?.pantry || false,

  //         pooja_rooms: data?.pooja_rooms || false,

  //         private_cabin_available: data?.private_cabin_available || false,

  //         private_cabin_count: String(data?.private_cabin_count) || '',

  //         property_age: String(data?.property_age) || '',
  //         property_area: String(data?.property_area) || '',
  //         property_area_units: data?.property_area_units || Object.keys(propertyareaunits)[0],

  //         property_facing: data?.property_facing || '',

  //         servant_rooms: data?.servant_rooms || false,

  //         side_facing_road_width: String(data?.side_facing_road_width) || '',
  //         side_facing_road_width_unit: data?.side_facing_road_width_unit || Object.keys(propertyareaunits)[0],

  //         store_rooms: data?.store_rooms || false,
  //         study_rooms: data?.study_rooms || false,

  //         total_floors: String(data?.total_floors) || '',

  //         total_rooms_on_level: String(data?.total_rooms_on_level) || '',

  //         total_units_of_floors: data?.total_units_of_floors || '',
  //         undivided_share: String(data?.undivided_share) || '',

  //         undivided_share_units: data?.undivided_share_units || Object.keys(propertyareaunits)[0],
  //         units_on_floor: data?.units_on_floor || '',
  //         washroom: data?.washroom || '',
  //       });

  //       const occupancy_val = data?.occupancy;
  //       const washroom_val = data?.washroom;
  //       const coliving_type_val = data?.coliving_type;
  //       const balconyval = data?.balconies;
  //       const bhkval = data?.bhk;
  //       const bathroomval = data?.bathrooms;
  //       const furnishing_status = data?.furnishing_status;
  //       const gender_preference_val = data?.gender_preference;

  //       //console.log("occupancy val ", occupancy_val);

  //       //occupancy

  //       const occupancy_ActiveIndex = colivingoccupancy.findIndex(item => item.label === occupancy_val);

  //       if (occupancy_ActiveIndex !== -1) {
  //         activateColivingTypeOccupance(
  //           colivingoccupancy[occupancy_ActiveIndex],
  //           colivingoccupancy[occupancy_ActiveIndex].child
  //         );
  //       }

  //       //washroom

  //       const washroom_ActiveIndex = washroomDetails.findIndex(item => item.key === washroom_val);

  //       if (washroom_ActiveIndex !== -1) {
  //         const shallowCopy = [...washroomDetails];
  //         const updatedArr = activateItemByKey(shallowCopy, washroom_val);
  //         setWashroomDetails(updatedArr);
  //       }

  //       //coliving type

  //       const colivingtype_ActiveIndex = colivingTypes.findIndex(item => item.label === coliving_type_val);
  //       if (colivingtype_ActiveIndex !== -1) {
  //         activateKeyForColiving(
  //           colivingTypes[colivingtype_ActiveIndex],
  //           colivingTypes[colivingtype_ActiveIndex].child
  //         );
  //       }

  //       //balconies

  //       const balconyActiveIndex = propertyBalcony.findIndex(item => item.label === balconyval);

  //       if (balconyActiveIndex !== -1) {
  //         activateKeyForBalcony(propertyBalcony[balconyActiveIndex], propertyBalcony[balconyActiveIndex].child);
  //       }

  //       //bathrooms

  //       const bathroomActiveIndex = propertyBathroom.findIndex(item => item.label === bathroomval);
  //       if (bathroomActiveIndex !== -1) {
  //         activateKeyForBathroom(propertyBathroom[bathroomActiveIndex], propertyBathroom[bathroomActiveIndex].child);
  //       }

  //       //furnishing status

  //       // console.log(' Furnishing status ------->', furnishing_status);

  //       const furnishingActiveIndex = propertyFurnishing.findIndex(item => item.label === furnishing_status);

  //       // console.log(' Furnishing status index------->', furnishingActiveIndex);

  //       if (furnishingActiveIndex !== -1) {
  //         activateKeyForFurnishing(propertyFurnishing[furnishingActiveIndex]);
  //       }

  //       // console.log(' furnishing values ------> ', data?.furnishing_items);

  //       setFurrarr(data?.furnishing_items);

  //       //bhk

  //       const bhkActiveIndex = propertyBhk.findIndex(item => item.label === bhkval);
  //       if (bhkActiveIndex !== -1) {
  //         activateKeyForBhk(propertyBhk[bhkActiveIndex], propertyBhk[bhkActiveIndex].child);
  //       }

  //       // propertyExtra;

  //       let extra_list = [
  //         {
  //           label: 'Pooja Room',
  //           key: 'pooja_room',
  //           active: data?.pooja_rooms,
  //         },
  //         {
  //           label: 'Servant Room',
  //           key: 'servant_room',
  //           active: data?.servant_rooms,
  //         },
  //         {
  //           label: 'Study Room',
  //           key: 'study_room',
  //           active: data?.study_rooms,
  //         },
  //         {
  //           label: 'Store Room',
  //           key: 'store_room',
  //           active: data?.store_rooms,
  //         },
  //       ];

  //       activateKeyForExtrasLoading(extra_list);

  //       //gender preference

  //       let gender_list = [
  //         { key: 'male', label: 'Male', active: false },
  //         { key: 'female', label: 'Female', active: false },
  //         { key: 'other', label: 'Other', active: false },
  //       ];

  //       if (data?.length > 0) {
  //         data?.gender_preference.forEach(element => {
  //           gender_list.forEach(item => {
  //             if (element === item.label) {
  //               item.active = true;
  //             }
  //           });
  //         });
  //       }

  //       activateKeyForzGenderLoading(gender_list);
  //       setToogleModalFurnishing(false);
  //     }

  //     setLoad(false);
  //   }, 800);
  // }, [data]);

  useEffect(() => {
    if (!data) return;

    const {
      property_age = '',
      property_facing = '',

      bhk = '',

      floor_no = '',
      total_floors = null,

      total_units_of_floors = null,
      units_on_floor = null,

      balconies = '',
      bathrooms = '',

      pooja_rooms = false,
      servant_rooms = false,
      study_rooms = false,
      store_rooms = false,

      is_multi_level = false,
      level_count = null,

      total_rooms_on_level = null,

      kitchen_area_available = false,

      dining_area_available = false,

      conference_hall_available = false,
      conference_hall_count = null,

      private_cabin_available = false,
      private_cabin_count = null,

      pantry = false,
      borewell = false,

      washroom = '',

      corner_property = false,

      boundary_fencing = false,
      front_facing_road_width = null,
      side_facing_road_width = null,

      front_facing_road_width_unit = Object.keys(propertyareaunits)[0],
      side_facing_road_width_unit = Object.keys(propertyareaunits)[0],

      property_area = null,
      property_area_units = Object.keys(propertyareaunits)[0],

      carpet_area = null,
      carpet_area_units = Object.keys(propertyareaunits)[0],

      coliving_type = '',
      occupancy = '',

      undivided_share = null,
      undivided_share_units = Object.keys(propertyareaunits)[0],

      furnishing_status = '',
      furnishing_items = '',

      gender_preference = '',
    } = data || {};

    setPropertyDetails(prevDetails => ({
      ...prevDetails,
      property_age,
      property_facing,

      bhk,

      floor_no,
      total_floors,

      total_units_of_floors,
      units_on_floor,

      balconies,
      bathrooms,

      pooja_rooms,
      servant_rooms,
      study_rooms,
      store_rooms,

      is_multi_level,
      level_count,

      total_rooms_on_level,

      kitchen_area_available,

      dining_area_available,

      conference_hall_available,
      conference_hall_count,

      private_cabin_available,
      private_cabin_count,

      pantry,
      borewell,

      washroom,

      corner_property,

      boundary_fencing,
      front_facing_road_width,
      side_facing_road_width,

      front_facing_road_width_unit,
      side_facing_road_width_unit,

      property_area,
      property_area_units,

      carpet_area,
      carpet_area_units,

      coliving_type,
      occupancy,

      undivided_share,
      undivided_share_units,

      furnishing_status,
      furnishing_items: Array.isArray(furnishing_items) && furnishing_items.length > 0 ? furnishing_items : '',

      gender_preference,
    }));

    console.log(' data value --->', data);

    const occupancy_val = data?.occupancy;
    const washroom_val = data?.washroom;
    const coliving_type_val = data?.coliving_type;
    const balconyval = data?.balconies;
    const bhkval = data?.bhk;
    const bathroomval = data?.bathrooms;
    const furnishing_statuss = data?.furnishing_status;
    const gender_preference_val = data?.gender_preference;

    //console.log("occupancy val ", occupancy_val);

    //occupancy

    const occupancy_ActiveIndex = colivingoccupancy.findIndex(item => item.label === occupancy_val);

    if (occupancy_ActiveIndex !== -1) {
      activateColivingTypeOccupance(
        colivingoccupancy[occupancy_ActiveIndex],
        colivingoccupancy[occupancy_ActiveIndex].child
      );
    }

    //washroom

    const washroom_ActiveIndex = washroomDetails.findIndex(item => item.key === washroom_val);

    if (washroom_ActiveIndex !== -1) {
      const shallowCopy = [...washroomDetails];
      const updatedArr = activateItemByKey(shallowCopy, washroom_val);
      setWashroomDetails(updatedArr);
    }

    //coliving type

    const colivingtype_ActiveIndex = colivingTypes.findIndex(item => item.label === coliving_type_val);
    if (colivingtype_ActiveIndex !== -1) {
      activateKeyForColiving(colivingTypes[colivingtype_ActiveIndex], colivingTypes[colivingtype_ActiveIndex].child);
    }

    //balconies

    const balconyActiveIndex = propertyBalcony.findIndex(item => item.label === balconyval);

    if (balconyActiveIndex !== -1) {
      activateKeyForBalcony(propertyBalcony[balconyActiveIndex], propertyBalcony[balconyActiveIndex].child);
    }

    //bathrooms

    const bathroomActiveIndex = propertyBathroom.findIndex(item => item.label === bathroomval);
    if (bathroomActiveIndex !== -1) {
      activateKeyForBathroom(propertyBathroom[bathroomActiveIndex], propertyBathroom[bathroomActiveIndex].child);
    }

    //furnishing status

    // console.log(' Furnishing status ------->', furnishing_status);

    const furnishingActiveIndex = propertyFurnishing.findIndex(item => item.label === furnishing_statuss);

    // console.log(' Furnishing status index------->', furnishingActiveIndex);

    if (furnishingActiveIndex !== -1) {
      activateKeyForFurnishing(propertyFurnishing[furnishingActiveIndex]);
    }

    // console.log(' furnishing values ------> ', data?.furnishing_items);

    setFurrarr(data?.furnishing_items);

    //bhk

    const bhkActiveIndex = propertyBhk.findIndex(item => item.label === bhkval);
    if (bhkActiveIndex !== -1) {
      activateKeyForBhk(propertyBhk[bhkActiveIndex], propertyBhk[bhkActiveIndex].child);
    }

    // propertyExtra;

    let extra_list = [
      {
        label: 'Pooja Room',
        key: 'pooja_room',
        active: data?.pooja_rooms,
      },
      {
        label: 'Servant Room',
        key: 'servant_room',
        active: data?.servant_rooms,
      },
      {
        label: 'Study Room',
        key: 'study_room',
        active: data?.study_rooms,
      },
      {
        label: 'Store Room',
        key: 'store_room',
        active: data?.store_rooms,
      },
    ];

    activateKeyForExtrasLoading(extra_list);

    //gender preference

    let gender_list = [
      { key: 'male', label: 'Male', active: false },
      { key: 'female', label: 'Female', active: false },
      { key: 'other', label: 'Other', active: false },
    ];

    if (data?.length > 0) {
      data?.gender_preference.forEach(element => {
        gender_list.forEach(item => {
          if (element === item.label) {
            item.active = true;
          }
        });
      });
    }

    activateKeyForzGenderLoading(gender_list);
    setToogleModalFurnishing(false);

    setLoad(false);
  }, [data]);

  //#################################################################################################

  const controlConstraints = {
    level_count: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
    property_area: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      pattern: {
        value: /^\d{1,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      required:
        iwant !== 'Coliving' && (propertyDetails.property_area === '' || propertyDetails.property_area === null),
    },
    carpet_area: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      // validate: isCarpetAreaValid,
      pattern: {
        value: /^\d{1,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
      validate: {
        isCarpetAreaValid: value => {
          // Convert the value to a number to ensure numerical comparison
          const numericValue = Number(value);
          // Check if the value is a valid number
          if (isNaN(numericValue)) {
            return 'Invalid number';
          }
          // Validate against property area
          return numericValue <= propertyDetails.property_area || 'Carpet area cannot exceed property area';
        },
      },
    },
    undivided_share: {
      maxLength: { value: 10, message: 'Maximum length of 10 integer exceeded' },
      // validate: isCarpetAreaValid,
      pattern: {
        value: /^\d{1,10}$/,
        message: 'Invalid number (maximum be 10 digits)',
      },
    },
    total_units_of_floors: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
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
    units_on_floor: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
    conference_hall_count: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
    private_cabin_count: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
    total_rooms_on_level: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
    },
    total_floors: {
      maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
      pattern: {
        value: /^\d{1,5}$/,
        message: 'Invalid number (maximum be 5 digits)',
      },
      required:
        ((property_sub_type === 'Hospitality' &&
          // iwant === "Sell" &&
          transaction_type_new !== 'Bareshell') ||
          (property_sub_type === 'Industrial' && property_type !== 'Land or Plot') ||
          property_sub_type === 'Office_Space' ||
          property_sub_type === 'Shop_And_Retail' ||
          property_sub_type === 'Educational' ||
          (property_type === 'Residential' &&
            property_sub_type !== 'Villa' &&
            property_sub_type !== 'Independent House' &&
            property_sub_type !== 'Farm House' &&
            property_sub_type !== 'Guest House' &&
            property_type !== 'Land or Plot') ||
          (iwant === 'Coliving' && property_sub_type !== 'Villa' && property_sub_type !== 'Independent House')) &&
        (propertyDetails.total_floors === null || propertyDetails.total_floors === '')
          ? 'Total floor required'
          : false,
    },
    floor_no: {
      required:
        ((property_sub_type === 'Hospitality' &&
          // iwant === "Sell" &&
          transaction_type_new !== 'Bareshell') ||
          (property_sub_type === 'Industrial' && property_type !== 'Land or Plot') ||
          property_sub_type === 'Office_Space' ||
          property_sub_type === 'Shop_And_Retail' ||
          property_sub_type === 'Educational' ||
          (property_type === 'Residential' &&
            property_sub_type !== 'Villa' &&
            property_sub_type !== 'Independent House' &&
            property_sub_type !== 'Farm House' &&
            property_sub_type !== 'Guest House' &&
            property_type !== 'Land or Plot') ||
          (iwant === 'Coliving' && property_sub_type !== 'Villa' && property_sub_type !== 'Independent House')) &&
        propertyDetails.floor_no === ''
          ? 'Floor Number is required'
          : false,
    },
    property_facing: {
      required: iwant !== 'Coliving' && propertyDetails?.property_facing === '' ? 'Property Face is required' : false,
    },
    property_age: {
      required: iwant !== 'Coliving' && propertyDetails?.property_age === '' ? 'Property Facing is required' : false,
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
        label="Listing Property"
      />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
            <PropertyRooms
              control={control}
              controlConstraints={controlConstraints}
              data={propertyBhk}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForBhk}
            />

            <PropertyExtra
              control={control}
              controlConstraints={controlConstraints}
              data={propertyExtra}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForExtras}
            />

            <PropertyColivingType
              control={control}
              controlConstraints={controlConstraints}
              data={colivingTypes}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForColiving}
            />

            <PropertyColivingOccupancy
              control={control}
              controlConstraints={controlConstraints}
              data={colivingoccupancy}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateColivingTypeOccupance}
            />

            <PropertyColivingGenderPreference
              control={control}
              controlConstraints={controlConstraints}
              data={genderType}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForzGender}
            />

            <PropertyBalconies
              control={control}
              controlConstraints={controlConstraints}
              data={propertyBalcony}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForBalcony}
            />

            <PropertyBathrooms
              control={control}
              controlConstraints={controlConstraints}
              data={propertyBathroom}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForBathroom}
            />

            <PropertyLevelCount
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            {/* //#################### Property Area ####################### */}

            <PropertyArea
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              clearErrors={clearErrors}
            />

            {/* //###################### Corner Property ########################## */}

            <PropertyCorner
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            <PropertyTotalUnits
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            <PropertyRoomCount
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            {/* //##################### Property Floor No ######################### */}

            <PropertyFloorNo
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              clearErrors={clearErrors}
            />

            {/* //################################################################## */}
            <PropertyKitchenDinningArea
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            {/* //########################### Property Facing ########################################## */}

            <PropertyFacing
              control={control}
              controlConstraints={controlConstraints}
              checkingData={route?.params?.post1}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              clearErrors={clearErrors}
            />

            {/* //########################### Property Age ########################################## */}

            <PropertyAge
              control={control}
              controlConstraints={controlConstraints}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              checkingData={route?.params?.post1}
              errors={errors}
              clearErrors={clearErrors}
            />

            {/* //################################## Washroom ################################################## */}

            <PropertyWashrooms
              control={control}
              controlConstraints={controlConstraints}
              data={washroomDetails}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForWashroomDetails}
            />

            {/* //################################## Furnishing Status ######################################## */}

            <PropertyFurnishing
              control={control}
              controlConstraints={controlConstraints}
              data={propertyFurnishing}
              details={propertyDetails}
              checkingData={route?.params?.post1}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForFurnishing}
            />

            {furnishingStatus && furnishingStatus !== 'Unfurnished' && (
              <PropertyDetailsSection
                data={furarr}
                activefunction={activateKeyForFurnishing}
                furnishingStatus={furnishingStatus}
              />
            )}
          </ScrollView>

          <PropertyFurnishingStatusModel
            // data={furnishingItemsList}
            // setFurnishingItemsList={setFurnishingItemsList}
            showModal={ToogleModalFurnishing}
            setVal={setFurrarr}
            setShowModal={setToogleModalFurnishing}
            placeholder={propertyDetails.furnishing_status}
            onPressItem={activateKeyForFurnishing}
            activateKeyForFurnishing={activateKeyForFurnishing}
            details={propertyDetails}
            setDetails={setPropertyDetails}
          />

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

export default PostPropertyStepTwo;
