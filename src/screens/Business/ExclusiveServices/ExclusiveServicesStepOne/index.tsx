import React, { useEffect, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Keyboard, Modal, Pressable } from 'react-native';
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useToast } from 'react-native-toast-notifications';
import Feather from 'react-native-vector-icons/Feather';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BusinessClearAlert from '@/components/Business/BusinessClearAlert';
import BusinessPhotoMedia from '@/components/Business/BusinessPhotoMedia';
import BusinessVideoMedia from '@/components/Business/BusinessVideoMedia';
import DocumentBoxComponent from '@/components/Business/DocumentBoxComponent';
import MediaBoxComponent from '@/components/Business/MediaBoxComponent';
import ServicesHeaderGreen from '@/components/Business/ServicesHeaderGreen';
import HeaderBar from '@/components/common/HeaderBar';
import InputChips from '@/components/common/InputChips';
import Loader from '@/components/common/Loader';
import PropertyImageVideoSheet from '@/components/common/PropertyImageVideoSheet';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import { exclusive_category_list } from '@/constants/function/business.helper';
import { imagevideoextention } from '@/constants/function/property.helper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import useLocation from '@/custom/Location';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  clearExclusiveServiceStepOne,
  clearExclusiveServiceStepTwo,
  selectExclusiveServiceStepOne,
  setExclusiveServiceStepOne,
} from '@/redux/business/businessReducer';
import { selectPropertyLocationData } from '@/redux/listing/listingReducer';
import { usePropertyDescriptionMutation } from '@/redux/listing/listingService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { businessstyles } from '../../businessstyles';

