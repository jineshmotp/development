import React, { useEffect, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Keyboard, Modal, Pressable } from 'react-native';
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BusinessClearAlert from '@/components/Business/BusinessClearAlert';
import BusinessHeaderGreen from '@/components/Business/BusinessHeaderGreen';
import BusinessPhotoMedia from '@/components/Business/BusinessPhotoMedia';
import BusinessVideoMedia from '@/components/Business/BusinessVideoMedia';
import IncrementDecrementInput from '@/components/Business/IncrementDecrementInput';
import HeaderBar from '@/components/common/HeaderBar';
import InputChips from '@/components/common/InputChips';
import Loader from '@/components/common/Loader';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import {
  Aminities_list,
  eventspace_subtype_list,
  eventspace_type_allowded_list,
} from '@/constants/function/business.helper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import useLocation from '@/custom/Location';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  clearEventSpaceStepOne,
  clearEventSpaceStepThree,
  clearEventSpaceStepTwo,
  clearExclusiveServiceStepOne,
  clearExclusiveServiceStepTwo,
  selectEventSpaceStepOne,
  setEventSpaceStepOne,
} from '@/redux/business/businessReducer';
import { selectPropertyLocationData } from '@/redux/listing/listingReducer';
import { usePropertyDescriptionMutation } from '@/redux/listing/listingService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { businessstyles } from '../../businessstyles';

