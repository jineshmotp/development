// Parent Component (PostProperty)
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToast } from 'react-native-toast-notifications';

import Geolocation from '@react-native-community/geolocation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import BuilderListingGatedCommunity from '@/components/builder/BuilderListingGatedCommunity';
import CustomAlertWrapper from '@/components/common/CustomAlertWrapper';
import PropertyHeader from '@/components/common/PropertyHeader';
import PropertyLocationDetails from '@/components/common/PropertyLocationDetails';
import PropertyLocationSelection from '@/components/common/PropertyLocationSelection';
import PropertyIndustrialTypes from '@/components/property/PropertyIndustrialTypes';
import PropertyIwant from '@/components/property/PropertyIwant';
import PropertyShopTypeRetail from '@/components/property/PropertyShopTypeRetail';
import PropertyShopTypeShowroom from '@/components/property/PropertyShopTypeShowroom';
import PropertySubType from '@/components/property/PropertySubType';
import PropertySubTypeSub from '@/components/property/PropertySubTypeSub';
import PropertyType from '@/components/property/PropertyType';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import {
  industrial_details,
  iWant_builder,
  retails_details,
  showroom_details,
} from '@/constants/function/property.helper';
import {
  activateItem,
  activateItemByKey,
  activateItemByKeyForMultiple,
} from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import useLocation from '@/custom/Location';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectBusinessBasicData, setBusinessBasicData } from '@/redux/builder/builderReducer';
import {
  clearPropertyStepFourData,
  clearPropertyStepThreeData,
  clearPropertyStepTwoData,
  selectPropertyLocationData,
  setSubscriptionData,
} from '@/redux/listing/listingReducer';
import { useLazyGetAllSubscriptionOptionsQuery } from '@/redux/listing/listingService';
import { getLatLongData, setLatLongData } from '@/redux/nearu/nearuReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../styles';

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
}

