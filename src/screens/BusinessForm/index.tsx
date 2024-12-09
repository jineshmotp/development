import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

import BusinessImageSheet from '@/components/common/BusinessImageSheet';
import HeaderBar from '@/components/common/HeaderBar';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import useLocation from '@/custom/Location';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import {
  useBusinessCategoryQuery,
  useBusinessProfileCreationMutation,
  useLazyGetBusinessCinQuery,
} from '@/redux/business/businessService';
import { selectPropertyLocationData } from '@/redux/listing/listingReducer';
import { getUserData } from '@/redux/login/loginReducer';
import { setLatLongData } from '@/redux/nearu/nearuReducer';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

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

const BusinessForm = () => {
  const toast = useToast();
  const { latitude, longitude } = useLocation();
  const setAutoLocation = useAppSelector(setLatLongData);
  // console.log(' lat and long --->', latitude, longitude);

  const navigation = useNavigation();
  const [constructionStatus, setConstructionStatus] = useState('');
  const [areaValue, setAreaValue] = useState('');
  // console.log('areaValue =====>', areaValue);

  const [isAreaFocus, setIsAreaFocus] = useState(false);
  // console.log('constructionStatus ====>', constructionStatus);

  const { data: businessCategoriesData } = useBusinessCategoryQuery({});
  // console.log('businessCategoriesData ======>', businessCategoriesData);

  const [companyCin] = useLazyGetBusinessCinQuery();
  // const { latitude, longitude } = useLocation();
  // console.log('hello ======>', latitude, longitude);

  const [businessMutation] = useBusinessProfileCreationMutation();

  const [selectedCategory, setSelectedCategory] = useState('');
  // console.log('selectedCategory ======>', selectedCategory);

  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const selectUserData = useAppSelector(getUserData);
  // console.log('selectedSubCategories =====>', selectedSubCategories);
  const locationdata = useAppSelector(selectPropertyLocationData);
  // console.log('location data --->', locationdata);

  const [businessName, setBusinessName] = useState('');
  // console.log('businessName ====>', businessName);

  const [businessDescription, setBusinessDescription] = useState('');
  const [cinNumber, setCinNumber] = useState('');
  // console.log('cinNumber ======>', cinNumber);

  const [cinNumberError, setCinNumberError] = useState('');
  const [possessionDate, setPossessionDate] = useState('');

  const [projectArea, setProjectArea] = useState('');

  const [reraId, setReraId] = useState('');
  const [dtcpId, setDtcpId] = useState('');
  const [projectHighlights, setProjectHighlights] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);

  // const [ToogleModalMapView, setToogleModalMapView] = useState(false);

  // State variables for error messages
  const [businessNameError, setBusinessNameError] = useState('');
  const [businessDescriptionError, setBusinessDescriptionError] = useState('');

  const [selectedCategoryError, setSelectedCategoryError] = useState('');
  const [selectedSubCategoriesError, setSelectedSubCategoriesError] = useState('');
  const [constructionStatusError, setConstructionStatusError] = useState('');
  const [projectAreaError, setProjectAreaError] = useState('');
  const [possessionDateError, setPossessionDateError] = useState('');
  const [localityError, setLocalityError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [pincodeError, setPincodeError] = useState('');

  const [contactNumberError, setContactNumberError] = useState('');
  const [emailAddressError, setEmailAddressError] = useState('');
  const [showBottomSheet, setshowBottomSheet] = useState(false);
  const [showCoverBottomSheet, setshowCoverBottomSheet] = useState(false);
  const [imgArray, setImageArray] = useState<string[]>(['']);
  // console.log('imgArray =====>', imgArray);
  const [coverimgArray, setCoverImageArray] = useState(['']);
  // console.log('coverimgArray =====>', coverimgArray);

  const [loadingCoverPic, setLoadingCoverPic] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(false);

  const [showProjectLayoutBottomSheet, setshowProjectLayoutBottomSheet] = useState(false);
  const [projectLayoutArray, setProjectLayoutArray] = useState<string[]>(['']);
  // console.log('projectLayoutArray ====>', projectLayoutArray);

  const [loadingProjectLayout, setLoadingProjectLayout] = useState(false);
  const [showBrochureBottomSheet, setshowBrochureBottomSheet] = useState(false);
  const [brochureArray, setBrochureArray] = useState<string[]>(['']);
  // console.log('brochureArray ====>', brochureArray, projectLayoutArray);

  const [loadingBrochure, setLoadingBrochure] = useState(false);

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCinFocused, setIsCinFocused] = useState(false);

  const [loader, setLoader] = useState(true);
  // console.log('selectedDate ===>', selectedDate);

  const [isDateInputFocused, setIsDateInputFocused] = useState(false);

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

  const isBuilder = selectUserData?.role === 'BUILDER';

  const filteredBusinessCategories = isBuilder
    ? businessCategoriesData?.data // Show all categories
    : businessCategoriesData?.data?.filter(category => category.label !== 'Real Estate Project');

  // console.log('  businessCategoriesData?.data', businessCategoriesData?.data[0]);

  const handleCategoryPress = item => {
    setSelectedCategory(item.label);
    setSelectedSubCategories([]);
    setSelectedCategoryError(''); // Reset error message on category selection
    setSelectedSubCategoriesError(''); // Reset error message on category selection
  };

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

  const fetchCompanyName = cinNumber => {
    companyCin(cinNumber)
      .then(res => {
        // console.log('res++++++++++', res);
        if (res?.status === 'fulfilled') {
          // console.log('status =====>', res?.status);
          setBusinessName(res?.data?.data?.company_name);
          setCinNumberError(''); // Clear error if the response is successful
        } else {
          // console.log('Invalid CIN =====>');
          setCinNumberError('Please enter a valid CIN number.');
        }
      })
      .catch(err => {
        console.log('errorrr', JSON.stringify(err));
        setCinNumberError('An error occurred while fetching the company name.');
      });
  };

  useEffect(() => {
    if (cinNumber?.length === 21) {
      fetchCompanyName(cinNumber);
    }
  }, [cinNumber]);

  const handleBlur = () => {
    setIsCinFocused(false);
    // Show error if CIN number is less than 21 and the input field lost focus
    if (cinNumber.length < 21) {
      setCinNumberError('Please enter a valid 21 digit CIN number');
    } else {
      setCinNumberError(''); // Clear error if valid
    }
  };

  useEffect(() => {
    // console.log(' from user location : ', locationdata?.location);

    if (locationdata?.location[0] !== '') {
      setLoader(true);
      setCity(locationdata?.city);
      setPincode(locationdata?.pincode);
      setState(locationdata?.state);
      setLocality(locationdata?.locality);
      setAddress(locationdata?.formatedAddr);

      // console.log(' logvalue from redux --', locationdata?.formatedAddr);

      setSelectedRegion({
        ...selectedRegion,
        latitude: locationdata?.location[0],
        longitude: locationdata?.location[1],
      });

      setCoordinates({
        ...coordinates,
        latitude: locationdata?.location[0],
        longitude: locationdata?.location[1],
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: locationdata?.location[0],
          longitude: locationdata?.location[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }

      setLoader(false);
    } else if (setAutoLocation.lat !== undefined && setAutoLocation.lat !== '') {
      // console.log(' from user location : ', setAutoLocation.lat, setAutoLocation.long);
      setLoader(false);

      setSelectedRegion({
        ...selectedRegion,
        latitude: setAutoLocation?.lat,
        longitude: setAutoLocation?.long,
      });

      setCoordinates({
        ...coordinates,
        latitude: setAutoLocation?.lat,
        longitude: setAutoLocation?.long,
      });
    } else {
      return;
    }
  }, [setAutoLocation.lat, setAutoLocation.long, locationdata]);

  const handleSubCategoryPress = subItem => {
    const index = selectedSubCategories.indexOf(subItem.label);
    if (index !== -1) {
      // Already selected, so remove it
      setSelectedSubCategories(prev => prev.filter(label => label !== subItem.label));
    } else {
      // Not selected, so add it
      setSelectedSubCategories(prev => [...prev, subItem.label]);
    }
    setSelectedSubCategoriesError(''); // Reset error message on sub-category selection
  };

  const handleUnderConstructionPress = () => {
    setConstructionStatus('upcoming');
  };

  const handleNewLaunchingPress = () => {
    setConstructionStatus('newLaunching');
  };

  const validateForm = () => {
    let isValid = true;

    if (!businessName) {
      setBusinessNameError('Please enter Business Name');
      isValid = false;
    } else {
      setBusinessNameError('');
    }

    if (!businessDescription) {
      setBusinessDescriptionError('Please enter Business Description');
      isValid = false;
    } else {
      setBusinessDescriptionError('');
    }

    if (selectedCategory.length === 0) {
      setSelectedCategoryError('Please choose at least one Business Category');
      isValid = false;
    } else {
      setSelectedCategoryError('');
    }

    if (selectedSubCategories.length === 0) {
      setSelectedSubCategoriesError('Please choose at least one Sub-Category');
      isValid = false;
    } else {
      setSelectedSubCategoriesError('');
    }

    if (!locality) {
      setLocalityError('Please enter Locality');
      isValid = false;
    } else {
      setLocalityError('');
    }

    if (!city) {
      setCityError('Please enter City');
      isValid = false;
    } else {
      setCityError('');
    }

    if (!state) {
      setStateError('Please enter State');
      isValid = false;
    } else {
      setStateError('');
    }

    if (!pincode) {
      setPincodeError('Please enter Pincode');
      isValid = false;
    } else {
      setPincodeError('');
    }

    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) {
      setContactNumberError('Please enter a valid 10-digit contact number');
      isValid = false;
    } else {
      setContactNumberError('');
    }

    if (!emailAddress) {
      setEmailAddressError('Please enter Email Address');
      isValid = false;
    } else {
      setEmailAddressError('');
    }

    if (selectedCategory === 'Real Estate Project') {
      if (!constructionStatus) {
        setConstructionStatusError('Please choose Project Status');
        isValid = false;
      } else {
        setConstructionStatusError('');
      }

      if (!projectArea) {
        setProjectAreaError('Please  select Project Units and enter Project Area');
        isValid = false;
      } else {
        setProjectAreaError('');
      }
    }

    return isValid;
  };

  const handleDateConfirm = date => {
    setSelectedDate(date.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
    setIsDateTimePickerVisible(false);
    setIsDateInputFocused(false); // Reset focus state
  };

  const handleCloseDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
    setIsDateInputFocused(false); // Reset focus state
  };

  const handleSubmit = () => {
    setSubmitLoader(true);
    const isValid = validateForm();

    if (isValid) {
      const payload = {
        business_owner: selectUserData?._id,
        business_name: businessName,
        cin_no: cinNumber,
        // isCinVerified: true,
        category: selectedCategory,
        sub_category: selectedSubCategories,
        city: city,
        state: state,
        pincode: pincode,
        locality: locality,
        email: emailAddress,
        mobile_no: contactNumber,
        profile_pic: imgArray[0],
        cover_pic: coverimgArray[0],
        project_description: businessDescription,
        ...(selectedCategory === 'Real Estate Project' && {
          project_status: constructionStatus ? constructionStatus : null,
          project_area: projectArea,
          project_area_units: areaValue,
          project_date: selectedDate,
        }),

        project_brochure: brochureArray[0] ? brochureArray[0] : null,
        project_highlights: projectHighlights,
        rera_number: reraId ? reraId : null,
        dtcp_number: dtcpId ? dtcpId : null,
        landmark: landmark,
        master_plan: projectLayoutArray[0] ? projectLayoutArray[0] : null,

        location: {
          type: 'Point',
          coordinates: locationdata?.location,
        },
      };
      // console.log('Payload: ======>', payload);

      businessMutation(payload).then(response => {
        // console.log('response ======>', response);
        if (response?.data?.status) {
          toast.show('Business Profile Created Successfully', {
            type: 'success_toast',
            animationDuration: 100,
            data: {
              title: 'Business Profile :',
            },

            duration: 2000,
          });
          setSubmitLoader(false);
          navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
            profiledata: response?.data?.data,
          });
        } else {
          toast.show(response?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });

          setSubmitLoader(false);
        }
      });
    } else {
      setSubmitLoader(false);
    }
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Create Business Profile"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={'padding'} enabled>
        <ScrollView style={styles.topScrollStyle} showsVerticalScrollIndicator={false}>
          <RNView style={styles.initialContainer}>
            <RNText style={styles.initialText}>Tell us about your Business</RNText>
            <RNText style={styles.lineText}>
              Create a Business profile name and people can find with your name. You can change them at any time.
            </RNText>
          </RNView>

          <ImageBackground
            source={
              coverimgArray[0]
                ? { uri: coverimgArray[0] }
                : {
                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                  }
            }
            style={styles.backgroundImg}
            resizeMode="cover">
            <RNText style={styles.uploadText}>upload cover photo</RNText>
            <TouchableOpacity onPress={() => setshowCoverBottomSheet(true)} style={styles.userCamera}>
              {loadingCoverPic ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <AntDesign name="upload" size={20} color={ColorTheme.onboardingPrimary} />
              )}
            </TouchableOpacity>
          </ImageBackground>
          <RNView style={styles.topProfileView}>
            <RNView style={styles.userProfile}>
              <RNImage
                style={styles.profileImg}
                source={
                  imgArray[0]
                    ? { uri: imgArray[0] }
                    : {
                        uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                      }
                }
              />
              <TouchableOpacity style={styles.profileCamera} onPress={() => setshowBottomSheet(true)}>
                {loadingProfilePic ? (
                  <ActivityIndicator size={'small'} />
                ) : (
                  <Entypo name="camera" size={15} color="black" />
                )}
              </TouchableOpacity>
            </RNView>
          </RNView>
          <RNView style={styles.formContainer}>
            <RNText style={styles.businessText}>Business Details</RNText>

            <RNView style={styles.transparentContainer}>
              <RNText style={styles.labelText}>CIN / Registration No</RNText>
              <CommonInput
                placeholder="CIN / Registration No"
                placeholderColor={ColorTheme.gray2}
                style={styles.inputStyle}
                maxLength={21}
                contentStyle={{ textTransform: 'uppercase' }}
                value={cinNumber}
                onChangeText={text => setCinNumber(text)}
                onFocus={() => setIsCinFocused(true)} // Track when input is focused
                onBlur={handleBlur} // Handle blur event
              />
              {cinNumberError ? <RNText style={styles.errorText}>{cinNumberError}</RNText> : null}
              <RNText style={styles.labelText}>Business Name *</RNText>
              <CommonInput
                placeholder="Enter your Business name here"
                placeholderColor={ColorTheme.gray2}
                style={styles.inputStyle}
                maxLength={40}
                value={businessName}
                onChangeText={text => setBusinessName(text)}
              />
              {businessNameError ? <RNText style={styles.errorText}>{businessNameError}</RNText> : null}
            </RNView>

            <RNText style={styles.businessText}>Business Category *</RNText>

            <RNView style={styles.transparentContainer}>
              <RNText style={styles.labelText}>Choose Category</RNText>
              <RNView style={styles.categoriesContainer}>
                {filteredBusinessCategories?.map(item => (
                  <TouchableOpacity
                    key={item?._id}
                    style={[styles.touchableContainer, selectedCategory === item?.label && styles.selectedCategory]}
                    onPress={() => handleCategoryPress(item)}>
                    <RNText style={[styles.touchableText, selectedCategory === item?.label && styles.selectedText]}>
                      {item?.label}
                    </RNText>
                  </TouchableOpacity>
                ))}
              </RNView>
              {selectedCategoryError ? <RNText style={styles.errorText}>{selectedCategoryError}</RNText> : null}

              {selectedCategory && (
                <>
                  <RNText style={styles.labelText}>Choose Sub-Categories *</RNText>
                  <RNView style={styles.categoriesContainer}>
                    {businessCategoriesData?.data
                      .find(category => category.label === selectedCategory)
                      ?.child?.map(subItem => (
                        <TouchableOpacity
                          key={subItem.key}
                          style={[
                            styles.touchableContainer,
                            selectedSubCategories.includes(subItem.label) && styles.selectedCategory,
                          ]}
                          onPress={() => handleSubCategoryPress(subItem)}>
                          <RNText
                            style={[
                              styles.touchableText,
                              selectedSubCategories.includes(subItem.label) && styles.selectedText,
                            ]}>
                            {subItem.label}
                          </RNText>
                        </TouchableOpacity>
                      ))}
                  </RNView>
                  {selectedSubCategoriesError ? (
                    <RNText style={styles.errorText}>{selectedSubCategoriesError}</RNText>
                  ) : null}
                </>
              )}
            </RNView>
            {selectedCategory === 'Real Estate Project' && (
              <>
                <RNText style={styles.businessText}>3. Project Status</RNText>
                <RNView style={styles.transparentContainer}>
                  <RNView style={styles.categoriesContainer}>
                    <TouchableOpacity
                      style={[styles.touchableContainer, constructionStatus === 'upcoming' && styles.selectedCategory]}
                      onPress={handleUnderConstructionPress}>
                      <RNText style={[styles.touchableText, constructionStatus === 'upcoming' && styles.selectedText]}>
                        Under Construction
                      </RNText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.touchableContainer,
                        constructionStatus === 'newLaunching' && styles.selectedCategory,
                      ]}
                      onPress={handleNewLaunchingPress}>
                      <RNText
                        style={[styles.touchableText, constructionStatus === 'newLaunching' && styles.selectedText]}>
                        New Launching
                      </RNText>
                    </TouchableOpacity>
                  </RNView>
                  {constructionStatusError ? <RNText style={styles.errorText}>{constructionStatusError}</RNText> : null}
                  {constructionStatus === 'upcoming' && (
                    <CommonInput
                      placeholder="Enter the possession date"
                      placeholderColor={ColorTheme.gray2}
                      style={[styles.inputStyle, { marginTop: px(20) }]}
                      value={selectedDate}
                      onFocus={() => {
                        setIsDateTimePickerVisible(true);
                        Keyboard.dismiss();
                      }}
                    />
                  )}
                  <DateTimePickerModal
                    isVisible={isDateTimePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={handleCloseDateTimePicker}
                    minimumDate={new Date()}
                  />
                  {possessionDate ? <RNText style={styles.errorText}>{possessionDateError}</RNText> : null}
                </RNView>
                <RNText style={styles.businessText}>Project Area</RNText>
                <RNView style={styles.transparentContainer}>
                  <Dropdown
                    style={[styles.dropdown, isAreaFocus && { borderColor: ColorTheme.primaryColor }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={areaUnits}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isAreaFocus ? 'Property Area Units' : 'Property Area Units'}
                    value={areaValue}
                    onFocus={() => setIsAreaFocus(true)}
                    onBlur={() => setIsAreaFocus(false)}
                    onChange={item => {
                      setAreaValue(item.value);
                      setIsAreaFocus(false);
                    }}
                  />

                  <CommonInput
                    placeholder="Enter the Project Area"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={15}
                    keyboardType={'numeric'}
                    value={projectArea}
                    onChangeText={text => setProjectArea(text)}
                  />
                  {projectAreaError ? <RNText style={styles.errorText}>{projectAreaError}</RNText> : null}
                </RNView>

                <RNText style={styles.businessText}>Project Layout</RNText>
                <RNView style={styles.transparentContainer}>
                  <CommonInput
                    placeholder="Upload Image / Image of the brochure"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={50}
                    // value={projectLayout}
                    onFocus={() => {
                      setshowProjectLayoutBottomSheet(true);
                      Keyboard.dismiss();
                    }}
                  />

                  {projectLayoutArray[0].length > 0 ? (
                    <>
                      <RNView style={styles.layoutView}>
                        {loadingProjectLayout ? (
                          <ActivityIndicator size={'small'} color={ColorTheme.onboardingButton} />
                        ) : (
                          <RNImage
                            style={{ width: '100%', height: '100%' }}
                            source={
                              projectLayoutArray[0]
                                ? { uri: projectLayoutArray[0] }
                                : {
                                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                                  }
                            }
                          />
                        )}
                      </RNView>
                    </>
                  ) : null}
                </RNView>
                <RNText style={styles.businessText}>Project Brochure</RNText>
                <RNView style={styles.transparentContainer}>
                  <CommonInput
                    placeholder="Upload Image / Image of the brochure"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={50}
                    // value={projectBrochure}
                    onFocus={() => {
                      setshowBrochureBottomSheet(true);
                      Keyboard.dismiss();
                    }}
                  />
                  {brochureArray[0].length > 0 ? (
                    <>
                      <RNView style={styles.layoutView}>
                        {loadingBrochure ? (
                          <ActivityIndicator size={'small'} color={ColorTheme.onboardingButton} />
                        ) : (
                          <RNImage
                            style={{ width: '100%', height: '100%' }}
                            source={
                              brochureArray[0]
                                ? { uri: brochureArray[0] }
                                : {
                                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                                  }
                            }
                          />
                        )}
                      </RNView>
                    </>
                  ) : null}
                </RNView>
                <RNText style={styles.businessText}>Registration Details</RNText>
                <RNView style={styles.transparentContainer}>
                  <RNText style={styles.labelText}>RERA ID</RNText>
                  <CommonInput
                    placeholder="Enter your RERA ID"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={32}
                    value={reraId}
                    onChangeText={text => setReraId(text)}
                  />
                  <RNText style={styles.labelText}>DTCP ID</RNText>
                  <CommonInput
                    placeholder="Enter your DTCP ID"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={32}
                    value={dtcpId}
                    onChangeText={text => setDtcpId(text)}
                  />
                </RNView>
                <RNText style={styles.businessText}>Project Highlights</RNText>
                <RNView style={styles.transparentContainer}>
                  <CommonInput
                    placeholder="Enter project highlights"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle, { minHeight: px(150) }]}
                    maxLength={50}
                    value={projectHighlights}
                    onChangeText={text => setProjectHighlights(text)}
                  />
                </RNView>
              </>
            )}
            <RNText style={styles.businessText}>Location Details</RNText>
            <RNView style={styles.transparentContainer}>
              <RNView style={styles.mapView}>
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
                    <RNView style={styles.absoluteView}>
                      <TouchableOpacity style={styles.submitContainer} onPress={gotoMap}>
                        <RNText style={styles.touchableText}>Get Exact Location</RNText>
                      </TouchableOpacity>
                    </RNView>
                  </>
                )}
              </RNView>

              <RNText style={styles.labelText}>Address</RNText>
              <CommonInput
                placeholder="Enter your address here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle, { minHeight: px(70), paddingTop: px(10) }]}
                maxLength={50}
                multiline={true}
                value={address}
                onChangeText={text => setAddress(text)}
              />

              <RNText style={styles.labelText}>Locality *</RNText>
              <CommonInput
                placeholder="Enter your locality here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={20}
                value={locality}
                onChangeText={text => setLocality(text)}
              />
              {localityError ? <RNText style={styles.errorText}>{localityError}</RNText> : null}

              <RNText style={styles.labelText}>Landmark</RNText>
              <CommonInput
                placeholder="Enter your famous landmark here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={20}
                value={landmark}
                onChangeText={text => setLandmark(text)}
              />

              <RNText style={styles.labelText}>City *</RNText>
              <CommonInput
                placeholder="Enter your city here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={20}
                value={city}
                onChangeText={text => setCity(text)}
              />
              {cityError ? <RNText style={styles.errorText}>{cityError}</RNText> : null}

              <RNText style={styles.labelText}>State *</RNText>
              <CommonInput
                placeholder="Enter your state here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={20}
                value={state}
                onChangeText={text => setState(text)}
              />
              {stateError ? <RNText style={styles.errorText}>{stateError}</RNText> : null}

              <RNText style={styles.labelText}>Pincode *</RNText>
              <CommonInput
                placeholder="Enter your pincode here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={6}
                value={pincode}
                onChangeText={text => setPincode(text)}
              />
              {pincodeError ? <RNText style={styles.errorText}>{pincodeError}</RNText> : null}
            </RNView>
            <RNText style={styles.businessText}>Contact Details</RNText>
            <RNView style={styles.transparentContainer}>
              <RNText style={styles.labelText}>Contact Number *</RNText>
              <CommonInput
                placeholder="Enter your contact number here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={10}
                value={contactNumber}
                keyboardType={'phone-pad'}
                onChangeText={text => setContactNumber(text)}
              />
              {contactNumberError ? <RNText style={styles.errorText}>{contactNumberError}</RNText> : null}

              <RNText style={styles.labelText}>Email Address *</RNText>
              <CommonInput
                placeholder="Enter your email here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={30}
                value={emailAddress}
                onChangeText={text => setEmailAddress(text)}
              />
              {emailAddressError ? <RNText style={styles.errorText}>{emailAddressError}</RNText> : null}
            </RNView>
            {selectedCategory === 'Real Estate Project' ? (
              <>
                <RNView></RNView>
              </>
            ) : (
              <>
                <RNText style={styles.businessText}>Business Brochure</RNText>
                <RNView style={styles.transparentContainer}>
                  <CommonInput
                    placeholder="Upload Image / Image of the brochure"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={50}
                    // value={projectBrochure}
                    onFocus={() => {
                      setshowBrochureBottomSheet(true);
                      Keyboard.dismiss();
                    }}
                  />
                  {brochureArray[0].length > 0 ? (
                    <>
                      <RNView style={styles.layoutView}>
                        {loadingBrochure ? (
                          <ActivityIndicator size={'small'} color={ColorTheme.onboardingButton} />
                        ) : (
                          <RNImage
                            style={{ width: '100%', height: '100%' }}
                            source={
                              brochureArray[0]
                                ? { uri: brochureArray[0] }
                                : {
                                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                                  }
                            }
                          />
                        )}
                      </RNView>
                    </>
                  ) : null}
                </RNView>
              </>
            )}

            <RNText style={styles.businessText}>Business Description</RNText>
            <RNView style={styles.transparentContainer}>
              <CommonInput
                placeholder="Let us know about your business"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle, { minHeight: px(100), paddingTop: px(10) }]}
                maxLength={100}
                multiline={true}
                value={businessDescription}
                onChangeText={text => setBusinessDescription(text)}
              />
              {businessDescriptionError ? <RNText style={styles.errorText}>{businessDescriptionError}</RNText> : null}
            </RNView>

            <CommonButton
              title={'Submit'}
              onPress={handleSubmit}
              style={styles.submitContainer}
              textStyle={styles.touchableText}
              loading={submitLoader}
            />
          </RNView>

          <BusinessImageSheet
            id={selectUserData?._id}
            showBottomSheet={showBottomSheet}
            imgArray={imgArray}
            profileImg={true}
            setLoading={val => setLoadingProfilePic(val)}
            setImageArray={setImageArray}
            setshowBottomSheet={val => setshowBottomSheet(val)}
            // userProfile={true}
            loading={loadingProfilePic}
          />
          <BusinessImageSheet
            id={selectUserData?._id}
            showBottomSheet={showCoverBottomSheet}
            imgArray={coverimgArray}
            profileImg={false}
            setLoading={val => setLoadingCoverPic(val)}
            loading={loadingCoverPic}
            setImageArray={setCoverImageArray}
            setshowBottomSheet={val => setshowCoverBottomSheet(val)}
            // userProfile={true}
          />
          <BusinessImageSheet
            id={selectUserData?._id}
            showBottomSheet={showProjectLayoutBottomSheet}
            imgArray={projectLayoutArray}
            profileImg={false}
            setLoading={val => setLoadingProjectLayout(val)}
            loading={loadingProjectLayout}
            setImageArray={setProjectLayoutArray}
            setshowBottomSheet={val => setshowProjectLayoutBottomSheet(val)}
            // userProfile={true}
          />
          <BusinessImageSheet
            id={selectUserData?._id}
            showBottomSheet={showBrochureBottomSheet}
            imgArray={brochureArray}
            profileImg={false}
            setLoading={val => setLoadingBrochure(val)}
            loading={loadingBrochure}
            setImageArray={setBrochureArray}
            setshowBottomSheet={val => setshowBrochureBottomSheet(val)}
            // userProfile={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default BusinessForm;
