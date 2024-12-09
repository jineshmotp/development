import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LinearGradient } from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionCheck from 'react-native-version-check';

import messaging from '@react-native-firebase/messaging';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import DefaultProfile from '@/components/common/DefaultProfile';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import Loader from '@/components/common/Loader';
import ModalWrapper from '@/components/common/ModalWrapper';
import SocialPropertyCard from '@/components/common/SocialPropertyCard';
import UserCreatePostUpload from '@/components/common/UserCreatePostUpload';
import UserPostCard from '@/components/common/UserPostCard';
import BannerCarousel from '@/components/home/BannerCarousel';
import FloatingButton from '@/components/home/FloatingButton';
import LabelledIconsCard from '@/components/home/LabelledIconsCard';
import PostPropertyBottomSheet from '@/components/home/PostPropertyBottomSheet';
import UserStory from '@/components/home/UserStory';
import { categoryCardData, Constants, homeServices } from '@/constants/functions/home.helper';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import useLocation from '@/custom/Location';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useLazyGetBusinessProfileListQuery } from '@/redux/business/businessService';
import { getScrollToTop, hideBottomTabs } from '@/redux/home/homeReducer';
import {
  useGetFeaturedPropertyQuery,
  useGetReviewQuery,
  useGetTrendingPropertyQuery,
  useLazyGetGlobalPropertyDataQuery,
  useUploadStoryMutation,
} from '@/redux/home/homeService';
import { setPropertyLocationData } from '@/redux/listing/listingReducer';
import { getReloadData, getReloadStatus, getUserData } from '@/redux/login/loginReducer';
import { resetLogin } from '@/redux/login/loginReducer';
import { getLatLongData, setLatLongData, setLocation, setLocationStore } from '@/redux/nearu/nearuReducer';
import { getFcToken } from '@/redux/Notification/notificationReducer';
import { useLogoutNotificationMutation } from '@/redux/Notification/notificationService';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';
import { GOOGLE_MAPS_API } from '@/utils/apiKeys';
import { MMKV_KEYS, removeMMKVItem } from '@/utils/mmkv';

import { styles } from './styles';

