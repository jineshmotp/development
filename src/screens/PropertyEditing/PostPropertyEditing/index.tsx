// Parent Component (PostProperty)
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { longFormatters } from 'date-fns';
import moment from 'moment';

import Loader from '@/components/common/Loader';
import PropertyHeader from '@/components/common/PropertyHeader';
import PropertyLocationDetails from '@/components/common/PropertyLocationDetails';
import PropertyLocationMap from '@/components/common/PropertyLocationMap';
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
import {
  industrial_details,
  iWant,
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
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectPropertyLocationData } from '@/redux/listing/listingReducer';
import { getUserData } from '@/redux/login/loginReducer';
import { useGetPropertyDetailsQuery } from '@/redux/property/propertyService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from '../styles';

const PostPropertyEditing = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'POST_PROPERTY_EDITING'>>();

  const currentStep = 1;
  const toast = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectedUserData = useAppSelector(getUserData);

  const { data, isLoading } = useGetPropertyDetailsQuery({
    property: route?.params?.BasicData?._id,
    property_owner: selectedUserData?._id,
    user: selectedUserData?._id,
  });

  // console.log(' value', data?.data);

  const iwant_val = data?.data?.property?.iwant;
  const property_type_val = data?.data?.property?.property_type;
  const property_sub_type_val = data?.data?.property?.property_sub_type;

  const [newarr, setNewArr] = useState(iWant);
  const [iwanttype, setIwanttype] = useState(iWant[0].child);

  const [ptype, setPtype] = useState(iWant[0].child[0].child);
  const [ptypesub, setPtypesub] = useState([]);

  const { latitude, longitude, city, pincode, state, country } = useLocation();

  const [transaction, setTransaction] = useState(transaction_type);
  const [transactionType, setTransactionType] = useState(transaction_type[0].child);
  const [transactionSubType, setTransactionSubType] = useState([]);

  const [toogleDatePicker, setToogleDatePicker] = useState(false);

  const [propertySubRetail, setPropertySubRetil] = useState(retails_details);
  const [propertySubShowroom, setPropertySubShowroom] = useState(showroom_details);
  const [propertyindustrialDetails, setpropertyindustrialDetails] = useState(industrial_details);

  const [load, setLoad] = useState(false);

  // console.log(' property value--->', data);

  const locationdata = useAppSelector(selectPropertyLocationData);

  const [propertyDetails, setPropertyDetails]: any = useState({
    iwant: data?.data?.property?.iwant || '',
    property_type: data?.data?.property?.property_type || '',
    property_sub_type: data?.data?.property?.property_sub_type || '',
    shop_retail_type: data?.data?.property?.shop_retail_type || '',
    industry_type:
      Array.isArray(data?.data?.property?.industry_type && data?.data?.property?.industry_type).length > 0
        ? data?.data?.property?.industry_type
        : '',
    type_of_retail:
      Array.isArray(data?.data?.property?.type_of_retail && data?.data?.property?.type_of_retail).length > 0
        ? data?.data?.property?.type_of_retail
        : '',
    type_of_showroom:
      Array.isArray(data?.data?.property?.type_of_showroom && data?.data?.property?.type_of_showroom).length > 0
        ? data?.data?.property?.type_of_showroom
        : '',
    hospitality_type: data?.data?.property?.hospitality_type || '',
    transaction_type: data?.data?.property?.transaction_type || '',
    transaction_type_new: data?.data?.property?.transaction_type_new || '',
    transaction_type_sub: data?.data?.property?.transaction_type_sub || '',
    ready_for_possession_by: data?.data?.property?.ready_for_possession_by || '',
    gated_community: data?.data?.property?.gated_community || false,
    property_name: data?.data?.property?.property_name || '',

    block_no: data?.data?.property?.block_no || '',
    road_street_no: data?.data?.property?.road_street_no || '',

    pincode: data?.data?.property?.pincode || '',
    landmark: data?.data?.property?.landmark || '',

    location: data?.data?.location?.coordinates || '',

    country: data?.data?.property?.country || '',
    state: data?.data?.property?.state || 'India',
    city: data?.data?.property?.city || '',
    locality: data?.data?.property?.locality || '',
  });

  type coords = {
    latitude: number;
    longitude: number;
  };

  const [coordinates, setCoordinates] = useState<coords>({
    latitude: data?.data?.location?.coordinates ? data?.data?.location?.coordinates[0] : latitude,
    longitude: data?.data?.location?.coordinates ? data?.data?.location?.coordinates[1] : longitude,
  });

  const activateKeyForSetCordinates = (item: coords) => {
    setCoordinates({
      ...coordinates,
      latitude: data?.data?.location?.coordinates[0],
      longitude: data?.data?.location?.coordinates[1],
    });
  };

  //############################################################################################

  const onSubmit = data => {
    let retval = 1;

    if (propertyDetails.property_type === 'Residential' && propertyDetails.iwant !== 'Coliving') {
      if (propertyDetails.transaction_type !== 'Bareshell') {
        if (propertyDetails.bhk === '') {
          retval = 0;
          //console.log("Retvalue : ", retval);

          toast.show('Property Listing', {
            type: 'custom_toast',
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
            type: 'custom_toast',
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
          type: 'custom_toast',
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
            type: 'custom_toast',
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
            type: 'custom_toast',
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
            type: 'custom_toast',
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
              type: 'custom_toast',
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
              type: 'custom_toast',
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
          type: 'custom_toast',
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
            type: 'custom_toast',
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
      navigation.navigate('POST_PROPERTY_TWO_EDITING', {
        post1: {
          ...propertyDetails,
          BasicData: route?.params?.BasicData,
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

    setNewArr(iWant);
    setIwanttype(iWant[0].child);
    setPtype([]);
    setPtypesub([]);
    setTransaction(transaction_type);
    setTransactionType([]);

    setTransactionSubType([]);

    setCoordinates({
      latitude: latitude ? latitude : 17.447340964470474,
      longitude: longitude ? longitude : 78.3539102379411,
    });
  };

  const gotonext = () => {
    onSubmit(propertyDetails);
  };

  //############################################ I want type selection

  const activateKeyForIwant = (item: any, child: any) => {
    toast.show('Property Editing', {
      type: 'custom_toast',
      animationDuration: 100,
      data: {
        title: "You can't change i want type",
      },
      duration: 3000,
    });
  };

  const activateKeyForIwantEdit = (item: any) => {
    activateItem(item, item.key, iWant, setNewArr);
  };

  //################################# Property Type

  const activateKeyForPropertyTypes = (item: any, child: any) => {
    toast.show('Property Editing', {
      type: 'custom_toast',
      animationDuration: 100,
      data: {
        title: "You can't change Property type",
      },
      duration: 3000,
    });
  };

  const activateKeyForPropertyTypesEdit = (item: any, child: any) => {
    activateItem(item, item.key, iwanttype, setIwanttype);
  };

  //################################## Propety Sub type

  const activatePropTypeSubItem = (item: any, child: any) => {
    toast.show('Property Editing', {
      type: 'custom_toast',
      animationDuration: 100,
      data: {
        title: "You can't change Property Sub type",
      },
      duration: 3000,
    });
  };

  const activatePropTypeSubItemEdit = (item: any) => {
    activateItem(item, item.key, ptype, setPtype);
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
        type: 'custom_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Listing Type',
        },
        duration: 3000,
      });
    } else if (propertyDetails.property_type === '') {
      toast.show('Property Listing', {
        type: 'custom_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Type',
        },
        duration: 3000,
      });
    } else if (propertyDetails.property_sub_type === '') {
      toast.show('Property Listing', {
        type: 'custom_toast',
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

  const activateKeyForPropertySubRetilLoading = (activelist: any[]) => {
    if (activelist.length > 0) {
      interface PropertyItem {
        active: boolean;
        key: string;
        label: string;
      }

      const updatedMainList = propertySubRetail.map((item: PropertyItem) => ({
        ...item,
        active: activelist.some((activeItem: PropertyItem) => activeItem.key === item.key),
      }));

      //console.log("update main list :", updatedMainList);

      setPropertySubRetil(updatedMainList);
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

  const activateKeyForPropertySubShowroomLoading = (activelist: any[]) => {
    if (activelist.length > 0) {
      interface PropertyItem {
        active: boolean;
        key: string;
        label: string;
      }

      const updatedMainList = propertySubShowroom.map((item: PropertyItem) => ({
        ...item,
        active: activelist.some((activeItem: PropertyItem) => activeItem.key === item.key),
      }));

      //console.log("update main list :", updatedMainList);

      setPropertySubShowroom(updatedMainList);
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

  const activateKeyForPropertyIndustrialLoading = (activelist: any[]) => {
    if (activelist.length > 0) {
      interface PropertyItem {
        active: boolean;
        key: string;
        label: string;
      }

      const updatedMainList = propertyindustrialDetails.map((item: PropertyItem) => ({
        ...item,
        active: activelist.some((activeItem: PropertyItem) => activeItem.key === item.key),
      }));

      setpropertyindustrialDetails(updatedMainList);
    }
  };

  //##################################### Transaction Type

  const activateKeyForTransaction = (item: any) => {
    if (propertyDetails.iwant === '') {
      toast.show('Property Listing', {
        type: 'custom_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Listing Type',
        },
        duration: 3000,
      });
    } else if (propertyDetails.property_type === '') {
      toast.show('Property Listing', {
        type: 'custom_toast',
        animationDuration: 100,
        data: {
          title: 'Please select Property Type',
        },
        duration: 3000,
      });
    } else if (propertyDetails.property_sub_type === '') {
      toast.show('Property Listing', {
        type: 'custom_toast',
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

  const activateKeyForTransactionEdit = (clickedItem: any) => {
    setTransaction(prevTransaction =>
      prevTransaction.map(item => ({
        ...item,
        active: item === clickedItem,
      }))
    );
  };

  //######################### Transaction sub type

  const activateTransTypeSubItem = (item: any, child: any) => {
    setTransactionSubType(item.child);

    if (propertyDetails.transaction_type === '') {
      toast.show('Property Listing', {
        type: 'custom_toast',
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

  const activateTransTypeSubItemEditing = (item: any) => {
    // console.log(' transaction sub typr ', item.child);

    activateItem(item, item.key, transactionType, setTransactionType);
  };

  const activateTransTypeDate = () => {
    setToogleDatePicker(true);
  };

  //#################################### Editing ######################################################

  useEffect(() => {
    setLoad(true);
    if (!data) return;

    const {
      iwant = '',
      property_type = '',
      property_sub_type = '',
      shop_retail_type = '',
      industry_type = [],
      type_of_retail = [],
      type_of_showroom = [],
      hospitality_type = '',
      transaction_type = '',
      transaction_type_new = '',
      transaction_type_sub = '',
      ready_for_possession_by = '',
      gated_community = false,
      property_name = '',
      block_no = '',
      road_street_no = '',
      pincode = '',
      landmark = '',
      country = 'India',
      state = '',
      city = '',
      locality = '',
    } = data?.data?.property || {};

    const coordinates = data?.data?.location?.coordinates || [0, 0];

    setPropertyDetails(prevDetails => ({
      ...prevDetails,
      iwant,
      property_type,
      property_sub_type,
      shop_retail_type,
      industry_type: Array.isArray(industry_type) && industry_type.length > 0 ? industry_type : '',
      type_of_retail: Array.isArray(type_of_retail) && type_of_retail.length > 0 ? type_of_retail : '',
      type_of_showroom: Array.isArray(type_of_showroom) && type_of_showroom.length > 0 ? type_of_showroom : '',
      hospitality_type,
      transaction_type,
      transaction_type_new,
      transaction_type_sub,
      ready_for_possession_by,
      gated_community,
      property_name,
      block_no,
      road_street_no,
      pincode,
      landmark,
      location: coordinates,
      country,
      state,
      city,
      locality,
    }));

    setCoordinates({
      latitude: coordinates[0],
      longitude: coordinates[1],
    });

    let subtypeVal;

    const iwant_val = iwant;
    const property_type_val = property_type;
    const property_sub_type_val = property_sub_type;
    const shop_retail_type_val = shop_retail_type;
    const hospitality_type_val = hospitality_type;
    const transaction_type_val = transaction_type;
    const transaction_type_new_val = transaction_type_new;

    const iwant_ActiveIndex = newarr.findIndex(item => item.label === iwant_val);
    if (iwant_ActiveIndex !== -1) {
      setIwanttype(newarr[iwant_ActiveIndex]?.child);
      activateKeyForIwantEdit(newarr[iwant_ActiveIndex]);
    }

    const property_type_ActiveIndex = iwanttype.findIndex(item => item.label === property_type_val);
    if (property_type_ActiveIndex !== -1) {
      activateKeyForPropertyTypesEdit(iwanttype[property_type_ActiveIndex], iwanttype[property_type_ActiveIndex].child);
      subtypeVal = iwanttype[property_type_ActiveIndex].child;
      setPtype(subtypeVal);
    }

    const property_sub_type_ActiveIndex = subtypeVal.findIndex(item => item.label === property_sub_type_val);

    if (property_sub_type_ActiveIndex !== -1) {
      setPtypesub(subtypeVal[property_sub_type_ActiveIndex].child);

      activatePropTypeSubItemEdit(subtypeVal[property_sub_type_ActiveIndex]);
    }

    const shop_retail_type_ActiveIndex = ptypesub.findIndex(item => item.label === shop_retail_type_val);
    if (shop_retail_type_ActiveIndex !== -1) {
      activatePropTypeSubItemChild(ptypesub[shop_retail_type_ActiveIndex]);
    }

    const hospitality_ActiveIndex = ptypesub.findIndex(item => item.label === hospitality_type_val);
    if (hospitality_ActiveIndex !== -1) {
      activatePropTypeSubItemChild(ptypesub[hospitality_ActiveIndex]);
    }

    activateKeyForPropertySubRetilLoading(type_of_retail);
    activateKeyForPropertySubShowroomLoading(type_of_showroom);
    activateKeyForPropertyIndustrialLoading(industry_type);

    const transaction_ActiveIndex = transaction.findIndex(item => item.label === transaction_type_val);
    if (transaction_ActiveIndex !== -1) {
      activateKeyForTransactionEdit(transaction[transaction_ActiveIndex]);
      setTransactionType(transaction[transaction_ActiveIndex].child);
    }

    const transaction_sub_ActiveIndex = transactionType.findIndex(item => item.label === transaction_type_new_val);
    if (transaction_sub_ActiveIndex !== -1) {
      activateTransTypeSubItemEditing(transactionType[transaction_sub_ActiveIndex]);
      setTransactionSubType(transactionType[transaction_sub_ActiveIndex].child);
    }

    setLoad(false);
  }, [data]);

  useEffect(() => {
    // console.log(' ptype value --->', ptype);

    const property_sub_type_val = data?.data?.property?.property_sub_type;

    const property_type_ActiveIndex = iwanttype.findIndex(item => item.label === property_sub_type_val);
    if (property_type_ActiveIndex !== -1) {
      activateKeyForPropertyTypesEdit(iwanttype[property_type_ActiveIndex], iwanttype[property_type_ActiveIndex].child);
    }
  }, [ptype]);

  useEffect(() => {
    const transaction_type_new_val = data?.data?.property?.transaction_type_new;
    // console.log(' transactionType value --->', transactionType);
    // console.log(' transaction_type_val --->', transaction_type_new_val);

    const transaction_sub_ActiveIndex = transactionType.findIndex(item => item.label === transaction_type_new_val);
    // console.log(' transaction sub type -->', transaction_sub_ActiveIndex);

    if (transaction_sub_ActiveIndex !== -1) {
      activateTransTypeSubItemEditing(transactionType[transaction_sub_ActiveIndex]);
    }
  }, [data?.data?.property?.transaction_type_new]);

  useEffect(() => {
    const gated_community = data?.data?.property?.gated_community;
    // console.log(' gated community--->', gated_community);
  }, [data?.data?.property?.gated_community]);

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
    // iwant: { required: 'iwant Type is required' },
    // property_type: {
    //   required: propertyDetails.iwant !== 'Coliving' ? 'Property Type is required' : false,
    // },
    // property_sub_type: { required: 'Property Sub Type is required' },
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
    // country: {
    //   required: 'Country Name is required',
    // },
    // state: {
    //   required: 'Country Name is required',
    // },
    // locality: {
    //   required: 'Country Name is required',
    // },
    // city: {
    //   required: 'City is required',
    //   maxLength: { value: 20, message: 'Maximum length of 20 characters exceeded' },
    //   validate: {
    //     noStartingSpace: value => {
    //       if (value.trimLeft() !== value) {
    //         return 'City should not start with a space';
    //       }
    //       return true;
    //     },
    //   },
    // },
    // pincode: {
    //   required: 'Pincode is required',
    //   maxLength: { value: 6, message: 'Maximum length of 6 characters exceeded' },
    //   pattern: {
    //     value: /^[0-9]{6}$/,
    //     message: 'Invalid Pincode number (must be 6 digits)',
    //   },
    // },
    // block_no: {
    //   maxLength: { value: 20, message: 'Maximum length of 20 characters exceeded' },
    //   validate: {
    //     noStartingSpace: value => {
    //       if (value.trimLeft() !== value) {
    //         return 'Block Number should not start with a space';
    //       }
    //       return true;
    //     },
    //   },
    // },
    // road_street_no: {
    //   maxLength: { value: 20, message: 'Maximum length of 20 characters exceeded' },
    //   validate: {
    //     noStartingSpace: value => {
    //       if (value.trimLeft() !== value) {
    //         return 'Road Street Number should not start with a space';
    //       }
    //       return true;
    //     },
    //   },
    // },
    // landmark: {
    //   maxLength: { value: 30, message: 'Maximum length of 30 characters exceeded' },
    //   validate: {
    //     noStartingSpace: value => {
    //       if (value.trimLeft() !== value) {
    //         return 'Landmark should not start with a space';
    //       }
    //       return true;
    //     },
    //   },
    // },
  };

  if (isLoading) {
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
        label="Editing Property"
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

            {/* {propertyDetails?.locality !== undefined ? ( */}
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
            {/* ) : (
              <Loader />
            )} */}

            <PropertyLocationDetails
              control={control}
              controlConstraints={controlConstraints}
              // data={data}
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
            disabled={false}
            style={{
              backgroundColor: ColorTheme.primary,
              alignSelf: 'center',
              borderRadius: 5,

              paddingHorizontal: 10,
              marginVertical: 20,
            }}
            textStyle={{ color: 'black' }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Container>
  );
};

export default PostPropertyEditing;
