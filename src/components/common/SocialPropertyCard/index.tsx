import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Share, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';

import PropertyActionHideModel from '@/components/common/PropertyActionHideModel';
import FeaturedPropertyList from '@/components/FeaturedPropertyList';
import TrendingPropertyList from '@/components/TrendingPropertyList';
import { isArray } from '@/constants/function/isArray';
import { user_other_property_action_list, user_own_property_action_list } from '@/constants/function/post.helper';
import {
  areaunitremoveunder,
  formatNumberWithComma,
  formatNumberWithNotation,
} from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useAddLikeToPostMutation,
  useDeletPropertyMutation,
  useHidePropertyMutation,
  useLazyRequestPhotoPropertyQuery,
  usePropertyFavUnfavMutation,
  useUpdateShareCountMutation,
} from '@/redux/login/loginService';
import { baseURL } from '@/services/apiClient';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import CommonImageComp from '../CommonImageComp';
import CustomAlertWrapper from '../CustomAlertWrapper';
import PropertyCategoryChips from '../PropertyCategoryChips';
import ReportCard from '../ReportCard';
import { styles } from './styles';

type Props = {
  data?: any;
  onPress?: () => void;
  sethomePropertyData?: (newData: any) => void;
  onPressComment?: () => void;
  onPressUsername?: () => void;
  isFavourite?: boolean;
  srNumber?: number;
};
const SocialPropertyCard: React.FC<Props> = ({
  data,
  isFavourite,
  onPress,
  onPressComment,
  onPressUsername,
  srNumber,
}) => {
  // console.log(data);
  const toast = useToast();
  const navigation = useNavigation();
  const [hidePropertyUI, setHidePropertyUI] = useState(false);
  const [isLiked, setIsLiked] = useState(data?.isLiked);
  const [onePress, setOnePress] = useState(0);
  const [LikeCount, setLikeCount] = useState(data?.likeCount ? data?.likeCount : 0);
  const [ShareCount, setShareCount] = useState(data?.shareCount ? data?.shareCount : 0);
  const [deletePopup, setShowDeletePopup] = useState(false);
  const [reportPopup, setShowReportPopup] = useState(false);
  const [hidePopup, setShowHidePopup] = useState(false);
  const [propertymodeltoggle, setPropertymodeltoggle] = useState(false);
  const touchableOpacityRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [isSaved, setIsSaved] = useState(isFavourite);
  const [imagesArr, setImagesArr] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const selectedData = useAppSelector(getUserData);
  const [addLikeToPost] = useAddLikeToPostMutation();
  const [updateShareCount] = useUpdateShareCountMutation();
  const [deletePostMutation] = useDeletPropertyMutation();
  const [hidePropertyMutation] = useHidePropertyMutation();
  const [propertyFavUnfavMutation] = usePropertyFavUnfavMutation();
  const [requestPhotoProperty] = useLazyRequestPhotoPropertyQuery();

  //console.log(' data val ----------->', selectedData);
  const checkMultipleOf5 = () => {
    if (srNumber % 5 === 0) {
      return true;
    } else {
      return false;
    }
  };
  const checkMultipleOf10 = () => {
    if (srNumber % 10 === 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleRequestPhoto = async (id: string) => {
    await requestPhotoProperty({
      id: id,
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

  const handleUploadPhoto = data => {
    // console.log('data ----->  ', data);

    navigation.navigate('POST_PROPERTY_EDITING', { BasicData: data });
  };

  const handleLikePost = async (id: string) => {
    const payload = {
      user: selectedData?._id,
      post_id: id,
    };
    addLikeToPost(payload).then(response => {
      if (response?.data?.status) {
        if (!isLiked) {
          setLikeCount(LikeCount + 1);
        } else {
          setLikeCount(LikeCount - 1);
        }
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
    });
  };

  const handleSharedPostCount = async (id: string) => {
    const payload = {
      user: selectedData?._id,
      post_id: id,
    };
    updateShareCount(payload).then(response => {
      if (response?.data?.status) {
        setShareCount(Number(ShareCount) + 1);
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
    });
  };

  const onShare = async () => {
    const shareUrl = baseURL.includes('devapi') ? 'https://dev.nearluk.com' : 'https://nearluk.com';
    try {
      const result = await Share.share({
        url: `${shareUrl}/propertydetail/${data?._id}`,
        message: `${shareUrl}/propertydetail/${data?._id}`,
        // title: "this is nearluk app",
      });
      if (result?.action === 'sharedAction') {
        // shared
        handleSharedPostCount(data?._id);
      } else if (result?.action === 'dismissedAction') {
        // console.log('Share.dismissedAction', result.action);
        // dismissed
      }
    } catch (error: any) {
      toast.show(error.message || 'Something went wrong', {
        type: 'error_toast',
        animationDuration: 100,
        data: {
          title: 'Message',
        },
        duration: 3000,
      });
    }
  };

  const openpropertymodel = () => {
    setPropertymodeltoggle(true);
  };

  const actionmodel = item => {
    if (item.label === 'Edit Property') {
      // console.log(' data value ', data);

      navigation.navigate('POST_PROPERTY_EDITING', { BasicData: data });
    }

    if (item.label === 'Hide Property') {
      // hideProperty();
      setShowHidePopup(true);
    }

    if (item.label === 'Delete Property') {
      // deleteProperty();
      setShowDeletePopup(true);
    }
    if (item.label === 'Report Property') {
      // deleteProperty();
      setShowReportPopup(true);
    }
  };

  const hideProperty = async () => {
    setShowHidePopup(!hidePopup);

    const payvalue = [
      {
        user: selectedData?._id,
        property: data?._id,
        reason_enum: 1,
        type: 'Property',
      },
    ];
    // console.log(payvalue);

    hidePropertyMutation(payvalue).then(response => {
      if (response?.data?.status) {
        // console.log('reload homescreen', response?.data?.status);
        setHidePropertyUI(true);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Please try once',
          },
          duration: 3000,
        });
        setHidePropertyUI(false);
      }
    });
  };

  const deleteProperty = async postId => {
    setShowDeletePopup(!deletePopup);
    const payload = {
      propertyLocationId: [postId],
    };
    if (postId) {
      deletePostMutation(payload).then(response => {
        if (response?.data?.status) {
          // console.log('reload homescreen', response?.data?.status);
          setHidePropertyUI(true);
        } else {
          toast.show('Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Please try once',
            },
            duration: 3000,
          });
          setHidePropertyUI(false);
        }
      });
    }
  };

  const handlePropertyPostFavUnFav = () => {
    const payload = {
      property: data?._id,
      user: selectedData?._id,
    };
    console.log('handlePropertyPostFavUnFav+++', payload);
    propertyFavUnfavMutation(payload).then(result => {
      if (result?.data?.status) {
        setIsSaved(!isSaved);
      } else {
        // handlePropertyPostFavUnFav();
        setIsSaved(isSaved);
        toast.show(result?.data?.message, {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  const onPressMoreImgfn = () => {
    navigation.navigate('GALLERY_PREVIEW', { images: imagesArr, hasHeader: true, index: 5 });
  };

  // console.log('selectedData', selectedData);
  const marketingPeople = key => {
    if (data?.posted_by) {
      return data?.posted_by[key];
    } else {
      return selectedData[key];
    }
  };

  const totalImages = () => {
    const imageArr = data?.property?.gallery.map(ele => {
      return ele?.url;
    });
    setImagesArr(imageArr);
  };

  const marketingAgent = (item, key) => {
    // console.log('itrhejgbe++', item);
    if (item?.posted_by) {
      return item?.posted_by['_id'];
    } else {
      return item[key];
    }
  };
  const handlePropertyUserPostNavigation = item => {
    // console.log(' user navigation from business---', JSON.stringify(item));

    if (item?.business_id !== null) {
      let businessinfo = {
        _id: item?.property?.business_id,
        business_name: item?.property?.business_info?.name,
        profile_pic: item?.property?.business_info?.profile_pic,
      };

      // console.log(' business data-->', businessinfo);

      if (marketingAgent(item, 'owned_by') === selectedData?._id) {
        // console.log(' inside bussiness own account');

        navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
          profiledata: businessinfo,
        });
      } else {
        // console.log(' inside bussiness other account');
        navigation.navigate('BUSINESS_PROFILE_DESCRIPTION_OTHER_USER', {
          profiledata: businessinfo,
          business_Id: item?.property?.business_id,
        });
      }
    } else {
      // console.log('checking businessID');
      // console.log(' user navigation from business---', item);

      if (marketingAgent(item, 'owned_by') === selectedData?._id) {
        navigation.navigate('USER_PROFILE_DETAILS');
      } else {
        if (item?.is_executive_property) {
          if (onePress < 2) {
            toast.show('NearLuk Agent', {
              type: 'marketing_toast',
              animationDuration: 100,
              data: {
                title: `${item?.posted_by?.fname} ${item?.posted_by?.lname}`,
              },
              duration: 3000,
            });
            setOnePress(onePress + 1);
          }
        } else {
          navigation.navigate('OTHER_USER_PROFILE_DETAILS', {
            id: marketingAgent(item, 'owned_by'),
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isArray(data?.property?.gallery)) totalImages();

    return () => {
      // console.log('first');
    };
  }, []);

  useEffect(() => {
    setIsSaved(data?.isFav);
  }, [isFavourite]);

  return (
    <>
      {hidePropertyUI ? (
        <RNView></RNView>
      ) : (
        <RNView style={styles.container}>
          <RNView>
            <RNView style={styles.header}>
              <TouchableOpacity onPress={() => handlePropertyUserPostNavigation(data)} style={styles.userInfo}>
                {data?.property?.business_info?.name ? (
                  data?.property?.business_info?.profile_pic ? (
                    <RNImage
                      source={{
                        uri: data?.property?.business_info?.profile_pic,
                      }}
                      style={styles.userAvatar}
                    />
                  ) : (
                    <RNView style={styles.defaultProfile}>
                      <RNText style={styles.ownerText}>
                        {data?.property?.business_info?.name?.slice(0, 1).toUpperCase()}
                      </RNText>
                    </RNView>
                  )
                ) : marketingPeople('profile_pic') ? (
                  <RNImage
                    source={{
                      uri: marketingPeople('profile_pic'),
                    }}
                    style={styles.userAvatar}
                  />
                ) : (
                  <RNView style={styles.defaultProfile}>
                    <RNText style={styles.ownerText}>{marketingPeople('fname')?.slice(0, 1).toUpperCase()}</RNText>
                  </RNView>
                )}

                <RNView style={styles.userNameContainer}>
                  <RNText style={styles.userName}>
                    {data?.property?.business_info?.name
                      ? `${data.property.business_info.name}  `
                      : (marketingPeople('fname') &&
                          marketingPeople('fname') + ' ' + marketingPeople('lname') + '  ') ||
                        'N/A'}

                    {/* {(marketingPeople('fname') && marketingPeople('fname') + ' ' + marketingPeople('lname') + ' ') ??
                      'N/A'} */}
                    {data?.is_executive_property && (
                      <RNImage
                        source={require('@/assets/images/business/nearluk-agent-logo.png')}
                        style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                        resizeMode="contain"
                      />
                    )}
                    {data?.is_agent_property && (
                      <RNImage
                        source={require('@/assets/images/business/nearluk-agent-logo.png')}
                        style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                        resizeMode="contain"
                      />
                    )}
                    {data?.is_builder_property && (
                      <RNImage
                        source={require('@/assets/images/business/verify.png')}
                        style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                        resizeMode="contain"
                      />
                    )}
                  </RNText>
                  <RNText style={styles.postedOn}>
                    Posted on: {moment(data?.createdAt).format('DD-MM-YYYY hh:mm A')}
                  </RNText>
                </RNView>
              </TouchableOpacity>

              <RNView style={styles.subContainer}>
                <RNView>
                  <TouchableOpacity ref={touchableOpacityRef} onPress={openpropertymodel}>
                    <Entypo name="dots-three-horizontal" size={18} color="black" />
                  </TouchableOpacity>
                </RNView>

                {/* <TouchableOpacity>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity> */}

                {selectedData?._id !== data?._id && (
                  <TouchableOpacity onPress={handlePropertyPostFavUnFav} style={styles.dotsContainer}>
                    {isSaved ? (
                      <AntDesign name="heart" size={24} color={ColorTheme.primary} />
                    ) : (
                      <AntDesign name="hearto" size={24} color={ColorTheme.primary} />
                    )}
                  </TouchableOpacity>
                )}
              </RNView>
            </RNView>

            <RNView style={styles.propertyInfo}>
              <TouchableOpacity onPress={onPress} style={styles.propertyDetails}>
                {/* {data?.property?.property?.business_info !== null &&
                data?.property?.property?.business_info !== undefined ? (
                  <RNText style={styles.propertyTitle}>{data?.property?.property?.business_info?.name}</RNText>
                ) : (
                  <RNText style={styles.propertyTitle}>{data?.property?.property_name}</RNText>
                )} */}

                {data?.property?.property_name && (
                  <RNText style={styles.propertyTitle}>{data?.property?.property_name}</RNText>
                )}
                {data?.property?.property_type === 'Residential' && (
                  <RNText style={styles.propertyTitle} numberOfLines={1}>
                    {data?.property?.bhk ? `${data?.property?.bhk} ${data?.property?.property_type},` : null}{' '}
                    {data?.property?.city} <RNText style={styles.locationInfo}>in {data?.property?.state}</RNText>
                  </RNText>
                )}
                {/* <Text style={styles.propertyDescription}>
              {data?.property?.property_description?.length > 40
                ? `${data?.property?.property_description.substring(0, 40)} ...`
                : data?.property?.property_description}
            </Text> */}
              </TouchableOpacity>
              {data?.property?.iwant == 'Rent' || data?.property?.iwant == 'Coliving' ? (
                <RNView style={styles.propertyPrice}>
                  <RNText style={styles.price}>
                    ₹{' '}
                    {formatNumberWithNotation(data?.property?.rent_amount) ||
                      formatNumberWithNotation(data?.property?.property_price) ||
                      'N/A'}
                  </RNText>
                  <RNText style={styles.areaInfo}>/{data?.property?.rented_time}</RNText>
                </RNView>
              ) : data?.property?.business_id === null || data?.property?.business_id === undefined ? (
                data?.property?.property_price ? (
                  <RNView style={styles.propertyPrice}>
                    <RNText style={styles.price}>
                      ₹ {formatNumberWithNotation(data?.property?.property_price) || 'N/A'}
                    </RNText>
                    <RNText style={styles.areaInfo}>
                      {formatNumberWithComma(data?.property?.property_price_per_unit)}/
                      {areaunitremoveunder(data?.property?.property_area_units)}
                    </RNText>
                  </RNView>
                ) : (
                  <RNView></RNView>
                )
              ) : (
                <>
                  <RNView style={styles.propertyPrice_sub}>
                    <RNText style={styles.price}>
                      ₹ {formatNumberWithNotation(data?.property?.property_price)} -{' '}
                      {formatNumberWithNotation(data?.property?.property_price_max)}
                    </RNText>
                    <RNText style={styles.areaInfo}>
                      {formatNumberWithComma(data?.property?.property_price_per_unit)}
                      {/* {data?.property?.property_area_units} */}
                      {' - '}
                      {formatNumberWithComma(data?.property?.property_price_per_unit_max)}/
                      {areaunitremoveunder(data?.property?.property_area_units)}
                    </RNText>
                  </RNView>

                  {/* <RNView style={styles.propertyPrice_builder}>
                    <RNView style={styles.propertyPrice_sub}>
                      <RNText style={styles.price}>
                        ₹ {formatNumberWithNotation(data?.property?.property_price) || 'N/A'}
                      </RNText>
                      <RNText style={styles.areaInfo}>
                        {formatNumberWithComma(data?.property?.property_price_per_unit)}/
                        {data?.property?.property_area_units}
                      </RNText>
                    </RNView>

                    <RNView style={styles.propertyPrice_sub}>
                      <RNText style={styles.price}>
                        ₹ {formatNumberWithNotation(data?.property?.property_price_max) || 'N/A'}
                      </RNText>
                      <RNText style={styles.areaInfo}>
                        {formatNumberWithComma(data?.property?.property_price_per_unit_max)}/
                        {data?.property?.property_area_units}
                      </RNText>
                    </RNView>
                  </RNView> */}

                  {/* <RNView style={styles.propertyPrice_builder}>
                    <RNView style={styles.propertyPrice}>
                      <RNText style={styles.price}>
                        ₹ {formatNumberWithNotation(data?.property?.property_price) || 'N/A'}
                      </RNText>
                      <RNText style={styles.areaInfo}>
                        {formatNumberWithComma(data?.property?.property_price_per_unit)}/
                        {data?.property?.property_area_units}
                      </RNText>

                      <RNText> </RNText>

                      <RNText style={styles.price}>
                        ₹ {formatNumberWithNotation(data?.property?.property_price_max) || 'N/A'}
                      </RNText>
                      <RNText style={styles.areaInfo}>
                        {formatNumberWithComma(data?.property?.property_price_per_unit_max)}/
                        {data?.property?.property_area_units_max}
                      </RNText>
                    </RNView>
                  </RNView> */}
                </>
              )}
            </RNView>
          </RNView>
          <RNView style={styles.infoContainer}>
            <RNView style={styles.propertyDetail}>
              {data?.property?.property_area ? (
                <RNView style={styles.rowContainer}>
                  <RNImage source={require('@/assets/images/property/carpet.png')} style={styles.carpetImage} />
                  <RNView>
                    <RNText style={styles.carpetAreaText}>Property Area</RNText>
                    <RNText style={styles.sqText}>{data?.property?.property_area} sqft</RNText>
                  </RNView>
                </RNView>
              ) : null}
              {data?.property?.bhk ? (
                <RNView style={styles.furnishingContainer}>
                  <RNImage source={require('@/assets/images/property/house.png')} style={styles.carpetImage} />
                  <RNView>
                    <RNText style={styles.carpetAreaText}>Bed Room</RNText>
                    <RNText style={styles.carpetAreaText}>{data?.property?.bhk}</RNText>
                  </RNView>
                </RNView>
              ) : null}
              {data?.property?.businss_id === null || data?.property?.businss_id === undefined ? (
                data?.property?.property_facing ? (
                  <RNView style={styles.furnishingContainer}>
                    <RNImage source={require('@/assets/images/property/compass.png')} style={styles.carpetImage} />
                    <RNView>
                      <RNText style={styles.carpetAreaText}>Facing</RNText>
                      <RNText style={styles.carpetAreaText}>{data?.property?.property_facing}</RNText>
                    </RNView>
                  </RNView>
                ) : null
              ) : data?.property?.property_facing_array ? (
                <RNView style={styles.furnishingContainer}>
                  <RNImage source={require('@/assets/images/property/compass.png')} style={styles.carpetImage} />
                  <RNView>
                    <RNText style={styles.carpetAreaText}>Facing</RNText>
                    <RNText style={styles.carpetAreaText} numberOfLines={2}>
                      {data?.property?.property_facing_array}
                    </RNText>
                  </RNView>
                </RNView>
              ) : null}

              {/* {data?.property?.total_floors ? (
                <RNView style={styles.floorContainer}>
                  <RNImage source={require('@/assets/images/property/building.png')} style={styles.carpetImage} />
                  <RNView>
                    <RNText style={styles.carpetAreaText}>Floor</RNText>
                    <RNText style={styles.carpetAreaText}>
                      {`${data?.property?.floor_no}th out of${data?.property?.total_floors}`}
                    </RNText>
                  </RNView>
                </RNView>
              ) : null} */}
            </RNView>
            <RNView style={styles.descriptionContainer}>
              <RNView style={styles.widthContainer}>
                {data?.property?.property_description?.length > 40 ? (
                  <RNText style={styles.propertyDescription} onPress={onPress}>
                    {showMore
                      ? data?.property?.property_description
                      : `${data?.property?.property_description.slice(0, 40)} ...`}
                    <RNText
                      style={styles.moreBtn}
                      onPress={() => {
                        setShowMore(!showMore);
                      }}>
                      {showMore ? ' less' : ' more'}
                    </RNText>
                  </RNText>
                ) : (
                  <RNText style={styles.propertyDescription} onPress={onPress}>
                    {data?.property?.property_description}
                  </RNText>
                )}
              </RNView>
              {data?.property?.is_rera_verified && (
                <RNView style={styles.tenWidth}>
                  <RNImage source={require('@/assets/images/property/rera.png')} style={styles.certifiedImage} />
                </RNView>
              )}
              {data?.property?.is_dtcp_verified && (
                <RNView style={styles.tenWidth}>
                  <RNImage source={require('@/assets/images/property/dtcp.png')} style={styles.certifiedImage} />
                </RNView>
              )}
            </RNView>
          </RNView>
          <RNView style={styles.imageContainer}>
            {data?.property?.gallery?.length === 0 && (
              <RNView>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={
                    data?.owned_by === selectedData?._id
                      ? () => {
                          handleUploadPhoto(data);
                        }
                      : () => handleRequestPhoto(data?.property?._id)
                  }>
                  <RNImage
                    resizeMode="stretch"
                    source={{
                      uri:
                        data?.owned_by === selectedData?._id
                          ? 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png'
                          : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png',
                    }}
                    style={styles.imageVideo}
                  />
                </TouchableOpacity>
              </RNView>
            )}
            {data?.property?.gallery?.length >= 2 &&
              data?.property?.gallery?.slice(0, 2).map((item: any, i: any) => {
                return (
                  <CommonImageComp
                    key={i}
                    item={item?.url}
                    close={false}
                    imgStyles={styles.userPostView}
                    allImages={imagesArr}
                  />
                );
              })}

            {/* RENDER IMAGE LENGTH 1 */}
            {data?.property?.gallery?.length === 1 && (
              <CommonImageComp
                item={data?.property?.gallery[0].url}
                close={false}
                imgStyles={styles.imageLength}
                allImages={imagesArr}
              />
            )}
            {data?.property?.gallery?.length === 3 &&
              data?.property?.gallery?.slice(2, 3).map((item: any, i: any) => {
                return (
                  <CommonImageComp
                    key={i}
                    item={item?.url}
                    close={false}
                    imgStyles={styles.morethanCouple}
                    allImages={imagesArr}
                  />
                );
              })}
            {/* Render more images if available */}
            <RNView
              style={{
                flexDirection: 'row',
                justifyContent: data?.property?.gallery?.length > 2 ? 'flex-start' : 'space-evenly',
                gap: px(5),
              }}>
              {data?.property?.gallery?.length > 3 &&
                data?.property?.gallery
                  ?.slice(2, data?.property?.gallery?.length >= 5 ? 4 : data?.property?.gallery?.length)
                  .map((item, i) => {
                    return (
                      <CommonImageComp
                        key={i}
                        item={item?.url}
                        close={false}
                        imgStyles={styles.additionalImage}
                        allImages={imagesArr}
                      />
                    );
                  })}
            </RNView>
            {data?.property?.gallery?.length >= 5 && (
              <RNView style={styles.touchableGesture}>
                <CommonImageComp
                  item={data?.property?.gallery[4]?.url}
                  close={false}
                  imgStyles={styles.touchableGesture}
                  allImages={imagesArr}
                />
                {data?.property?.gallery.length - 5 ? (
                  <TouchableOpacity onPress={onPressMoreImgfn} style={styles.absoluteContainer}>
                    <RNText style={styles.lessthanText}>{data?.property?.gallery.length - 5}+</RNText>
                  </TouchableOpacity>
                ) : (
                  <RNView></RNView>
                )}
              </RNView>
            )}
          </RNView>
          <RNView style={styles.footer}>
            <RNView style={styles.likesContainer}>
              <RNView style={styles.likeIconContainer}>
                <Entypo name="thumbs-up" size={15} color="white" />
              </RNView>
              <RNText style={styles.likeCount}>{LikeCount ? LikeCount : ''}</RNText>
            </RNView>
            <RNView style={styles.commentsContainer}>
              <RNText style={styles.commentCount}>{data?.commentCount ? data?.commentCount : 0} Comments</RNText>

              {ShareCount ? <RNText style={styles.commonText}>{ShareCount} Shares</RNText> : null}
              {/* <Text style={styles.viewCount}>5 Views</Text> */}
            </RNView>
          </RNView>
          <RNView style={styles.separator}></RNView>
          <RNView style={styles.tagsContainer}>
            <TouchableOpacity
              style={styles.tag}
              onPress={() => {
                handleLikePost(data?._id);
                setIsLiked(!isLiked);
              }}>
              {isLiked ? (
                <AntDesign name="like1" size={18} color="blue" style={styles.marginView} />
              ) : (
                <AntDesign name="like2" size={18} color="black" style={styles.marginView} />
              )}

              <RNText style={[styles.likeStyle, { color: isLiked ? 'blue' : 'black' }]}>
                {isLiked ? 'Liked' : 'Like'}
              </RNText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag} onPress={onPressComment}>
              <RNImage
                // style={styles.tagIcon}
                style={styles.commonImage}
                source={require('@/assets/images/property/comment.png')}
              />
              <RNText style={styles.tagText}>Comment</RNText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tag} onPress={onShare}>
              <RNImage style={styles.commonImage} source={require('@/assets/images/property/share.png')} />
              <RNText style={styles.tagText}>Share</RNText>
            </TouchableOpacity>
          </RNView>
          {deletePopup && (
            <CustomAlertWrapper
              openModal={deletePopup}
              onClose={() => {
                setShowDeletePopup(false);
              }}
              text="Are you sure you want to delete?"
              head="Delete">
              <PropertyCategoryChips
                item={{ label: 'Cancel', active: true }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={() => {
                  setShowDeletePopup(!deletePopup);
                }}
                style={{
                  backgroundColor: 'white',
                }}
              />
              <PropertyCategoryChips
                item={{ label: 'Delete' }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={() => deleteProperty(data?._id)}
                style={{
                  backgroundColor: 'red',
                }}
                textStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </CustomAlertWrapper>
          )}
          {hidePopup && (
            <CustomAlertWrapper
              openModal={hidePopup}
              onClose={() => {
                setShowHidePopup(false);
              }}
              text="Are you sure you want to Hide?"
              head="Hide">
              <PropertyCategoryChips
                item={{ label: 'Cancel', active: true }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={() => {
                  setShowHidePopup(!hidePopup);
                }}
                style={{
                  backgroundColor: 'white',
                }}
              />
              <PropertyCategoryChips
                item={{ label: 'Hide' }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={hideProperty}
                style={{
                  backgroundColor: 'red',
                }}
                textStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </CustomAlertWrapper>
          )}
          {/* data?.property?.property_owner?.fname                     */}
          <PropertyActionHideModel
            data={
              selectedData?._id === marketingPeople('_id')
                ? user_own_property_action_list
                : user_other_property_action_list
            }
            showModal={propertymodeltoggle}
            // placeholder=""
            setShowModal={setPropertymodeltoggle}
            onPressItem={actionmodel}
          />
          <ReportCard
            visible={reportPopup}
            setIsVisible={() => setShowReportPopup(!reportPopup)}
            postId={data?._id}
            setHidePropertyUI={val => setHidePropertyUI(val)}
            postType="Property"
          />
        </RNView>
      )}
      {checkMultipleOf5() ? (
        <RNView
          style={{
            width: deviceWidth,
            height: px(240),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {checkMultipleOf10() ? <TrendingPropertyList /> : <FeaturedPropertyList />}
        </RNView>
      ) : (
        <RNView></RNView>
      )}
    </>
  );
};

export default memo(SocialPropertyCard);
