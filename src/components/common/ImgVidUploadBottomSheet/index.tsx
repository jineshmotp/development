import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';

import { ActionsheetItem } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useUploadImageFilesMutation, useUploadVideoFilesMutation } from '@/redux/login/loginService';

import BottomSheetWrapper from '../BottomSheetWrapper';
import { styles } from './styles';

// import { BusinessAction } from "../../../../business-profile/redux/action";
type Props = {
  showBottomSheet?: boolean;
  imgArray?: any[];
  setImageArray?: React.Dispatch<React.SetStateAction<any[]>>;
  setshowBottomSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  photos?: boolean;
  loading?: boolean;
  multiSelect?: boolean;
  uploadVideo?: boolean;
};

const ImgVidUploadBottomSheet: React.FC<Props> = ({
  showBottomSheet,
  imgArray,
  setLoading,
  setImageArray,
  setshowBottomSheet,
  photos,
  loading,
  multiSelect,
  uploadVideo,
}): React.ReactNode => {
  const toast = useToast();
  const { navigate } = useNavigation();
  const [uploadImagesMutation] = useUploadImageFilesMutation();
  const [uploadVideosMutation] = useUploadVideoFilesMutation();
  // const selectUserData = useSelector(
  //   (state: any) => state?.userReducer.userData
  // );
  // const userBusinessData = useSelector(
  //   (state: any) => state?.businessProfileReducer
  // );

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

  // upload to server Fuction

  //   const uploadImageToserver = async (file: any) => {
  //     // console.log("file===========", file);
  //     try {
  //       let response;
  //       if (photos) {
  //         response = await Apis.uploadImageFiles(file);
  //       } else {
  //         response = await Apis.uploadVideoFiles(file);
  //       }

  //       // console.log("abhay==========", response?.data?.data);
  //       console.log('response', response.data.data);
  //       return response?.data?.data;
  //     } catch (e: any) {
  //       console.error('Axios response data: abh', e.response);
  //       return e?.response?.data;
  //     }
  //   };
  // console.log("selectUserData?._id", selectUserData);

  // pick RNImage from Gallary
  const pickImage = async () => {
    const imgOptions = {
      mediaType: 'photo',
      //   maxWidth: 300,
      //   maxHeight: 550,
      quality: 1,
      selectionLimit: multiSelect ? 0 : 1,
      //   videoQuality: 'low',
      //   durationLimit: 30, //Video max duration in seconds
      //   saveToPhotos: true,
    };
    const vidOptions = {
      mediaType: 'video',
      //   maxWidth: 300,
      //   maxHeight: 550,
      quality: 1,
      //   videoQuality: 'low',
      //   durationLimit: 30, //Video max duration in seconds
      //   saveToPhotos: true,
    };
    // No permissions request is necessary for launching the image library
    let result;
    if (photos) {
      result = await launchImageLibrary(imgOptions);
    } else {
      result = await launchImageLibrary(vidOptions);
    }
    // console.log('result++++', result);
    if (!result.didCancel) {
      setshowBottomSheet(false);
      setLoading(true);

      // console.log('formData++++++++++', result.assets);

      //   const imageRes = await uploadImageToserver(formData);
      if (photos) {
        if (result?.assets?.length > 1) {
          const arr = [];
          let i;
          for (i = 0; i < result?.assets?.length; i++) {
            const formData = new FormData();
            formData.append('file', {
              uri: result.assets[i].uri,
              type: 'image/jpeg',
              mimetype: 'image/jpeg',
              name: result.assets[i].uri.split('/')[result.assets[i].uri.split('/').length - 1],
            });

            // const response = await fetch(result.assets[i].uri);
            // const blob = await response.blob();

            // // Get the file size in bytes
            // const fileSize = blob.size;

            // console.log(' file size--->', fileSize);

            uploadImagesMutation({
              file: formData,
            }).then(response => {
              if (response?.data?.status) {
                const imageRes = response?.data?.data;
                if (isValidURL(imageRes)) {
                  setImageArray([imageRes]);

                  // console.log('mappppp', imageRes);
                  arr.push(imageRes);
                } else {
                  console.log('setshowBottomSheet(false);');
                  //    setshowBottomSheet(false);
                }
              } else {
                //  setLoading(false);
                //  toast.show(response?.error?.message || 'Something went wrong', {
                //    type: 'error_toast',
                //    animationDuration: 100,
                //    data: {
                //      title: 'Auth message',
                //    },
                //    duration: 3000,
                //  });
              }
            });
          }
          if (i === result?.assets?.length) {
            // console.log('result?.assets?.length', result?.assets?.length);
            setshowBottomSheet(false);
            setLoading(false);
          }
        } else {
          const formData = new FormData();
          formData.append('file', {
            uri: result.assets[0].uri,
            type: 'image/jpeg',
            mimetype: 'image/jpeg',
            name: result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1],
          });
          uploadImagesMutation(formData).then(response => {
            if (response?.data?.status) {
              const imageRes = response?.data?.data;
              if (isValidURL(imageRes)) {
                console.log('setshowBottomSheet(false);+++');
                setImageArray([imageRes]);
                setshowBottomSheet(false);
                setLoading(false);
              } else {
                console.log('setshowBottomSheet(false);');
                setshowBottomSheet(false);
              }
            } else {
              // setLoading(false);
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
        }
      } else {
        const formData = new FormData();
        formData.append('file', {
          uri: result.assets[0].uri,
          type: 'video/mp4',
          mimetype: 'video/mp4',
          name: result.assets[0].uri.split('/')[result.assets[0].uri.split('/').length - 1],
        });
        uploadVideosMutation(formData).then(response => {
          if (response?.data?.status) {
            const imageRes = response?.data?.data;
            if (isValidURL(imageRes)) {
              //   console.log('setshowBottomSheet(false);+++', imageRes);
              setImageArray([imageRes]);
              setshowBottomSheet(false);
              setLoading(false);
            } else {
              // console.log('setshowBottomSheet(false);', imageRes);
              setshowBottomSheet(false);
            }
          } else {
            // setLoading(false);
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
      }
    } else {
      setshowBottomSheet(false);
    }
  };

  // take RNImage Function for bottomsheet
  const takeImage = async () => {
    const imgOptions = {
      mediaType: 'photo',
      // maxWidth: 300,
      // maxHeight: 550,
      quality: 1,
      // videoQuality: 'low',
      // durationLimit: 30, //Video max duration in seconds
      // saveToPhotos: true,
    };
    const vidOptions = {
      mediaType: 'video',
      // maxWidth: 300,
      // maxHeight: 550,
      quality: 1,
      // videoQuality: 'high',
      // durationLimit: 3, //Video max duration in seconds
      // saveToPhotos: true,
    };

    try {
      const isCameraPermitted = await requestCameraPermission();
      // console.log('isCameraPermitted', isCameraPermitted, 'isStoragePermitted');
      if (isCameraPermitted) {
        // No permissions request is necessary for launching the image library
        let result;
        if (photos) {
          result = await launchCamera(imgOptions);
        } else {
          result = await launchCamera(vidOptions);
        }
        // console.log('result====', result);
        if (!result?.didCancel) {
          setshowBottomSheet(false);
          setLoading(true);
          const formData = new FormData();
          formData.append('file', {
            uri: result?.assets[0].uri,
            type: photos ? 'image/jpeg' : 'video/mp4',
            mimetype: photos ? 'image/jpeg' : 'video/mp4',
            name: result?.assets[0].uri.split('/').pop(),
          });
          // console.log('uploadImageToserver', formData);
          if (photos) {
            const response = await uploadImagesMutation(formData);
            if (response?.data?.status) {
              const imageRes = response?.data?.data;
              if (isValidURL(imageRes)) {
                setImageArray([imageRes]);
                setLoading(false);
              }
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
          } else {
            const response = await uploadVideosMutation(formData);
            if (response?.data?.status) {
              const imageRes = response?.data?.data;
              if (isValidURL(imageRes)) {
                setImageArray([imageRes]);
                setLoading(false);
              }
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
          }
        }
      }
    } catch (error) {
      console.error('Error in takeImage:', error);
      toast.show('An error occurred. Please try again.', {
        type: 'error_toast',
        animationDuration: 100,
        data: {
          title: 'Error',
        },
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (uploadVideo) {
      pickImage();
    }
  }, [uploadVideo]);

  return (
    <BottomSheetWrapper
      openSheet={showBottomSheet}
      onClose={() => setshowBottomSheet(!showBottomSheet)}
      snapPoint={Platform.OS === 'ios' ? [25] : [20]}
      dragIndicator={false}>
      <ActionsheetItem onPress={takeImage} style={styles.actionSheetItem}>
        <RNView style={styles.imgMain}>
          <RNImage
            style={styles.imgStyle}
            source={
              photos
                ? require('@/assets/images/userProfile/camera.png')
                : require('@/assets/images/userProfile/video_camera.png')
            }
          />
        </RNView>
        {/* <Entypo name="camera" size={24} color="black" /> */}
        <RNText style={styles.textStyle}>{`Take ${photos ? 'Photo' : 'Video'} from Camera`}</RNText>
      </ActionsheetItem>
      <ActionsheetItem onPress={pickImage} style={styles.actionSheetItem}>
        <RNView style={styles.imgMain}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/imageGallery.png')} />
        </RNView>
        <RNText style={styles.textStyle}>{`Select ${photos ? 'Photo' : 'Video'} from Gallery`}</RNText>
      </ActionsheetItem>
    </BottomSheetWrapper>
  );
};

export default ImgVidUploadBottomSheet;
