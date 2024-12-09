import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BusinessImageSheet from '@/components/common/BusinessImageSheet';
import HeaderBar from '@/components/common/HeaderBar';
// import BusinessImageSheet from '@/components/common/BusinessImageSheet';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useBusinessProfileUpdateMutation, useLazyGetBusinessCinQuery } from '@/redux/business/businessService';
import { RootStackParamList } from '@/routes/RootNavigator';
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

const BusinessEditDescription = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [businessUpdate] = useBusinessProfileUpdateMutation();
  const route = useRoute<RouteProp<RootStackParamList, 'BUSINESS_EDIT_DESCRIPTION'>>();
  const [companyCin] = useLazyGetBusinessCinQuery();
  // console.log('route ========>', route?.params?.descriptionData);
  const [loader, setLoader] = useState(false);
  const [areaValue, setAreaValue] = useState('');
  //   console.log('areaValue =====>', areaValue);

  const [isAreaFocus, setIsAreaFocus] = useState(false);
  // console.log('isAreaFocus ====>', isAreaFocus);

  const [businessName, setBusinessName] = useState(route?.params?.descriptionData?.business_name || '');
  //   console.log('businessName ====>', businessName);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [cinNumber, setCinNumber] = useState(route?.params?.descriptionData?.cin_no || '');
  const [cinNumberError, setCinNumberError] = useState('');
  const [intro, setIntro] = useState(route?.params?.descriptionData?.intro || '');
  // console.log('intro =====>', intro);
  const [constructionStatus, setConstructionStatus] = useState(route?.params?.descriptionData?.project_status || '');
  // console.log('constructionStatus =======>', constructionStatus);
  const [selectedDate, setSelectedDate] = useState(route?.params?.descriptionData?.project_date?.split('T')[0] || '');
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  // console.log('selectedDate ===>', selectedDate);

  const [isDateInputFocused, setIsDateInputFocused] = useState(false);

  const [projectArea, setProjectArea] = useState(route?.params?.descriptionData?.project_area || '');
  const [reraNumber, setReraNumber] = useState(route?.params?.descriptionData?.rera_number || '');
  const [dtcpNumber, setDtcpNumber] = useState(route?.params?.descriptionData?.dtcp_number || '');
  const [projectHighlights, setProjectHighlights] = useState(route?.params?.descriptionData?.project_highlights || '');
  const [addressLane1, setAddressLane1] = useState(route?.params?.descriptionData?.address_lane1 || '');
  const [addressLane2, setAddressLane2] = useState(route?.params?.descriptionData?.address_lane2 || '');
  const [locality, setLocality] = useState(route?.params?.descriptionData?.locality || '');
  const [city, setCity] = useState(route?.params?.descriptionData?.city || '');
  const [state, setState] = useState(route?.params?.descriptionData?.state || '');
  const [pincode, setPincode] = useState(route?.params?.descriptionData?.pincode || '');
  const [mobileNo, setMobileNo] = useState(route?.params?.descriptionData?.mobile_no || '');
  const [email, setEmail] = useState(route?.params?.descriptionData?.email || '');
  const [showBottomSheet, setshowBottomSheet] = useState(false);
  const [imgArray, setImageArray] = useState<string[]>([]);
  // console.log('imgArray ========>', imgArray?.length);

  const [loadingProfilePic, setLoadingProfilePic] = useState(false);
  const [showCoverBottomSheet, setshowCoverBottomSheet] = useState(false);

  const [coverimgArray, setCoverImageArray] = useState<string[]>([]);

  const [loadingCoverPic, setLoadingCoverPic] = useState(false);

  const [showProjectLayoutBottomSheet, setshowProjectLayoutBottomSheet] = useState(false);
  const [projectLayoutArray, setProjectLayoutArray] = useState<string[]>(['']);

  const [loadingProjectLayout, setLoadingProjectLayout] = useState(false);
  const [showBrochureBottomSheet, setshowBrochureBottomSheet] = useState(false);
  const [brochureArray, setBrochureArray] = useState<string[]>(['']);
  const [loadingBrochure, setLoadingBrochure] = useState(false);
  const [isCinFocused, setIsCinFocused] = useState(false);

  const mapRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState({
    latitude: route?.params?.descriptionData?.location?.coordinates[0],
    longitude: route?.params?.descriptionData?.location?.coordinates[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const gotoMap = () => {
    navigation.navigate('PROPERTY_LOCATION_SCREEN', {
      locationdata: {
        initialRegionData: {
          latitude: route?.params?.descriptionData?.location?.coordinates[0],
          longitude: route?.params?.descriptionData?.location?.coordinates[1],
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

  const handleUnderConstructionPress = () => {
    setConstructionStatus('upcoming'); // or whatever status you want to set
  };

  const handleNewLaunchingPress = () => {
    setConstructionStatus('newLaunching'); // or whatever status you want to set
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
    setTimeout(() => {
      const payload = {
        id: route?.params?.descriptionData?._id,
        updated_realestate_payload: {
          business_name: businessName,
          cin_no: cinNumber,
          //  isCinVerified: true,
          address_lane1: addressLane1,
          address_lane2: addressLane2,
          city: city,
          state: state,
          pincode: pincode,
          locality: locality,
          email: email,
          mobile_no: mobileNo,
          profile_pic: imgArray?.length > 0 ? imgArray[0] : route?.params?.descriptionData?.profile_pic,
          cover_pic: coverimgArray?.length > 0 ? coverimgArray[0] : route?.params?.descriptionData?.cover_pic,
          description: intro,
          ...(route?.params?.descriptionData?.category === 'Real Estate Project' && {
            project_area: projectArea,
            project_area_units: areaValue,
            project_brochure: brochureArray[0] ? brochureArray[0] : route?.params?.descriptionData?.project_brochure,
            project_highlights: projectHighlights,
            rera_number: reraNumber ? reraNumber : null,
            dtcp_number: dtcpNumber ? dtcpNumber : null,
            master_plan: projectLayoutArray[0] ? projectLayoutArray[0] : route?.params?.descriptionData?.master_plan,
            project_status: constructionStatus,

            project_date: selectedDate,
          }),

          location: {
            type: 'Point',
            coordinates: route?.params?.descriptionData?.location?.coordinates,
          },
        },
      };
      // console.log('payload =======>', payload);

      businessUpdate(payload).then(response => {
        // console.log('response ======>', response);
        if (response?.data?.status) {
          toast.show('Business Profile Updated Successfully', {
            type: 'success_toast',
            animationDuration: 100,
            data: {
              title: 'Business Profile :',
            },

            duration: 2000,
          });
          setSubmitLoader(false);
          navigation.goBack();
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
    }, 1000);
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Edit Business Profile"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={'padding'} enabled>
        <ScrollView style={styles.topScrollStyle} showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={
              coverimgArray?.length > 0
                ? { uri: coverimgArray[0] }
                : {
                    uri: route?.params?.descriptionData?.cover_pic,
                  }
            }
            style={styles.backgroundImg}
            resizeMode="cover">
            <RNText style={styles.uploadText}>Update cover photo</RNText>
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
                // source={{
                //   uri: route?.params?.descriptionData?.profile_pic,
                // }}
                source={
                  imgArray?.length > 0
                    ? { uri: imgArray[0] }
                    : {
                        uri: route?.params?.descriptionData?.profile_pic,
                      }
                }
              />
              <TouchableOpacity onPress={() => setshowBottomSheet(true)} style={styles.profileCamera}>
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
                value={cinNumber}
                contentStyle={{ textTransform: 'uppercase' }}
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

              <RNText style={styles.descriptionText}>Description</RNText>
              <CommonInput
                placeholder="Let us know about your business"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle, { minHeight: px(120), paddingTop: px(10) }]}
                maxLength={1000}
                multiline={true}
                value={intro}
                onChangeText={text => setIntro(text)}
              />
            </RNView>

            {route?.params?.descriptionData?.category === 'Real Estate Project' ? (
              <>
                <RNText style={styles.businessText}>Project Status</RNText>
                <RNView style={styles.transparentContainer}>
                  <RNView style={styles.categoriesContainer}>
                    {constructionStatus === 'upcoming' && (
                      <TouchableOpacity style={[styles.touchableContainer]} onPress={handleUnderConstructionPress}>
                        <RNText style={[styles.touchableText]}>Under Construction</RNText>
                      </TouchableOpacity>
                    )}
                    {constructionStatus === 'newLaunching' && (
                      <TouchableOpacity style={[styles.touchableContainer]} onPress={handleNewLaunchingPress}>
                        <RNText style={[styles.touchableText]}>New Launching</RNText>
                      </TouchableOpacity>
                    )}
                  </RNView>
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
                </RNView>
                <RNText style={styles.businessText}>Project Area</RNText>
                <RNView style={styles.transparentContainer}>
                  <RNText style={styles.labelText}>Property Area Units</RNText>
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
                    placeholder={
                      !isAreaFocus
                        ? route?.params?.descriptionData?.project_area_units
                          ? route?.params?.descriptionData?.project_area_units
                          : 'Property Area Units'
                        : 'Property Area Units'
                    }
                    value={areaValue}
                    onFocus={() => setIsAreaFocus(true)}
                    onBlur={() => setIsAreaFocus(false)}
                    onChange={item => {
                      setAreaValue(item.value);
                      setIsAreaFocus(false);
                    }}
                  />
                  <CommonInput
                    placeholder="Enter your Project Area"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={30}
                    value={projectArea}
                    onChangeText={text => setProjectArea(text)}
                  />
                </RNView>
                <RNText style={styles.businessText}>Project Layout</RNText>
                <RNView style={styles.transparentContainer}>
                  <CommonInput
                    placeholder="Upload Image / Image of the brochure"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={10}
                    onFocus={() => {
                      setshowProjectLayoutBottomSheet(true);
                      Keyboard.dismiss();
                    }}
                  />

                  {route?.params?.descriptionData?.master_plan || projectLayoutArray[0].length > 0 ? (
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
                                    uri: route?.params?.descriptionData?.master_plan,
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
                    maxLength={10}
                    onFocus={() => {
                      setshowBrochureBottomSheet(true);
                      Keyboard.dismiss();
                    }}
                  />
                  {route?.params?.descriptionData?.project_brochure || brochureArray[0].length > 0 ? (
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
                                    uri: route?.params?.descriptionData?.project_brochure,
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
                    value={reraNumber}
                    onChangeText={text => setReraNumber(text)}
                  />
                  <RNText style={styles.labelText}>DTCP ID</RNText>
                  <CommonInput
                    placeholder="Enter your DTCP ID"
                    placeholderColor={ColorTheme.gray2}
                    style={[styles.inputStyle]}
                    maxLength={32}
                    value={dtcpNumber}
                    onChangeText={text => setDtcpNumber(text)}
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
            ) : null}

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
                      <Marker
                        coordinate={{
                          latitude: route?.params?.descriptionData?.location?.coordinates[0],
                          longitude: route?.params?.descriptionData?.location?.coordinates[1],
                        }}
                      />
                    </MapView>
                    <RNView style={styles.absoluteView}>
                      <TouchableOpacity style={styles.submitContainer} onPress={gotoMap}>
                        <RNText style={styles.touchableText}>Get Exact Location</RNText>
                      </TouchableOpacity>
                    </RNView>
                  </>
                )}
              </RNView>

              <RNText style={styles.labelText}>Address Line 1</RNText>
              <CommonInput
                placeholder="Enter your address here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle, { minHeight: px(70), paddingTop: px(10) }]}
                maxLength={150}
                multiline={true}
                value={addressLane1}
                onChangeText={text => setAddressLane1(text)}
              />
              <RNText style={styles.labelText}>Address Line 2</RNText>
              <CommonInput
                placeholder="Enter your address here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle, { minHeight: px(70), paddingTop: px(10) }]}
                maxLength={150}
                multiline={true}
                value={addressLane2}
                onChangeText={text => setAddressLane2(text)}
              />

              <RNText style={styles.labelText}>Locality *</RNText>
              <CommonInput
                placeholder="Enter your locality here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle, { minHeight: px(70), paddingTop: px(10) }]}
                maxLength={150}
                multiline={true}
                value={locality}
                onChangeText={text => setLocality(text)}
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

              <RNText style={styles.labelText}>State *</RNText>
              <CommonInput
                placeholder="Enter your state here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={20}
                value={state}
                onChangeText={text => setState(text)}
              />

              <RNText style={styles.labelText}>Pincode *</RNText>
              <CommonInput
                placeholder="Enter your pincode here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={6}
                value={pincode}
                onChangeText={text => setPincode(text)}
              />
            </RNView>
            <RNText style={styles.businessText}>Contact Details</RNText>
            <RNView style={styles.transparentContainer}>
              <RNText style={styles.labelText}>Contact Number *</RNText>
              <CommonInput
                placeholder="Enter your contact number here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={10}
                keyboardType={'phone-pad'}
                value={mobileNo}
                onChangeText={text => setMobileNo(text)}
              />

              <RNText style={styles.labelText}>Email Address *</RNText>
              <CommonInput
                placeholder="Enter your email here"
                placeholderColor={ColorTheme.gray2}
                style={[styles.inputStyle]}
                maxLength={30}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </RNView>

            <CommonButton
              onPress={handleSubmit}
              title={'Update'}
              style={styles.submitContainer}
              textStyle={styles.touchableText}
              loading={submitLoader}
            />
          </RNView>
          <BusinessImageSheet
            id={route?.params?.descriptionData?._id}
            showBottomSheet={showBottomSheet}
            imgArray={imgArray}
            profileImg={true}
            setLoading={val => setLoadingProfilePic(val)}
            setImageArray={setImageArray}
            setshowBottomSheet={val => setshowBottomSheet(val)}
            userProfile={true}
            loading={loadingProfilePic}
            showRemoveButton={true}
          />
          <BusinessImageSheet
            id={route?.params?.descriptionData?._id}
            showBottomSheet={showCoverBottomSheet}
            imgArray={coverimgArray}
            profileImg={false}
            setLoading={val => setLoadingCoverPic(val)}
            loading={loadingCoverPic}
            setImageArray={setCoverImageArray}
            setshowBottomSheet={val => setshowCoverBottomSheet(val)}
            userProfile={true}
            showRemoveButton={true}
          />
          <BusinessImageSheet
            id={route?.params?.descriptionData?._id}
            showBottomSheet={showProjectLayoutBottomSheet}
            imgArray={projectLayoutArray}
            profileImg={false}
            setLoading={val => setLoadingProjectLayout(val)}
            loading={loadingProjectLayout}
            setImageArray={setProjectLayoutArray}
            setshowBottomSheet={val => setshowProjectLayoutBottomSheet(val)}
            showRemoveButton={true}
            userProfile={true}
          />
          <BusinessImageSheet
            id={route?.params?.descriptionData?._id}
            showBottomSheet={showBrochureBottomSheet}
            imgArray={brochureArray}
            profileImg={false}
            setLoading={val => setLoadingBrochure(val)}
            loading={loadingBrochure}
            setImageArray={setBrochureArray}
            setshowBottomSheet={val => setshowBrochureBottomSheet(val)}
            userProfile={true}
            showRemoveButton={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default BusinessEditDescription;