const EventSpaceStepOne = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { latitude, longitude } = useLocation();

  const route = useRoute<RouteProp<RootStackParamList, 'EVENT_SPACE_STEPONE'>>();

  // console.log(' data --->', route?.params?.businessdata);

  const [eventSpaceName, setEventSpaceName] = useState('');
  const [businessTypeAll, setBusinessTypeAll] = useState(eventspace_subtype_list);
  const [businessTypeEdit, setBusinessTypeEdit] = useState([]);

  const [seatcapacity, SetSeatcapacity] = useState(0);
  const [floatcapacity, SetFloatcapacity] = useState(0);

  const [eventTypeAllowdedAll, setEventTypeAllowdedAll] = useState(eventspace_type_allowded_list);
  const [eventTypeEdit, setEventTypeEdit] = useState([]);
  const [eventTypeAllowded, setEventTypeAllowded] = useState('');

  const [aminitiesDetails, SetAminitiesDetails] = useState(Aminities_list);
  const [eventSpaceAminities, setEventSpaceAminities] = useState([]);
  const [eventSpaceAminitiesEdit, setEventSpaceAminitiesEdit] = useState([]);
  const [eventSpaceDescription, seteventSpaceDescription] = useState('');

  const [address, setAddress] = useState('');

  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [locality, setLocality] = useState('');

  const [submitLoader, setSubmitLoader] = useState(false);

  const [loaderAIDes, setLoaderAIDes] = useState(false);

  const [loademain, setMainLoader] = useState(true);

  const locationdata = useAppSelector(selectPropertyLocationData);

  const [uploadDescriptionMutation] = usePropertyDescriptionMutation({});

  const [loader, setLoader] = useState(true);

  const [showSubCategoryType, setShowSubCategoryType] = useState(false);

  const [showEventType, setShowEventType] = useState(false);

  const [selectedSubCategoryList, setSelectedSubCategoryList] = useState([]);
  const [selectedEventTypeList, setSelectedEventTypeList] = useState([]);

  const [showBusinessCancel, setShowBusinessCancel] = useState(false);

  //########### image and video

  const [Photos, setPhotos] = useState([]);
  const [Videos, setVideos] = useState([]);

  const eventSpaceOne = useAppSelector(selectEventSpaceStepOne);

  const [selectedRegion, setSelectedRegion] = useState({
    latitude: latitude ? latitude : 17.447,
    longitude: longitude ? longitude : 78.354,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  type coords = {
    latitude: number;
    longitude: number;
  };

  const [coordinates, setCoordinates] = useState<coords>({
    latitude: latitude ? latitude : 17.447340964470474,
    longitude: longitude ? longitude : 78.3539102379411,
  });
  // console.log('coordinates ======>', coordinates);

  const mapRef = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();

  //##################### Control Constrain

  // Define the control constraints
  const controlConstraints = {
    eventSpaceName: {
      required: 'Event Space Name is required',
      pattern: {
        value: /^[A-Za-z][A-Za-z ]*$/, // Ensure it starts with a letter and allows letters and spaces only
        message: 'Event Space Name should only contain letters and spaces, and must start with a letter',
      },
      validate: value => {
        if (value.trim().length === 0) {
          return 'Event Space Name cannot be empty';
        }
        if (/^[\s\d]/.test(value)) {
          // Check if the value starts with a space or digit
          return 'Event Space Name cannot start with a space or number';
        }
        if (/[^A-Za-z\s]/.test(value)) {
          // Ensure no special characters are present
          return 'Event Space Name should only contain letters and spaces';
        }
        return true;
      },
    },

    businessType: {
      required: 'Business Type is required',
      validate: value => (value && value.length > 0) || 'Business Type is required',
    },

    seatcapacity: {
      required: 'Seating Capacity is required',
      pattern: {
        value: /^[1-9]\d*$/, // Ensure it's a positive integer
        message: 'Seating Capacity must be a positive integer and cannot contain special characters',
      },
      validate: value => {
        if (value.trim().length === 0) {
          return 'Seating Capacity cannot be empty';
        }
        if (/^\s/.test(value)) {
          return 'Seating Capacity cannot start with a space';
        }
        return true;
      },
    },

    floatcapacity: {
      required: 'Floating Capacity is required',
      pattern: {
        value: /^[1-9]\d*$/, // Ensure it's a positive integer
        message: 'Floating Capacity must be a positive integer and cannot contain special characters',
      },
      validate: value => {
        if (value.trim().length === 0) {
          return 'Floating Capacity cannot be empty';
        }
        if (/^\s/.test(value)) {
          return 'Floating Capacity cannot start with a space';
        }
        return true;
      },
    },
    eventSpaceDescription: { required: 'Event Description is required' },
    address: {
      required: 'Address is required',
    },

    city: {
      required: 'City is required',
      pattern: {
        value: /^[^\s][A-Za-z\s]*$/, // No leading space, only letters and spaces
        message: 'City must not start with a space or special character and can only contain letters and spaces',
      },
    },

    state: {
      required: 'State is required',
      pattern: {
        value: /^[^\s][A-Za-z\s]*$/, // No leading space, only letters and spaces
        message: 'State must not start with a space or special character and can only contain letters and spaces',
      },
    },
    pincode: {
      required: 'Pincode is required',
      pattern: {
        value: /^[1-9][0-9]{5}$/, // Ensure it is exactly 6 digits and does not start with 0
        message: 'Pincode must be exactly 6 digits and cannot start with 0',
      },
      validate: value => {
        const trimmedValue = value.trim();
        if (trimmedValue.length === 0) {
          return 'Pincode cannot be empty';
        }
        if (!/^[1-9][0-9]{5}$/.test(trimmedValue)) {
          return 'Pincode must be a valid 6-digit number and cannot start with 0';
        }
        return true;
      },
    },
  };

  const { field: eventSpaceNameField } = useController({
    name: 'eventSpaceName',
    control,
    defaultValue: '',
    rules: controlConstraints.eventSpaceName,
  });

  const { field: businessTypeField } = useController({
    name: 'businessType',
    control,
    defaultValue: '',
    rules: controlConstraints.businessType,
  });

  const { field: seatcapacityField } = useController({
    name: 'seatcapacity',
    control,
    defaultValue: '',
    rules: controlConstraints.seatcapacity,
  });

  const { field: floatcapacityField } = useController({
    name: 'floatcapacity',
    control,
    defaultValue: '',
    rules: controlConstraints.floatcapacity,
  });

  const { field: eventSpaceDescriptionField } = useController({
    name: 'eventSpaceDescription',
    control,
    defaultValue: '',
    rules: controlConstraints.eventSpaceDescription,
  });

  const { field: addressField } = useController({
    name: 'address',
    control,
    defaultValue: '',
    rules: controlConstraints.address,
  });

  const { field: cityField } = useController({
    name: 'city',
    control,
    defaultValue: '',
    rules: controlConstraints.city,
  });

  const { field: stateField } = useController({
    name: 'state',
    control,
    defaultValue: '',
    rules: controlConstraints.state,
  });

  const { field: pincodeField } = useController({
    name: 'pincode',
    control,
    defaultValue: '',
    rules: controlConstraints.pincode,
  });

  //############################################################################

  const gotoMap = () => {
    navigation.navigate('PROPERTY_LOCATION_SCREEN', {
      locationdata: {
        initialRegionData: {
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        completeAddress: '',
      },
    });
  };

  useEffect(() => {
    if (route?.params?.businessdata) {
      const initialList = route?.params?.businessdata?.sub_category || [];

      // console.log(' subcategory --->', initialList);

      const subtype_list = initialList.map(item => ({
        isActive: false,
        label: item,
      }));
      setBusinessTypeAll(subtype_list);
      setMainLoader(false);
      // console.log('Updated subtype_list:', subtype_list);
    }
  }, [route?.params?.businessdata?.sub_category]);

  useEffect(() => {
    console.log(' event space Photod..');
  }, [Photos]);

  useEffect(() => {
    console.log(' event space Photod..');
  }, [Videos]);

  useEffect(() => {
    setLoader(false);

    setCity(route?.params?.businessdata?.city);
    cityField.onChange(route?.params?.businessdata?.city);
    setPincode(route?.params?.businessdata?.pincode);
    pincodeField.onChange(route?.params?.businessdata?.pincode);
    setState(route?.params?.businessdata?.state);
    stateField.onChange(route?.params?.businessdata?.state);

    setAddress(route?.params?.businessdata?.locality);
    addressField.onChange(route?.params?.businessdata?.locality);

    setSelectedRegion({
      ...selectedRegion,
      latitude: route?.params?.businessdata?.location?.coordinates[0],
      longitude: route?.params?.businessdata?.location?.coordinates[1],
    });

    setCoordinates({
      ...coordinates,
      latitude: route?.params?.businessdata?.location?.coordinates[0],
      longitude: route?.params?.businessdata?.location?.coordinates[1],
    });
  }, [route?.params?.businessdata]);

  useEffect(() => {
    if (eventSpaceOne && Object.keys(eventSpaceOne).length === 0) {
      console.log('The object is empty');
    } else {
      console.log('The object is not empty');

      // console.log(JSON.stringify(eventSpaceOne));

      setEventSpaceName(eventSpaceOne?.name);
      eventSpaceNameField.onChange(eventSpaceOne?.name);

      setBusinessTypeEdit(eventSpaceOne?.sub_category);
      setEventTypeEdit(eventSpaceOne?.event_type);
      setEventSpaceAminitiesEdit(eventSpaceOne?.aminities);

      const imageArray = [];
      const videoArray = [];

      eventSpaceOne?.gallery.forEach(item => {
        const fileExtension = item.url.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          imageArray.push(item);
        } else if (['mp4', 'mov', 'avi', 'mkv'].includes(fileExtension)) {
          videoArray.push(item);
        }
      });

      setPhotos(imageArray);
      setVideos(videoArray);

      setCoordinates({
        ...coordinates,
        latitude: eventSpaceOne?.location?.coordinates[0],
        longitude: eventSpaceOne?.location?.coordinates[1],
      });

      seteventSpaceDescription(eventSpaceOne?.about);
      eventSpaceDescriptionField.onChange(eventSpaceOne?.about);

      SetSeatcapacity(parseInt(eventSpaceOne?.seating_capacity, 10));
      seatcapacityField.onChange(eventSpaceOne?.seating_capacity.toString());

      SetFloatcapacity(parseInt(eventSpaceOne?.floating_capacity, 10));
      floatcapacityField.onChange(eventSpaceOne?.floating_capacity.toString());

      setAddress(eventSpaceOne?.address);
      addressField.onChange(eventSpaceOne?.address);
      setCity(eventSpaceOne?.city);
      cityField.onChange(eventSpaceOne?.city);
      setPincode(eventSpaceOne?.pincode);
      pincodeField.onChange(eventSpaceOne?.pincode);
      setState(eventSpaceOne?.state);
      stateField.onChange(eventSpaceOne?.state);
    }
  }, [eventSpaceOne]);

  useEffect(() => {
    // console.log(' location data --->', locationdata);

    if (locationdata?.location[0] !== '') {
      setLoader(true);
      setCity(locationdata?.city);
      setPincode(locationdata?.pincode);
      setState(locationdata.state);
      setLocality(locationdata.locality);
      setAddress(locationdata.formatedAddr);
    }
  }, [locationdata]);

  useEffect(() => {
    const updatedList = businessTypeAll
      .map(item => (businessTypeEdit.includes(item.label) ? { ...item, isActive: true } : null))
      .filter(item => item !== null);

    setSelectedSubCategoryList(updatedList);
    businessTypeField.onChange(updatedList);
  }, [businessTypeEdit]);

  useEffect(() => {
    // console.log(' event type-->', eventTypeEdit);

    const updatedList = eventTypeAllowdedAll
      .map(item => (eventTypeEdit.includes(item.label) ? { ...item, isActive: true } : null))
      .filter(item => item !== null);

    // console.log(' business event type===>', updatedList);

    setSelectedEventTypeList(updatedList);
  }, [eventTypeEdit]);

  useEffect(() => {
    const updatedList = aminitiesDetails.map(item =>
      eventSpaceAminitiesEdit.includes(item.label) ? { ...item, isActive: true } : item
    );

    SetAminitiesDetails(updatedList);
    // setEventTypeEdit;
  }, [eventSpaceAminitiesEdit]);

  const handleSubmitClear = () => {
    // console.log(' clear from listing--->');
    setShowBusinessCancel(true);
  };

  const handleAlertOK = () => {
    let profiledata = {
      _id: route?.params?.businessdata?._id,
      business_name: route?.params?.businessdata?.business_name,
      profile_pic: route?.params?.businessdata?.profile_pic,
    };

    dispatch(clearEventSpaceStepOne());
    dispatch(clearEventSpaceStepTwo());
    dispatch(clearEventSpaceStepThree());

    setShowBusinessCancel(false);

    navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
      profiledata: profiledata,
    });
  };

  const onSubmit = data => {
    if (Photos.length < 2) {
      toast.show('Business Listing', {
        type: 'error_toast',
        animationDuration: 100,
        data: {
          title: 'Atleast Two images required in Gallery !',
        },
        duration: 3000,
      });
    } else {
      const mergedArray = [...Photos, ...Videos];

      const SubCategoryArray = selectedSubCategoryList.map(item => item.label);

      setSubmitLoader(false);

      let post_one = {
        _id: route?.params?.businessdata?._id,
        business_name: route?.params?.businessdata?.business_name,
        profile_pic: route?.params?.businessdata?.profile_pic,
        business_id: route?.params?.businessdata?._id,

        business_owner: route?.params?.businessdata?.business_owner,
        name: eventSpaceName,
        category: 'Event Space',
        sub_category: SubCategoryArray ? SubCategoryArray : '',
        event_type: eventTypeAllowded ? eventTypeAllowded : '',
        seating_capacity: seatcapacity,
        floating_capacity: floatcapacity,
        aminities: eventSpaceAminities ? eventSpaceAminities : '',
        about: eventSpaceDescription,
        gallery: mergedArray ? mergedArray : '',
        location: { coordinates: [coordinates.latitude, coordinates.longitude] },
        address: address,
        landmark: landmark,
        city: city,
        state: state,
        pincode: pincode,
      };

      dispatch(setEventSpaceStepOne(post_one));

      navigation.navigate('EVENT_SPACE_STEPTWO');
    }
  };

  const handleSubCategoryFocus = () => {
    Keyboard.dismiss();
    if (!showSubCategoryType) {
      setShowSubCategoryType(true);
    }
  };

  const handleEventTypeFocus = () => {
    Keyboard.dismiss();
    if (!showEventType) {
      setShowEventType(true);
    }
  };

  const handleSubCategoryTypeSelect = businessCategory => {
    console.log('Selected item:', businessCategory);

    setSelectedSubCategoryList(() => {
      let updatedList = [businessCategory]; // Only keep the newly selected item

      const labelArray = updatedList.map(item => item.label);

      businessTypeField.onChange(labelArray); // Update the field with the new selection

      return updatedList;
    });

    setShowSubCategoryType(false);

    Keyboard.dismiss();
  };

  const handleSubCategoryTypeSelectLoading = businessCategory => {
    setSelectedSubCategoryList(prevList => {
      let updatedList;

      if (prevList.some(item => item.label === businessCategory.label)) {
        updatedList = prevList.filter(item => item.label !== businessCategory.label);
      } else {
        updatedList = [...prevList, businessCategory];
      }

      const labelArray = updatedList.map(item => item.label);

      businessTypeField.onChange(labelArray);

      return updatedList;
    });

    Keyboard.dismiss();
  };

  const handleEventTypeSelect = eventType => {
    // console.log('Selected item:', eventType);

    setSelectedEventTypeList(prevList => {
      let updatedList;

      if (prevList.some(item => item.label === eventType.label)) {
        updatedList = prevList.filter(item => item.label !== eventType.label);
      } else {
        updatedList = [...prevList, eventType];
      }

      const labelArray = updatedList.map(item => item.label);

      setEventTypeAllowded(labelArray);

      return updatedList;
    });

    Keyboard.dismiss();
  };

  const handleCategoryPress = (item: any) => {
    const updatedArr = aminitiesDetails.map(amenity =>
      amenity.key === item.key ? { ...amenity, isActive: !amenity.isActive } : amenity
    );

    SetAminitiesDetails(updatedArr);

    const newFiltered = updatedArr.filter((item: any) => item.isActive === true);

    const selectedLabels = newFiltered.map(item => item.label);

    setEventSpaceAminities(selectedLabels);
  };

  const handleSubCategoryCloseModal = () => {
    setShowSubCategoryType(false);
  };

  const handleEventTypeCloseModal = () => {
    setShowEventType(false);
  };

  const autogenerateDescription = () => {
    // console.log(' click description');
    setLoaderAIDes(true);

    const payloadvalue = `use this template
         {business_name}
    {category}
      {sub_category}
      {locality}
      {city}

        from below keys
        dont respond with heading/ subheading
        Avoid adding owner details to the description
         generate within 100 words

        { ${JSON.stringify(route?.params?.businessdata)} }`;

    // console.log(' response ', payloadvalue);

    uploadDescriptionMutation({
      description: payloadvalue,
    }).then(response => {
      // console.log(' response in description--->', response?.data?.data?.content);
      seteventSpaceDescription(response?.data?.data?.content);
      eventSpaceDescriptionField.onChange(response?.data?.data?.content);
      setLoaderAIDes(false);
    });
  };

  const inncreaseQuantity = (i: number) => {
    if (i === 0) {
      let seatno = parseInt(seatcapacity, 10) + 1;
      let str = seatno.toString();
      SetSeatcapacity(seatno);
      seatcapacityField.onChange(str);
      clearErrors('seatcapacity');
    } else {
      let floatno = parseInt(floatcapacity, 10) + 1;
      let str = floatno.toString();
      SetFloatcapacity(floatno);
      floatcapacityField.onChange(str);
      clearErrors('floatcapacity');
    }
  };

  const decreaseQuantity = (i: number) => {
    // console.log(' decrease quantity');

    if (i === 0) {
      let seatno = 0;
      if (seatcapacity >= 1) {
        seatno = parseInt(seatcapacity, 10) - 1;
      }
      SetSeatcapacity(seatno);
      let str = seatno.toString();
      seatcapacityField.onChange(str);
      clearErrors('seatcapacity');
    } else {
      let floatno = 0;
      if (floatcapacity >= 1) {
        floatno = parseInt(floatcapacity, 10) - 1;
      }
      SetFloatcapacity(floatno);
      let str = floatno.toString();
      floatcapacityField.onChange(str);
      clearErrors('floatcapacity');
    }
  };

  if (loademain) {
    return <Loader />;
  }

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
            pageno={1}
            totalstepno="3"
            stepheading="Basic Details"
          />

          <RNView style={[businessstyles.formContainer, { marginTop: px(8) }]}>
            <RNText style={businessstyles.businessText}>Business Details</RNText>
            <RNView style={businessstyles.transparentContainer}>
              <RNText style={businessstyles.labelText}>
                Event space Name <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>

              <CommonInput
                placeholder="Enter Event Space Name"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={30}
                outlineStyle={[
                  businessstyles.outlineBorderStyle,
                  errors.eventSpaceName ? { borderColor: ColorTheme.red } : {},
                ]}
                value={eventSpaceNameField?.value}
                onChangeText={(e: string) => {
                  setEventSpaceName(e);
                  eventSpaceNameField.onChange(e);
                }}
              />

              {errors.eventSpaceName && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.eventSpaceName?.message}
                />
              )}

              <RNText style={businessstyles.labelText}>
                Business Type <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>

              <CommonInput
                placeholder="Business Type"
                keyboardType="Business Type"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={50}
                onFocus={handleSubCategoryFocus}
                outlineStyle={[
                  businessstyles.outlineBorderStyle,
                  errors.businessType ? { borderColor: ColorTheme.red } : {},
                ]}
              />

              {errors.businessType && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.businessType?.message}
                />
              )}

              <RNView style={businessstyles.selectionChipsView}>
                {selectedSubCategoryList?.map((item, ind) => {
                  return (
                    <InputChips
                      style={businessstyles.selectionChipsStyle}
                      key={ind}
                      item={item}
                      onPress={itm => {
                        handleSubCategoryTypeSelect(item);
                      }}
                    />
                  );
                })}
              </RNView>

              <RNView style={businessstyles.seperationView}>
                <RNView style={businessstyles.scrollContainerLeft}>
                  <RNText style={businessstyles.labelText}>Seating Capacity</RNText>

                  <IncrementDecrementInput
                    quantity={seatcapacity}
                    decreaseQuantity={decreaseQuantity}
                    inncreaseQuantity={inncreaseQuantity}
                    errorStyle={errors.seatcapacity ? { borderColor: ColorTheme.red } : { borderColor: '#D8D8D8' }}
                    positionvalue={0}
                    gotonumval={data => {
                      SetSeatcapacity(data);
                      seatcapacityField.onChange(data);
                    }}
                  />
                </RNView>

                <RNView style={businessstyles.scrollContainerRight}>
                  <RNText style={[businessstyles.labelText, { justifyContent: 'flex-start' }]}>
                    Floating Capacity
                  </RNText>

                  <IncrementDecrementInput
                    quantity={floatcapacity}
                    decreaseQuantity={decreaseQuantity}
                    inncreaseQuantity={inncreaseQuantity}
                    errorStyle={errors.floatcapacity ? { borderColor: ColorTheme.red } : { borderColor: '#D8D8D8' }}
                    positionvalue={1}
                    gotonumval={data => {
                      SetFloatcapacity(data);
                      floatcapacityField.onChange(data);
                    }}
                  />
                </RNView>
              </RNView>

              {errors.seatcapacity ? (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.seatcapacity?.message}
                />
              ) : errors.floatcapacity ? (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.floatcapacity?.message}
                />
              ) : null}

              <RNText style={businessstyles.labelText}>Event types allowed</RNText>

              <CommonInput
                placeholder="Event types allowed"
                keyboardType="Event types allowed"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={50}
                onFocus={handleEventTypeFocus}
                outlineStyle={businessstyles.outlineBorderStyle}
              />

              <RNView style={businessstyles.selectionChipsView}>
                {selectedEventTypeList?.map((item, ind) => {
                  return (
                    <InputChips
                      style={businessstyles.selectionChipsStyle}
                      key={ind}
                      item={item}
                      onPress={itm => {
                        handleEventTypeSelect(item);
                      }}
                    />
                  );
                })}
              </RNView>
            </RNView>

            <RNText style={businessstyles.businessText}>Amenities</RNText>
            <RNView style={businessstyles.transparentContainer}>
              {Array.from({ length: 3 }, (_, rowIndex) => (
                <RNView key={rowIndex} style={businessstyles.rowContainer}>
                  {aminitiesDetails.slice(rowIndex * 3, rowIndex * 3 + 3).map(item => (
                    <TouchableOpacity
                      key={item?.key}
                      style={[businessstyles.touchableContainer, item.isActive && businessstyles.selectedCategory]}
                      onPress={() => handleCategoryPress(item)}>
                      <RNText
                        style={[businessstyles.touchableButtonText, item.isActive && businessstyles.selectedText]}>
                        {item?.label}
                      </RNText>
                    </TouchableOpacity>
                  ))}
                </RNView>
              ))}
            </RNView>

            <RNText style={businessstyles.businessText}>
              Description <RNText style={businessstyles.labelTextMandatory}>*</RNText>
            </RNText>

            <CommonInput
              placeholder="Enter description"
              placeholderColor={ColorTheme.gray2}
              style={[businessstyles.inputStyle, { minHeight: px(150), padding: px(10) }]}
              multiline={true}
              // contentStyle={{ textTransform: 'uppercase' }}
              outlineStyle={[
                businessstyles.outlineBorderStyle,
                errors.eventSpaceDescription ? { borderColor: ColorTheme.red } : {},
              ]}
              value={eventSpaceDescriptionField.value}
              onChangeText={(e: string) => {
                seteventSpaceDescription(e);
                eventSpaceDescriptionField.onChange(e);
              }}
              generateAIButton={true}
              autogenerateDescription={autogenerateDescription}
              loader={loaderAIDes}
            />

            {errors.eventSpaceDescription && (
              <PropertyInputErrorComponent
                styledata={{
                  color: ColorTheme.red,
                  paddingLeft: px(20),
                }}
                errordata={errors.eventSpaceDescription?.message}
              />
            )}

            <RNText style={businessstyles.businessText}>Media</RNText>

            <RNView style={businessstyles.transparentContainer}>
              <BusinessPhotoMedia setItems={setPhotos} Items={Photos} />

              {/* <RNText style={businessstyles.labelText}>Videos</RNText> */}

              <BusinessVideoMedia setItems={setVideos} Items={Videos} />
            </RNView>

            <RNText style={businessstyles.businessText}>
              Location Details <RNText style={businessstyles.labelTextMandatory}>*</RNText>
            </RNText>
            <RNView style={[businessstyles.transparentContainer, { paddingTop: 0 }]}>
              <RNView style={businessstyles.mapView}>
                {loader ? (
                  <RNView
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                    }}>
                    <ActivityIndicator
                      size={'small'}
                      style={{ color: ColorTheme.onboardingButton, alignSelf: 'center' }}
                    />
                  </RNView>
                ) : (
                  <>
                    <MapView
                      ref={mapRef}
                      provider={PROVIDER_GOOGLE}
                      userInterfaceStyle={'light'}
                      loadingEnabled={true}
                      showsUserLocation={true}
                      zoomControlEnabled={true}
                      moveOnMarkerPress={true}
                      minZoomLevel={20}
                      initialRegion={selectedRegion}
                      style={{ width: '100%', height: '100%' }}
                      onRegionChangeComplete={region => {
                        setSelectedRegion(region);
                      }}>
                      <Marker coordinate={{ latitude: coordinates?.latitude, longitude: coordinates?.longitude }} />
                    </MapView>
                    <RNView style={businessstyles.absoluteView}>
                      <TouchableOpacity style={businessstyles.submitContainer} onPress={gotoMap}>
                        <RNText style={businessstyles.touchableText}>Get Exact Location</RNText>
                      </TouchableOpacity>
                    </RNView>
                  </>
                )}
              </RNView>

              <RNText style={businessstyles.labelText}>
                Address <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>
              <CommonInput
                placeholder="Enter your address here"
                placeholderColor={ColorTheme.gray2}
                outlineStyle={[
                  businessstyles.outlineBorderStyle,
                  errors.address ? { borderColor: ColorTheme.red } : {},
                ]}
                style={[businessstyles.inputStyle, { minHeight: px(70), paddingTop: px(10) }]}
                maxLength={50}
                multiline={true}
                value={addressField.value}
                onChangeText={text => {
                  setAddress(text);
                  addressField.onChange(text);
                }}
              />

              {errors.address && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.address?.message}
                />
              )}

              <RNText style={businessstyles.labelText}>Landmark</RNText>

              <CommonInput
                placeholder="Landmark"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={21}
                outlineStyle={businessstyles.outlineBorderStyle}
                contentStyle={{ textTransform: 'uppercase' }}
                value={landmark}
                onChangeText={text => setLandmark(text)}
              />
              <RNText style={businessstyles.labelText}>
                City <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>
              <CommonInput
                placeholder="City"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={21}
                outlineStyle={[businessstyles.outlineBorderStyle, errors.city ? { borderColor: ColorTheme.red } : {}]}
                value={cityField.value}
                onChangeText={text => {
                  setCity(text);
                  cityField.onChange(text);
                }}
              />

              {errors.city && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.city?.message}
                />
              )}

              <RNText style={businessstyles.labelText}>
                State <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>
              <CommonInput
                placeholder="State"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={21}
                outlineStyle={[businessstyles.outlineBorderStyle, errors.state ? { borderColor: ColorTheme.red } : {}]}
                value={stateField.value}
                onChangeText={text => {
                  setState(text);
                  stateField.onChange(text);
                }}
              />

              {errors.state && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.state?.message}
                />
              )}

              <RNText style={businessstyles.labelText}>
                Pincode <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>
              <CommonInput
                placeholder="Pincode"
                keyboardType={'number-pad'}
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={6}
                outlineStyle={[
                  businessstyles.outlineBorderStyle,
                  errors.pincode ? { borderColor: ColorTheme.red } : {},
                ]}
                value={pincodeField.value}
                onChangeText={text => {
                  setPincode(text);
                  pincodeField.onChange(text);
                }}
              />

              {errors.pincode && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.pincode?.message}
                />
              )}
            </RNView>

            <Modal
              visible={showSubCategoryType}
              transparent={true}
              animationType="fade"
              onRequestClose={handleSubCategoryCloseModal}>
              <Pressable style={businessstyles.modalBackground} onPress={handleSubCategoryCloseModal}>
                <RNView style={businessstyles.modalContainer}>
                  <FlatList
                    data={businessTypeAll}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleSubCategoryTypeSelect(item)}>
                        <RNText
                          style={[
                            businessstyles.renderText,
                            selectedSubCategoryList.includes(item) && businessstyles.selectedTextModal,
                          ]}>
                          {item?.label}
                        </RNText>
                      </TouchableOpacity>
                    )}
                  />
                </RNView>
              </Pressable>
            </Modal>

            <Modal
              visible={showEventType}
              transparent={true}
              animationType="fade"
              onRequestClose={handleEventTypeCloseModal}>
              <Pressable style={businessstyles.modalBackground} onPress={handleEventTypeCloseModal}>
                <RNView style={businessstyles.modalContainer}>
                  <FlatList
                    data={eventTypeAllowdedAll}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleEventTypeSelect(item)}>
                        <RNText
                          style={[
                            businessstyles.renderText,
                            selectedEventTypeList.includes(item) && businessstyles.selectedTextModal,
                          ]}>
                          {item?.label}
                        </RNText>
                      </TouchableOpacity>
                    )}
                  />
                </RNView>
              </Pressable>
            </Modal>

            <BusinessClearAlert
              showBusinessCancel={showBusinessCancel}
              setShowBusinessCancel={setShowBusinessCancel}
              title={'Business Listing'}
              subtitle={'Do you want to exit from Listing ?'}
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

export default EventSpaceStepOne;
