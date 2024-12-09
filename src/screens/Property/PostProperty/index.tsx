// Parent Component (PostProperty)
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToast } from 'react-native-toast-notifications';

import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import CustomAlertWrapper from '@/components/common/CustomAlertWrapper';
import PropertyHeader from '@/components/common/PropertyHeader';
import PropertyLocationDetails from '@/components/common/PropertyLocationDetails';
// import PropertyLocationMap from '@/components/common/PropertyLocationMap';
import PropertyLocationSelection from '@/components/common/PropertyLocationSelection';
import PropertyGatedCommunity from '@/components/property/PropertyGatedCommunity';
import PropertyIndustrialTypes from '@/components/property/PropertyIndustrialTypes';
import PropertyIwant from '@/components/property/PropertyIwant';
import PropertyShopTypeRetail from '@/components/property/PropertyShopTypeRetail';
import PropertyShopTypeShowroom from '@/components/property/PropertyShopTypeShowroom';
import PropertySubType from '@/components/property/PropertySubType';
import PropertySubTypeColiving from '@/components/property/PropertySubTypeColiving';
import PropertySubTypeSub from '@/components/property/PropertySubTypeSub';
import PropertyType from '@/components/property/PropertyType';
import TransactionSubType from '@/components/property/TransactionSubType';
import TransactionSubTypeDate from '@/components/property/TransactionSubTypeDate';
import TransactionType from '@/components/property/TransactionType';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import {
  industrial_details,
  iWant,
  locationresult,
  retails_details,
  showroom_details,
  transaction_type,
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
import {
  clearPropertyStepFourData,
  clearPropertyStepThreeData,
  clearPropertyStepTwoData,
  selectPropertyLocationData,
  setPropertyLocationData,
  setSubscriptionData,
} from '@/redux/listing/listingReducer';
import {
  useGetAllSubscriptionOptionsQuery,
  useLazyGetAllSubscriptionOptionsQuery,
} from '@/redux/listing/listingService';
import { getLatLongData, setLatLongData } from '@/redux/nearu/nearuReducer';
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
        // console.log('You can use the location');
        return true;
      } else {
        // console.log('Location permission denied');
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

const PostProperty = () => {
  const dispatch = useAppDispatch();

  const currentStep = 1;
  const toast = useToast();
  const navigation = useNavigation();
  const locationdata = useAppSelector(selectPropertyLocationData);
  // console.log('location data --->', locationdata);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newarr, setNewArr] = useState(iWant);
  const [iwanttype, setIwanttype] = useState(iWant[0].child);
  const [ptype, setPtype] = useState([]);
  const [ptypesub, setPtypesub] = useState([]);

  const { latitude, longitude, city, pincode, state, country } = useLocation();

  const getLocation = useAppSelector(getLatLongData);
  const setAutoLocation = useAppSelector(setLatLongData);

  const [position, setPosition] = useState();

  const [transaction, setTransaction] = useState(transaction_type);
  const [transactionType, setTransactionType] = useState([]);
  const [transactionSubType, setTransactionSubType] = useState([]);

  const [locationLoader, setLocationLoader] = useState(true);

  const [toogleDatePicker, setToogleDatePicker] = useState(false);

  const [propertySubRetail, setPropertySubRetil] = useState(retails_details);
  const [propertySubShowroom, setPropertySubShowroom] = useState(showroom_details);
  const [propertyindustrialDetails, setpropertyindustrialDetails] = useState(industrial_details);

  const [getallSubscriptionQuery] = useLazyGetAllSubscriptionOptionsQuery();

  const [subscriptionAlert, setSubscriptionAlert] = useState(false);

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
    let retval = 1;

    // console.log(' Property Details : ', propertyDetails);

    if (propertyDetails.property_type === 'Residential' && propertyDetails.iwant !== 'Coliving') {
      if (propertyDetails.transaction_type !== 'Bareshell') {
        if (propertyDetails.bhk === '') {
          retval = 0;
          //console.log("Retvalue : ", retval);

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

      if (propertyDetails.transaction_type === 'New') {
        if (propertyDetails.transaction_type_new === '') {
          retval = 0;
          toast.show('Property Listing', {
            type: 'warn_toast',
            animationDuration: 100,
            data: {
              title: 'Please select Transaction sub type',
            },
            duration: 3000,
          });
        }
      }

      if (propertyDetails.transaction_type === '') {
        retval = 0;
        toast.show('Property Listing', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Please select Transaction type',
          },
          duration: 3000,
        });
      }
    }

    //  Commercial checking
    if (propertyDetails.property_type === 'Commercial' && propertyDetails.iwant !== 'Coliving') {
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

      if (propertyDetails.transaction_type === '' && propertyDetails.property_type !== 'Land or Plot') {
        retval = 0;
        toast.show('Property Listing', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Please select Transaction type',
          },
          duration: 3000,
        });
      }

      if (propertyDetails.transaction_type === 'New') {
        if (propertyDetails.transaction_type_new === '') {
          retval = 0;
          toast.show('Property Listing', {
            type: 'warn_toast',
            animationDuration: 100,
            data: {
              title: 'Please select Transaction sub type',
            },
            duration: 3000,
          });
        }
      }
    }

    if (retval == 1) {
      // console.log(' post one-->', propertyDetails);

      navigation.navigate('POST_PROPERTY_TWO', {
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

      // country: country,
      // state: state,
      // city: city,
      // locality: city + ' ' + state + ' ' + pincode + ' ' + country,
      // pincode: pincode,
      // location: '',
      country: country,
      state: state,
      city: city,
      locality: city + ' ' + state + ' ' + pincode + ' ' + country,
      pincode: pincode,
      location: '',
    });

    setNewArr(iWant);
    setIwanttype(iWant[0].child);
    setPtype([]);
    setPtypesub([]);
    setTransaction(transaction_type);
    setTransactionType([]);

    setTransactionSubType([]);

    // setCoordinates({
    //   latitude: latitude ? latitude : 17.447340964470474,
    //   longitude: longitude ? longitude : 78.3539102379411,
    // });

    setCoordinates({
      latitude: latitude,
      longitude: longitude,
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
    // console.log(' iwant value --->', item.label);

    if (subscriptionAlert === false) {
      try {
        const userwant = item.label === 'Sell'||item.lable==='Investment Sharing' ? 'Sell' : 'Rent';

        // console.log(' userwant -->', userwant);

        getallSubscriptionQuery(userwant).then(res => {
          // console.log(' subscription---------->', res?.data?.data);

          // if (res?.data?.data[0]?.skkk !== undefined) {
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
            setTransaction(transaction_type);
            setTransactionType([]);
            activateItem(item, item.key, iWant, setNewArr);

            dispatch(setSubscriptionData(res?.data));
          }

          // if(res?.data?.data[0])
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
      setTransaction(transaction_type);
      setTransactionType([]);
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
    } else if (propertyDetails.property_type === '' && propertyDetails.iwant !== 'Coliving') {
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
      setTransaction(transaction_type);
      setTransactionType([]);
      activateItem(item, item.key, ptype, setPtype);
    }
  };

  //########################################### Selecting Property subtype for Coliving #######################

  const activatePropTypeSubItemColiving = (item: any, child: any) => {
    //console.log(item);

    const shallowCopy = [...iwanttype];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);

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
    setTransaction(transaction_type);
    setTransactionType([]);
    activateItem(item, item.key, ptype, setPtype);
    setIwanttype(updatedArr);
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
      setTransaction(transaction_type);
      setPropertySubShowroom(showroom_details);
      setpropertyindustrialDetails(industrial_details);
      setPropertySubRetil(retails_details);
      setTransactionType([]);
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

  //##################################### Transaction Type

  const activateKeyForTransaction = (item: any) => {
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
        transaction_type: item.label,
      });

      setTransactionType(item.child);

      activateItem(item, item.key, transaction, setTransaction);
    }
  };

  //######################### Transaction sub type

  const activateTransTypeSubItem = (item: any, key: string) => {
    //console.log(' child values : ', item.child);

    setTransactionSubType(item.child);

    if (propertyDetails.transaction_type === '') {
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please Select Transaction type',
        },
        duration: 3000,
      });
    } else {
      setPropertyDetails({
        ...propertyDetails,

        transaction_type_new: item.label,
      });
      activateItem(item, item.key, transactionType, setTransactionType);
    }
  };

  const activateTransTypeDate = () => {
    setToogleDatePicker(true);
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

      // console.log(' location data --->', locationdata.location);

      // console.log(' Autolcoation --->', setAutoLocation);

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
    property_type: {
      // Conditional validation based on the value of propertyDetails.iwant
      required: propertyDetails.iwant !== 'Coliving' ? 'Property Type is required' : false,
    },
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
        label="Listing Property"
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

            <PropertySubTypeColiving
              control={control}
              controlConstraints={controlConstraints}
              data={iwanttype}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activatePropTypeSubItemColiving}
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

            <PropertyGatedCommunity
              control={control}
              controlConstraints={controlConstraints}
              checkingData={propertyDetails}
              details={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
            />

            {/* //############################## Transaction Type ########################################### */}

            <TransactionType
              control={control}
              controlConstraints={controlConstraints}
              data={transaction}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateKeyForTransaction}
            />

            <TransactionSubType
              control={control}
              controlConstraints={controlConstraints}
              data={transactionType}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateTransTypeSubItem}
            />

            <TransactionSubTypeDate
              control={control}
              controlConstraints={controlConstraints}
              data={transactionSubType}
              details={propertyDetails}
              checkingData={propertyDetails}
              setDetails={setPropertyDetails}
              errors={errors}
              activefunction={activateTransTypeDate}
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
                  // height: '50%',
                  // width: '50%',
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

          {propertyDetails.iwant !== 'Coliving' && (
            <CommonButton
              title="Save & continue"
              disabled={
                propertyDetails.iwant
                  ? false
                  : true || propertyDetails.property_type
                    ? false
                    : true || propertyDetails.property_sub_type
                      ? false
                      : true
              }
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
          )}

          {propertyDetails.iwant === 'Coliving' && (
            <CommonButton
              title="Save & continue"
              disabled={propertyDetails.property_sub_type === '' ? true : false}
              style={{
                backgroundColor: !propertyDetails.property_sub_type ? '#D2D2D2' : ColorTheme.primary,
                alignSelf: 'center',
                borderRadius: 5,

                paddingHorizontal: 10,
                marginVertical: 20,
              }}
              textStyle={{ color: 'black' }}
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </KeyboardAvoidingView>

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
      </SafeAreaView>
    </Container>
  );
};

export default PostProperty;
