import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';

import { ActionsheetItem } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

import { isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useUploadListDocumentMutation } from '@/redux/listing/listingService';
import { useUploadImageFilesMutation, useUploadVideoFilesMutation } from '@/redux/login/loginService';

import BottomSheetWrapper from '../BottomSheetWrapper';
import { styles } from './styles';

// import { BusinessAction } from "../../../../business-profile/redux/action";
type Props = {
  uploaddocument?: boolean;
  showBottomSheet?: boolean;
  imgArray?: any[];
  setImageArray?: React.Dispatch<React.SetStateAction<any[]>>;
  setshowBottomSheet?: any;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  photos?: boolean;
  loading?: boolean;
  multiSelect?: boolean;
  uploadVideo?: boolean;
};

const PropertyImageVideoSheet: React.FC<Props> = ({
  uploaddocument,
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
  const [uploadDocumentsMutation] = useUploadListDocumentMutation();

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
            title: 'File Uploading',
          },
          duration: 3000,
        });
        return false;
      }
    } else return true;
  };

  //################ Document pic

  const pickDocument = async () => {
    try {
      console.log('Opening document picker...');
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log('Document picked:', result);

      setshowBottomSheet(false);
      setLoading(true);

      const document = result[0];
      let documentUri = document.uri;

      // Handle iOS specific URI
      if (Platform.OS === 'ios') {
        if (!documentUri.startsWith('file://')) {
          documentUri = 'file://' + documentUri;
        }
      }

      const formData = new FormData();
      formData.append('file', {
        uri: documentUri,
        type: document.type,
        name: document.name,
      });

      uploadDocumentsMutation(formData).then(response => {
        if (response?.data?.status) {
          const imageRes = response?.data?.data;
          if (isValidURL(imageRes)) {
            setImageArray([imageRes]);
            setshowBottomSheet(false);
            setLoading(false);
          } else {
            setshowBottomSheet(false);
          }
        } else {
          toast.show(response?.error?.message || 'Something went wrong', {
            type: 'custom_toast',
            animationDuration: 100,
            data: {
              title: 'File Uploading',
            },
            duration: 3000,
          });
        }
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
      } else {
        console.error('Error picking document:', error);
        toast.show('Error picking document', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'File Uploading',
          },
          duration: 3000,
        });
      }
      setshowBottomSheet(false);
    }
  };

  //##################################################

  const pickImage = async () => {
    let imgdata = {};
    const imgOptions = {
      mediaType: 'photo',
      //   maxWidth: 300,
      //   maxHeight: 550,
      quality: 1,
      selectionLimit: 0,
      multiSelect: multiSelect,
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

      if (photos) {
        if (result?.assets?.length > 1) {
          const arr = [];
          let i;
          for (i = 0; i < result?.assets?.length; i++) {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', {
              uri: result.assets[i].uri,
              type: 'image/jpeg',
              mimetype: 'image/jpeg',
              name: result.assets[i].uri.split('/')[result.assets[i].uri.split('/').length - 1],
            });

            const response = await fetch(result.assets[i].uri);
            const blob = await response.blob();
            const fileSizeInMB = blob.size / (1024 * 1024);

            if (fileSizeInMB <= 5) {
              uploadImagesMutation(formData).then(response => {
                if (response?.data?.status) {
                  const imageRes = response?.data?.data;
                  if (isValidURL(imageRes)) {
                    setImageArray([imageRes]);
                    setLoading(false);
                  } else {
                    toast.show('Image Upload faild !', {
                      type: 'error_toast',
                      animationDuration: 100,
                      data: {
                        title: 'File Uploading',
                      },
                      duration: 3000,
                    });
                  }
                } else {
                  // setLoading(false);
                  toast.show('Image should be less than 10 MB', {
                    type: 'info_toast',
                    animationDuration: 100,
                    data: {
                      title: 'File Uploading',
                    },
                    duration: 3000,
                  });
                }
              });
            } else {
            }
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

          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          const fileSizeInMB = blob.size / (1024 * 1024);

          // console.log(' result.assets[i].uri', result.assets[0].uri);
          // console.log(' response--->', response);
          // console.log(' blob--->', blob);
          // console.log(' file sizessssssss--->', fileSizeInMB);

          if (fileSizeInMB > 5) {
            toast.show('Image should be less than 10 MB', {
              type: 'info_toast',
              animationDuration: 100,
              data: {
                title: 'File Uploading',
              },
              duration: 3000,
            });
          } else {
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
                    title: 'File Uploading',
                  },
                  duration: 3000,
                });
              }
            });
          }
        }
      } else {
        setLoading(true);
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
                title: 'File Uploading',
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
                  title: 'File Uploading',
                },
                duration: 3000,
              });
            }
          } else {
            setLoading(true);
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
                  title: 'File Uploading',
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
          title: 'File Uploading',
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
      snapPoint={uploaddocument ? (Platform.OS === 'ios' ? [30] : [30]) : Platform.OS === 'ios' ? [25] : [20]}
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
        <RNText style={styles.textStyle}>{`Take ${photos ? 'Photo' : 'Video'}`}</RNText>
      </ActionsheetItem>

      <ActionsheetItem onPress={pickImage} style={styles.actionSheetItem}>
        <RNView style={styles.imgMain}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/imageGallery.png')} />
        </RNView>
        <RNText style={styles.textStyle}>{`Select ${photos ? 'Photo' : 'Video'} from Gallery`}</RNText>
      </ActionsheetItem>

      {uploaddocument ? (
        <ActionsheetItem onPress={pickDocument}>
          <RNView style={styles.imgMain}>
            <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/docImage.png')} />
          </RNView>
          <RNText style={styles.textStyle}>{'   Select Document'}</RNText>
        </ActionsheetItem>
      ) : null}
    </BottomSheetWrapper>
  );
};

export default PropertyImageVideoSheet;
