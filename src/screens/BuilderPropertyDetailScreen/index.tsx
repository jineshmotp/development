import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as qs from 'qs';
import firestore from '@react-native-firebase/firestore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BuilderPropertyImageBackground from '@/components/builder/BuilderPropertyImageBackground';
import DefaultPropertyImage from '@/components/common/DefaultPropertyImage';
import Divider from '@/components/common/Divider';
import Loader from '@/components/common/Loader';
import ModalWrapper from '@/components/common/ModalWrapper';
import BuilderPropertyAdditionalDetails from '@/components/property/BuilderPropertyAdditionalDetails';
import PropertyBroucherDetails from '@/components/property/PropertyBroucherDetails';
import PropertyDescriptionDetails from '@/components/property/PropertyDescriptionDetails';
import PropertyDocumentDetails from '@/components/property/PropertyDocumentDetails';
import PropertyHighlights from '@/components/property/PropertyHighlights';
import PropertyLayoutDetails from '@/components/property/PropertyLayoutDetails';
import PropertyOwnerPostDetails from '@/components/property/PropertyOwnerPostDetails';
import PropertyVerificationDetails from '@/components/property/PropertyVerificationDetails';
import PropertySimilar from '@/components/PropertySimilar';
import { isValidURL, propertyRequestCallback } from '@/constants/function/property.helper';
import { activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useRequestForBusinessChatMutation } from '@/redux/builder/builderService';
import { useLazyGetPropertyByPropertyIdQuery } from '@/redux/listing/listingService';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useLazyRequestPhotoPropertyQuery,
  useLazySimilarPropertiesQuery,
  usePropertyFavUnfavMutation,
  useRequestForCallbackMutation,
  useRequestForChatMutation,
} from '@/redux/login/loginService';
import { useGetPropertyDetailsQuery } from '@/redux/property/propertyService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

import IndustryType from '../../components/property/IndustryType';
import PropertyAdditionalContactDetails from '../../components/property/PropertyAdditionalContactDetails';
import PropertyAdditionalDetails from '../../components/property/PropertyAdditionalDetails';
import PropertyBasicDetails from '../../components/property/PropertyBasicDetails';
import PropertyDetails from '../../components/property/PropertyDetails';
import PropertyFeatureDetails from '../../components/property/PropertyFeatureDetails';
import PropertyListDetails from '../../components/property/PropertyListingDetails';
import PropertyPicCarousel from '../../components/property/PropertyPicCarousel';
import PropertyPriceDetails from '../../components/property/PropertyPriceDetails';
import ShopandRetailType from '../../components/property/ShopandRetailType';
import SocietyFeatureDetails from '../../components/property/SocietyFeatureDetails';
import WaterSourcesDetails from '../../components/property/WaterSourcesDetails';
import { styles } from './styles';
import PropertyUniqueIDDetails from '@/components/property/PropertyUniqeIDDetails';

const BuilderPropertyDetailScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_PROPERTY_DETAILS'>>();

  const selectedUserData = useAppSelector(getUserData);
  const [requestForChatMutation] = useRequestForBusinessChatMutation();
  const [requestForCallbackMutation] = useRequestForCallbackMutation();
  const [requestPhotoProperty] = useLazyRequestPhotoPropertyQuery();
  const [similarData] = useLazySimilarPropertiesQuery();
  const toast = useToast();

  const [reqCallbackModelBool, setReqCallbackModelBool] = useState(false);
  const [name, setName] = useState('');

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [agreeBool, setAgreeBool] = useState(false);

  const [requestList, setRequestList] = useState(propertyRequestCallback);

  const [getPropertybyIdQuery] = useLazyGetPropertyByPropertyIdQuery();

  const { data, isLoading } = useGetPropertyDetailsQuery({
    property: route?.params?.id,
    property_owner: route?.params?.businessId,
    user: selectedUserData?._id,
  });

  // console.log(' prop value ----->', data?.data);

  const [favorite, setFavorite] = useState(data?.data?.isFav || false);

  const [isConnectVal, setIsConnectVal] = useState(data?.data?.isConnected);

  const [requestSent, setRequestSent] = useState(data?.data?.isChat);

  const [isEnquiredChange, setisEnquiredChange] = useState(data?.data?.isEnquired);

  const [interestList, setInterestList] = useState([]);

  const [siteVisit, setSiteVisit] = useState([]);
  const [agreesite, setAgreeSite] = useState(false);

  const [propertyFavUnfavMutation] = usePropertyFavUnfavMutation();
  const [similarPropertyData, setSimilarPropertyData] = useState('');
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [loadingSimilarProperties, setLoadingSimilarProperties] = useState(false);

  useEffect(() => {
    setLoadingSimilarProperties(true);
    scrollToTop();
    const getData = () => {
      similarData(payloadData())
        .then(res => {
          // console.log('cheking on the response=======>>>>', JSON.stringify(res));
          // setHistoryData(res?.data);
          setSimilarPropertyData(res?.data);
          setTimeout(() => {
            setLoadingSimilarProperties(false); // Hide loader after 1 second
          }, 500);
        })
        .catch(err => {
          console.log('cheingon on errorr======>>>', JSON.stringify(err));
        });
    };
    getData();
  }, [data?.data?.property]);
  const payloadData = () => {
    const similarPropertyPayload = {
      pageNumber: '1',
      pageSize: '10',
      property_type: data?.data?.property?.property_type,
      property_for: data?.data?.property?.iwant,
      city: data?.data?.property?.city,
      lat: data?.data?.location?.coordinates[0],
      lng: data?.data?.location?.coordinates[1],
      property_sub_type: data?.data?.property?.property_sub_type,
      bhk: data?.data?.property?.bhk,
      property_price: data?.data?.property?.property_price,
    };
    // console.log('similarPropertyPayload =====>', similarPropertyPayload);

    // console.log('qs.stringify(similarPropertyPayload) ======>', qs.stringify(similarPropertyPayload));
    return qs.stringify(similarPropertyPayload);
  };

  const activateKeyForInterest = (item: string) => {
    // console.log(' item values----->', item);

    const shallowCopy = [...requestList];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    setRequestList(updatedArr);
    // Filter newFiltered to include only the selected items
    const selectedItems = newFiltered.filter((item: any) => item.active);
    // Extract labels from selected items
    const selectedLabels = selectedItems.map((item: any) => item.label);
    setInterestList(selectedLabels);
  };

  const activateKeyForSitvisit = () => {
    // console.log('site visit----->', siteVisit);

    const a = ['I am Interested in Site visit'];

    setSiteVisit(a);
    setAgreeSite(true);
  };

  //#########################################################

  const gettingPropDetails = () => {
    const payload = {
      property: route?.params?.id,
      property_owner: route?.params?.businessId,
      user: selectedUserData?._id,
    };

    // console.log(' property one payload ------>', payload);

    getPropertybyIdQuery(payload).then(response => {
      // console.log(' Response data from useEffect---------->', response?.data?.data);

      setisEnquiredChange(response?.data?.data?.isEnquired);

      setRequestSent(response?.data?.data?.isChat);
      setIsConnectVal(response?.data?.data?.isConnected);
      setFavorite(response?.data?.data?.isFav);
    });
  };

  //############ Fav button

  const handleUnFavourite = () => {
    const payload = {
      property: data?.data?._id,
      user: selectedUserData?._id,
    };
    // console.log('payload+++++ from handlingfavorite', payload);
    try {
      propertyFavUnfavMutation(payload).then(result => {
        // console.log('handlePropertyPostFavUnFav', result?.data?.status);
        if (result?.data?.status) {
          // console.log('handlePropertyPostFavUnFav+++');
          setFavorite(!favorite);
          setTimeout(() => {}, 1000);
        } else {
          handleUnFavourite();
          gettingPropDetails();
        }
      });
    } catch (err) {
      console.log('errorrr', err);
    }
  };

  //################ Request Photo

  const handleRequestPhoto = async () => {
    console.log('clicking');

    let propid = data?.data?.property?._id;

    console.log(' prop id', propid);

    await requestPhotoProperty({
      id: propid,
    })
      .then(response => {
        // console.log('-=-=-=-=RESP==========>', response, response?.data);
        if (response?.data?.status) {
          toast.show('Photo Requested Successfully...!', {
            type: 'success_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        } else {
          toast.show('Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      })
      .catch(err => {
        console.log('errrrr', err);
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      });
  };

  const requestChat = chatId => {
    const chatpayload = {
      sender: selectedUserData?._id,
      receiver: route?.params?.businessId,
      businessId: route?.params?.businessId,
      propertyId: route?.params?.id, //propertyId
      ownerId: route?.params?.businessId,
      userId: selectedUserData?._id,
      requested_for_message: 'I wanna buy this property',
      chatId: chatId,
    };

    // console.log(' payload for chatpayload--->', chatpayload);

    requestForChatMutation({
      sender: selectedUserData?._id,
      receiver: route?.params?.businessId,
      businessId: route?.params?.businessId,
      propertyId: route?.params?.id, //propertyId
      ownerId: route?.params?.businessId,
      userId: selectedUserData?._id,
      requested_for_message: 'I wanna buy this property',
      chatId: chatId,
    }).then(response => {
      // console.log(' caht request response ---', response);

      if (response?.data?.status) {
        toast.show('Chat Request Sent Successfully', {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Success',
          },
          duration: 3000,
        });
      } else {
        // console.log(' response--->', response);

        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Please try once',
          },
          duration: 3000,
        });
      }
    });
  };

  const sendChatRequest = async (userId: any, receiverId: any) => {
    const chat_id = firestore().collection('chat_requests').doc().id;
    const payload = {
      chatId: chat_id,
      senderId: userId,
      receiverId: receiverId,
      status: false,
    };

    // console.log('payload+++++++++', payload);

    firestore()
      .collection('chat_requests')
      .add(payload)
      .then(res => {
        // console.log('Chat request sent.');
        // console.log('respooo', res);
        setRequestSent(true);
        setIsConnectVal('Pending');
        requestChat(chat_id);
      });
  };
  const requestForChat = async () => {
    // console.log(' sender user id --> ', selectedUserData?._id);

    // console.log(' receiver business id --> ', route?.params?.businessId);

    const success = await sendChatRequest(selectedUserData?._id, route?.params?.businessId);
    if (success) {
      setRequestSent(true);
    } else {
      setRequestSent(false);
    }
  };

  const closeReqModal = () => {
    setName('');
    setMobile('');
    setEmail('');
    setAgreeBool(false);
    setAgreeSite(false);

    setInterestList([]);

    setReqCallbackModelBool(false);
  };

  const requestCallback = () => {
    requestForCallbackMutation({
      propertyId: route?.params?.id,
      ownerId: route?.params?.businessId,
      userId: selectedUserData?._id,
      username: name,
      email: email,
      terms: agreesite,
      mobile_no: mobile,
      intrested: [],
      site_visit: [],
    }).then(response => {
      if (response?.data?.status) {
        toast.show('Callback Request Sent Successfully', {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Success',
          },
          duration: 3000,
        });
        closeReqModal();
        gettingPropDetails();
      } else {
        // console.log(response, '  = = - response   ');
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Please try once',
          },
          duration: 3000,
        });
      }
    });
  };

  const renderButtonFun = (chatVal, connectVal) => {
    // console.log('renderButtonFun', chatVal, connectVal);
    if (chatVal === false) {
      return requestForChat();
    } else {
      if (connectVal === 'Pending') {
        return () => {
          console.log('pending');
        };
      }
      if (connectVal === 'Rejected') {
        return () => {
          console.log('Rejected');
        };
      }
      if (connectVal === 'Accepted') {
        return navigation.navigate('CHAT');
      } else {
        return requestForChat();
      }
    }
    gettingPropDetails();
  };

  const renderButtonName = (chatVal, connectVal) => {
    // console.log('chatVal', chatVal, connectVal);
    if (chatVal === false) {
      return 'Request Chat';
    } else {
      if (connectVal === 'Pending') {
        return 'Pending';
      }
      if (connectVal === 'Rejected') {
        return 'Rejected';
      }
      if (connectVal === 'Accepted') {
        return 'Chat';
      } else {
        return 'Request Chat';
      }
    }
  };

  const handleRequestButtonPress = () => {
    console.log(' Button Press');

    if (isEnquiredChange === null || isEnquiredChange === false) {
      setName(selectedUserData?.fname + ' ' + selectedUserData?.lname);
      setMobile(selectedUserData?.mobile_no);
      setEmail(selectedUserData?.email);
      setReqCallbackModelBool(true);
    }
  };

  useLayoutEffect(() => {
    gettingPropDetails();
  }, []);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const validateReqCallbackBool =
    name?.length > 3 && mobile?.length >= 10 && email?.length > 3 && emailRegex?.test(email) !== false && agreeBool;

  // console.log('data?.data?.property', data?.data?.property?.gallery);

  const scrollToTop = () => {
    setIsScrollTo(!isScrollTo);
    scrollViewRef?.current?.scrollTo({ y: 0, animated: true }); // Scroll to top
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container isTab={false} hasHeader={false} backgroundColor="white">
      {loadingSimilarProperties && <Loader size={'small'} color={ColorTheme.primary} />}
      <StatusBar hidden={true} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}>
        {data?.data?.property?.gallery?.length ? (
          isValidURL(data?.data?.property?.gallery[0]?.url) ? (
            <PropertyPicCarousel
              details={data?.data?.property}
              Photos={data?.data?.property?.gallery}
              handleUnFavourite={handleUnFavourite}
              favValue={favorite}
            />
          ) : (
            <BuilderPropertyImageBackground
              details={data?.data?.property}
              goBack={() => navigation.goBack()}
              url={data?.data?.property?.gallery[0]?.url}
              category={data?.data?.property?.gallery[0]?.category}
              handleUnFavourite={handleUnFavourite}
              favValue={favorite}
            />
          )
        ) : (
          <DefaultPropertyImage
            details={data?.data?.property}
            goBack={() => navigation.goBack()}
            url={data?.data?.property?.gallery[0]?.url}
            handleRequestPhoto={handleRequestPhoto}
            handleUnFavourite={handleUnFavourite}
            favValue={favorite}
          />
        )}

        <PropertyBasicDetails details={data?.data} />
        {selectedUserData?._id !== data?.data?.owned_by && (
          <>
            <RNView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <CommonButton
                title={`${renderButtonName(requestSent || data?.data?.isChat, isConnectVal ?? data?.data?.isConnected)}`}
                onPress={() => renderButtonFun(requestSent || data?.data?.isChat, data?.data?.isConnected)}
                style={[
                  requestSent || data?.data?.isChat
                    ? { width: px(120), borderRadius: px(100) }
                    : { width: px(150), borderRadius: px(100) },
                ]}
                textStyle={{ color: 'black' }}
              />
              {/* <CommonButton
                title="Request Callback"
                style={styles.callBackBtn}
                textStyle={{ color: 'black' }}
                onPress={() => {
                  setName(selectedUserData?.fname + ' ' + selectedUserData?.lname);
                  setMobile(selectedUserData?.mobile_no);
                  setEmail(selectedUserData?.email);
                  data?.isEnquired
                    ? setReqCallbackModelBool(true)
                    : toast.show('Already Requested', {
                        type: 'success_toast',
                        animationDuration: 100,
                        data: {
                          title: 'Please try once',
                        },
                        duration: 3000,
                      });
                }}
              /> */}

              <CommonButton
                title={isEnquiredChange !== true ? 'Request Callback' : 'Enquired'}
                style={styles.callBackBtn}
                textStyle={{ color: 'black' }}
                onPress={handleRequestButtonPress}
                disabled={isEnquiredChange === true ? true : false}
              />
            </RNView>

            <Divider
              borderColor="#D9D6D6"
              dividerWidth={deviceWidth}
              style={{
                marginVertical: 10,
              }}
            />
          </>
        )}
        {/* <PropertyOwnderDisplayDetails details={data?.data?.property} /> */}
        <PropertyOwnerPostDetails details={data?.data} />
        <PropertyListDetails details={data?.data?.property} />
        <PropertyVerificationDetails details={data?.data?.property} />
        <PropertyAdditionalContactDetails details={data?.data?.property} />
        <PropertyDetails details={data?.data?.property} />
        <BuilderPropertyAdditionalDetails details={data?.data?.property} />
        <PropertyPriceDetails details={data?.data?.property} />
        <ShopandRetailType details={data?.data?.property} />
        <IndustryType details={data?.data?.property} />
        {/* <PropertyFurnishingStatus details={data?.data?.property} /> */}
        <SocietyFeatureDetails details={data?.data?.property} />
        <PropertyFeatureDetails details={data?.data?.property} />
        <WaterSourcesDetails details={data?.data?.property} />
        {/* <ParkingDetails details={data?.data?.property} /> */}
        <PropertyDocumentDetails details={data?.data?.property} />
        <PropertyLayoutDetails details={data?.data?.property} />

        <PropertyBroucherDetails details={data?.data?.property} />

        <PropertyHighlights details={data?.data?.location} />
        <PropertyDescriptionDetails details={data?.data?.property} />
        <RNView style={{ marginTop: px(20) }}>
          <RNView style={styles.headView}>
            <RNText style={styles.headText}>Similar Properties</RNText>
          </RNView>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingRight: 20, gap: 10, paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}>
            {similarPropertyData?.data?.map((item, index) => {
              return (
                <RNView key={index}>
                  <PropertySimilar data={item} />
                </RNView>
              );
            })}
          </ScrollView>
        </RNView>
        <PropertyUniqueIDDetails details={data?.data?.property} />
      </ScrollView>
      <ModalWrapper
        header={true}
        visible={reqCallbackModelBool}
        onClose={() => setReqCallbackModelBool(false)}
        modalWidth={deviceWidth / 1.09}
        modalHeight={deviceHeight / 1.1}
        modalStyle={{ borderRadius: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <>
          <ScrollView showsHorizontalScrollIndicator={false} style={{ paddingBottom: 200 }}>
            <RNView style={styles.topCloseView}>
              <RNText style={styles.modalHeading}>Share your details</RNText>
              <TouchableOpacity onPress={() => setReqCallbackModelBool(false)}>
                <RNText style={styles.closeButton}>X</RNText>
              </TouchableOpacity>
            </RNView>

            <RNView style={styles.reqCallbackWrapper}>
              <RNView style={styles.modalForm}>
                {data?.data?.property?.property_name ? (
                  <RNText style={styles.addressTitle}>{`${data?.data?.property?.property_name}`}</RNText>
                ) : (
                  <RNView></RNView>
                )}
                {data?.data?.property?.bhk ? (
                  <RNText style={styles.addressTitle2}>
                    {`${data?.data?.property?.bhk} ${data?.data?.property?.property_sub_type}`}
                  </RNText>
                ) : (
                  <RNView></RNView>
                )}
                <RNText style={styles.addressDetail}>{data?.data?.property?.locality}</RNText>
                <RNText style={styles.inputLabel}>Name</RNText>
                <TextInput
                  numberOfLines={1}
                  placeholder={`Enter Name`}
                  onChangeText={e => setName(e)}
                  value={name}
                  style={styles.inputStyle}
                />
                <RNText style={styles.inputLabel}>Mobile</RNText>
                <TextInput
                  numberOfLines={1}
                  placeholder={`Enter Mobile`}
                  onChangeText={e => setMobile(e)}
                  value={mobile}
                  style={styles.inputStyle}
                />
                <RNText style={styles.inputLabel}>Email</RNText>
                <TextInput
                  numberOfLines={1}
                  placeholder={`Enter Email`}
                  onChangeText={e => setEmail(e)}
                  value={email}
                  style={styles.inputStyle}
                />
              </RNView>

              {/* <RNView style={styles.agreeWrap}>
                <PropertyChipsetWithIconSelectionNormal data={requestList} activefunction={activateKeyForInterest} />
              </RNView>

              <RNView style={styles.agreeWrap}>
                <Pressable
                  style={[styles.checkboxBase, { borderRadius: 5 }, agreesite && styles.checkboxChecked]}
                  onPress={activateKeyForSitvisit}>
                  {agreesite && <Ionicons name="checkmark" size={14} color="white" />}
                </Pressable>
                <RNText style={styles.disclaimer}>I am Interested in Site visit</RNText>
              </RNView> */}

              <RNView style={styles.agreeWrap}>
                <Pressable
                  style={[styles.checkboxBase, { borderRadius: 5 }, agreeBool && styles.checkboxChecked]}
                  onPress={() => setAgreeBool(!agreeBool)}>
                  {agreeBool && <Ionicons name="checkmark" size={14} color="white" />}
                </Pressable>
                <RNText style={styles.disclaimer}>
                  I agree to be contacted by NearLuk for similar properties or related services via WhatsApp, phone,
                  sms, e-mail etc.
                </RNText>
              </RNView>

              <CommonButton
                title="Submit"
                disabled={!validateReqCallbackBool}
                style={{
                  paddingHorizontal: px(10),
                  backgroundColor: !validateReqCallbackBool ? ColorTheme.gray2 : ColorTheme.primary,
                  width: deviceWidth / 2,
                }}
                onPress={requestCallback}
              />
            </RNView>
          </ScrollView>
        </>
      </ModalWrapper>
    </Container>
  );
};

export default BuilderPropertyDetailScreen;
