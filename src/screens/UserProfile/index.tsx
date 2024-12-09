import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import DefaultProfile from '@/components/common/DefaultProfile';
import Divider from '@/components/common/Divider';
import Loader from '@/components/common/Loader';
import MyPersonalINfo from '@/components/userprofile/MyPersonalInfo';
import ProfileCard from '@/components/userprofile/ProfileCard';
import ProfileTabs from '@/components/userprofile/ProfileTabs';
import { isArray } from '@/constants/function/isArray';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useLazyGetBusinessProfileListQuery } from '@/redux/business/businessService';
import { getAppToken, getUserData, getUserDetails, resetLogin } from '@/redux/login/loginReducer';
import { useLazyGetUserDataQuery } from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';
import { getMMKVItem, MMKV_KEYS, setMMKVItem } from '@/utils/mmkv';

import { profileStyles } from './styles';

const UserProfile = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const [getUserInfo] = useLazyGetUserDataQuery();
  const route = useRoute<RouteProp<RootStackParamList, 'USER_PROFILE'>>();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [businessProfiles, setBusinessProfiles] = useState([]);
  const selectUserData = useAppSelector(getUserData);
  const selectUserToken = useAppSelector(getAppToken);
  const [getBusinessList] = useLazyGetBusinessProfileListQuery();
  const token = getMMKVItem(MMKV_KEYS.ACCESS_TOKEN);

  const [openModal, setOpenModal] = useState(false); // State for modal visibility

  const getBusinessProfiles = () => {
    setTimeout(() => {
      setLoader(false);
      getBusinessList(selectUserData._id)
        .then(res => {
          setBusinessProfiles(res.data.data);
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
    }, 1000);
  };

  useEffect(() => {
    if (!token) {
      Alert.alert('Session expired', 'Please log in again', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetLogin({}));
          },
        },
      ]);
    }
    if (selectUserToken) {
      setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, selectUserToken);
    }
    if (!selectUserData?._id) {
      getUserInfo({})
        .then(res => {
          if (!res.data.status) {
            Alert.alert('User session expired', 'Please log in again', [
              {
                text: 'OK',
                onPress: () => {
                  dispatch(resetLogin({}));
                },
              },
            ]);
          }
        })
        .catch(err => {
          console.error('Error fetching user info:', err);
        });
    }
  }, []);

  return (
    <Container backgroundColor="white" isTab={false} hasHeader={true}>
      <RNView style={profileStyles.container}>
        <RNView style={profileStyles.headPart}>
          {selectUserData?.profile_pic ? (
            <TouchableOpacity onPress={() => navigation.navigate('USER_PROFILE_DETAILS')}>
              <RNImage source={{ uri: selectUserData?.profile_pic }} style={profileStyles.userIcon} />
            </TouchableOpacity>
          ) : (
            <DefaultProfile
              username={selectUserData?.fname}
              viewStyle={profileStyles.userIcon}
              textStyle={profileStyles.userLetter}
              onPress={() => navigation.navigate('USER_PROFILE_DETAILS')}
            />
          )}
          <RNView>
            <RNText onPress={() => navigation.navigate('USER_PROFILE_DETAILS')} style={profileStyles.userName}>
              {selectUserData?.fname + ' ' + selectUserData?.lname + ' '}
              {selectUserData?.role === 'AGENT' && (
                <RNImage
                  source={require('@/assets/images/userProfile/agenticon.png')}
                  style={profileStyles.agentIcon}
                />
              )}
            </RNText>

            <RNView style={{ gap: -2 }}>
              <RNText style={profileStyles.idText}>ID: {selectUserData?.seller_id ?? '123235343'}</RNText>
              <RNText style={profileStyles.memberText}>
                Membership: {selectUserData?.isSubscribed ? 'Active' : 'Inactive'}
              </RNText>
            </RNView>
          </RNView>
        </RNView>

        <TouchableOpacity
          onPress={() => {
            getBusinessProfiles();
            setOpenModal(true); // Open the modal instead of setting openDrawer
          }}
          style={profileStyles.addBtn}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </RNView>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        <RNView style={profileStyles.tabsContainer}>
          <ProfileTabs />
        </RNView>

        {/* Below code is handling for token expiry issue resolving. Don't delete */}
        <RNView style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <RNView
            style={token ? [profileStyles.dot, { backgroundColor: ColorTheme.transparent }] : profileStyles.dot}
          />
          <RNView
            style={
              selectUserData?._id ? [profileStyles.dot, { backgroundColor: ColorTheme.transparent }] : profileStyles.dot
            }
          />
          <RNView
            style={
              selectUserToken ? [profileStyles.dot, { backgroundColor: ColorTheme.transparent }] : profileStyles.dot
            }
          />
        </RNView>
        {/* Above code is handling for token expiry issue resolving. Don't delete */}
      </ScrollView>

      {/* Modal Section */}
      <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
        <Modal visible={openModal} transparent={true} animationType="slide">
          <RNView style={profileStyles.modalContainer}>
            <RNView style={profileStyles.modalContent}>
              <RNView style={profileStyles.modalView}>
                <RNView style={profileStyles.topSectionView}>
                  {selectUserData?.profile_pic ? (
                    <TouchableOpacity onPress={() => navigation.navigate('USER_PROFILE_DETAILS')}>
                      <RNImage source={{ uri: selectUserData?.profile_pic }} style={profileStyles.userIconSheet} />
                    </TouchableOpacity>
                  ) : (
                    <DefaultProfile
                      username={selectUserData?.fname}
                      viewStyle={profileStyles.userIconSheet}
                      textStyle={profileStyles.userLetter}
                    />
                  )}
                  <RNView style={{ gap: -2 }}>
                    <RNText style={profileStyles.username}>
                      {selectUserData?.fname + ' ' + selectUserData?.lname}
                    </RNText>
                    <RNText style={profileStyles.profileText}>See your profile</RNText>
                  </RNView>
                </RNView>

                <TouchableOpacity
                  style={profileStyles.rightArrow}
                  onPress={() => {
                    setOpenModal(false);
                    setTimeout(() => {
                      navigation.navigate('USER_PROFILE_DETAILS');
                    }, 700);
                  }}>
                  <AntDesign name="right" size={17} color="black" />
                </TouchableOpacity>
              </RNView>
              <Divider style={profileStyles.divider} />

              <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileCard
                  name={'Create business profile'}
                  create={true}
                  agent={false}
                  onPress={() => {
                    setOpenModal(false);
                    setTimeout(() => {
                      navigation.navigate('BUSINESS_FORM');
                    }, 1000);
                  }}
                />
                {loader && (
                  <RNView style={{ marginTop: px(150) }}>
                    <ActivityIndicator size={'small'} color={ColorTheme.primary} />
                  </RNView>
                )}
                {isArray(businessProfiles) &&
                  businessProfiles.map((item: any, i: number) => (
                    <ProfileCard
                      agent={false}
                      onPress={() => {
                        // console.log(' business data --->', item);

                        setOpenModal(false);
                        setTimeout(() => {
                          navigation.navigate('BUSINESS_PROPERTY_DESCRIPTION', {
                            profiledata: item,
                          });
                        }, 1000);
                      }}
                      key={i}
                      name={item?.business_name}
                      create={false}
                      img={item?.profile_pic}
                    />
                  ))}
              </ScrollView>
            </RNView>
          </RNView>
        </Modal>
      </TouchableWithoutFeedback>
      <MyPersonalINfo onPressClose={() => setIsVisible(!isVisible)} isVisible={isVisible} />
    </Container>
  );
};

export default UserProfile;
