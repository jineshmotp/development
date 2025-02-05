import React, { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { ActionsheetItem } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useUpdateUserDetailsMutation, useUploadImageFilesMutation } from '@/redux/login/loginService';
import { px } from '@/utils';

// import { getPayloadByCategory } from '../../../../business-profile/pages/bussinessProfileEditing/functions/checkArrayData';
// import { BusinessAction } from '../../../../business-profile/redux/action';
import BottomSheetWrapper from '../BottomSheetWrapper';
// import { userAction } from '../../../redux/action';
import { styles } from './styles';

type Props = {
  showBottomSheet?: boolean;
  imgArray?: string[];
  setImageArray?: React.Dispatch<React.SetStateAction<string[]>>;
  profileImg?: boolean;
  setshowBottomSheet?: (val) => void;
  setLoading?: (val) => void;
  userProfile?: boolean;
  loading?: boolean;
};

const ImageUploadBottomSheet: React.FC<Props> = ({
  showBottomSheet,
  imgArray,
  profileImg,
  setLoading,
  setImageArray,
  setshowBottomSheet,
  userProfile,
  loading,
}): React.ReactNode => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const selectUserData = useAppSelector(getUserData);
  const userBusinessData = {};
  //   const userBusinessData = useSelector(state => state?.businessProfileReducer);
  // console.log("userBusinessData++++++++", userBusinessData);
  const [uploadImageMutation] = useUploadImageFilesMutation();
  const [updateUserDataMutation] = useUpdateUserDetailsMutation();
  const [serverImage, setServerImage] = useState('');
  // upload to server Fuction

  //CAMERA PERMISSION
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        });
        // If CAMERA Permission is granted

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        toast.show('CAMERA PERMISSION went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Auth message',
          },
          duration: 3000,
        });
        return false;
      }
    } else return true;
  };

  // STORAGE PERMISSION
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        });
        // console.log('granted', granted, PermissionsAndroid.RESULTS.GRANTED);
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        //  alert('Write permission err', err);
        toast.show('READ_EXTERNAL_STORAGE went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Auth message',
          },
          duration: 3000,
        });
      }
      return false;
    } else return true;
  };

  // console.log("selectUserData?._id", selectUserData);

  const updateProfilePic = async (imageRes: any) => {
    setLoading(true);
    updateUserDataMutation({
      userId: selectUserData?._id,
      updateDetails: {
        profile_pic: imageRes,
      },
    }).then(response => {
      if (response?.data?.status) {
        setLoading(false);
      } else {
        setLoading(false);
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
    //   try {
    //     const result = await Apis.updateUserDataApi({
    //       userId: selectUserData?._id,
    //       updateDetails: {
    //         profile_pic: imageRes,
    //       },
    //     });
    //     if (result?.data?.status) {
    //       console.log('api called++++++++++++');
    //       setLoading(false);
    //     }
    //   } catch (e) {
    //     console.log('error++++++++', e.response);
    //     setLoading(false);
    //     toast.show(e?.response?.data?.message || 'Something went wrong', {
    //       type: 'error_toast',
    //       animationDuration: 100,
    //       data: {
    //         title: 'Auth message',
    //       },
    //       duration: 3000,
    //     });
    //   }
  };
  const updateCoverPic = async (imageRes: any) => {
    setLoading(true);
    updateUserDataMutation({
      userId: selectUserData?._id,
      updateDetails: {
        cover_pic: imageRes,
      },
    }).then(response => {
      if (response?.data?.status) {
        setLoading(false);
      } else {
        setLoading(false);
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

  // pick RNImage from Gallary
  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      //   maxWidth: 300,
      //   maxHeight: 550,
      quality: 1,
      //   videoQuality: 'low',
      //   durationLimit: 30, //Video max duration in seconds
      //   saveToPhotos: true,
    };
    // No permissions request is necessary for launching the image library
    const result = await launchImageLibrary(options);

    if (!result.didCancel) {
      setshowBottomSheet(false);
      setLoading(true);
      const formData = new FormData();

      formData.append('file', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        mimetype: 'image/jpeg',
        name: result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1],
      });

      uploadImageMutation(formData).then(response => {
        if (response?.data?.status) {
          const imageRes = response?.data?.data;
          if (isValidURL(imageRes)) {
            if (userProfile) {
              if (profileImg) {
                updateProfilePic(imageRes);
              } else {
                updateCoverPic(imageRes);
              }
            } else {
              if (profileImg) {
                //   await updateBusinessProfilePic(imageRes);
              } else {
                //   await updateBusinessCoverPic(imageRes);
              }
            }
            setImageArray([imageRes]);
            setshowBottomSheet(false);
            setLoading(false);
          } else {
            setLoading(false);
            toast.show('Failed to upload image! Try again.', {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Message',
              },
              duration: 3000,
            });
          }
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
    } else {
      setshowBottomSheet(false);
    }
  };

  // take RNImage Function for bottomsheet
  const takeImage = async () => {
    const options = {
      mediaType: 'photo',
      //   maxWidth: 300,
      //   maxHeight: 550,
      quality: 1,
      //   videoQuality: 'low',
      //   durationLimit: 30, //Video max duration in seconds
      //   saveToPhotos: true,
    };
    const isCameraPermitted = await requestCameraPermission();
    // const isStoragePermitted = await requestExternalWritePermission();
    // console.log('isCameraPermitted', isCameraPermitted, 'isStoragePermitted');
    if (isCameraPermitted) {
      // No permissions request is necessary for launching the image library
      launchCamera(options, response => {
        if (!response.didCancel) {
          setshowBottomSheet(false);
          setLoading(true);
          const formData = new FormData();
          formData.append('file', {
            uri: response?.assets[0]?.uri,
            type: 'image/jpeg',
            mimetype: 'image/jpeg',
            name: response?.assets[0]?.uri?.split('/')[response.assets[0].uri.split('/').length - 1],
          });

          uploadImageMutation(formData).then(response => {
            if (response?.data?.status) {
              const imageRes = response?.data?.data;
              if (isValidURL(imageRes)) {
                if (userProfile) {
                  if (profileImg) {
                    updateProfilePic(imageRes);
                  } else {
                    updateCoverPic(imageRes);
                  }
                } else {
                  if (profileImg) {
                    // await updateBusinessProfilePic(imageRes);
                  } else {
                    // await updateBusinessCoverPic(imageRes);
                  }
                }
                setImageArray([imageRes]);
                setLoading(false);
              } else {
                setLoading(false);
                toast.show('Failed to upload image! Try again.', {
                  type: 'error_toast',
                  animationDuration: 100,
                  data: {
                    title: 'Message',
                  },
                  duration: 3000,
                });
              }
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
          // console.log('imageRes+++', serverImage);
        }
      });
    }
  };

  const removePicture = () => {
    if (userProfile) {
      if (profileImg) {
        updateProfilePic(null);
      } else {
        updateCoverPic(null);
      }
      setImageArray(['']);
      setshowBottomSheet(false);
      setLoading(false);
    } else {
      if (profileImg) {
        //   await updateBusinessProfilePic(imageRes);
      } else {
        //   await updateBusinessCoverPic(imageRes);
      }
    }
  };

  return (
    <BottomSheetWrapper
      openSheet={showBottomSheet}
      onClose={() => setshowBottomSheet(!showBottomSheet)}
      snapPoint={Platform.OS === 'ios' ? px(30) : px(30)}
      dragIndicator={false}>
      <ActionsheetItem onPress={removePicture} style={styles.actionSheetItem}>
        <RNView style={styles.imgMain}>
          {/* <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/visible.png')} /> */}
          <AntDesign name="delete" size={25} color={'black'} />
        </RNView>
        <RNText style={styles.textStyle}>{`Remove ${profileImg ? 'Profile' : 'Cover'} Picture`}</RNText>
      </ActionsheetItem>
      <ActionsheetItem onPress={takeImage} style={styles.actionSheet}>
        <RNView style={styles.imgMain}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/cloudUpload.png')} />
        </RNView>
        {/* <Entypo name="camera" size={24} color="black" /> */}
        <RNText style={styles.textStyle}>{`Click ${profileImg ? 'Profile' : 'Cover'} Photo from Camera`}</RNText>
      </ActionsheetItem>
      <ActionsheetItem onPress={pickImage} style={styles.actionSheet}>
        <RNView style={styles.imgMain}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/imageGallery.png')} />
        </RNView>
        <RNText style={styles.textStyle}>Select Photo from Gallery</RNText>
      </ActionsheetItem>
    </BottomSheetWrapper>
  );
};

export default ImageUploadBottomSheet;