const ExclusiveServicesStepOne = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { latitude, longitude } = useLocation();

  const route = useRoute<RouteProp<RootStackParamList, 'EXCLUSIVE_SERVICES_STEP_ONE'>>();

  const [exclusiveServiceName, setExclusiveServiceName] = useState('');

  const [exclusiveCategoryAll, SetExclusiveCategoryAll] = useState(exclusive_category_list);

  const [exclusiveCategoryEdit, SetExclusiveCategoryEdit] = useState([]);

  const [BottomImageSheet, setBottomImageSheet] = useState(false);

  const [exclusiveSeviceDescription, setExclusiveSeviceDescription] = useState('');

  // console.log(' category List--->', selectedCategoryList);

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

  const [selectedSubCategoryList, setSelectedSubCategoryList] = useState([]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [uploadItems, setUploadItems] = useState([]);

  const [showBusinessCancel, setShowBusinessCancel] = useState(false);

  //########### image and video

  const [Photos, setPhotos] = useState([]);
  const [Videos, setVideos] = useState([]);

  const exclusiveServiceOne = useAppSelector(selectExclusiveServiceStepOne);

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
    exclusiveServiceName: {
      required: 'Exclusive Service Name is required',
      pattern: {
        value: /^[A-Za-z][A-Za-z ]*$/, // Ensure it starts with a letter and allows letters and spaces only
        message: 'Exclusive Service Name should only contain letters and spaces, and must start with a letter',
      },
      validate: value => {
        if (value.trim().length === 0) {
          return 'Exclusive Service Name cannot be empty';
        }
        if (/^[\s\d]/.test(value)) {
          // Check if the value starts with a space or digit
          return 'Exclusive Service Name cannot start with a space or number';
        }
        if (/[^A-Za-z\s]/.test(value)) {
          // Ensure no special characters are present
          return 'Exclusive Service Name should only contain letters and spaces';
        }
        return true;
      },
    },

    exclusiveCategoryAll: {
      required: 'Exclusive Service Category is required',
      validate: value => (value && value.length > 0) || 'Exclusive Service Category is required',
    },

    exclusiveSeviceDescription: { required: 'Exclusive Sevice Description is required' },
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

    brochure: {
      required: 'Brochure is required',
    },
  };

  const { field: exclusiveServiceNameField } = useController({
    name: 'exclusiveServiceName',
    control,
    defaultValue: '',
    rules: controlConstraints.exclusiveServiceName,
  });

  const { field: exclusiveCategoryAllField } = useController({
    name: 'exclusiveCategoryAll',
    control,
    defaultValue: '',
    rules: controlConstraints.exclusiveCategoryAll,
  });

  const { field: exclusiveSeviceDescriptionField } = useController({
    name: 'exclusiveSeviceDescription',
    control,
    defaultValue: '',
    rules: controlConstraints.exclusiveSeviceDescription,
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

  const { field: brochureField } = useController({
    name: 'brochure',
    control,
    defaultValue: '',
    rules: controlConstraints.brochure,
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

    setMainLoader(false);
  }, [route?.params?.businessdata]);

  useEffect(() => {
    // console.log(' exclusive service --->', exclusiveServiceOne);

    if (exclusiveServiceOne && Object.keys(exclusiveServiceOne).length === 0) {
      console.log('The object is empty');
    } else {
      console.log('The object is not empty');

      setExclusiveServiceName(exclusiveServiceOne?.name);
      exclusiveServiceNameField.onChange(exclusiveServiceOne?.name);
      SetExclusiveCategoryEdit(exclusiveServiceOne?.sub_category);
      const imageArray = [];
      const videoArray = [];
      exclusiveServiceOne?.gallery.forEach(item => {
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
        latitude: exclusiveServiceOne?.location?.coordinates[0],
        longitude: exclusiveServiceOne?.location?.coordinates[1],
      });
      setExclusiveSeviceDescription(exclusiveServiceOne?.about);
      exclusiveSeviceDescriptionField.onChange(exclusiveServiceOne?.about);
      setAddress(exclusiveServiceOne?.address);
      addressField.onChange(exclusiveServiceOne?.address);
      setCity(exclusiveServiceOne?.city);
      cityField.onChange(exclusiveServiceOne?.city);
      setPincode(exclusiveServiceOne?.pincode);
      pincodeField.onChange(exclusiveServiceOne?.pincode);
      setState(exclusiveServiceOne?.state);
      stateField.onChange(exclusiveServiceOne?.state);

      setUploadItems([exclusiveServiceOne?.brochure]);
    }
  }, [exclusiveServiceOne]);

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
    const updatedList = exclusiveCategoryAll
      .map(item => (exclusiveCategoryEdit.includes(item.label) ? { ...item, isActive: true } : null))
      .filter(item => item !== null);

    setSelectedSubCategoryList(updatedList);
    exclusiveCategoryAllField.onChange(updatedList);
  }, [exclusiveCategoryEdit]);

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

    dispatch(clearExclusiveServiceStepOne());
    dispatch(clearExclusiveServiceStepTwo());

    setShowBusinessCancel(false);

    navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
      profiledata: profiledata,
    });
  };

  const onhandleBrowserType = () => {
    setBottomImageSheet(true);
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
        name: exclusiveServiceName,
        category: 'Exclusive Services',
        sub_category: SubCategoryArray ? SubCategoryArray : '',

        about: exclusiveSeviceDescription,
        gallery: mergedArray ? mergedArray : '',
        location: { coordinates: [coordinates.latitude, coordinates.longitude] },
        address: address,
        landmark: landmark,
        city: city,
        state: state,
        pincode: pincode,
        brochure: uploadItems[0],
      };

      console.log(' post one --->', post_one);

      dispatch(setExclusiveServiceStepOne(post_one));

      navigation.navigate('EXCLUSIVE_SERVICES_STEP_TWO');
    }
  };

  const handleSubCategoryFocus = () => {
    Keyboard.dismiss();
    if (!showSubCategoryType) {
      setShowSubCategoryType(true);
    }
  };

  const handleSubCategoryTypeSelect = businessCategory => {
    // console.log('Selected item:', businessCategory);

    setSelectedSubCategoryList(prevList => {
      let updatedList;

      if (prevList.some(item => item.label === businessCategory.label)) {
        updatedList = prevList.filter(item => item.label !== businessCategory.label);
      } else {
        updatedList = [...prevList, businessCategory];
      }

      const labelArray = updatedList.map(item => item.label);

      exclusiveCategoryAllField.onChange(labelArray);

      return updatedList;
    });

    Keyboard.dismiss();
  };

  const handleSubCategoryCloseModal = () => {
    setShowSubCategoryType(false);
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
      setExclusiveSeviceDescription(response?.data?.data?.content);
      exclusiveSeviceDescriptionField.onChange(response?.data?.data?.content);
      setLoaderAIDes(false);
    });
  };

  // document handling

  const handleImageClick = (typeval: boolean) => {
    console.log('type val--->', typeval);

    if (typeval) {
      navigation.navigate('GALLERY_PREVIEW', {
        images: uploadItems,
        index: 0,
        hasHeader: true,
        headerName: 'Business Brochure',
      });
    } else {
      // console.log(' pdf url -->', uploadItems);

      navigation.navigate('DOCUMENT_PREVIEW', {
        images: uploadItems, // PDF URIs passed here
        index: 0, // Set initial index (not needed in this simple setup)
        hasHeader: true,
        headerName: 'Business Brochure',
      });
    }
  };

  const deleteImageClick = () => {
    setUploadItems(null);
    brochureField.onChange('');
  };

  useEffect(() => {
    if (uploadItems && uploadItems.length > 0) {
      // console.log('  uploadItems--->');

      brochureField.onChange(uploadItems[0]);
    }
  }, [uploadItems]);

  useEffect(() => {
    console.log(' uploading api-->');
  }, [loadingUpload]);

  if (loademain) {
    return <Loader />;
  }

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Exclusive Service Listing"
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
            stepheading="Basic Details"
          />

          <RNView style={[businessstyles.formContainer, { marginTop: px(8) }]}>
            <RNText style={businessstyles.businessText}>Exclusive Services Name</RNText>
            <RNView style={businessstyles.transparentContainer}>
              <RNText style={businessstyles.labelText}>
                Exclusive Service Name <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>

              <CommonInput
                placeholder="Enter Exclusive Service Name"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={30}
                outlineStyle={[
                  businessstyles.outlineBorderStyle,
                  errors.eventSpaceName ? { borderColor: ColorTheme.red } : {},
                ]}
                value={exclusiveServiceNameField?.value}
                onChangeText={(e: string) => {
                  setExclusiveServiceName(e);
                  exclusiveServiceNameField.onChange(e);
                }}
              />

              {errors.exclusiveServiceName && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.exclusiveServiceName?.message}
                />
              )}

              <RNText style={businessstyles.labelText}>
                Exclusive Service Category <RNText style={businessstyles.labelTextMandatory}>*</RNText>
              </RNText>

              <CommonInput
                placeholder="Exclusive Service Category"
                keyboardType="Exclusive Service Category"
                placeholderColor={ColorTheme.gray2}
                style={businessstyles.inputStyle}
                maxLength={50}
                onFocus={handleSubCategoryFocus}
                outlineStyle={[
                  businessstyles.outlineBorderStyle,
                  errors.exclusiveCategoryAllField ? { borderColor: ColorTheme.red } : {},
                ]}
              />

              {errors.exclusiveCategoryAll && (
                <PropertyInputErrorComponent
                  styledata={{
                    color: ColorTheme.red,
                    paddingLeft: px(10),
                  }}
                  errordata={errors.exclusiveCategoryAll?.message}
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
                errors.exclusiveSeviceDescription ? { borderColor: ColorTheme.red } : {},
              ]}
              value={exclusiveSeviceDescriptionField.value}
              onChangeText={(e: string) => {
                setExclusiveSeviceDescription(e);
                exclusiveSeviceDescriptionField.onChange(e);
              }}
              generateAIButton={true}
              autogenerateDescription={autogenerateDescription}
              loader={loaderAIDes}
            />

            {errors.exclusiveSeviceDescription && (
              <PropertyInputErrorComponent
                styledata={{
                  color: ColorTheme.red,
                  paddingLeft: px(20),
                }}
                errordata={errors.exclusiveSeviceDescription?.message}
              />
            )}

            <RNText style={businessstyles.businessText}>Media</RNText>
            <RNView style={businessstyles.transparentContainer}>
              {/* <RNText style={businessstyles.labelText}>Photos</RNText> */}

              <BusinessPhotoMedia setItems={setPhotos} Items={Photos} />

              {/* <RNText style={businessstyles.labelText}>Videos</RNText> */}

              <BusinessVideoMedia setItems={setVideos} Items={Videos} />
            </RNView>

            <RNText style={businessstyles.businessText}>
              Business Brochure <RNText style={businessstyles.labelTextMandatory}>*</RNText>
            </RNText>

            <TouchableOpacity style={businessstyles.documentStyle} onPress={onhandleBrowserType}>
              <RNText style={businessstyles.documentTextStyle}>Upload PDF / Image of the layout</RNText>
              <Feather name="upload" size={20} color={ColorTheme.gray} style={businessstyles.documentUploadIcon} />
            </TouchableOpacity>

            {errors.brochure && (
              <PropertyInputErrorComponent
                styledata={{
                  color: ColorTheme.red,
                  paddingLeft: px(20),
                  marginTop: px(20),
                }}
                errordata={errors.brochure?.message}
              />
            )}

            {loadingUpload ? (
              <ActivityIndicator />
            ) : (
              uploadItems?.map((img: any, index: number) => (
                <DocumentBoxComponent
                  loading={loadingUpload}
                  handleClick={() => handleImageClick(imagevideoextention(img))}
                  deleteClick={() => deleteImageClick()}
                  item={img}
                  type={imagevideoextention(img)}
                />
              ))
            )}

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
                    data={exclusiveCategoryAll}
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

            <PropertyImageVideoSheet
              showBottomSheet={BottomImageSheet}
              imgArray={uploadItems}
              setLoading={setLoadingUpload}
              setImageArray={data => setUploadItems(data)}
              setshowBottomSheet={setBottomImageSheet}
              photos={true}
              loading={loadingUpload}
              uploaddocument={true}
              multiSelect={false}
            />

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

export default ExclusiveServicesStepOne;
