import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import DefaultProfile from '@/components/common/DefaultProfile';
import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import Divider from '@/components/common/Divider';
import GalleryTabView from '@/components/common/GalleryTabView';
import HeaderBar from '@/components/common/HeaderBar';
import Loader from '@/components/common/Loader';
import ProfilePropertyList from '@/components/common/ProfilePropertyList';
import UserCreatePostUpload from '@/components/common/UserCreatePostUpload';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import { UserMenuPostTabComponent } from '@/components/userprofile/UserMenuPostTabComponent';
import UserProfileAboutTab from '@/components/userprofile/UserProfileAboutTab';
import { activateItemByKey } from '@/constants/function/property.helperFunctions';
import { OtherUserMenuTabs, UserGalleryTabs, UserTabs } from '@/constants/userprofile';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import {
  useGetUserAlbumsQuery,
  useGetUserDetailByIdQuery,
  useGetUserImagesQuery,
  useGetUserVideosQuery,
  useLazyGetUserPostsQuery,
} from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

const OtherUserProfileDetails = () => {
  // console.log("OtherUserProfileDetails++", route?.params);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'OTHER_USER_PROFILE_DETAILS'>>();
  const toast = useToast();
  const {
    data: userData,
    isLoading,
    status,
  } = useGetUserDetailByIdQuery(route?.params?.id, {
    skip: !route?.params?.id,
    refetchOnMountOrArgChange: route?.params?.id,
  });
  // console.log('userDatauserData+++++++++', JSON.stringify(userData), route?.params?.id, status);
  const [menuTabs, setMenuTabs] = useState(OtherUserMenuTabs);
  const [userGallery, setUserGallery] = useState(UserGalleryTabs);
  const [pageNumber, setPageNumber] = useState(1);
  //   const reload = useSelector((state: any) => state?.homePageReducer?.reload);
  const [userPostsData, setUserPostsData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { data: userImageData } = useGetUserImagesQuery(userData?._id, { skip: !userData?._id });
  const { data: userVideoData } = useGetUserVideosQuery(userData?._id, { skip: !userData?._id });
  const { data: userAlbumData } = useGetUserAlbumsQuery(userData?._id, { skip: !userData?._id });
  const [getUserPosts, { data: loadData }] = useLazyGetUserPostsQuery();

  const getAllUserPosts = async payload => {
    getUserPosts(payload).then(result => {
      // console.log('getUserPosts++++++++', result);
      if (result?.data?.status) {
        if (result?.data?.data?.length && payload?.pageNumber > 1) {
          // console.log('payload?.pageNumber > 1', payload?.pageNumber > 1);
          setUserPostsData(prev => prev.concat(result?.data?.data));
        } else {
          // console.log('payload?.pageNumber > 1', payload?.pageNumber);
          setUserPostsData(prev => prev.concat(result?.data?.data));
        }
      } else {
        if (result?.error?.status === false) {
          if (payload?.pageNumber == 1) {
            if (route?.params?.id) onRefresh();
          } else {
            setUserPostsData(userPostsData);
          }
        }
      }
    });
  };

  const onRefresh = () => {
    if (route?.params?.id) {
      getAllUserPosts({
        pageSize: '10',
        pageNumber: '1',
        user: route?.params?.id,
      });
    }
  };

  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length >= 10) {
      setPageNumber(pageNumber + 1);
      if (route?.params?.id) {
        getAllUserPosts({
          pageSize: '10',
          pageNumber: `${pageNumber + 1}`,
          user: route?.params?.id,
        });
      } else {
        // console.log('selectedData?.user?.user?._id,', route?.params?.id);
      }
    }
  };
  const activateTabByKey = (item: any) => {
    const shallow = [...menuTabs];
    const filterData = activateItemByKey(shallow, item.key);
    setMenuTabs(filterData);
  };
  const activateTabByKeyforGallery = (item: any) => {
    const shallow = [...userGallery];
    const filterData = activateItemByKey(shallow, item.key);
    setUserGallery(filterData);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const renderTabComponent = (item: any) => {
    const itemData = item?.filter((item: any) => item?.active === true)[0];
    switch (itemData?.key) {
      case 'post':
        return (
          <UserMenuPostTabComponent
            data={userPostsData}
            loadNextPage={() => loadNextPage()}
            onRefresh={onRefresh}
            loadData={loadData?.data}
          />
        );
      case 'gallery':
        // return <GalleryTabView userGallery={userGallery} setUserGallery={setUserGallery} userData={userData} />;
        return (
          <GalleryTabView
            userGallery={userGallery}
            setUserGallery={setUserGallery}
            userData={{
              gallery: userImageData?.data,
              uservideo: userVideoData?.data,
              useralbum: userAlbumData?.data,
            }}
          />
        );
      case 'properties':
        return <ProfilePropertyList headerShow={false} userId={route?.params?.id} />;
      // case 'about':
      //   return <UserProfileAboutTab userData={userData} />;
      default:
        return <UserMenuPostTabComponent data={userPostsData} />;
    }
  };

  const renderTabCommonCompo = item => {
    const itemData = item?.filter(item => item?.active === true)[0];
    switch (itemData?.key) {
      case 'postttt':
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
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} style={styles.divider} />
            <RNView style={styles.chipView}>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 100 }}
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
                        style={styles.propertyChips}
                      />
                    );
                  })}
                </RNView>
              </ScrollView>
            </RNView>
            <RNView style={styles.bottombtn}>
              <RNView style={styles.editBtn}>
                <CommonButton
                  title="Manage Posts"
                  style={styles.buttenstyle}
                  textStyle={styles.textBtnstyle}
                  //   leftIcon={
                  //     <RNImage
                  //       style={{ height: 16, width: 16, marginRight: 5 }}
                  //       source={require('../../../../assets/images/business/bookmark.png')}
                  //     />
                  //   }
                  onPress={() => {
                    // navigation.navigate("BusinessEditDetails");
                  }}
                />
              </RNView>
            </RNView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} />
          </>
        );
      default:
        return <RNView></RNView>;
    }
  };

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  const imageRenderFn = (name: string) => {
    switch (name) {
      case 'Home Tour':
        return <RNImage style={styles.renderImg} source={require('@/assets/images/customImage/video-player.png')} />;
      case 'Go Live':
        return <RNImage style={styles.renderImg} source={require('@/assets/images/customImage/eye.png')} />;
      default:
        break;
    }
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
        <ScrollView
          contentContainerStyle={styles.topScroll}
          style={styles.topScrollStyle}
          showsVerticalScrollIndicator={false}>
          <HeaderBar
            backPress={() => navigation.goBack()}
            label={`${userData?.fname ? userData?.fname + ' ' + userData?.lname : null}`}
          />
          <ImageBackground
            source={
              userData?.cover_pic
                ? { uri: userData?.cover_pic }
                : {
                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                  }
            }
            style={styles.backgroundImg}
            resizeMode="cover"></ImageBackground>
          <RNView style={styles.topProfileView}>
            <RNView style={styles.userProfile}>
              {userData?.profile_pic ? (
                <RNImage
                  style={styles.profileImg}
                  source={{
                    uri: userData?.profile_pic,
                  }}
                />
              ) : (
                <DefaultProfile username={userData?.fname} viewStyle={styles.userIcon} textStyle={styles.userLetter} />
              )}
            </RNView>
          </RNView>

          <RNView style={styles.topMain}>
            <RNView style={styles.userNameView}>
              <RNText style={styles.username}>
                {userData?.fname ? userData?.fname + ' ' + userData?.lname : null}
              </RNText>
              {userData?.role === 'BUILDER' && (
                <RNImage
                  source={require('@/assets/images/business/verify.png')}
                  style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                  resizeMode="contain"
                />
              )}
              {userData?.role === 'AGENT' && (
                <RNImage
                  source={require('@/assets/images/business/nearluk-agent-logo.png')}
                  style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                  resizeMode="contain"
                />
              )}
              {userData?.role === 'USER' && (
                <RNImage
                  source={require('@/assets/images/business/nearluk-agent-logo.png')}
                  style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                  resizeMode="contain"
                />
              )}
            </RNView>
            <RNView style={styles.likesMain}>
              <RNText style={styles.likesText}>{`${userData?.likeCount ? userData?.likeCount + 'Likes' : ''}`}</RNText>
              {/* <RNText style={styles.followText}>49 Followers</RNText> */}
            </RNView>
            <RNView style={styles.rating}>
              {/* {[1, 2, 3, 4, 5].map((item: any, i) => {
              return <AntDesign name="star" key={i} size={13} color="#FFC200" />;
            })} */}
              {/* <RNText>4</RNText> */}
            </RNView>
            {userData?.bio && (
              <RNView style={styles.bioContainer}>
                <RNText
                  style={styles.bioTextStyle}
                  // onPress={() => {
                  //   navigation.navigate("UserBioScreen", userData);
                  // }}
                >
                  {showMore ? userData?.bio : `${userData?.bio.slice(0, 100)} ...`}
                  <RNText
                    style={styles.moreBtn}
                    onPress={() => {
                      setShowMore(!showMore);
                    }}>
                    {showMore ? 'less' : 'more'}
                  </RNText>
                </RNText>
              </RNView>
            )}
            {/* <RNView style={styles.buttonsView}>
              <RNView style={styles.mainBtnGroup}>
                <CommonButton
                  title="Chat"
                  style={styles.customBtn}
                  textStyle={styles.customBtnText}
                  onPress={() => {
                    // navigation.navigate("DailyStory");
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
                  title="Contact Info"
                  style={styles.customBtn}
                  textStyle={styles.customBtnText}
                  onPress={() => {
                    // navigation.navigate("UserEditProfile");
                  }}
                />
                <CommonButton title="..." style={styles.customMore} textStyle={styles.customMoreText} />
              </RNView>
              <RNView style={styles.hideBtn}></RNView>
            </RNView> */}
          </RNView>
          <Divider style={styles.dividerView} />
          <RNView style={styles.sectionContainer}>
            <RNView style={styles.headerView}>
              <DetailSectionHeader Heading={'Public Info'} btnText={''} headingTextStyle={styles.headingTextStyle} />
              <RNView style={styles.sectionDetailPart}>
                {userData?.location && (
                  <RNView style={styles.detailSection}>
                    <RNView style={{ paddingRight: 7 }}>
                      <RNImage source={require('@/assets/images/business/map.png')} style={styles.detaillogos} />
                    </RNView>
                    <RNView style={{ paddingRight: 30 }}>
                      <RNText style={styles.detailText}>{userData?.location}</RNText>
                    </RNView>
                  </RNView>
                )}
                <RNView style={styles.detailSection}>
                  <RNView style={{ paddingRight: 7 }}>
                    <RNImage source={require('@/assets/images/business/time.png')} style={styles.detaillogos} />
                  </RNView>
                  <RNText style={styles.detailText}>Joined on {moment(userData?.updatedAt).format('MMMM YYYY')}</RNText>
                </RNView>
                {userData?.propertyCount ? (
                  <RNView style={styles.detailSection}>
                    <RNView style={{ paddingRight: 7 }}>
                      <RNImage source={require('@/assets/images/business/bookmark.png')} style={styles.detaillogos} />
                    </RNView>

                    <RNText style={styles.detailText}>
                      {userData?.propertyCount && `${userData?.propertyCount} Postings`}
                    </RNText>
                  </RNView>
                ) : (
                  <RNView></RNView>
                )}
              </RNView>
            </RNView>
          </RNView>
          <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} />

          <RNView style={styles.sectionContainer}>
            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingRight: 20,
              }}
              showsHorizontalScrollIndicator={false}>
              {menuTabs.map((item, i) => {
                return (
                  <PropertyCategoryChips
                    key={i}
                    item={item}
                    onPress={() => activateTabByKey(item)}
                    textStyle={styles.chips}
                    containerStyle={styles.topTabContainerStyle}
                    style={[styles.propertyChips, { backgroundColor: item.active ? ColorTheme.primary : '#DBDBDB' }]}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default OtherUserProfileDetails;
