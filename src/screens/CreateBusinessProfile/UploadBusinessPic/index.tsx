import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
// import * as ImagePicker from 'expo-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';

import { ActionsheetItem } from '@gluestack-ui/themed';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

// import mime from 'mime';
import BottomSheetWrapper from '@/components/common/BottomSheetWrapper';
import HeaderBar from '@/components/common/HeaderBar';
import ImgVidUploadBottomSheet from '@/components/common/ImgVidUploadBottomSheet';
import { generateBusinessId } from '@/constants/business/profile.functions';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme, FONT } from '@/theme';

import { styles } from './styles';

// const uploadImageToserver = async (file: any) => {
//   try {
//     const response = await Apis.uploadImageFiles(file);

//     return response?.data?.data;
//   } catch (e: any) {
//     console.error('Axios response data:', e);
//     return e?.response?.data;
//   }
// };

const UploadBusinessPic = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'UPLOAD_BUSINESS_PIC'>>();
  const toast = useToast();
  const [BusinessProfileData, setBusinessProfileData] = useState({
    profile_pic: '',
    cover_pic: '',
  });

  const [statusofcin, setStatusofcin] = useState(false);

  const [openProfilePicDrawer, setOpenProfilePicDrawer] = useState(false);
  const [openCoverPicDrawer, setOpenCoverPicDrawer] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(false);
  const [loadingCoverPic, setLoadingCoverPic] = useState(false);

  const selectedData = useSelector(state => state?.loginReducer);
  const businessId = useMemo(() => {
    return generateBusinessId(16);
  }, []);

  //   const checkImageIntegrity = async (uri: string) => {
  //     try {
  //       const { width, height } = await new Promise<{
  //         width: number;
  //         height: number;
  //       }>((resolve, reject) => {
  //         Image.getSize(
  //           uri,
  //           (width, height) => resolve({ width, height }),
  //           error => reject(error)
  //         );
  //       });

  //       console.log(`Image dimensions: ${width} x ${height}`);
  //     } catch (error) {
  //       console.error('Error checking image integrity:', error);
  //     }
  //   };

  //   const pickImageProfilePic = async () => {
  //     console.log('picking profile pic');

  //     let result: any = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       // allowsEditing: false,
  //       quality: 1,
  //       // aspect: [16, 9],
  //     });

  //     if (!result.canceled) {
  //       //console.log("take Image picker :", result.assets[0].uri);
  //       setOpenProfilePicDrawer(false);
  //       setLoadingProfilePic(true);
  //       const formData: any = new FormData();

  //       //console.log(result.assets[0].uri);

  //       formData.append('file', {
  //         uri: result.assets[0].uri,
  //         type: 'image/jpeg',
  //         mimetype: 'image/jpeg',
  //         name: result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1],
  //       });

  //       const imageRes = await uploadImageToserver(formData);
  //       if (isValidURL(imageRes)) {
  //         setBusinessProfileData(prevData => ({
  //           ...prevData,
  //           profile_pic: imageRes,
  //         }));
  //         setLoadingProfilePic(false);
  //       } else {
  //         setLoadingProfilePic(false);
  //         // Alert.alert("Message", "Failed to upload image! Try again.", [
  //         //   {
  //         //     text: "Cancel",
  //         //     onPress: () => console.log("Cancel Pressed"),
  //         //     style: "cancel",
  //         //   },
  //         //   { text: "OK", onPress: () => console.log("OK Pressed") },
  //         // ]);
  //         toast.show('Failed to upload image! Try again.', {
  //           type: 'custom_toast',
  //           animationDuration: 100,
  //           data: {
  //             title: 'Message',
  //           },
  //           duration: 3000,
  //         });
  //       }
  //     } else {
  //       setOpenProfilePicDrawer(false);
  //     }
  //   };

  //   const takeImageProfilePic = async () => {
  //     console.log('taking profile pic');

  //     // No permissions request is necessary for launching the image library
  //     let result: any = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       // allowsEditing: true,
  //       quality: 1,
  //       // aspect: [16, 9],
  //     });

  //     if (!result.canceled) {
  //       console.log('take Image picker :', result.assets[0].uri);
  //       checkImageIntegrity(result.assets[0].uri);

  //       setOpenProfilePicDrawer(false);
  //       setLoadingProfilePic(true);

  //       console.log(result.assets[0].uri);

  //       const imageuri = result.assets[0].uri;

  //       const formData: any = new FormData();

  //       console.log(mime.getType(imageuri));

  //       formData.append('file', {
  //         uri: result.assets[0].uri,
  //         type: 'image/jpeg',
  //         mimetype: 'image/jpeg',
  //         name: result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1],
  //       });

  //       const imageRes = await uploadImageToserver(formData);
  //       console.log('img res from server: ', imageRes);

  //       if (isValidURL(imageRes)) {
  //         setLoadingProfilePic(false);
  //         setBusinessProfileData(prevData => ({
  //           ...prevData,
  //           profile_pic: imageRes,
  //         }));
  //       } else {
  //         setLoadingProfilePic(false);
  //         // Alert.alert("Message", "Failed to upload image! Try again.", [
  //         //   {
  //         //     text: "Cancel",
  //         //     onPress: () => console.log("Cancel Pressed"),
  //         //     style: "cancel",
  //         //   },
  //         //   { text: "OK", onPress: () => console.log("OK Pressed") },
  //         // ]);
  //         toast.show('Failed to upload image! Try again.', {
  //           type: 'custom_toast',
  //           animationDuration: 100,
  //           data: {
  //             title: 'Message',
  //           },
  //           duration: 3000,
  //         });
  //       }
  //     }
  //   };

  //   const pickImageCoverPic = async () => {
  //     // No permissions request is necessary for launching the image library
  //     let result: any = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       // allowsEditing: false,
  //       quality: 1,
  //       // aspect: [16, 9],
  //     });

  //     if (!result.canceled) {
  //       setOpenCoverPicDrawer(false);
  //       setLoadingCoverPic(true);
  //       const formData: any = new FormData();

  //       formData.append('file', {
  //         uri: result.assets[0].uri,
  //         type: 'image/jpeg',
  //         mimetype: 'image/jpeg',
  //         name: result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1],
  //       });

  //       const imageRes = await uploadImageToserver(formData);
  //       console.log('imageRes', imageRes);
  //       if (isValidURL(imageRes)) {
  //         setBusinessProfileData(prevData => ({
  //           ...prevData,
  //           cover_pic: imageRes,
  //         }));

  //         setLoadingCoverPic(false);
  //       } else {
  //         setLoadingCoverPic(false);
  //         // Alert.alert("Message", "Failed to upload image! Try again.", [
  //         //   {
  //         //     text: "Cancel",
  //         //     onPress: () => console.log("Cancel Pressed"),
  //         //     style: "cancel",
  //         //   },
  //         //   { text: "OK", onPress: () => console.log("OK Pressed") },
  //         // ]);
  //         toast.show('Failed to upload image! Try again.', {
  //           type: 'custom_toast',
  //           animationDuration: 100,
  //           data: {
  //             title: 'Message',
  //           },
  //           duration: 3000,
  //         });
  //       }
  //     } else {
  //       setOpenCoverPicDrawer(false);
  //     }
  //   };

  //   const takeImageCoverPic = async () => {
  //     // No permissions request is necessary for launching the image library
  //     let result: any = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       // allowsEditing: true,
  //       quality: 1,
  //       // aspect: [16, 9],
  //     });

  //     if (!result.canceled) {
  //       setOpenCoverPicDrawer(false);
  //       setLoadingCoverPic(true);
  //       const formData: any = new FormData();
  //       formData.append('file', {
  //         uri: result.assets[0].uri,
  //         type: 'image/jpeg',
  //         mimetype: 'image/jpeg',
  //         name: result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1],
  //       });

  //       const imageRes = await uploadImageToserver(formData);

  //       if (isValidURL(imageRes)) {
  //         setLoadingCoverPic(false);
  //         setBusinessProfileData(prevData => ({
  //           ...prevData,
  //           cover_pic: imageRes,
  //         }));
  //       } else {
  //         setLoadingCoverPic(false);
  //         // Alert.alert("Message", "Failed to upload image! Try again.", [
  //         //   {
  //         //     text: "Cancel",
  //         //     onPress: () => console.log("Cancel Pressed"),
  //         //     style: "cancel",
  //         //   },
  //         //   { text: "OK", onPress: () => console.log("OK Pressed") },
  //         // ]);
  //         toast.show('Failed to upload image! Try again.', {
  //           type: 'custom_toast',
  //           animationDuration: 100,
  //           data: {
  //             title: 'Message',
  //           },
  //           duration: 3000,
  //         });
  //       }
  //     }
  //   };

  const continueToNext = () => {
    // console.log('dhsghs', {
    //   ...route.params.step1,
    //   ...BusinessProfileData,
    // });
    navigation.navigate('BUSINESS_PROFILE_FINAL', {
      step2: {
        ...route.params.step1,
        ...BusinessProfileData,
      },
    });
  };
  // console.log('setBusinessProfileData', BusinessProfileData);
  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar label="" backPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <RNView>
          <RNView style={styles.topSection}>
            <RNView style={styles.topSectionView}>
              <RNText style={styles.topText}>Your profile is almost ready</RNText>
              <RNText style={styles.completeProfile}>Complete your profile 100% for more reach.</RNText>
            </RNView>
            <RNView>
              {BusinessProfileData?.cover_pic?.length > 0 ? (
                <ImageBackground
                  source={{
                    uri: BusinessProfileData.cover_pic,
                  }}
                  style={styles.imgBg}
                />
              ) : (
                <RNView style={styles.defaultBg}></RNView>
              )}
              <TouchableOpacity
                onPress={() => {
                  setOpenCoverPicDrawer(!openCoverPicDrawer);
                }}
                style={styles.camLoder}>
                {loadingCoverPic ? (
                  <ActivityIndicator size={'small'} />
                ) : (
                  <Entypo name="camera" size={24} color="black" />
                )}
              </TouchableOpacity>
            </RNView>
          </RNView>
          <RNView>
            <RNView style={styles.bussProfile}>
              {BusinessProfileData?.profile_pic?.length <= 0 ? (
                <RNImage style={styles.maskImg} source={require('@/assets/images/customImage/MaskUser.png')} />
              ) : (
                <RNImage
                  style={styles.imgStyle}
                  source={{
                    uri: BusinessProfileData?.profile_pic,
                  }}
                />
              )}
            </RNView>
            <TouchableOpacity
              onPress={() => {
                setOpenProfilePicDrawer(!openProfilePicDrawer);
              }}
              style={styles.profileLoader}>
              {loadingProfilePic ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Entypo name="camera" size={20} color="black" />
              )}
            </TouchableOpacity>
          </RNView>
        </RNView>

        <RNView style={styles.bussNameView}>
          <RNText
            style={{
              fontFamily: FONT.PoppinsSemiBold,
              fontSize: 20,
            }}>
            {route.params.step1.business_name}
          </RNText>
        </RNView>
        <RNView style={styles.subHeader}>
          <RNView>
            <RNText style={styles.bussId}>Business ID</RNText>
            <RNText style={styles.bussId}># {businessId}</RNText>
          </RNView>
          <RNView>
            <AntDesign name="checkcircle" size={20} color={ColorTheme.nearLukSuccess} />
          </RNView>
        </RNView>
        <RNText style={styles.details}>
          A unique business id is generated using the business name. it will be on your profile and
          nearluk.com/businessname/id
        </RNText>
        <RNText style={styles.addProfile}>Add Profile and Cover Photo</RNText>
      </ScrollView>
      <RNView style={styles.btnTopView}>
        <CommonButton
          title="Continue"
          onPress={continueToNext}
          // disabled={
          //   BusinessProfileData.cover_pic.length <= 0 ||
          //   BusinessProfileData.profile_pic.length <= 0
          //     ? true
          //     : false
          // }
          disabled={false}
          // style={{
          //   backgroundColor:
          //     BusinessProfileData.cover_pic.length <= 0 ||
          //     BusinessProfileData.profile_pic.length <= 0
          //       ? ColorTheme.nearLukGray4
          //       : ColorTheme.primary,
          // }}
          style={styles.btnStyle}
          textStyle={styles.btnText}
        />
      </RNView>

      <ImgVidUploadBottomSheet
        showBottomSheet={openProfilePicDrawer}
        // imgArray={imgArray}
        setLoading={setLoadingProfilePic}
        setImageArray={data => setBusinessProfileData({ ...BusinessProfileData, profile_pic: data[0] })}
        setshowBottomSheet={() => setOpenProfilePicDrawer(!openProfilePicDrawer)}
        photos={true}
        loading={loadingProfilePic}
      />
      <ImgVidUploadBottomSheet
        showBottomSheet={openCoverPicDrawer}
        // imgArray={imgArray}
        setLoading={setLoadingCoverPic}
        setImageArray={data => setBusinessProfileData({ ...BusinessProfileData, cover_pic: data[0] })}
        setshowBottomSheet={() => setOpenCoverPicDrawer(!openCoverPicDrawer)}
        photos={true}
        loading={loadingCoverPic}
      />
    </Container>
  );
};

export default UploadBusinessPic;
