import React, { useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
// import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import BookingList from '@/components/common/BookingList';
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper';
import ChatList from '@/components/common/ChatList';
import CustomAlertWrapper from '@/components/common/CustomAlertWrapper';
import DefaultProfile from '@/components/common/DefaultProfile';
import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import Divider from '@/components/common/Divider';
import FavouriteList from '@/components/common/FavouriteList';
import GalleryTabView from '@/components/common/GalleryTabView';
import HeaderBar from '@/components/common/HeaderBar';
import ImageUploadBottomSheet from '@/components/common/ImageUploadBottomSheet';
import LeadList from '@/components/common/LeadList';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import Loader from '@/components/common/Loader';
import ProfilePropertyList from '@/components/common/ProfilePropertyList';
import PropertyList from '@/components/common/PropertyList';
import UserCreatePostUpload from '@/components/common/UserCreatePostUpload';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import { UserMenuPostTabComponent } from '@/components/userprofile/UserMenuPostTabComponent';
import UserProfileAboutTab from '@/components/userprofile/UserProfileAboutTab';
import UserBioUpdate from '@/components/userprofileupdate/UserBioUpdate';
import { activateItemByKey } from '@/constants/function/property.helperFunctions';
import { UserGalleryTabs, UserMenuSubTabs, UserMenuTabs, UserTabs } from '@/constants/userprofile';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { clearPropertyLocationData } from '@/redux/listing/listingReducer';
import { getAppReview, getReloadData, getReloadStatus, getUserData } from '@/redux/login/loginReducer';
import {
  useGetUserAlbumsQuery,
  useGetUserImagesQuery,
  useGetUserVideosQuery,
  useLazyGetUserPostsQuery,
} from '@/redux/login/loginService';
import { setLatLongData } from '@/redux/nearu/nearuReducer';
import { useGetPaymentDetailsQuery } from '@/redux/Subscription/subscriptionService';
import { RootStackParamList } from '@/routes/RootNavigator';
import MyLeads from '@/screens/MyLeads';
import ActivePlans from '@/screens/Subscriptions/ActivePlans';
import Payments from '@/screens/Subscriptions/Payments';
import PaymentCard from '@/screens/Subscriptions/Payments/PaymentCard';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' ...' : text;
};