const BuilderPostProperty = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY'>>();

  //console.log(' business data ---->', route?.params?.businessdata);

  dispatch(setBusinessBasicData(route?.params?.businessdata));

  const currentStep = 1;
  const toast = useToast();
  const navigation = useNavigation();
  const locationdata = useAppSelector(selectPropertyLocationData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newarr, setNewArr] = useState(iWant_builder);
  const [iwanttype, setIwanttype] = useState(iWant_builder[0].child);
  const [ptype, setPtype] = useState([]);
  const [ptypesub, setPtypesub] = useState([]);

  const { latitude, longitude, city, pincode, state, country } = useLocation();

  const getLocation = useAppSelector(getLatLongData);
  const setAutoLocation = useAppSelector(setLatLongData);

  const [toogleDatePicker, setToogleDatePicker] = useState(false);

  const [propertySubRetail, setPropertySubRetil] = useState(retails_details);
  const [propertySubShowroom, setPropertySubShowroom] = useState(showroom_details);
  const [propertyindustrialDetails, setpropertyindustrialDetails] = useState(industrial_details);

  const [subscriptionAlert, setSubscriptionAlert] = useState(false);
  const [getallSubscriptionQuery] = useLazyGetAllSubscriptionOptionsQuery();

  const [locationLoader, setLocationLoader] = useState(true);

  const [propertyDetails, setPropertyDetails]: any = useState({
    iwant: '',
    property_type: '',
    property_sub_type: '',
    shop_retail_type: '',

    industry_type: '',
    type_of_retail: '',
    type_of_showroom: '',

    hospitality_type: '',

    transaction_type: '',
    transaction_type_new: '',
    transaction_type_sub: '',
    ready_for_possession_by: '',

    gated_community: false,

    property_name: '',

    block_no: '',
    road_street_no: '',

    pincode: locationdata ? locationdata.pincode : '',
    landmark: '',

    country: 'India',
    city: locationdata ? locationdata.city : '',
    locality: locationdata ? locationdata.locality : '',
    state: locationdata ? locationdata.state : '',
    location: locationdata ? locationdata.location : '',
  });

  type coords = {
    latitude: number;
    longitude: number;
  };

  const [coordinates, setCoordinates] = useState<coords>({
    latitude: setAutoLocation.lat,
    longitude: setAutoLocation.long,
  });

  const activateKeyForSetCordinates = (item: coords) => {
    setCoordinates({
      ...coordinates,
      latitude: item.latitude,
      longitude: item.longitude,
    });
  };

  //############################################################################################

  const onSubmit = data => {
    console.log(' check builder submit ');

    let retval = 1;

    if (propertyDetails.property_type === 'Commercial') {
      if (propertyDetails.transaction_type !== 'Bareshell') {
        if (propertyDetails.bhk === '') {
          retval = 0;

          toast.show('Property Listing', {
            type: 'warn_toast',
            animationDuration: 100,
            data: {
              title: 'Please select Rooms',
            },
            duration: 3000,
          });
        }
      }

      if (propertyDetails.property_sub_type === 'Industrial' && propertyDetails.property_type === 'Commercial') {
        if (propertyDetails.industry_type === '') {
          retval = 0;
          toast.show('Property Listing', {
            type: 'warn_toast',
            animationDuration: 100,
            data: {
              title: 'Please select Industrial Type',
            },
            duration: 3000,
          });
        }
      }

      if (
        propertyDetails.property_sub_type === 'Shop_And_Retail' &&
        (propertyDetails.transaction_type === '' || propertyDetails.type_of_showroom === '')
      ) {
        if (propertyDetails.shop_retail_type === '') {
          //console.log("value is ", propertyDetails.property_sub_type);
          retval = 0;
          toast.show('Property Listing', {
            type: 'warn_toast',
            animationDuration: 100,
            data: {
              title: 'Please select Showroom and Retail type',
            },
            duration: 3000,
          });
        }

        if (propertyDetails.shop_retail_type === 'Showroom') {
          if (propertyDetails.type_of_showroom === '') {
            retval = 0;
            // console.log(
            //   "sub value showroom is null ",
            //   propertyDetails.property_sub_type
            // );

            toast.show('Property Listing', {
              type: 'warn_toast',
              animationDuration: 100,
              data: {
                title: 'Please select Showroom Type',
              },
              duration: 3000,
            });
          }
        }

        if (propertyDetails.shop_retail_type === 'Retail') {
          if (propertyDetails.type_of_retail === '') {
            retval = 0;
            // console.log(
            //   "type of retails is null",
            //   propertyDetails.type_of_retail
            // );

            toast.show('Property Listing', {
              type: 'warn_toast',
              animationDuration: 100,
              data: {
                title: 'Please select Retails Type',
              },
              duration: 3000,
            });
          }
        }
      }
    }

    if (retval == 1) {
      navigation.navigate('BUILDER_POST_PROPERTY_TWO', {
        post1: {
          ...propertyDetails,
          // owner_contact_details: ownerd,
        },
      });
    }
  };

  const gotoMap = () => {
    navigation.navigate('PROPERTY_LOCATION_SCREEN', {
      locationdata: {
        activateKeyForSetCordinates: activateKeyForSetCordinates,
        initialRegionData: {
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        completeAddress: propertyDetails?.locality,
      },
    });
  };

  const gobackPost = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BOTTOM_TAB' }],
    });
  };

  const gotoprevious = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BOTTOM_TAB' }],
    });
  };

  const goClearPost = () => {
    setPropertyDetails({
      iwant: '',
      property_type: '',
      property_sub_type: '',
      shop_retail_type: '',
      industry_type: '',
      type_of_retail: '',
      type_of_showroom: '',
      hospitality_type: '',
      transaction_type: '',
      transaction_type_new: '',
      transaction_type_sub: '',
      ready_for_possession_by: '',
      gated_community: false,
      property_name: '',

      block_no: '',
      road_street_no: '',
      landmark: '',

      country: country,
      state: state,
      city: city,
      locality: city + ' ' + state + ' ' + pincode + ' ' + country,
      pincode: pincode,
      location: '',
    });

    setNewArr(iWant_builder);
    setIwanttype(iWant_builder[0].child);
    setPtype([]);
    setPtypesub([]);

    setCoordinates({
      latitude: latitude ? latitude : 17.447340964470474,
      longitude: longitude ? longitude : 78.3539102379411,
    });

    dispatch(clearPropertyStepTwoData());
    dispatch(clearPropertyStepThreeData());
    dispatch(clearPropertyStepFourData());
  };

  const gotonext = () => {
    onSubmit(propertyDetails);
  };

  //############################################ I want type selection

  const gotoSubscription = () => {
    setSubscriptionAlert(false);
    navigation.navigate('SUBSCRIPTIONS');
  };

  const activateKeyForIwant = (item: any, child: any) => {
    if (subscriptionAlert === false) {
      try {
        const userwant = item.label === 'Sell' ? item.label : 'Rent';

        // console.log(' userwant -->', userwant);

        getallSubscriptionQuery(userwant).then(res => {
          // console.log(' subscription data---> ', res?.data?.data[0]);

          // console.log(' subscription id ---> ', res?.data?.data[0]?.subscription_id);

          // console.log(' subscribed or not---> ', res?.data?.data[0]?.isSubscribed);

          if (Array.isArray(res?.data?.data) && res.data.data.length === 0) {
            setSubscriptionAlert(true);
          } else {
            setIwanttype(item?.child);

            setPropertyDetails({
              ...propertyDetails,
              iwant: item.label,
              property_type: '',

              property_sub_type: '',

              hospitality_type: '',
              industry_type: '',
              shop_retail_type: '',
              type_of_retail: '',
              type_of_showroom: '',
              transaction_type: '',
              transaction_type_new: '',
              transaction_type_sub: '',
              ready_for_possession_by: '',
            });
            setPtype([]);

            activateItem(item, item.key, iWant_builder, setNewArr);

            dispatch(setSubscriptionData(res?.data));
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  //################################# Property Type

  const activateKeyForPropertyTypes = (item: any, child: any) => {
    if (propertyDetails.iwant === '') {
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Listing',
        },
        duration: 3000,
      });
    } else {
      setPtype(child);
      setPropertyDetails({
        ...propertyDetails,
        property_type: item.label,

        property_sub_type: '',
        hospitality_type: '',
        industry_type: '',
        shop_retail_type: '',
        type_of_retail: '',
        type_of_showroom: '',
        transaction_type: '',
        transaction_type_new: '',
        transaction_type_sub: '',
        ready_for_possession_by: '',
      });

      activateItem(item, item.key, iwanttype, setIwanttype);
    }
  };

  //################################## Propety Sub type

  const activatePropTypeSubItem = (item: any, child: any) => {
    if (propertyDetails.iwant === '') {
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Listing',
        },
        duration: 3000,
      });
    } else if (propertyDetails.property_type === '') {
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Type',
        },
        duration: 3000,
      });
    } else {
      setPtypesub(child);
      setPropertyDetails({
        ...propertyDetails,
        property_sub_type: item.label,
        hospitality_type: '',
        industry_type: '',
        shop_retail_type: '',
        type_of_retail: '',
        type_of_showroom: '',
        transaction_type: '',
        transaction_type_new: '',
        transaction_type_sub: '',
        ready_for_possession_by: '',
      });

      activateItem(item, item.key, ptype, setPtype);
    }
  };

  //################################################### Property sub sub type

  const activatePropTypeSubItemChild = (item: any) => {
    if (propertyDetails.iwant === '') {
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Listing Type',
        },
        duration: 3000,
      });
    } else if (propertyDetails.property_type === '') {
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Type',
        },
        duration: 3000,
      });
    } else if (propertyDetails.property_sub_type === '') {
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Sub Type',
        },
        duration: 3000,
      });
    } else {
      setPropertyDetails({
        ...propertyDetails,

        hospitality_type: item.label,
        shop_retail_type: item.label,
        //industry_type: item.label,

        type_of_retail: '',
        type_of_showroom: '',
        transaction_type: '',
        transaction_type_new: '',
        transaction_type_sub: '',
        ready_for_possession_by: '',
      });

      setPropertySubShowroom(showroom_details);
      setpropertyindustrialDetails(industrial_details);
      setPropertySubRetil(retails_details);

      activateItem(item, item.key, ptypesub, setPtypesub);
    }
  };

  //####################################### Retail

  const activateKeyForPropertySubRetil = (item: any) => {
    const shallowCopy = [...propertySubRetail];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);

    setPropertySubShowroom(showroom_details);
    setpropertyindustrialDetails(industrial_details);

    setPropertyDetails({
      ...propertyDetails,
      type_of_retail: updatedArr,
      type_of_showroom: '',
      industry_type: '',
    });

    if (newFiltered.length === 0) {
      // console.log(' retails : ', retails_details);

      setPropertySubRetil(retails_details);

      setPropertyDetails({
        ...propertyDetails,
        type_of_retail: '',
        type_of_showroom: '',
        industry_type: '',
      });
    } else {
      setPropertySubRetil(updatedArr);
    }
  };

  // ################################################# Showroom

  const activateKeyForPropertySubShowroom = (item: any) => {
    const shallowCopy = [...propertySubShowroom];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);

    setPropertySubRetil(retails_details);
    setpropertyindustrialDetails(industrial_details);

    setPropertyDetails({
      ...propertyDetails,
      type_of_showroom: updatedArr,
      type_of_retail: '',
      industry_type: '',
    });

    if (newFiltered.length === 0) {
      setPropertySubShowroom(showroom_details);

      setPropertyDetails({
        ...propertyDetails,
        type_of_showroom: '',
        type_of_retail: '',
        industry_type: '',
      });
    } else {
      setPropertySubShowroom(updatedArr);
    }
  };

  //##################################### Industrial Type

  const activateKeyForPropertyIndustrial = (item: any) => {
    const shallowCopy = [...propertyindustrialDetails];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);

    const newFiltered = updatedArr.filter((item: any) => item.active === true);

    setPropertySubRetil(retails_details);
    setPropertySubShowroom(showroom_details);

    setPropertyDetails({
      ...propertyDetails,
      industry_type: updatedArr,
      type_of_showroom: '',
      type_of_retail: '',
    });

    if (newFiltered.length === 0) {
      setpropertyindustrialDetails(industrial_details);

      setPropertyDetails({
        ...propertyDetails,
        industry_type: '',
        type_of_showroom: '',
        type_of_retail: '',
      });
    } else {
      setpropertyindustrialDetails(updatedArr);
    }
  };

  //#################### useEffect  clear redux values

  useEffect(() => {
    dispatch(clearPropertyStepTwoData());
    dispatch(clearPropertyStepThreeData());
    dispatch(clearPropertyStepFourData());
  }, []);

  useLayoutEffect(() => {
    async function getLocation() {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        return;
      }
      setLocationLoader(true);

      if (setAutoLocation.lat === undefined && setAutoLocation.long === undefined) {
        setLocationLoader(true);
      } else {
        // Alert.alert('Can i fetch Current location ?');
        setCoordinates({
          latitude: setAutoLocation.lat,
          longitude: setAutoLocation.long,
        });

        setLocationLoader(false);
      }
    }

    getLocation();
  }, [setAutoLocation.lat, setAutoLocation.long]);

  useEffect(() => {
    setPropertyDetails({
      ...propertyDetails,
      pincode: locationdata.pincode,
      city: locationdata ? locationdata.city : '',
      locality: locationdata.formatedAddr,
      state: locationdata.state,
      location: locationdata.location,
    });
  }, [locationdata]);

  //########################################################################

  const controlConstraints = {
    iwant: { required: 'iwant Type is required' },
    property_type: { required: 'Property Type is required' },
    property_sub_type: { required: 'Property Sub Type is required' },

    property_name: {
      required: 'Property Name is required',
      maxLength: { value: 40, message: 'Maximum length of 40 characters exceeded' },
      validate: {
        noStartingSpace: value => {
          if (value.trimLeft() !== value) {
            return 'Property Name should not start with a space';
          }
          return true;
        },
      },
    },

    country: {
      required: 'Country Name is required',
    },
    state: {
      required: 'Country Name is required',
    },
    locality: {
      required: 'Country Name is required',
    },

    city: {
      required: 'City is required',
      maxLength: { value: 20, message: 'Maximum length of 20 characters exceeded' },
      validate: {
        noStartingSpace: value => {
          if (value.trimLeft() !== value) {
            return 'City should not start with a space';
          }
          return true;
        },
      },
    },
    pincode: {
      required: 'Pincode is required',
      maxLength: { value: 6, message: 'Maximum length of 6 characters exceeded' },
      pattern: {
        value: /^[0-9]{6}$/,
        message: 'Invalid Pincode number (must be 6 digits)',
      },
    },

    block_no: {
      maxLength: { value: 20, message: 'Maximum length of 20 characters exceeded' },
      validate: {
        noStartingSpace: value => {
          if (value.trimLeft() !== value) {
            return 'Block Number should not start with a space';
          }
          return true;
        },
      },
    },
    road_street_no: {
      maxLength: { value: 20, message: 'Maximum length of 20 characters exceeded' },
      validate: {
        noStartingSpace: value => {
          if (value.trimLeft() !== value) {
            return 'Road Street Number should not start with a space';
          }
          return true;
        },
      },
    },
    landmark: {
      maxLength: { value: 30, message: 'Maximum length of 30 characters exceeded' },
      validate: {
        noStartingSpace: value => {
          if (value.trimLeft() !== value) {
            return 'Landmark should not start with a space';
          }
          return true;
        },
      },
    },
  };

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
            <PropertyIwant
              control={control}
              controlConstraints={controlConstraints}
              data={newarr}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForIwant}
            />

            <PropertyType
              control={control}
              controlConstraints={controlConstraints}
              data={iwanttype}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForPropertyTypes}
            />

            <PropertySubType
              control={control}
              controlConstraints={controlConstraints}
              data={ptype}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activatePropTypeSubItem}
            />

            <PropertySubTypeSub
              control={control}
              controlConstraints={controlConstraints}
              data={ptypesub}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activatePropTypeSubItemChild}
            />

            <PropertyShopTypeRetail
              control={control}
              controlConstraints={controlConstraints}
              data={propertySubRetail}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForPropertySubRetil}
            />

            <PropertyShopTypeShowroom
              control={control}
              controlConstraints={controlConstraints}
              data={propertySubShowroom}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForPropertySubShowroom}
            />

            {/* //#################################### Industrial Type ################################################### */}

            <PropertyIndustrialTypes
              control={control}
              controlConstraints={controlConstraints}
              data={propertyindustrialDetails}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForPropertyIndustrial}
            />

            {/* //############################### Gated Community ################################################### */}

            <BuilderListingGatedCommunity
              control={control}
              controlConstraints={controlConstraints}
              checkingData={propertyDetails}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            {/* ############################### Location Details ###################################### */}

            {/* <PropertyLocationMap
              activateKeyForSetCordinates={activateKeyForSetCordinates}
              initialRegionData={{
                latitude: coordinates?.latitude,
                longitude: coordinates?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              details={propertyDetails}
              setDetails={setPropertyDetails}
            /> */}

            {locationLoader ? (
              <RNView
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: px(50),
                }}>
                <ActivityIndicator size={'small'} style={{ color: ColorTheme.onboardingButton, alignSelf: 'center' }} />
              </RNView>
            ) : (
              <PropertyLocationSelection
                activateKeyForSetCordinates={activateKeyForSetCordinates}
                initialRegionData={{
                  latitude: coordinates?.latitude,
                  longitude: coordinates?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                details={propertyDetails}
                setDetails={setPropertyDetails}
                gotoMap={gotoMap}
              />
            )}

            <PropertyLocationDetails
              control={control}
              controlConstraints={controlConstraints}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />
          </ScrollView>

          <DateTimePickerModal
            isVisible={toogleDatePicker}
            mode="date"
            minimumDate={new Date()}
            onConfirm={date => {
              //console.log(date);

              setPropertyDetails({
                ...propertyDetails,
                ready_for_possession_by: String(moment(date).format('YYYY-MM-DD')),
              });
              setToogleDatePicker(false);
            }}
            onCancel={() => setToogleDatePicker(false)}
          />

          <CommonButton
            title="Save & continue"
            disabled={!propertyDetails.iwant || !propertyDetails.property_type || !propertyDetails.property_sub_type}
            style={{
              backgroundColor:
                !propertyDetails.iwant || !propertyDetails.property_sub_type ? '#D2D2D2' : ColorTheme.primary,
              alignSelf: 'center',
              borderRadius: 5,

              paddingHorizontal: 10,
              marginVertical: 20,
            }}
            textStyle={{ color: ColorTheme.black }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>

      {subscriptionAlert && (
        <CustomAlertWrapper
          onClose={() => setSubscriptionAlert(false)}
          openModal={() => console.log('first')}
          text={'Please Upgrade subscription Plan'}
          head={'Subscription Plan'}>
          <PropertyCategoryChips
            item={{ label: 'Cancel', active: true }}
            containerStyle={{
              flex: 1,
            }}
            onPress={() => {
              setSubscriptionAlert(false);
            }}
            style={{
              backgroundColor: 'white',
            }}
          />
          <PropertyCategoryChips
            item={{ label: 'Subscribe' }}
            containerStyle={{
              flex: 1,
            }}
            onPress={() => gotoSubscription()}
            style={{
              backgroundColor: ColorTheme.primary,
            }}
            textStyle={{
              color: ColorTheme.black,
              fontWeight: 'bold',
            }}
          />
        </CustomAlertWrapper>
      )}
    </Container>
  );
};

export default BuilderPostProperty;
