import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import DefaultProfile from '@/components/common/DefaultProfile';
import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import HeaderBar from '@/components/common/HeaderBar';
import ImageUploadBottomSheet from '@/components/common/ImageUploadBottomSheet';
import Loader from '@/components/common/Loader';
import UserBioUpdate from '@/components/userprofileupdate/UserBioUpdate';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { deviceHeight, deviceWidth } from '@/utils';

import { styles } from './styles';

const UserEditProfile = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, 'USER_EDIT_PROFILE'>>();
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const image1 =
    'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  const selectedData = useAppSelector(getUserData);
  const [UserData, setUserData] = useState(selectedData);
  const [showBottomSheet, setshowBottomSheet] = useState(false);
  const [showCoverBottomSheet, setshowCoverBottomSheet] = useState(false);
  const [imgArray, setImageArray] = useState<string[]>([selectedData?.profile_pic ? selectedData?.profile_pic : '']);
  const [coverimgArray, setCoverImageArray] = useState<string[]>([
    selectedData?.cover_pic ? selectedData?.cover_pic : '',
  ]);
  const [loading, setLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const ref = useRef(null);
  //   const dispatch = useDispatch();

  useEffect(() => {
    setUserData(selectedData);
  }, [selectedData]);

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        label="Edit Profile"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        style={{
          backgroundColor: '#F1F1F1',
        }}
        showsVerticalScrollIndicator={false}
        ref={ref}>
        <RNView style={styles.sectionContainer}>
          <RNView style={styles.picContainer}>
            <DetailSectionHeader
              Heading={'Profile Picture'}
              btnText={'Edit'}
              editBtnFunction={() => {
                setshowBottomSheet(true);
              }}
            />
            <RNView style={styles.sectionImage}>
              {imgArray[0] ? (
                picLoading ? (
                  <Loader size={'large'} width={120} height={120} />
                ) : (
                  <RNImage source={{ uri: imgArray[0] }} style={styles.profileImage} />
                )
              ) : picLoading ? (
                <Loader size={'large'} width={120} height={120} />
              ) : (
                <DefaultProfile viewStyle={styles.userIcon} textStyle={styles.userLetter} username={UserData?.fname} />
              )}
            </RNView>
          </RNView>
          <RNView style={styles.separator} />
        </RNView>
        <RNView style={styles.sectionContainer}>
          <DetailSectionHeader
            Heading={'Cover Picture'}
            btnText={'Edit'}
            editBtnFunction={() => {
              setshowCoverBottomSheet(true);
            }}
          />
          {coverimgArray[0] ? (
            <RNView style={styles.imageSection}>
              {loading ? (
                <Loader size={'large'} width={deviceWidth / 1.09} height={230} />
              ) : (
                <RNImage source={{ uri: coverimgArray[0] }} style={styles.coverPicstyle} />
              )}
            </RNView>
          ) : (
            <RNView style={styles.imageSection}>
              {loading ? (
                <Loader size={'large'} width={deviceWidth / 1.09} height={230} />
              ) : (
                <RNImage
                  source={{
                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                  }}
                  style={styles.coverPicstyle}
                />
              )}
            </RNView>
          )}
          <RNView style={styles.separator} />
        </RNView>

        <RNView style={styles.sectionContainer}>
          <RNView style={{ width: deviceWidth / 1.09 }}>
            <DetailSectionHeader
              Heading={'Bio'}
              btnText={UserData?.bio ? 'Edit' : ''}
              editBtnFunction={() => {
                setIsVisible(true);
              }}
            />
            {UserData?.bio ? (
              <RNView style={styles.sectionText}>
                <RNText style={styles.bioTextStyle}>{UserData.bio}</RNText>
              </RNView>
            ) : (
              <RNView style={styles.sectionText}>
                <RNText
                  style={styles.bioTextStyle1}
                  onPress={() => {
                    setIsVisible(true);
                  }}>
                  Describe your bio
                </RNText>
              </RNView>
            )}
          </RNView>
          <RNView style={styles.separator} />
        </RNView>
        <RNView style={styles.sectionContainer}>
          <RNView style={{ width: deviceWidth / 1.09 }}>
            <DetailSectionHeader Heading={'Details'} btnText={''} />
            <RNView style={styles.sectionDetailPart}>
              <RNView style={styles.detailSection}>
                <RNView style={{ paddingRight: 7 }}>
                  <RNImage source={require('@/assets/images/business/map.png')} style={styles.detaillogos} />
                </RNView>
                <RNView style={{ paddingRight: 30 }}>
                  <RNText style={styles.detailText}>{UserData?.city ? UserData.city : 'Hyderabad'}</RNText>
                </RNView>
              </RNView>

              <RNView style={styles.detailSection}>
                <RNView style={{ paddingRight: 7 }}>
                  <RNImage source={require('@/assets/images/business/globe.png')} style={styles.detaillogos} />
                </RNView>
                <RNText
                  style={styles.detailText}>{`joined on ${moment(UserData.createdAt).format('MMMM YYYY')}`}</RNText>
              </RNView>
              <RNView style={styles.detailSection}>
                <RNView style={{ paddingRight: 7 }}>
                  <RNImage source={require('@/assets/images/business/star.png')} style={styles.detaillogos} />
                </RNView>
                <RNText style={styles.detailText}>5 Postings</RNText>
              </RNView>
            </RNView>
          </RNView>
        </RNView>
        <RNView style={styles.bottombtn}>
          <RNView style={styles.editBtn}>
            <CommonButton
              title="Edit Details"
              style={styles.costumBtn}
              textStyle={styles.BtnTextStyle}
              onPress={() => {
                navigation.navigate('USER_EDIT_DETAILS');
              }}
            />
          </RNView>
        </RNView>
        <ImageUploadBottomSheet
          showBottomSheet={showBottomSheet}
          imgArray={imgArray}
          profileImg={true}
          setLoading={setPicLoading}
          setImageArray={setImageArray}
          setshowBottomSheet={setshowBottomSheet}
        />
        <ImageUploadBottomSheet
          showBottomSheet={showCoverBottomSheet}
          imgArray={coverimgArray}
          profileImg={false}
          setLoading={setLoading}
          setImageArray={setCoverImageArray}
          setshowBottomSheet={setshowCoverBottomSheet}
        />
      </ScrollView>
      <UserBioUpdate
        isVisible={isVisible}
        onPressClose={() => setIsVisible(!isVisible)}
        text={UserData.bio ? UserData.bio : 'Describe your bio'}
      />
    </Container>
  );
};

export default UserEditProfile;