const UserProfileDetails = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const reloadStatus = useAppSelector(getReloadStatus);
  // console.log('reloadStatus+++', reloadStatus);
  const route = useRoute<RouteProp<RootStackParamList, 'USER_PROFILE_DETAILS'>>();
  const toast = useToast();
  const reviewData = useAppSelector(getAppReview);
  // console.log(reviewData, 'reviewData');
  const userTabs = reviewData ? UserMenuSubTabs : UserMenuTabs;
  //   const image1 =
  // 'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  const [menuTabs, setMenuTabs] = useState(userTabs);
  const [userGallery, setUserGallery] = useState(UserGalleryTabs);
  const selectUserData = useAppSelector(getUserData);
  //  console.log('selectUserData =======>', selectUserData);

  // const [visible, setVisible] = useState(false);

  const setAutoLocation = useAppSelector(setLatLongData);
  console.log(setAutoLocation.lat);

  const [userData, setuserData]: any = useState(selectUserData);
  const [loader, setLoader] = useState(false);
  const [showBottomSheet, setshowBottomSheet] = useState(false);
  const [showCoverBottomSheet, setshowCoverBottomSheet] = useState(false);
  const [imgArray, setImageArray] = useState<string[]>([userData?.profile_pic ? userData?.profile_pic : '']);
  const [coverimgArray, setCoverImageArray] = useState([userData?.cover_pic ? userData?.cover_pic : '']);
  const [loadingCoverPic, setLoadingCoverPic] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [showPublicInfo, setShowPublicInfo] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [bio, setBio] = useState(userData?.bio ? userData.bio : 'Describe your bio');
  const [userPostsData, setUserPostsData] = useState([]);
  const [openMore, setOpenMore] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [showMenu, setShowMen] = useState(false);
  const { data: paymentHistoryData, status } = useGetPaymentDetailsQuery({});
  const { data: userImageData } = useGetUserImagesQuery(selectUserData?._id, { skip: !selectUserData._id });
  const { data: userVideoData } = useGetUserVideosQuery(selectUserData?._id, { skip: !selectUserData._id });
  const { data: userAlbumData } = useGetUserAlbumsQuery(selectUserData?._id, { skip: !selectUserData._id });
  const [getUserPosts, { data: loadData }] = useLazyGetUserPostsQuery();
  // console.log('slelecrnejkbjkgb', userAlbumData, status);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const wordLimit = 10;
  const displayBio = showMore ? bio : truncateText(bio, wordLimit);

  // const [showActionsheet, setShowActionsheet] = React.useState({
  //   show: false,
  //   data: '',
  // });

  const activateTabByKey = (item: any) => {
    const shallow = [...menuTabs];
    const filterData = activateItemByKey(shallow, item.key);
    setMenuTabs(filterData);
  };

  const getAllUserPosts = async payload => {
    getUserPosts(payload).then(result => {
      // console.log('getUserPosts++++++++', result);
      if (result?.data?.status) {
        if (result?.data?.data?.length && payload?.pageNumber > 1) {
          // console.log('payload?.pageNumber > 1', payload?.pageNumber > 1);
          setUserPostsData(prev => prev.concat(result?.data?.data));
        } else {
          // console.log('payload?.pageNumber > 1', payload?.pageNumber);
          setUserPostsData(result?.data?.data);
        }
      } else {
        if (result?.error?.status === false) {
          if (payload?.pageNumber == 1) {
            if (selectUserData?._id) onRefresh();
          } else {
            setUserPostsData(userPostsData);
          }
        }
      }
    });
    // console.log("getAllUserPosts++++++++++=====>", result);
  };
  const onRefresh = () => {
    if (selectUserData?._id) {
      getAllUserPosts({
        pageSize: '10',
        pageNumber: '1',
        user: selectUserData?._id,
      });
    }
  };
  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length >= 10) {
      setPageNumber(pageNumber + 1);
      if (selectUserData?._id) {
        getAllUserPosts({
          pageSize: '10',
          pageNumber: `${pageNumber + 1}`,
          user: selectUserData?._id,
        });
      } else {
        console.log('selectedData?.user?.user?._id,', selectUserData?._id);
      }
    }
  };

  const handleEmailVeriedCheck = () => {
    console.log(' user data -->', userData?.isVerifiedEmail);

    if (userData?.isVerifiedEmail === false) {
      setEmailAlert(true);
    } else {
      setShowMen(!showMenu);
      dispatch(clearPropertyLocationData());
      navigation.navigate('POST_PROPERTY');

      // }
    }
  };
  const handleVerifyEmail = () => {
    setEmailAlert(false);
    setShowMen(!showMenu);
    navigation.navigate('EDIT_USER_EMAIL');
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (reloadStatus === true) {
        setIsRefreshing(true);
        // console.log('abhayyayayyayay+++++++++', reloadStatus);
        onRefresh();
        dispatch(getReloadData({}));
        setTimeout(() => {
          activateTabByKey({
            label: 'Posts',
            key: 'post',
            active: true,
          });
          setIsRefreshing(false);
        }, 1000);
      }
    }, [reloadStatus])
  );
  const renderTabComponent = item => {
    const itemData = item?.filter(item => item?.active === true)[0];
    switch (itemData?.key) {
      case 'post':
        return (
          <UserMenuPostTabComponent
            data={userPostsData}
            loadNextPage={() => loadNextPage()}
            onRefresh={onRefresh}
            loadData={loadData?.data}
            isRefreshing={isRefreshing}
          />
        );
      case 'gallery':
        return (
          <GalleryTabView
            userGallery={userGallery}
            setUserGallery={setUserGallery}
            userData={{
              gallery: userImageData?.data,
              uservideo: userVideoData?.data,
              useralbum: userAlbumData?.data,
            }}
            // userData={userData}
          />
        );

      case 'chats':
        return <ChatList />;
      case 'leads':
        return <LeadList />;
      case 'my_properties':
        return <PropertyList headerShow={false} userId={selectUserData?._id} />;
      case 'my_booking':
        return <BookingList headerShow={false} />;
      case 'my_favourites':
        return <FavouriteList headerShow={false} />;
      case 'subscriptions':
        return (
          <RNView style={{ backgroundColor: 'white', alignItems: 'center', marginBottom: px(5) }}>
            <ActivePlans />
          </RNView>
        );
      case 'payments':
        return (
          <Container isTab={false} hasHeader={true} backgroundColor="white">
            <RNText style={{ marginLeft: px(20), color: ColorTheme.black, fontSize: px(16) }}>Payment History</RNText>
            <ScrollView showsVerticalScrollIndicator={false}>
              {paymentHistoryData?.data?.subscriptions?.length === (0 || undefined) ? (
                <ListEmptyComponent text="No payment history" />
              ) : (
                paymentHistoryData?.data?.subscriptions?.map((item, ind) => {
                  return <PaymentCard key={ind} data={item} />;
                })
              )}
            </ScrollView>
          </Container>
        );
      // case 'gallery':
      //   return <BusinessMenuGalleryComponent data={newImg} />;
      case 'about':
        return <UserProfileAboutTab userData={userData} />;
      default:
        return <UserMenuPostTabComponent data={userPostsData} />;
    }
  };

  const renderTabCommonCompo = (item: any) => {
    const itemData = item?.filter((item: any) => item?.active === true)[0];
    switch (itemData?.key) {
      case 'post':
        return (
          <>
            <RNView style={styles.headerView}>
              <DetailSectionHeader
                Heading={'Your posts'}
                btnText={''}
                headingTextStyle={{ fontSize: SIZES.medium15, lineHeight: 22 }}
              />
            </RNView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} style={styles.divider} />
            <RNView style={styles.whatsMind}>
              <UserCreatePostUpload profile={true} userProfile={true} />
            </RNView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} style={styles.devider} />
            {/* <RNView style={styles.chipView}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.contentContainer}
                showsHorizontalScrollIndicator={false}>
                <RNView style={styles.userTabView}>
                  {UserTabs.map((item, i) => {
                    return (
                      <PropertyCategoryChips
                        key={i}
                        item={item}
                        onPress={() => activateTabByKey(item)}
                        leftIcon={imageRenderFn(item.label)}
                        textStyle={styles.textTab}
                        style={styles.chipStyle}
                      />
                    );
                  })}
                </RNView>
              </ScrollView>
            </RNView> */}
            {/* <RNView style={styles.bottombtn}>
              <RNView style={styles.editBtn}>
                <CommonButton
                  title="See your Timelines Below"
                  style={styles.buttenstyle}
                  textStyle={styles.textBtnstyle}
                  // leftIcon={
                  //   <RNImage
                  //     style={{ height: 16, width: 16, marginRight: 5 }}
                  //     source={require('@/assets/images/business/bookmark.png')}
                  //   />
                  // }
                  onPress={() => {
                    // navigation.navigate("BusinessEditDetails");
                  }}
                />
              </RNView>
            </RNView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} /> */}
          </>
        );

      default:
        return <RNView></RNView>;
    }
  };

  if (loader) {
    return <Loader size={'large'} />;
  }

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
        <ScrollView
          contentContainerStyle={styles.topScroll}
          style={styles.topScrollStyle}
          showsVerticalScrollIndicator={false}>
          <HeaderBar
            backPress={() => navigation.goBack()}
            label={`${selectUserData?.fname ? selectUserData?.fname + ' ' + selectUserData?.lname : null}`}
          />
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
            <TouchableOpacity style={styles.userCamera} onPress={() => setshowCoverBottomSheet(true)}>
              {loadingCoverPic ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Entypo name="camera" size={24} color="black" />
              )}
            </TouchableOpacity>
          </ImageBackground>
          <RNView style={styles.topProfileView}>
            <RNView style={styles.userProfile}>
              {imgArray[0] ? (
                <RNImage
                  style={styles.profileImg}
                  source={{
                    uri: imgArray[0],
                  }}
                />
              ) : (
                <DefaultProfile
                  viewStyle={styles.userIcon}
                  textStyle={styles.userLetter}
                  username={selectUserData?.fname}
                />
              )}
              <TouchableOpacity style={styles.profileCamera} onPress={() => setshowBottomSheet(true)}>
                {loadingProfilePic ? (
                  <ActivityIndicator size={'small'} />
                ) : (
                  <Entypo name="camera" size={24} color="black" />
                )}
              </TouchableOpacity>
            </RNView>
          </RNView>

          <RNView style={styles.topMain}>
            <RNView style={styles.userNameView}>
              <RNText style={styles.username}>
                {selectUserData?.fname ? selectUserData?.fname + ' ' + selectUserData?.lname : null}
              </RNText>
            </RNView>
            <RNView style={styles.likesMain}>
              <RNText style={styles.likesText}>
                {`${selectUserData?.likeCount ? selectUserData?.likeCount + 'Likes' : ''}`}
              </RNText>
              {/* <RNText style={styles.followText}>49 Followers</RNText> */}
            </RNView>
            {/* <RNView style={styles.rating}>
              {[1, 2, 3, 4, 5].map((item: any, i) => {
                return <AntDesign name="star" key={i} size={13} color="#FFC200" />;
              })}
            </RNView> */}
            {bio && (
              <RNView style={styles.bioContainer}>
                <RNText
                  style={styles.bioTextStyle}
                  onPress={() => {
                    setIsVisible(true);
                  }}>
                  {displayBio}
                  {bio.split(' ').length > wordLimit && (
                    <RNText
                      style={styles.moreBtn}
                      onPress={() => {
                        setShowMore(!showMore);
                      }}>
                      {showMore ? ' less' : ' more'}
                    </RNText>
                  )}
                </RNText>
              </RNView>
            )}
            <RNView style={styles.buttonsView}>
              <RNView style={styles.mainBtnGroup}>
                <CommonButton
                  title="Add Home Tour"
                  style={styles.customBtn}
                  textStyle={styles.customBtnText}
                  onPress={() => {
                    navigation.navigate('DAILY_STORY', {
                      user: selectUserData?._id,
                    });
                    // Toast.show("This is a success toast!", {
                    //   type: "success",
                    // });
                    // toast.show("", {
                    //   type: "custom_toast",
                    //   animationDuration: 100,
                    //   data: {
                    //     title: "Customized toast",
                    //   },
                    //   duration: 1000,
                    // });
                  }}
                />
                <CommonButton
                  title="Edit Profile"
                  style={styles.customBtn}
                  textStyle={styles.customBtnText}
                  onPress={() => {
                    selectUserData?.role === 'BUILDER' || selectUserData?.role === 'AGENT'
                      ? navigation.navigate('USER_EDIT_DETAILS')
                      : navigation.navigate('USER_EDIT_PROFILE');
                  }}
                />
                <CommonButton
                  title="..."
                  style={styles.customMore}
                  textStyle={styles.customMoreText}
                  onPress={() => {
                    setOpenMore(true);
                  }}
                />
              </RNView>

              {setAutoLocation.lat ? (
                <CommonButton
                  textStyle={styles.btnTextStyle}
                  title="Post Property"
                  style={{
                    width: deviceWidth / 1.09,
                  }}
                  onPress={handleEmailVeriedCheck}
                />
              ) : (
                <ActivityIndicator />
              )}
            </RNView>
          </RNView>
          <Divider style={styles.dividerView} />
          {showPublicInfo && (
            <>
              <RNView style={styles.sectionContainer}>
                <RNView style={styles.headerView}>
                  <DetailSectionHeader
                    Heading={'Public Info'}
                    btnText={''}
                    headingTextStyle={styles.headingTextStyle}
                  />
                  <RNView style={styles.sectionDetailPart}>
                    {selectUserData?.location ? (
                      <RNView style={styles.detailSection}>
                        <RNView style={{ paddingRight: 7 }}>
                          <RNImage source={require('@/assets/images/business/map.png')} style={styles.detaillogos} />
                        </RNView>
                        <RNView style={{ paddingRight: 30 }}>
                          <RNText style={styles.detailText}>{selectUserData?.location}</RNText>
                        </RNView>
                      </RNView>
                    ) : (
                      <RNView></RNView>
                    )}

                    <RNView style={styles.detailSection}>
                      <RNView style={{ paddingRight: 7 }}>
                        <RNImage source={require('@/assets/images/business/time.png')} style={styles.detaillogos} />
                      </RNView>
                      <RNText style={styles.detailText}>
                        Joined on {moment(selectUserData?.createdAt).format('MMMM YYYY')}
                      </RNText>
                    </RNView>
                    {selectUserData?.propertyCount ? (
                      <RNView style={styles.detailSection}>
                        <RNView style={{ paddingRight: 7 }}>
                          <RNImage
                            source={require('@/assets/images/business/bookmark.png')}
                            style={styles.detaillogos}
                          />
                        </RNView>
                        <RNText style={styles.detailText}>{`${selectUserData?.propertyCount} Postings`}</RNText>
                      </RNView>
                    ) : (
                      <RNView></RNView>
                    )}
                  </RNView>
                </RNView>
              </RNView>
              {/* <RNView style={styles.bottombtn}>
                <RNView style={styles.editBtn}>
                  <CommonButton
                    title="Edit Public Info"
                    style={styles.buttenstyle}
                    textStyle={styles.textBtnstyle}
                    onPress={() => {
                      navigation.navigate('USER_EDIT_DETAILS');
                    }}
                  />
                </RNView>
              </RNView> */}
            </>
          )}
          <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} />

          <RNView style={styles.sectionContainer}>
            <ScrollView
              horizontal
              nestedScrollEnabled
              contentContainerStyle={{
                paddingRight: 20,
              }}
              showsHorizontalScrollIndicator={false}>
              {menuTabs.map((item, i) => {
                return (
                  <PropertyCategoryChips
                    key={i}
                    item={item}
                    onPress={() => {
                      if (item.label === 'About') {
                        setShowPublicInfo(false);
                        setuserData(selectUserData);
                      } else {
                        setShowPublicInfo(true);
                      }
                      activateTabByKey(item);
                    }}
                    textStyle={styles.chips}
                    containerStyle={styles.topTabContainerStyle}
                    style={[styles.propertyChips, { backgroundColor: item?.active ? ColorTheme?.primary : '#DBDBDB' }]}
                  />
                );
              })}
            </ScrollView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} style={styles.divider} />
            {renderTabCommonCompo(menuTabs)}
          </RNView>

          <RNView
            style={{
              width: deviceWidth,
              // alignSelf: "center",
            }}>
            {renderTabComponent(menuTabs)}
          </RNView>
          <ImageUploadBottomSheet
            showBottomSheet={showBottomSheet}
            imgArray={imgArray}
            profileImg={true}
            setLoading={val => setLoadingProfilePic(val)}
            setImageArray={setImageArray}
            setshowBottomSheet={val => setshowBottomSheet(val)}
            userProfile={true}
            loading={loadingProfilePic}
          />
          <ImageUploadBottomSheet
            showBottomSheet={showCoverBottomSheet}
            imgArray={coverimgArray}
            profileImg={false}
            setLoading={val => setLoadingCoverPic(val)}
            loading={loadingCoverPic}
            setImageArray={setCoverImageArray}
            setshowBottomSheet={val => setshowCoverBottomSheet(val)}
            userProfile={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {emailAlert && (
        <CustomAlertWrapper
          onClose={() => setEmailAlert(false)}
          openModal={() => console.log('first')}
          text={'Please verify email address to proceed'}
          head={'Verify email'}>
          <PropertyCategoryChips
            item={{ label: 'Cancel', active: true }}
            containerStyle={{
              flex: 1,
            }}
            onPress={() => {
              setEmailAlert(false);
            }}
            style={{
              backgroundColor: 'white',
            }}
          />
          <PropertyCategoryChips
            item={{ label: 'Verify' }}
            containerStyle={{
              flex: 1,
            }}
            onPress={handleVerifyEmail}
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

      <UserBioUpdate
        isVisible={isVisible}
        onPressClose={() => setIsVisible(!isVisible)}
        text={bio ? bio : 'Describe your bio'}
      />
      <BottomSheetWrapper openSheet={openMore} onClose={() => setOpenMore(!openMore)} snapPoint={px(15)}>
        <TouchableOpacity
          onPress={() => {
            const setId = setTimeout(() => {
              clearTimeout(setId);
              navigation.navigate('DELETE_ACCOUNT', { phone: userData?.mobile_no });
            }, 700);
          }}
          style={styles.deleteBtn}>
          <RNText style={styles.deleteStyle}>Delete Account</RNText>
        </TouchableOpacity>
      </BottomSheetWrapper>
    </Container>
  );
};

export default UserProfileDetails;
