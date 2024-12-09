import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';

import { Modal, ModalBackdrop } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import CitySelectorModal from '@/components/common/CitySelectorModal';
import HeaderBar from '@/components/common/HeaderBar';
import MapComponent from '@/components/common/MapComponent';
import StateSelectorModal from '@/components/common/StateSelectorModal';
import { mainCategory } from '@/constants/business/category';
import { validateCIN } from '@/constants/business/profile.functions';
import { isArray } from '@/constants/function/isArray';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

// import useGetLocation from '../../../../hooks/useGetLocation';
// import SelectModal from '../../components/SelectModal';
// import { isArray } from '../bussinessProfileEditing/functions/checkArrayData';
// import BottomSheetModal from './CommonComponent/BottomSheetModal';
// import BottomSheetMultiSelectModal from './CommonComponent/BottomSheetMultiSelectModal';
// import { mainCategory } from './data/category';
import { styles } from './styles';

type ele = {
  label?: string;
  value?: string;
  key?: string;
};
type coords = {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};
const CreateBusinessProfile = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategorySelected, setSubCategorySelected] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  // const [openGoogleDrawer, setOpenGoogleDrawer] = useState(false);
  const [openCityModal, setOpenCityModal] = useState(false);
  const [childLoading, setChildLoading] = useState(false);

  const [openStateModal, setOpenStateModal] = useState(false);
  const [openCinBtn, setCinBtn] = useState(false);
  //   const selectedData = useSelector((state: any) => state?.loginReducer);
  //loaction
  //   const [locationMutation, locationResult, locationError, locationLoading] = useGetLocation();
  const locationResult = {
    latitude: 17.447340964470474,
    longitude: 78.3539102379411,
  };
  // const [coordinates, setCoordinates] = useState<coords>({
  //   latitude: isArray(selectedData.user?.coordinate)
  //     ? selectedData.user?.coordinate[0]
  //     : locationResult?.latitude,
  //   longitude: isArray(selectedData.user?.coordinate)
  //     ? selectedData.user?.coordinate[1]
  //     : locationResult?.longitude,
  // });
  const [initialRegion, setInitialRegion] = useState<coords>({
    latitude: locationResult?.latitude ?? 17.447340964470474,
    longitude: locationResult?.longitude ?? 78.3539102379411,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // console.log(
  //   "selectedData.user?.coordinate",
  //   locationResult?.latitude,
  //   locationResult?.longitude
  // );
  //   useEffect(() => {
  //     if (locationError || (locationResult && Object.keys(locationResult).length <= 0)) {
  //       locationMutation.mutate();
  //     }
  //   }, [locationResult]);
  // const userLocation = useSelector(
  //   (state: any) => state?.homePageReducer?.userLocation?.coords
  // );

  const mapRef: any = useRef(null);

  // const [coordinates, setCoordinates] = useState({
  //   latitude: locationResult?.latitude ?? 17.447340964470474,
  //   longitude: locationResult?.longitude ?? 78.3539102379411,
  // });
  const [googleAutocompleteShow, setGoogleAutocompleteShow] = useState({
    text: '',
    open: false,
  });

  const [BusinessProfileData, setBusinessProfileData] = useState({
    // business_owner: selectedData?.user?.user?._id,
    business_name: '',
    mobile_no: '',
    email: '',
    cin_no: '',
    category: '',
    sub_category: [],
    location: '',
    isCinVerified: false,
    address_lane1: '',
    address_lane2: '',
    pincode: '',
    coordinate: {
      coordinates: [],
    },

    city: '',
    state: '',
  });
  //   useEffect(() => {
  //     setBusinessProfileData(prevData => ({
  //       ...prevData,
  //       location: googleAutocompleteShow.text,
  //     }));
  //   }, [googleAutocompleteShow]);

  const activateKeyForSetCordinates = (item: coords) => {
    // console.log("activateKeyForSetCordinates++++++++++++++++++");
    setInitialRegion(item);
    setBusinessProfileData(prevData => ({
      ...prevData,
      coordinate: {
        type: 'Point',
        coordinates: [item.longitude, item.latitude],
      },
    }));

    setInitialRegion(prevData => ({
      ...prevData,
      latitude: item.latitude,
      longitude: item.longitude,
    }));
  };

  //   const verifyCINNumber = async () => {
  //     setLoader(true);
  //     try {
  //       const response: any = await Apis.verifyCINApi(BusinessProfileData.cin_no);

  //       setBusinessProfileData(prevData => ({
  //         ...prevData,
  //         isCinVerified: true,
  //         business_name: response.data.data.company_name,
  //       }));
  //       setCinBtn(false);
  //       setLoader(false);
  //       // alert(response.status === 200 ? "CIN Verification Success" : "");
  //       if (response.status === 200) {
  //         toast.show(response.data.data.company_name, {
  //           type: 'custom_toast',
  //           animationDuration: 100,
  //           data: {
  //             title: 'CIN Verification Success',
  //           },
  //           duration: 3000,
  //         });
  //       }
  //     } catch (e) {
  //       setLoader(false);

  //       let value =
  //         e.response.status === 400
  //           ? 'Invalid CIN Number'
  //           : e.response.status === 500
  //             ? 'Something went wrong'
  //             : 'Invalid CIN Number';

  //       toast.show(value, {
  //         type: 'custom_toast',
  //         animationDuration: 100,
  //         data: {
  //           title: BusinessProfileData.cin_no,
  //         },
  //         duration: 3000,
  //       });
  //     }
  //   };

  const saveAndContinue = async () => {
    navigation.navigate('UPLOAD_BUSINESS_PIC', {
      step1: BusinessProfileData,
    });
  };

  //   useEffect(() => {
  //     if (BusinessProfileData.cin_no.length >= 21) {
  //       setCinBtn(true);
  //     } else if (BusinessProfileData.cin_no.length < 21) {
  //       setCinBtn(false);
  //     }
  //   }, [openCinBtn, BusinessProfileData.cin_no]);

  // const onRegionChangeComplete = (item) => {
  //   setInitialRegion(item);
  //   setBusinessProfileData((prevData) => ({
  //     ...prevData,
  //     coordinate: {
  //       type: "Point",
  //       coordinates: [item.longitude, item.latitude],
  //     },
  //   }));
  // };
  const isValid = () => {
    if (
      BusinessProfileData.business_name &&
      BusinessProfileData.category &&
      BusinessProfileData.sub_category &&
      BusinessProfileData.city &&
      BusinessProfileData.state &&
      BusinessProfileData.mobile_no.length === 10 &&
      BusinessProfileData.address_lane1 &&
      BusinessProfileData.address_lane2 &&
      BusinessProfileData.coordinate &&
      BusinessProfileData.pincode &&
      BusinessProfileData.email
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubCategoryString = () => {
    // let temp = subCategorySelected.map((item, ind) => {
    //   return item.value;
    // });
    return subCategorySelected.join(', ');
  };
  //   console.log('Business', BusinessProfileData);
  return (
    <Container hasHeader={true} isTab={false} backgroundColor="white">
      <HeaderBar backPress={() => navigation.goBack()} label="Tell us about your business" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <RNView style={styles.formView}>
          <CommonInput
            onChangeText={text => {
              setBusinessProfileData(prevData => ({
                ...prevData,
                cin_no: text,
                business_name: '',
              }));
            }}
            label="CIN Number/ Registration No."
            // rightIcon={
            //   openCinBtn && (
            //     <TouchableOpacity onPress={changeCINStatus}>
            //       <AntDesign name="edit" size={20} color="gray" />
            //     </TouchableOpacity>
            //   )
            // }
            placeholder="CIN Number/ Registration No."
            placeholderColor={ColorTheme.nearLukGray2}
            style={styles.inputStyle}
          />
          {BusinessProfileData.cin_no.length >= 21 && !validateCIN(BusinessProfileData.cin_no) && (
            <RNText style={styles.cinErrorText}>please enter a valid cin</RNText>
          )}
          {openCinBtn && BusinessProfileData.business_name === '' && BusinessProfileData.cin_no.length >= 21 && (
            <CommonButton
              disabled={loader}
              //   onPress={verifyCINNumber}
              loaderColor="black"
              loading={loader}
              title="Verify CIN"
              style={{
                marginBottom: 10,
              }}
            />
          )}
          <CommonInput
            value={BusinessProfileData.business_name}
            onChangeText={text => {
              setBusinessProfileData(prevData => ({
                ...prevData,
                business_name: text,
              }));
            }}
            label="Business Name *"
            placeholder="Enter business name"
            placeholderColor={ColorTheme.gray2}
            style={styles.inputStyle}
          />

          <CommonInput
            value={BusinessProfileData.category}
            onFocus={() => {
              setShowCategory(!showCategory);
              Keyboard.dismiss();
            }}
            label="Category *"
            placeholder="Select Category"
            placeholderColor={ColorTheme.nearLukGray2}
            style={styles.inputStyle}
          />
          <CommonInput
            value={handleSubCategoryString()}
            onFocus={() => {
              Keyboard.dismiss();
              setShowSubCategory(!showSubCategory);
              setSubCategorySelected([]);
            }}
            label="Sub Category *"
            placeholder="Select Sub Category"
            placeholderColor={ColorTheme.nearLukGray2}
            disabled={BusinessProfileData.category ? false : true}
            style={styles.inputStyle}
          />
          <CommonInput
            onChangeText={text => {
              setBusinessProfileData(prevData => ({
                ...prevData,
                mobile_no: text,
              }));
            }}
            label="Mobile Number *"
            placeholder="Enter business mobile"
            placeholderColor={ColorTheme.gray2}
            maxLength={10}
            style={styles.inputStyle}
            keyboardType={'phone-pad'}
          />
          <CommonInput
            onChangeText={text => {
              setBusinessProfileData(prevData => ({
                ...prevData,
                email: text,
              }));
            }}
            label="Email *"
            placeholder="Enter business email"
            placeholderColor={ColorTheme.gray2}
            style={styles.inputStyle}
          />
          <CommonInput
            onChangeText={text => {
              setBusinessProfileData(prevData => ({
                ...prevData,
                address_lane1: text,
              }));
            }}
            label="Address Line 1 *"
            placeholder="Address Line 1"
            placeholderColor={ColorTheme.gray2}
            style={styles.inputStyle}
          />
          <CommonInput
            onChangeText={text => {
              setBusinessProfileData(prevData => ({
                ...prevData,
                address_lane2: text,
              }));
            }}
            label="Address Line 2 *"
            placeholder="Address Line 2"
            placeholderColor={ColorTheme.gray2}
            style={styles.inputStyle}
          />
          {/* ######################MAP SECTION############## */}
          <RNView style={styles.mapTopView}>
            <RNView style={styles.mapTextView}>
              <RNText style={styles.mapText}>Select Location on map</RNText>
            </RNView>

            {/* <MapComponent
              onRegionChangeComplete={activateKeyForSetCordinates}
              activateKeyForSetCordinates={activateKeyForSetCordinates}
              initialRegionData={initialRegion}
              onPressHandler={data => {
                // console.log("++++++++++++++++", data);
                setBusinessProfileData(prevData => ({
                  ...prevData,
                  location: data.description,
                  city: data?.terms[data?.terms?.length - 3]?.value,
                  state: data?.terms[data?.terms?.length - 2]?.value,
                }));
                // setOpenGoogleDrawer(false);
              }}
              onDataChange={location => {
                setBusinessProfileData(prevData => ({
                  ...prevData,
                  location,
                }));
              }}
              searchInputStyle={styles.searchInput}
              mapStyle={styles.mapStyles}
            /> */}
          </RNView>
          <CommonInput
            value={BusinessProfileData.city}
            onFocus={() => {
              setOpenCityModal(true);
            }}
            label="City *"
            placeholder="City name"
            disabled={true}
            placeholderColor={ColorTheme.gray2}
            style={styles.inputStyle}
          />
          <CommonInput
            value={BusinessProfileData.state}
            onFocus={() => {
              setOpenStateModal(true);
            }}
            label="State *"
            placeholder="State name"
            disabled={true}
            placeholderColor={ColorTheme.gray2}
            style={styles.inputStyle}
          />
          <CommonInput
            onChangeText={text => {
              setBusinessProfileData(prevData => ({
                ...prevData,
                pincode: text,
              }));
            }}
            label="Pincode *"
            placeholder="Pincode"
            keyboardType={'numeric'}
            placeholderColor={ColorTheme.nearLukGray4}
            style={styles.inputStyle}
            maxLength={6}
          />
        </RNView>
      </ScrollView>
      <RNView style={styles.btnView}>
        <CommonButton
          //   disabled={isValid()}
          //   style={{
          //     backgroundColor: isValid() ? ColorTheme.nearLukGray4 : ColorTheme.primaryColor,
          //   }}
          title="Continue"
          onPress={saveAndContinue}
          textStyle={styles.btnText}
        />
      </RNView>

      {/* <BottomSheetModal
        showModal={showCategory}
        setShowModal={setShowCategory}
        setData={(e: string) => {
          setBusinessProfileData(prevData => ({
            ...prevData,
            category: e,
          }));
        }}
        setChild={(child: any) => {
          setSubCategory(child);
          setSubCategorySelected([]);
          setBusinessProfileData(prevData => ({
            ...prevData,
            sub_category: [],
          }));
        }}
        data={mainCategory}
        placeholder={'Select Category'}
      />
      <BottomSheetMultiSelectModal
        showModal={showSubCategory}
        setShowModal={setShowSubCategory}
        setData={(e: string[]) => {
          setBusinessProfileData(prevData => ({
            ...prevData,
            sub_category: e,
          }));
          setSubCategorySelected(e);
        }}
        setChild={(child: any) => {}}
        data={subCategory}
        placeholder="Select Sub Category"
        selectedSubCategory={subCategorySelected}
      />

      <CitySelectorModal
        showCity={openCityModal}
        setShowCity={setOpenCityModal}
        setCity={data => {
          setBusinessProfileData(prevData => ({
            ...prevData,
            city: data,
          }));
        }}
      />
      <StateSelectorModal
        setShowState={setOpenStateModal}
        showState={openStateModal}
        setState={data => {
          setBusinessProfileData(prevData => ({
            ...prevData,
            state: data,
          }));
        }}
      /> */}
    </Container>
  );
};

export default CreateBusinessProfile;