const Home = () => {
  const flatListRef = useRef(null);
  const toast = useToast();
  const scrollData = useAppSelector(getScrollToTop);
  const navigation = useNavigation();
  const reloadStatus = useAppSelector(getReloadStatus);
  const selectedUserData = useAppSelector(getUserData);
  const { data: latestVersion } = useGetReviewQuery({});

  // console.log('userData ======>', selectedUserData);

  const autocompleteRef = useRef(null);
  const dispatch = useAppDispatch();
  const [landingData, setLandingData] = useState([]);
  const [openLocation, setOpenLocation] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userStoryData, setUserStoryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showExpireModal, setShowExpireModal] = useState(false);
  const fcmToken = useAppSelector(getFcToken);
  const [globalPropertyMutation, { data: loadData }] = useLazyGetGlobalPropertyDataQuery();
  const { data: allTrendingProperties } = useGetTrendingPropertyQuery(
    { pageSize: 5, pageNumber: 1, user: selectedUserData?._id },
    { skip: !selectedUserData?._id }
  );
  const { data: allFeaturedProperties } = useGetFeaturedPropertyQuery({ pageSize: 5, pageNumber: 1 });
  const [uploadStoryMutation] = useUploadStoryMutation();
  const [logoutMutation] = useLogoutNotificationMutation();
  const [count, setCount] = useState(0);
  const [isComment, setComment] = useState(false);
  // console.log('count ======>', count);
  const [getBusinessList] = useLazyGetBusinessProfileListQuery();
  const [businessProfiles, setBusinessProfiles] = useState([]);

  const getLocation = useAppSelector(getLatLongData);
  const setAutoLocation = useAppSelector(setLatLongData);
  const { city, street, latitude, longitude, subcity, state, road } = useLocation();
  // console.log('allFeaturedProperties', allFeaturedProperties, 'allTrendingProperties+==', allTrendingProperties);
  const [headerLocation, setHeaderLocation] = useState({
    city: '',
    street: '',
    state: '',
    lat: 0,
    long: 0,
    homeStory: [subcity, city],
  });

  useEffect(() => {
    setHeaderLocation((prev: any) => ({
      ...prev,
      city,
      street,
      state,
      lat: latitude,
      long: longitude,
      homeStory: [subcity, city],
    }));
  }, [city, street, latitude, longitude, state]);
  useEffect(() => {
    // console.log(' Location details--->', getLocation);

    let returndata = {
      country: 'India',
      state: getLocation?.state,
      city: getLocation?.city,
      locality: getLocation?.street,
      pincode: '',
      location: [getLocation?.lat, getLocation?.long],
      completeAddr: getLocation?.street + ' ' + getLocation?.city + ' ' + getLocation?.state + ' ' + 'India',
      formatedAddr: getLocation?.street + ' ' + getLocation?.city + ' ' + getLocation?.state + ' ' + 'India',
    };

    dispatch(setPropertyLocationData(returndata));

    setHeaderLocation((prev: any) => ({
      ...prev,
      city: getLocation?.city,
      street: getLocation?.street,
      state: getLocation?.state,
      lat: getLocation?.lat,
      long: getLocation?.long,
      homeStory: [getLocation?.subcity, getLocation?.city],
      road: getLocation?.road,
    }));
  }, [getLocation]);
  useEffect(() => {
    // console.log(' Autolcoation details--->', setAutoLocation);
    if (!headerLocation?.lat) {
      setHeaderLocation((prev: any) => ({
        ...prev,
        city: setAutoLocation?.city,
        street: setAutoLocation?.street,
        state: setAutoLocation?.state,
        lat: setAutoLocation?.lat,
        long: setAutoLocation?.long,
        homeStory: [setAutoLocation?.subcity, setAutoLocation?.city],
        road: setAutoLocation?.road,
      }));
    }
  }, [setLocationStore]);

  // console.log('selectedUserData ====>', headerLocation);

  const handleLogOut = () => {
    // console.log('payload ======>', payload);

    const payload = {
      userId: selectedUserData?._id,
      deviceType: Platform.OS,
      token: fcmToken,
    };

    logoutMutation(payload).then(res => {
      if (res?.data?.status) {
        console.log('logout notification');
      }
    });
    // dispatch(resetOnBoarding({}));
    setShowExpireModal(false);
    removeMMKVItem(MMKV_KEYS.ACCESS_TOKEN);
    removeMMKVItem(MMKV_KEYS.REFRESH_TOKEN);
    dispatch(resetLogin({}));
    // navigation.navigate('Login');
  };

  const isAndroid = Platform.OS === 'android';
  const appLatestVersion = isAndroid ? latestVersion?.data?.androidversion : latestVersion?.data?.iosversion;
  // console.log('appLatestVersion=====>', appLatestVersion);
  const storeLink = isAndroid ? Constants?.androidPlayStoreURL : Constants?.iOSAppStoreURL;
  // console.log('storeLink ========>', storeLink);

  const hideText = latestVersion?.data?.isforceupdate;
  // console.log('hideText =======>', hideText);

  const currentVersion = VersionCheck.getCurrentVersion();
  // console.log('currentVersion======>', currentVersion);

  useEffect(() => {
    if (latestVersion) {
      if (appLatestVersion > currentVersion) {
        setShowModal(true);
      }
    }
  }, [latestVersion]);

  const handleUpdate = () => {
    if (isAndroid == true) {
      Linking.openURL(storeLink);
    } else {
      Linking.canOpenURL(storeLink).then(
        supported => {
          supported && Linking.openURL(storeLink);
        },
        err => console.log(err)
      );
    }
  };

  type storyProps = {
    user?: string;
    city?: string;
  };

  type globalProps = {
    pageSize: string;
    pageNumber: string;
    user: string;
  };

  const globalLandingResults = async (payload: globalProps) => {
    // console.log('cheking on calling function with time',JSON.stringify(new Date().toLocaleTimeString()));
    globalPropertyMutation(payload)
      .then(response => {
        if (response?.data?.status) {
          if (response?.data?.data.length && payload?.pageNumber > 1) {
            setLandingData(prev => prev.concat(response?.data?.data));
          } else {
            if (!response?.data?.data.length && payload?.pageNumber > 1) {
              setLandingData(prev => prev.concat(response?.data?.data));
            } else {
              setLandingData(response?.data?.data);
            }
          }
        } else {
          if (response?.error?.statusCode === 498) {
            openSessionExpiredModal();
          }
          if (response?.error?.status === false) {
            if (payload?.pageNumber === 1) {
              if (selectedUserData?._id) onRefresh();
            } else {
              setLandingData(landingData);
            }
          }
        }
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error in globalPropertyMutation:', error);
      });
  };

  const openSessionExpiredModal = () => {
    setShowExpireModal(true);
  };

  const getBusinessProfiles = () => {
    getBusinessList(selectedUserData._id)
      .then(res => {
        setBusinessProfiles(res.data.data);
        // console.log(' Business Profile Result--->', res.data.data);
      })
      .catch(err => {
        toast.show(err?.error?.message || 'Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Auth message',
          },
          duration: 3000,
        });
      });
  };

  useEffect(() => {
    getBusinessProfiles();
  }, []);

  const checkAvailability = (response, idVal) => {
    // Check if any object in the response array has the _id equal to idVal
    return response.some(item => item._id === idVal);
  };

  // const globalLandingResults = async (payload: globalProps) => {
  //   globalPropertyMutation(payload).then(respose => {
  //      //console.log('resposne---->', JSON.stringify(respose?.data?.data));
  //     if (respose?.data?.status) {
  //       if (respose?.data?.data.length && payload?.pageNumber > 1) {
  //         setLandingData(prev => prev.concat(respose?.data?.data));
  //       } else {
  //         if (!respose?.data?.data.length && payload?.pageNumber > 1) {
  //           setLandingData(prev => prev.concat(respose?.data?.data));
  //         } else {
  //           setLandingData(respose?.data?.data);
  //         }
  //       }
  //     } else {
  //       if (respose?.error?.status === false) {
  //         if (payload?.pageNumber == 1) {
  //           if (selectedUserData?._id) onRefresh();
  //         } else {
  //           setLandingData(landingData);
  //         }
  //       }
  //     }
  //   });
  // };

  // ############################RELOAD OR REFRESH FUNCTION##############################################
  const onRefresh = () => {
    if (selectedUserData?._id) {
      globalLandingResults({
        pageSize: '10',
        pageNumber: '1',
        user: selectedUserData?._id,
      });
      setPageNumber(1);
    } else {
      // console.log('selectedData?.user?.user?._id', selectedUserData?._id);
    }
  };

  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length) {
      setPageNumber(pageNumber + 1);
      if (selectedUserData?._id) {
        globalLandingResults({
          pageSize: '10',
          pageNumber: `${pageNumber + 1}`,
          user: selectedUserData?._id,
        });
      } else {
        // console.log('selectedData?.user?.user?._id,', selectedUserData?._id);
      }
    }
  };
  const collectUserStoryFn = data => {
    // console.log('collectUserStoryFn', data);
    if (data?.loggedInUserStories) {
      if (data?.globalUserStories) {
        setUserStoryData([data?.loggedInUserStories, ...data?.globalUserStories]);
      } else {
        setUserStoryData([data?.loggedInUserStories]);
      }
    } else {
      if (data?.globalUserStories) {
        setUserStoryData([...data?.globalUserStories]);
      } else {
        setUserStoryData([]);
      }
    }
    // setUserStoryData(
    //   isArray(temp) ? data?.loggedInUserStories?.stories.concat(temp) : data?.loggedInUserStories?.stories
    // );
  };

  const uploadStoryFn = () => {
    const payload: storyProps = {
      user: selectedUserData._id,
      geo_data: [headerLocation?.city],
      location: [headerLocation?.lat, headerLocation?.long],
    };
    // console.log('payload =====>', payload);

    // const params = new URLSearchParams(payload).toString();
    uploadStoryMutation(payload).then(response => {
      // console.log('uploadStoryFn++', response?.data?.data);
      collectUserStoryFn(response?.data?.data);
    });
  };

  const handleUserPostNavigation = item => {
    // console.log('itrhejgbe++', item);
    if (item?.user_data?._id === selectedUserData?._id) {
      navigation.navigate('USER_PROFILE_DETAILS');
    } else {
      navigation.navigate('OTHER_USER_PROFILE_DETAILS', {
        id: item?.user_data?._id,
      });
    }
  };

  const handleUserPostBusinessNavigation = item => {
    let businessinfo = {
      _id: item?.business?._id,
      business_name: item?.business?.business_name,
      profile_pic: item?.business?.profile_pic,
    };

    const check = checkAvailability(businessProfiles, item?.business?._id);

    if (check) {
      navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
        profiledata: businessinfo,
      });
    } else {
      navigation.navigate('BUSINESS_PROFILE_DESCRIPTION_OTHER_USER', {
        profiledata: businessinfo,
        business_Id: item?.business?._id,
      });
    }
  };

  const marketingPeople = (item, key) => {
    // console.log('itrhejgbe++', item);
    if (item?.posted_by) {
      return item?.posted_by['_id'];
    } else {
      return item[key];
    }
  };
  const handlePropertyUserPostNavigation = item => {
    // console.log('item?.user_data?._id === selectedUserData?._id', item);
    if (marketingPeople(item, 'owned_by') === selectedUserData?._id) {
      navigation.navigate('USER_PROFILE_DETAILS');
    } else {
      if (item?.is_executive_property) {
        toast.show('NearLuk Agent', {
          type: 'marketing_toast',
          animationDuration: 100,
          data: {
            title: `${item?.posted_by?.fname} ${item?.posted_by?.lname}`,
          },
          duration: 3000,
        });
      } else {
        navigation.navigate('OTHER_USER_PROFILE_DETAILS', {
          id: marketingPeople(item, 'owned_by'),
        });
      }
    }
  };

  const [showPostPropertyDrawer, setShowPostPropertyDrawer] = useState(false);
  let vericleScroll = 0;
  const handleScroll = event => {
    if (Platform.OS === 'ios') {
      if (vericleScroll <= 0) {
        dispatch(hideBottomTabs(false));
        vericleScroll = event?.nativeEvent?.contentOffset?.y;
      } else if (vericleScroll > event?.nativeEvent?.contentOffset?.y) {
        vericleScroll = event?.nativeEvent?.contentOffset?.y;
        dispatch(hideBottomTabs(false));
      } else {
        vericleScroll = event?.nativeEvent?.contentOffset?.y;
        dispatch(hideBottomTabs(true));
      }
    } else {
      const currentOffset = event.nativeEvent?.velocity?.y;
      if (currentOffset < 0) {
        // console.log('+++++++');
        dispatch(hideBottomTabs(false));
      } else {
        dispatch(hideBottomTabs(true));
      }
    }
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    onRefresh();
    uploadStoryFn();
  }, []);
  useEffect(() => {
    uploadStoryFn();
  }, [headerLocation]);

  useEffect(() => {
    if (!reloadStatus) scrollToTop();
  }, [scrollData]);

  useFocusEffect(
    React.useCallback(() => {
      // console.log('abhayyayayyayay+++++++++', reloadStatus);
      if (isComment) {
        onRefresh();
        setComment(false);
      }
      onRefresh();
      if (reloadStatus === true) {
        onRefresh();
        dispatch(getReloadData({}));
        uploadStoryFn();
      }
    }, [reloadStatus, isComment])
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('messgaigng+++', remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if (remoteMessage) {
        toast.show(`${remoteMessage?.notification?.body}`, {
          type: 'notificationView',
          animationDuration: 100,
          data: {
            title: remoteMessage?.notification?.title,
          },
          duration: 2000,
        });
      }
      setCount(prev => prev + 1);
    });

    return unsubscribe;
  }, []);

  if (reloadStatus) {
    return <Loader size={'large'} viewStyle={{ backgroundColor: 'white' }} />;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container hasHeader={true} backgroundColor="white" isTab={false}>
      <FlatList
        ref={flatListRef}
        data={landingData}
        extraData={landingData}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        onScroll={handleScroll}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={React.memo(() => {
          return (
            <RNView style={styles.flexView}>
              <RNView style={styles.navChild}>
                <TouchableOpacity onPress={() => setOpenLocation(true)} style={styles.rowView}>
                  <FontAwesome name="location-arrow" size={30} color={ColorTheme.primaryColor} />
                  <RNView
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <RNView>
                      <RNText style={styles.locationText}>
                        {headerLocation?.road || headerLocation?.street || headerLocation?.city}
                      </RNText>
                      <RNText style={styles.areaText} numberOfLines={1}>
                        {headerLocation?.street ? headerLocation?.city : headerLocation?.state}
                      </RNText>
                    </RNView>
                    <Entypo name="chevron-small-down" size={px(30)} color={ColorTheme.primaryColor} />
                  </RNView>
                </TouchableOpacity>
                <RNView style={styles.navRight}>
                  <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('GLOBAL')}>
                    <AntDesign name="search1" size={18} color="black" />
                  </TouchableOpacity>
                  <RNView>
                    <TouchableOpacity
                      style={styles.navButton}
                      onPress={() => {
                        setCount(0);
                        navigation.navigate('NOTIFICATION');
                      }}>
                      <MaterialCommunityIcons name="bell-ring-outline" size={17} color="black" />
                    </TouchableOpacity>
                    {count ? (
                      <RNView style={styles.countStyle}>
                        <RNText style={styles.countText}>{count}</RNText>
                      </RNView>
                    ) : (
                      <RNView></RNView>
                    )}
                  </RNView>
                </RNView>
              </RNView>

              <BannerCarousel />

              <RNView style={styles.lineView}></RNView>
              <RNView style={styles.nearlukView}>
                <RNView>
                  <RNText style={styles.nearlukText}>Explore on NearLuk</RNText>
                  <RNText style={styles.subNearlukText}>
                    Access a range of specialised services offered by NearLuk.
                  </RNText>
                </RNView>
                <LinearGradient colors={['#C9FCFF', 'rgba(255, 255, 255, 1)']} style={styles.gradientView}>
                  <RNView style={styles.subGradientView}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{
                        paddingHorizontal: 15,
                      }}>
                      {categoryCardData.map((item, i) => {
                        return (
                          <LabelledIconsCard
                            item={item}
                            type={item?.type}
                            navigation={navigation}
                            key={i}
                            propertyType={item?.propertyType}
                          />
                        );
                      })}
                    </ScrollView>
                  </RNView>
                </LinearGradient>

                <RNView style={styles.belowGradientView}>
                  <LinearGradient colors={['#D5E8FF', 'rgba(255, 255, 255, 1)']} style={styles.gradientView}>
                    <RNView style={styles.subGradientView}>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
                        {homeServices.map((item: any, i) => {
                          return (
                            <LabelledIconsCard
                              key={i}
                              item={item}
                              type={item?.type}
                              propertyType={item?.propertyType}
                            />
                          );
                        })}
                      </ScrollView>
                    </RNView>
                  </LinearGradient>
                </RNView>
              </RNView>

              <LinearGradient colors={['#C9FCFF', 'rgba(255, 255, 255, 1)']} style={styles.lastGradientView}>
                <UserCreatePostUpload userProfile={true} />
              </LinearGradient>
              {/* // stories section */}

              <TouchableOpacity onPress={()=>{
                navigation.navigate('ALL_STORIES',{totalData:userStoryData,locationDetails:headerLocation,useData:selectedUserData})
              }} style={{marginVertical:px(10),alignSelf:'flex-end',marginHorizontal:px(10)}}>
                    <RNText style={styles.selectAllText}>View All</RNText>
                  </TouchableOpacity>

              <RNView style={styles.stories}>
                <ScrollView horizontal contentContainerStyle={{}} showsHorizontalScrollIndicator={false}>
                  <RNView>
                    {selectedUserData?.profile_pic ? (
                      <RNImage
                        source={{
                          uri:
                            selectedUserData?.profile_pic ||
                            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        }}
                        style={styles.storyImage}
                      />
                    ) : (
                      <DefaultProfile
                        username={selectedUserData?.fname}
                        viewStyle={styles.defaultView}
                        textStyle={styles.defaultText}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.storyCard}
                      onPress={() => {
                        navigation.navigate('DAILY_STORY', {
                          user: selectedUserData?._id,
                        });
                      }}>
                      <AntDesign name="plus" size={24} color="white" />
                    </TouchableOpacity>
                  </RNView>

                  <RNView style={{ flexDirection: 'row' }}>
                    {userStoryData?.map((item, i, array) => (
                      <UserStory key={i} data={item} storyData={array} index={i} totalData={userStoryData} />
                    ))}
                  </RNView>
                </ScrollView>
              </RNView>
              {reloadStatus ? (
                <RNView style={styles.listContainer}>
                  <ActivityIndicator size={'small'} />
                </RNView>
              ) : (
                <RNView></RNView>
              )}
            </RNView>
          );
        })}
        ListFooterComponent={() => (
          <RNView style={styles.listContainer}>
            {landingData?.length ? <ActivityIndicator size={'small'} /> : <RNText></RNText>}
          </RNView>
        )}
        renderItem={({ item, index }) => {
          return Object.hasOwn(item, 'business') ? (
            item?.business?.business_name ? (
              <UserPostCard
                isFromBuilder={true}
                isFromHomeBusiness={true}
                key={index}
                data={item}
                srNumber={index}
                onPress={() => {
                  handleUserPostBusinessNavigation(item);
                }}
                onPressComment={() => {
                  navigation.navigate('USER_POST_COMMENTS', {
                    isFromBuilder: true,
                    isFromHomeBusiness: true,
                    key: index,
                    data: item,
                    srNumber: index,
                  });
                }}
              />
            ) : (
              <UserPostCard
                isFromBuilder={false}
                isFromHomeBusiness={false}
                key={index}
                data={item}
                srNumber={index}
                onPress={() => handleUserPostNavigation(item)}
                onPressComment={() => {
                  navigation.navigate('USER_POST_COMMENTS', {
                    isFromBuilder: false,
                    isFromHomeBusiness: false,
                    key: index,
                    data: item,
                    srNumber: index,
                  });
                }}
              />
            )
          ) : (
            <SocialPropertyCard
              data={item}
              key={index}
              srNumber={index}
              isFavourite={item?.isFav}
              // showImageModal={openImageModal}
              onPress={
                () => {
                  if (item?.business_id !== undefined && item?.business_id !== null) {
                    navigation.navigate('BUILDER_PROPERTY_DETAILS', {
                      id: item?._id,
                      businessId: item?.business_id,
                    });
                    // console.log(' home screen data with business data--->', item);
                  } else {
                    navigation.navigate('PROPERTY_DETAILS', {
                      id: item?._id,
                      owner: item?.owned_by,
                    });
                    // console.log(' home screen data with out business data--->', item);
                  }
                }

                // navigation.navigate('PROPERTY_DETAILS', {
                //   id: item?._id,
                // })
              }
              onPressComment={() => {
                setComment(true);
                navigation.navigate('PROPERTY_COMMENTS', {
                  data: item,
                });
              }}
              onPressUsername={() => handlePropertyUserPostNavigation(item)}
            />
          );
        }}
        // keyExtractor={(i) => i._id}
        ListEmptyComponent={() => <ListEmptyComponent text="No Post Found" type="post" />}
      />

      <FloatingButton
        ListingPress={() => {
          navigation.navigate('POST_PROPERTY');
          // navigation.navigate(ROUTES.PostProperty);
        }}
        ExpertPress={() => {
          // navigation.navigate(ROUTES.AskExpert);
        }}
      />

      <PostPropertyBottomSheet
        showActionsheet={showPostPropertyDrawer}
        handleClose={() => setShowPostPropertyDrawer(false)}
      />

      <ModalWrapper
        visible={openLocation}
        header={false}
        modalHeight={deviceHeight / 2}
        onClose={() => {
          setOpenLocation(!openLocation);
        }}>
        <RNView style={styles.modelViewStyle}>
          <TouchableOpacity
            style={{
              width: deviceWidth / 1.09,
              height: px(70),
              borderWidth: 1,
              borderRadius: px(10),
              justifyContent: 'center',
              padding: px(20),
              marginTop: px(50),
            }}
            onPress={() => {
              setHeaderLocation({
                city: city,
                street: street,
                road: road,
                state: state,
                homeStory: [subcity, city],
                lat: latitude,
                long: longitude,
              });
              dispatch(
                setLocation({
                  lat: latitude,
                  long: longitude,
                  street: street,
                  city: city,
                  state: state,
                  road: road,
                  subcity: subcity,
                })
              );

              setOpenLocation(false);
            }}>
            <RNText style={{ fontSize: px(18), color: 'black' }}>Get Current location</RNText>
            <RNText style={{ fontSize: px(12), color: 'black' }}>Using GPS</RNText>
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            ref={autocompleteRef}
            placeholder="Search your location..."
            currentLocation={true}
            fetchDetails={true}
            autoFillOnNotFound={true}
            onPress={(data, details = null) => {
              // console.log(' Details Data :GGGGG ', details);

              const locationValue = details?.formatted_address;

              const dataval = locationValue.split(',');

              // console.log(' data ======> ', dataval);
              setOpenLocation(!openLocation);
              const { city, subcity, street, state, road } = details.address_components.reduce((acc, component) => {
                if (component.types.includes('locality')) acc.city = component.long_name;
                else if (component.types.includes('sublocality') && component.types.includes('sublocality_level_1'))
                  acc.subcity = component.long_name;
                else if (component.types.includes('administrative_area_level_1')) acc.state = component.long_name;
                else if (component.types.includes('route')) acc.road = component.long_name;
                else if (component.types.includes('sublocality') && component.types.includes('sublocality_level_2'))
                  acc.street = component.long_name;
                return acc;
              }, {});

              // console.log('component.types.includes', street);

              const dataVal = {
                ...headerLocation,
                street: street,
                city: city,
                homeStory: [subcity, city],
                state: state,
                road: road,
              };

              setHeaderLocation(dataVal);
              dispatch(
                setLocation({
                  lat: details?.geometry?.location?.lat,
                  long: details?.geometry?.location?.lng,
                  street: street,
                  city: city,
                  state: state,
                  road: road,
                  subcity: subcity,
                })
              );
            }}
            query={{
              key: GOOGLE_MAPS_API,
              language: 'en',
            }}
            styles={{
              textInput: {
                height: px(38),
                color: '#5d5d5d',
                fontSize: 16,
                borderWidth: 0.5,
                marginTop: px(10),
                width: deviceWidth / 1.09,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </RNView>
      </ModalWrapper>

      <Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
        <RNView style={styles.modalContainer}>
          <RNView style={styles.modalContent}>
            <RNView style={styles.initialContainer}>
              <RNText style={styles.initialText}>App Update Required !</RNText>
            </RNView>
            <RNView style={styles.modalImage}>
              <RNImage
                source={require('@/assets/images/onboarding/update.png')}
                style={styles.programmerStyle}
                resizeMode="contain"
              />
            </RNView>
            <RNView style={styles.lastContainer}>
              <RNText style={styles.dearText}>Dear User</RNText>
              <RNText style={styles.lineText}>Update now to enjoy new features,</RNText>
              <RNText style={styles.constantText}>improved performance, and a better user</RNText>
              <RNText style={styles.constantText}>experience with our latest app update.</RNText>
              <RNView style={styles.rowContainer}>
                {hideText ? (
                  <RNView></RNView>
                ) : (
                  <TouchableOpacity style={styles.cancelContainer} onPress={handleCloseModal}>
                    <RNText style={styles.cancelText}>Cancel</RNText>
                  </TouchableOpacity>
                )}

                <CommonButton
                  onPress={handleUpdate}
                  title={'Update'}
                  style={styles.nextContainer}
                  textStyle={styles.nextStyle}
                />
              </RNView>
            </RNView>
          </RNView>
        </RNView>
      </Modal>

      <Modal visible={showExpireModal} animationType="slide" transparent={true} onRequestClose={handleLogOut}>
        <RNView style={styles.modalContainer}>
          <RNView style={styles.modalExpireContent}>
            <RNView style={styles.initialContainer}>
              <RNText style={styles.initialText}>Session Expired</RNText>
            </RNView>
            <RNView style={styles.expireContainer}>
              <RNText style={styles.dearText}>Dear User</RNText>
              <RNText style={styles.lineText}>Your Last session has expired !</RNText>
              <RNText style={styles.lineText}>
                If You want to continue the services of the Nearluk press ok to proceed
              </RNText>
            </RNView>
            <CommonButton onPress={handleLogOut} title={'Ok'} style={styles.okContainer} textStyle={styles.nextStyle} />
          </RNView>
        </RNView>
      </Modal>
    </Container>
  );
};
export default Home;
