import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as qs from 'qs';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import DefaultPropertyImage from '@/components/common/DefaultPropertyImage';
import Divider from '@/components/common/Divider';
import Loader from '@/components/common/Loader';
import ModalWrapper from '@/components/common/ModalWrapper';
import PropertyDocumentDetails from '@/components/property/PropertyDocumentDetails';
import PropertyHighlights from '@/components/property/PropertyHighlights';
import PropertyOwnerPostDetails from '@/components/property/PropertyOwnerPostDetails';
import PropertyUniqueIDDetails from '@/components/property/PropertyUniqeIDDetails';
import PropertyVerificationDetails from '@/components/property/PropertyVerificationDetails';
import PropertySimilar from '@/components/PropertySimilar';
import { chatTimefromTimestamp } from '@/constants/function/chat.function';
import {
  formatNumberWithNoCurrency,
  formatNumberWithNotation,
  isValidURL,
  propertyRequestCallback,
} from '@/constants/function/property.helper';
import { activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import {
  useLazyGetPropertyByPropertyIdQuery,
  useLazyGetTaggingPostDetailsQuery,
  useShareInvestmentPropertyMutation,
  useTaggingPropertyChatMutation,
} from '@/redux/listing/listingService';

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
import ParkingDetails from '../../components/property/ParkingDetails';
import PropertyAdditionalContactDetails from '../../components/property/PropertyAdditionalContactDetails';
import PropertyAdditionalDetails from '../../components/property/PropertyAdditionalDetails';
import PropertyBasicDetails from '../../components/property/PropertyBasicDetails';
import PropertyDescriptionDetails from '../../components/property/PropertyDescriptionDetails';
import PropertyDetails from '../../components/property/PropertyDetails';
import PropertyFeatureDetails from '../../components/property/PropertyFeatureDetails';
import PropertyFurnishingStatus from '../../components/property/PropertyFurnishingStatus';
import PropertyImageBackground from '../../components/property/PropertyImageBackground';
import PropertyListDetails from '../../components/property/PropertyListingDetails';
import PropertyPicCarousel from '../../components/property/PropertyPicCarousel';
import PropertyPriceDetails from '../../components/property/PropertyPriceDetails';
import ShopandRetailType from '../../components/property/ShopandRetailType';
import SocietyFeatureDetails from '../../components/property/SocietyFeatureDetails';
import WaterSourcesDetails from '../../components/property/WaterSourcesDetails';
import { styles } from './styles';

const PropertyDetailScreen = () => {
  const scrollViewRef = useRef(null); // Create a ref for the ScrollView

  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PROPERTY_DETAILS'>>();

  const selectedUserData = useAppSelector(getUserData);
  const [requestForChatMutation] = useRequestForChatMutation();
  const [requestForCallbackMutation] = useRequestForCallbackMutation();
  const [tagChatProperty] = useTaggingPropertyChatMutation();
  const toast = useToast();

  const [reqCallbackModelBool, setReqCallbackModelBool] = useState(false);
  const [name, setName] = useState('');

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [agreeBool, setAgreeBool] = useState(false);
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [isInvestment, setIsInvestment] = useState(false);
  const [isPropertySharing, setIsPropertySharing] = useState(false);
  const [loadingSimilarProperties, setLoadingSimilarProperties] = useState(false);
  const [isProperty, setIsProperty] = useState(false);
  const [taggedPropertyList, setTaggedPropertyList] = useState();

  const [similarData] = useLazySimilarPropertiesQuery();
  const [getPropertybyIdQuery] = useLazyGetPropertyByPropertyIdQuery();

  const { data, isLoading } = useGetPropertyDetailsQuery({
    property: route?.params?.id,
    property_owner: route?.params?.owner,
    user: selectedUserData?._id,
  });

  // console.log(' Property Details Screen', JSON.stringify(route));

  const [favorite, setFavorite] = useState(data?.data?.isFav || false);

  const [isConnectVal, setIsConnectVal] = useState(data?.data?.isConnected);

  const [sliderValue, setSliderValue] = useState(0);
  const [description, setDescription] = useState();

  const [requestSent, setRequestSent] = useState(data?.data?.isChat);

  const [isEnquiredChange, setisEnquiredChange] = useState(data?.data?.isEnquired);

  // let payval = {
  //   property: route?.params?.id,
  //   property_owner: route?.params?.owner,
  //   user: selectedUserData?._id,
  // };

  // console.log(' route params ----->', route?.params);

  //  console.log(' Property detailsssss ----->', data?.data?.property);

  const [requestPhotoProperty] = useLazyRequestPhotoPropertyQuery();
  const [requestList, setRequestList] = useState(propertyRequestCallback);

  const [interestList, setInterestList] = useState([]);
  const [investmentRange, setInvestmentRange] = useState();
  const [propertyFavUnfavMutation] = usePropertyFavUnfavMutation();

  const [siteVisit, setSiteVisit] = useState([]);
  const [agreesite, setAgreeSite] = useState(false);
  const [similarPropertyData, setSimilarPropertyData] = useState('');
  // console.log('similarPropertyData ======>', similarPropertyData);
  const [shareInvestment] = useShareInvestmentPropertyMutation({});

  // const [getPropertyTagging] = useLazyGetPropertyTaggingQuery()

  const [getTaggedProperty] = useLazyGetTaggingPostDetailsQuery();

  useEffect(() => {
    setLoadingSimilarProperties(true);
    scrollToTop();
    data?.data?.property?.iwant === 'Sell' || data?.data?.property?.iwant === 'Investment Sharing'
      ? getTaggingProperty('Investment Sharing')
      : getTaggingProperty('Property Sharing');
    getData();
  }, [data?.data?.property]);

  const getData = () => {
    similarData(payloadData())
      .then(res => {
        // console.log('cheking on the response=======>>>>', JSON.stringify(res));
        setSimilarPropertyData(res?.data);
        setTimeout(() => {
          setLoadingSimilarProperties(false); // Hide loader after 1 second
        }, 500);
      })
      .catch(err => {
        console.log('cheingon on errorr======>>>', JSON.stringify(err));
      });
  };
  const getTaggingProperty = type => {
    getTaggedProperty(propertyQueryPayload(0, 10, route?.params?.id, type))
      .then(res => {
        // console.log('ressss of get prop',JSON.stringify(res));
        setTaggedPropertyList(res?.data?.data?.data);
      })
      .catch(err => {
        console.log('errorrrr', err);
      });
  };
  const propertyQueryPayload = (page, limit, id, type) => {
    const taggingPayload = {
      page: page,
      limit: limit,
      id: id,
      type: type,
    };
    return qs.stringify(taggingPayload);
  };
  const investmentShare = () => {
    // console.log('checking on range',investmentRange.toFixed(2));
    let payload = {};
    data?.data?.property?.iwant === 'Sell' || data?.data?.property?.iwant === 'Investment Sharing'
      ? (payload = {
          user_name: name,
          phone_number: mobile,
          email_address: email,
          investment_percent: parseFloat((data?.data?.property?.property_price * (sliderValue / 100))?.toFixed(2)),
          property_id: data?.data?.property?._id,
          property_loc_id: data?.data?._id,
          sharing_type: 'Investment Sharing',
          tagged_by: selectedUserData?._id,
          investment_range: sliderValue,
          description: description,
        })
      : (payload = {
          user_name: name,
          phone_number: mobile,
          email_address: email,
          property_id: data?.data?.property?._id,
          property_loc_id: data?.data?._id,
          sharing_type: 'Property Sharing',
          tagged_by: selectedUserData?._id,
          description: description,
        });
    shareInvestment(payload)
      .then(res => {
        setLoadingSimilarProperties(true);
        if (res?.data?.status) {
          setIsInvestment(false);
          setIsPropertySharing(false);
          getData();
          setTimeout(() => {
            setLoadingSimilarProperties(false); // Hide loader after 1 second
          }, 500);
        } else {
          setIsInvestment(false);
          setIsPropertySharing(false);
          setTimeout(() => {
            setLoadingSimilarProperties(false); // Hide loader after 1 second
          }, 500);
        }
      })
      .catch(err => {
        console.log('error ::', err);
      });
  };
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

  // ############ Fav button

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

  // ######################## Photo Request

  const handleRequestPhoto = async () => {
    let propid = data?.data?.property?._id;

    // console.log(' prop id', propid);

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
        // console.log('errrrr', err);
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      });
    // console.log('clicking');
  };

  const requestChat = chatId => {
    requestForChatMutation({
      sender: selectedUserData?._id,
      receiver: data?.data?.owned_by,
      propertyId: route?.params?.id, //propertyId
      ownerId: data?.data?.owned_by,
      chatId: chatId,
      userId: selectedUserData?._id,
    }).then(response => {
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
    // console.log('payload of chat +++++++++', payload);

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
    const success = await sendChatRequest(selectedUserData?._id, data?.data?.owned_by);

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
    setReqCallbackModelBool(false);
  };

  const requestTagChat = (chatId, item) => {
    tagChatProperty({
      sender: selectedUserData?._id,
      receiver: item?.taggedBy?._id,
      userId: selectedUserData?._id,
      chatId: chatId,
      ownerId: data?.data?.owned_by,
      description: 'testing',
    })
      .then(res => {
        console.log('onSendChatRequestResponse', JSON.stringify(res));
      })
      .catch(err => {
        console.log('error of chat tag', err);
      });
  };

  const requestCallback = () => {
    requestForCallbackMutation({
      propertyId: route?.params?.id,
      ownerId: data?.data?.owned_by,
      userId: selectedUserData?._id,
      username: name,
      email: email,
      terms: agreesite,
      mobile_no: mobile,
      intrested: [],
      site_visit: [],
      message: null,
    }).then(response => {
      const a = {
        propertyId: route?.params?.id,
        ownerId: data?.data?.owned_by,
        userId: selectedUserData?._id,
        username: name,
        email: email,
        terms: agreesite,
        mobile_no: mobile,
        intrested: interestList,
        site_visit: siteVisit,
        message: null,
      };
      // console.log(response, '  = = - response   ', JSON.stringify(a));
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

  const gettingPropDetails = () => {
    const payload: storyProps = {
      property: route?.params?.id,
      property_owner: route?.params?.owner,
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
    // console.log(' Button Press property details ------->', data?.data);

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
            <PropertyImageBackground
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
                title={`${renderButtonName(requestSent, isConnectVal)}`}
                onPress={() => renderButtonFun(requestSent, isConnectVal)}
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
                  isEnquiredChange;

                  setName(selectedUserData?.fname + ' ' + selectedUserData?.lname);
                  setMobile(selectedUserData?.mobile_no);
                  setEmail(selectedUserData?.email);
                  setReqCallbackModelBool(true);
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

            <RNView style={styles.investmentBtnView}>
              {data?.data?.property?.iwant === 'Sell' || data?.data?.property?.iwant === 'Investment Sharing' ? (
                <CommonButton
                  title={'Tag for investment sharing'}
                  style={styles.investmentBtn}
                  textStyle={{ color: 'black' }}
                  onPress={() => {
                    setIsInvestment(true);
                  }}
                  disabled={isEnquiredChange === true ? true : false}
                />
              ) : data?.data?.property?.iwant === 'Rent' || data?.data?.property?.iwant === 'Property Sharing' ? (
                <CommonButton
                  title={'Tag for property sharing'}
                  style={styles.investmentBtn}
                  textStyle={{ color: 'black' }}
                  onPress={() => {
                    setIsPropertySharing(true);
                  }}
                  disabled={isEnquiredChange === true ? true : false}
                />
              ) : (
                <></>
              )}
            </RNView>

            <Divider
              borderColor="#D9D6D6"
              dividerWidth={deviceWidth}
              style={{
                marginVertical: 10,
              }}
            />
            <RNView style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={() => {
                  setIsProperty(false);
                }}>
                <RNText style={[styles.titleStyle, { color: isProperty ? 'black' : ColorTheme.onboardingPrimary }]}>
                  Details
                </RNText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsProperty(true);
                }}>
                <RNText style={[styles.titleStyle, { color: isProperty ? ColorTheme.onboardingPrimary : 'black' }]}>
                  Property Sharing
                </RNText>
              </TouchableOpacity>
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
        {!isProperty ? (
          <RNView>
            <PropertyOwnerPostDetails details={data?.data} />
            <PropertyListDetails details={data?.data?.property} />
            <PropertyVerificationDetails details={data?.data?.property} />
            <PropertyAdditionalContactDetails details={data?.data?.property} />
            <PropertyDetails details={data?.data?.property} />
            <PropertyAdditionalDetails details={data?.data?.property} />
            <PropertyPriceDetails details={data?.data?.property} />
            <ShopandRetailType details={data?.data?.property} />
            <IndustryType details={data?.data?.property} />
            <PropertyFurnishingStatus details={data?.data?.property} />
            <SocietyFeatureDetails details={data?.data?.property} />
            <PropertyFeatureDetails details={data?.data?.property} />
            <WaterSourcesDetails details={data?.data?.property} />
            <ParkingDetails details={data?.data?.property} />
            <PropertyDocumentDetails details={data?.data?.property} />
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
          </RNView>
        ) : (
          <RNView>
            <FlatList
              data={taggedPropertyList}
              renderItem={({ item }) => {
                return (
                  <RNView style={{ borderColor: 'black', borderRadius: px(10), borderWidth: 1, margin: px(5) }}>
                    <RNView style={styles.profileViewStyle}>
                      {item?.gallery?.profile_pic[0] ? (
                        <RNImage
                          source={{
                            uri: item?.gallery?.profile_pic[0],
                          }}
                          style={styles.imgStyle}
                        />
                      ) : (
                        <RNView style={styles.defaultProfile}>
                          <RNText style={styles.ownerText}>{item?.user_name?.slice(0, 1).toUpperCase()}</RNText>
                        </RNView>
                      )}
                      <RNView>
                        <RNText style={styles.titleStyle}>{item?.user_name}</RNText>
                        <RNText
                          style={[styles.messageStyle, { color: '#666666' }]}>{`Posted on ${item?.createdAt}`}</RNText>
                      </RNView>
                    </RNView>

                    <RNView>
                      <RNText style={[styles.messageStyle, { marginVertical: px(5) }]}>Message</RNText>
                      <RNText
                        style={[styles.messageStyle, { fontWeight: '400', color: 'black', marginVertical: px(5) }]}>
                        {item?.description}
                      </RNText>
                    </RNView>
                    <CommonButton
                      onPress={() => {
                        console.log('checking on item data', JSON.stringify(item));
                        const chatId = firestore().collection('chat_requests').doc().id;
                        requestTagChat(chatId, item);
                      }}
                      style={{
                        height: px(40),
                        width: px(130),
                        backgroundColor: ColorTheme.onboardingPrimary,
                        alignSelf: 'flex-end',
                        marginHorizontal: px(5),
                        marginVertical: px(10),
                      }}
                      title="Chat Now"
                    />
                  </RNView>
                );
              }}
            />
          </RNView>
        )}

      </ScrollView>

      <ModalWrapper
        header={true}
        visible={isInvestment}
        onClose={() => setIsInvestment(false)}
        modalWidth={deviceWidth / 1.09}
        modalHeight={deviceHeight / 1.3}
        modalStyle={{ borderRadius: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <>
          <ScrollView showsHorizontalScrollIndicator={false} style={{ paddingBottom: 200 }}>
            <RNView style={{ width: '98%' }}>
              <RNView style={styles.topCloseView}>
                <RNText style={styles.modalHeading}>Share your details</RNText>
                <TouchableOpacity onPress={() => setIsInvestment(false)}>
                  <RNText style={styles.closeButton}>X</RNText>
                </TouchableOpacity>
              </RNView>

              <RNView style={styles.reqCallbackWrapper}>
                <RNView style={styles.modalForm}>
                  <RNText style={styles.addressTitle}>Tagging for Investment Sharing</RNText>

                  <RNText style={styles.addressDetail}>
                    Tell us with more details about the investment for clear reach.
                  </RNText>
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
                  <RNText style={styles.inputLabel}>Email Address</RNText>
                  <TextInput
                    numberOfLines={1}
                    placeholder={`Enter Email`}
                    onChangeText={e => setEmail(e)}
                    value={email}
                    style={styles.inputStyle}
                  />
                  <RNText style={styles.inputLabel}>Investment Range</RNText>
                  <TextInput
                    numberOfLines={1}
                    placeholder={`Enter`}
                    onChangeText={e => setMobile(e)}
                    value={investmentRange}
                    editable={false}
                    style={styles.inputStyle}
                  />
                  <RNView style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <RNText>{`${sliderValue} %`}</RNText>
                    <RNView style={styles.gradientContainer}>
                      <LinearGradient
                        colors={['#F3DA58', '#5BAB1C']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.gradientTrack}
                      />
                      {/* Transparent Slider */}
                      <Slider
                        style={styles.slider}
                        minimumValue={1}
                        maximumValue={100}
                        step={1}
                        value={sliderValue}
                        onValueChange={value => {
                          setInvestmentRange(
                            formatNumberWithNoCurrency(data?.data?.property?.property_price, value).toString()
                          );
                          setSliderValue(value);
                        }}
                        maximumTrackTintColor={ColorTheme.transparent}
                        minimumTrackTintColor="transparent" // Set to transparent
                        thumbTintColor={ColorTheme.nearLukBasePrimaryColor}
                      />
                      {/* Mask to hide the gradient on the right side of the thumb */}
                      <RNView
                        style={[
                          styles.mask,
                          { width: `${89 - sliderValue}%` }, // Adjust the mask width dynamically
                        ]}
                      />
                    </RNView>
                  </RNView>
                  <RNText style={styles.inputLabel}>Description</RNText>
                  <CommonInput
                    placeholder="Enter description"
                    placeholderColor={ColorTheme.gray2}
                    style={styles.descriptionTextStyle}
                    multiline={true}
                    value={description}
                    outlineStyle={styles.outlineBorderStyle}
                    onChangeText={text => setDescription(text)}
                    generateAIButton={false}
                  />
                  {/* <TextInput
                  numberOfLines={1}
                  placeholder={`Enter Description`}
                  onChangeText={e => setDescription(e)}
                  value={description}
                  style={styles.descriptionTextStyle}
                /> */}
                </RNView>

                <CommonButton
                  title="Submit"
                  style={{
                    paddingHorizontal: px(10),
                    backgroundColor: ColorTheme.primary,
                    width: deviceWidth / 2,
                  }}
                  onPress={investmentShare}
                />
              </RNView>
            </RNView>
          </ScrollView>
        </>
      </ModalWrapper>

      <ModalWrapper
        header={true}
        visible={reqCallbackModelBool}
        onClose={() => setReqCallbackModelBool(false)}
        modalWidth={deviceWidth / 1.09}
        modalHeight={deviceHeight / 1.3}
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

      <ModalWrapper
        header={true}
        visible={isPropertySharing}
        onClose={() => setIsPropertySharing(false)}
        modalWidth={deviceWidth / 1.09}
        modalHeight={deviceHeight / 1.3}
        modalStyle={{ borderRadius: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <>
          <ScrollView showsHorizontalScrollIndicator={false} style={{ paddingBottom: 200 }}>
            <RNView style={{ width: '98%' }}>
              <RNView style={styles.topCloseView}>
                <RNText style={styles.modalHeading}>Share your details</RNText>
                <TouchableOpacity onPress={() => setIsPropertySharing(false)}>
                  <RNText style={styles.closeButton}>X</RNText>
                </TouchableOpacity>
              </RNView>

              <RNView style={styles.reqCallbackWrapper}>
                <RNView style={styles.modalForm}>
                  <RNText style={styles.addressTitle}>Tagging for Property Sharing</RNText>

                  <RNText style={styles.addressDetail}>
                    Tell us with more details about the investment for clear reach.
                  </RNText>
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
                  <RNText style={styles.inputLabel}>Email Address</RNText>
                  <TextInput
                    numberOfLines={1}
                    placeholder={`Enter Email`}
                    onChangeText={e => setEmail(e)}
                    value={email}
                    style={styles.inputStyle}
                  />

                  <RNText style={styles.inputLabel}>Description</RNText>
                  {/* <TextInput
                  numberOfLines={1}
                  placeholder={`Enter Description`}
                  onChangeText={e => setDescription(e)}
                  value={description}
                  style={styles.descriptionTextStyle}
                /> */}
                  <CommonInput
                    placeholder="Enter description"
                    placeholderColor={ColorTheme.gray2}
                    style={styles.descriptionTextStyle}
                    multiline={true}
                    value={description}
                    outlineStyle={styles.outlineBorderStyle}
                    onChangeText={text => setDescription(text)}
                    generateAIButton={false}
                  />
                </RNView>

                <CommonButton
                  title="Submit"
                  style={{
                    paddingHorizontal: px(10),
                    backgroundColor: ColorTheme.primary,
                    width: deviceWidth / 2,
                  }}
                  onPress={investmentShare}
                />
              </RNView>
            </RNView>
          </ScrollView>
        </>
      </ModalWrapper>
    </Container>
  );
};

export default PropertyDetailScreen;
