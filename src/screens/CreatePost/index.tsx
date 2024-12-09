import React, { useEffect, useState } from 'react';
import { Animated, Keyboard, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import CommonImageComp from '@/components/common/CommonImageComp';
import DefaultProfile from '@/components/common/DefaultProfile';
import ImgVidUploadBottomSheet from '@/components/common/ImgVidUploadBottomSheet';
import Loader from '@/components/common/Loader';
import { isArray } from '@/constants/function/isArray';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useCreateBuilderPostDetailsMutation } from '@/redux/builder/builderService';
import { getReloadData, getUserData } from '@/redux/login/loginReducer';
import { useCreatePostApiMutation, useUpdatePostApiMutation } from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme, SIZES } from '@/theme';

import { styles } from './styles';

const CreatePost = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'CREATE_POST'>>();
  //console.log(
  //'CreatePost+++++++++',
  // route?.params?.data,
  // route?.params?.edit,
  // route?.params?.userProfile,
  // route?.params?.upload
  //JSON.stringify(route?.params?.builderData)
  //);
  const [animation] = useState(new Animated.Value(0));
  const dispatch = useAppDispatch();
  const selectUserData = useAppSelector(getUserData);
  // console.log("selectUserData++", selectUserData);
  //   const businessData = useSelector((state: any) => state?.businessProfileReducer);
  const businessData = { profile_pic: '' };
  //   const businessData = useSelector((state: any) => state?.businessProfileReducer);
  const [userBusinessData, setUserBusinessData] = useState(route?.params?.edit ? {} : businessData);
  const toast = useToast();
  const [text, setText] = useState(route?.params?.edit ? route?.params?.data?.caption : '');
  const [showBottomSheet, setshowBottomSheet] = useState(route?.params?.upload || false);
  const [showVideoBottomSheet, setshowVideoBottomSheet] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [createPostMutation] = useCreatePostApiMutation();
  const [updatePostMutation, { status }] = useUpdatePostApiMutation();
  // console.log('createPostMutation++', status);
  // console.log('loadingVideo+++', loadingVideo);
  const [imgArray, setImageArray] = useState<string[]>(
    route?.params?.edit ? (route?.params?.data?.media ? route?.params?.data?.media : []) : []
  );
  // console.log("imgArray+++++++++++++", imgArray);
  const existingMedia = route?.params?.edit ? (route?.params?.data?.media ? route?.params?.data?.media : []) : [];
  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      speed: 5, // Adjust the speed as needed
    }).start();
  }, []);

  const handleImages = data => {
    const temp = imgArray.filter(item => {
      return item !== data;
    });
    setImageArray(temp);
  };

  const handlePostCreationFun = async () => {
    try {
      let payload: any;

      if (route?.params?.userProfile) {
        payload = imgArray.length
          ? {
              user: selectUserData._id,
              business_id: null,
              media: imgArray,
              caption: text,
            }
          : {
              user: selectUserData._id,
              business_id: null,
              caption: text,
            };
      }
      if (route?.params?.builderData) {
        payload = imgArray.length
          ? {
              user: route?.params?.builderData?.business_owner,
              business_id: route?.params?.builderData._id,
              media: imgArray,
              caption: text,
            }
          : {
              user: route?.params?.builderData?.business_owner,
              business_id: route?.params?.builderData._id,
              media: null,
              caption: text,
            };
      } else {
        payload = imgArray.length
          ? {
              user: selectUserData._id,
              business_id: userBusinessData?._id,
              media: imgArray,
              caption: text,
            }
          : {
              user: selectUserData._id,
              business_id: userBusinessData?._id,
              caption: text,
            };
      }
      // console.log('payload+++++++++++', JSON.stringify(payload));
      createPostMutation(payload).then(response => {
        // console.log('respsososo', response);
        if (response?.data?.status) {
          navigation.goBack();
        } else {
          toast.show(response?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Auth message',
            },
            duration: 3000,
          });
        }
      });
      // console.log("response.data.status", response.data);
    } catch (err) {
      toast.show('Something went wrong', {
        type: 'error_toast',
        animationDuration: 100,
        data: {
          title: 'Auth message',
        },
        duration: 3000,
      });
    }
  };
  const handleUpdatePost = async () => {
    const payload = {
      postId: route?.params?.data?._id,
      updatedData: {
        existing_media: existingMedia?.length > 0 ? existingMedia : null,
        new_media: imgArray?.length > 0 ? imgArray : null,
        caption: text,
      },
    };

    console.log('payload+++', payload);
    updatePostMutation(payload).then(response => {
      console.log('response.data.status', JSON.stringify(response));
      if (response?.data?.status) {
        navigation.goBack();
      } else {
        toast.show(response?.error?.message || 'Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Auth message',
          },
          duration: 3000,
        });
      }
    });
  };
  // console.log("++++++++++++", userBusinessData);
  const changeByProfileAccess = () => {
    if (route?.params?.userProfile) {
      return selectUserData;
    } else {
      return userBusinessData;
    }
  };

  // console.log("changeByProfileAccess", changeByProfileAccess());
  // const getBusinessData = async (id: string) => {
  //   try {
  //     const response: any = await Apis.getOneBusinessIdyApi(id);
  //     console.log("getBusinessData+++++", response?.data?.data);
  //     if (response?.data?.status) {
  //       setUserBusinessData(response?.data?.data);
  //     }
  //   } catch (err) {
  //     console.log("err", err?.response);
  //     toast.show(err?.response?.data?.message || "Something went wrong", {
  //       type: "error_toast",
  //       animationDuration: 100,
  //       data: {
  //         title: "Auth message",
  //       },
  //       duration: 3000,
  //     });
  //   }
  // };
  const userName = route?.params?.userProfile ? changeByProfileAccess()?.fname : changeByProfileAccess()?.business_name;
  // useEffect(() => {
  //   console.log('dnsjknfjkdsb+++++++++++');
  //   if (route?.params?.data?.business?.business_id) {
  //     console.log('route?.params?.data?.business', route?.params?.data?.business);
  //     setUserBusinessData(route?.params?.data?.business);
  //   }
  // }, [route?.params?.edit]);

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.animStyle,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0], // Adjust as needed for the desired height of the pop-up
                  }),
                },
              ],
            },
          ]}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <RNView style={styles.headerMain}>
              <RNView style={styles.headerView}>
                <RNView></RNView>
                <RNView>
                  <RNText style={styles.headerText}>What’s on your mind!</RNText>
                </RNView>
                <TouchableOpacity style={styles.crossBtn} onPress={() => navigation.goBack()}>
                  <AntDesign name="close" size={18} color="black" />
                </TouchableOpacity>
              </RNView>
              <RNView style={styles.main}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <RNView style={styles.profileDetail}>
                  <RNView>
                    {changeByProfileAccess()?.profile_pic ? (
                      route?.params?.builderData ? (
                        <RNImage source={{ uri: route?.params?.builderData?.profile_pic }} style={styles.imgStyle} />
                      ) : (
                        <RNImage source={{ uri: changeByProfileAccess()?.profile_pic }} style={styles.imgStyle} />
                      )
                    ) : route?.params?.builderData ? (
                      route?.params?.builderData?.profile_pic?
                      <RNImage source={{ uri: route?.params?.builderData?.profile_pic }} style={styles.imgStyle} />
                      :
                      <DefaultProfile
                        username={userName}
                        onPress={() => navigation.goBack()}
                        textStyle={styles.userLetter}
                        viewStyle={styles.userIcon}
                      />
                    ) : (
                      <DefaultProfile
                        username={userName}
                        onPress={() => navigation.navigate('USER_PROFILE_DETAILS')}
                        textStyle={styles.userLetter}
                        viewStyle={styles.userIcon}
                      />
                    )}
                  </RNView>
                  <RNView style={styles.userView}>
                    <RNText style={styles.userText}>
                      {route?.params?.userProfile
                        ? route?.params?.builderData
                          ? route?.params?.builderData?.business_name
                          : changeByProfileAccess()?.fname
                        : route?.params?.builderData
                          ? route?.params?.builderData?.business_name
                          : changeByProfileAccess()?.business_name}
                    </RNText>
                    <RNText style={styles.profileText}>See your profile</RNText>
                  </RNView>
                </RNView>
                </TouchableOpacity>
                
              </RNView>
              <RNView>
                <TextInput
                  placeholder="Start typing here..."
                  placeholderTextColor={'#909090'}
                  textAlignVertical="top"
                  value={text}
                  onChangeText={t => setText(t)}
                  multiline={true}
                  style={styles.inputStyle}
                  // numberOfLines={10}
                />
              </RNView>
              <ScrollView style={styles.uploadSpace} showsVerticalScrollIndicator={false}>
                {/* {loadingVideo ||
                (loadingProfilePic && (
                  <RNView style={[styles.uploadLoading, { position: 'absolute', zIndex: 22, top: 0 }]}>
                    <Loader viewStyle={styles.uploadLoading} size={'large'} />
                  </RNView>
                ))} */}
                <RNView style={styles.uploadContent}>
                  {isArray(imgArray) &&
                    imgArray.map((item, ind) => {
                      // console.log("first++++++++++", verifyImageString(item));
                      return (
                        <CommonImageComp
                          key={ind}
                          item={item}
                          handleImages={item => handleImages(item)}
                          close={true}
                          imgStyles={styles.imgStyles}
                        />
                      );
                    })}
                </RNView>
              </ScrollView>
            </RNView>
          </TouchableWithoutFeedback>

          <RNView style={styles.topView}>
            {!(loadingVideo || loadingProfilePic) ? (
              <RNView style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => setshowBottomSheet(true)}>
                  <RNImage source={require('@/assets/images/userProfile/gallery.png')} style={styles.iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setshowVideoBottomSheet(true)}>
                  <RNImage source={require('@/assets/images/userProfile/play.png')} style={styles.iconStyle} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => setshowBottomSheet(true)}>
                <RNImage source={require('@/assets/images/userProfile/gif.png')} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity>
                <RNImage source={require('@/assets/images/userProfile/happiness.png')} style={styles.iconStyle} />
              </TouchableOpacity> */}
              </RNView>
            ) : (
              <RNView style={styles.uploading}>
                <RNText style={styles.uploadingText}>Uploading ...</RNText>
              </RNView>
            )}
            <RNView style={styles.btnView}>
              <CommonButton
                title={route?.params?.edit ? 'Update now' : 'Post now'}
                loading={loadingProfilePic || loadingVideo}
                // disabled={imgArray.length || text.length ? false : true}
                style={[
                  styles.btnStyle,
                  { backgroundColor: imgArray?.length || text?.length ? ColorTheme.primary : '#F0F0F0' },
                ]}
                onPress={route?.params?.edit ? handleUpdatePost : handlePostCreationFun}
                textStyle={[styles.btnText, { color: imgArray?.length || text?.length ? 'black' : '#969696' }]}
              />
            </RNView>
          </RNView>
          <ImgVidUploadBottomSheet
            showBottomSheet={showBottomSheet}
            imgArray={imgArray}
            setLoading={setLoadingProfilePic}
            setImageArray={data => setImageArray(prev => [...prev, data[0]])}
            setshowBottomSheet={setshowBottomSheet}
            photos={true}
            loading={loadingProfilePic}
            multiSelect={true}
          />
          <ImgVidUploadBottomSheet
            showBottomSheet={showVideoBottomSheet}
            imgArray={imgArray}
            setLoading={setLoadingVideo}
            setImageArray={data => setImageArray(prev => [...prev, data[0]])}
            setshowBottomSheet={setshowVideoBottomSheet}
            photos={false}
            loading={loadingVideo}
          />
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default CreatePost;
