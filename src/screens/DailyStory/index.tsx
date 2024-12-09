import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import ImgVidUploadBottomSheet from '@/components/common/ImgVidUploadBottomSheet';
import Loader from '@/components/common/Loader';
import useLocation from '@/custom/Location';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useValidateStoryMutation, useValidateVideoMutation } from '@/redux/home/homeService';
import { getReloadData } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

const DailyStory = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'DAILY_STORY'>>();
  const { city, country, latitude, longitude, road, state, street, pincode, subcity } = useLocation();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [showVideoBottomSheet, setshowVideoBottomSheet] = useState(false);
  const { hasPermission: microphonePermission, requestPermission: requestMicrophonePermission } =
    useMicrophonePermission();
  const [isRecording, setIsRecording] = useState(false);
  const [UploadButton, setUploadButton] = useState(false);
  const [record, setRecord] = useState({});
  // console.log('record =======>', record);
  const [loader, setLoader] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [timer, setTimer] = useState(60);
  const [uploadVidMutation] = useValidateVideoMutation({});
  const [uploadStoryMutation] = useValidateStoryMutation({});

  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back', {
    physicalDevices: ['ultra-wide-angle-camera'],
  });

  const getLocationData = () => {
    // return [road, street, subcity, city, state, country, pincode];
    if (road) {
      if (street) {
        if (subcity) {
          if (pincode) {
            return [road, street, subcity, city, state, country, pincode];
          } else {
            return [road, street, subcity, city, state, country];
          }
        } else {
          if (pincode) {
            return [road, street, city, state, country, pincode];
          } else {
            return [road, street, city, state, country];
          }
        }
      } else {
        if (subcity) {
          if (pincode) {
            return [road, subcity, city, state, country, pincode];
          } else {
            return [road, subcity, city, state, country];
          }
        } else {
          if (pincode) {
            return [road, city, state, country, pincode];
          } else {
            return [road, city, state, country];
          }
        }
      }
    } else {
      if (street) {
        if (subcity) {
          if (pincode) {
            return [street, subcity, city, state, country, pincode];
          } else {
            return [street, subcity, city, state, country];
          }
        } else {
          if (pincode) {
            return [street, city, state, country, pincode];
          } else {
            return [street, city, state, country];
          }
        }
      } else {
        if (subcity) {
          if (pincode) {
            return [subcity, city, state, country, pincode];
          } else {
            return [subcity, city, state, country];
          }
        } else {
          if (pincode) {
            return [city, state, country, pincode];
          } else {
            return [city, state, country];
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    if (!microphonePermission) {
      requestMicrophonePermission();
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRecording) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            setIsRecording(false);
            clearInterval(intervalId);
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
      setTimer(60);
    }
    return () => clearInterval(intervalId);
  }, [isRecording]);

  const convertPathToObject = uri => {
    return {
      originalname: uri.split('/')[uri.split('/').length - 1],
      file: `file://${uri}`,
      name: uri.split('/')[uri.split('/').length - 1],
      uri: `file://${uri}`,
      type: 'video/mp4',
    };
  };

  const startRecording = async () => {
    if (!camera.current) {
      return;
    }
    if (isRecording) {
      await camera.current.stopRecording();
    } else {
      setIsRecording(true);
      camera?.current?.startRecording({
        fileType: 'mp4',
        onRecordingFinished: video => {
          const convertedVideo = convertPathToObject(video.path);
          setRecord(convertedVideo);
          setVideo(video.path);

          setIsRecording(false);
        },
        onRecordingError: error => {
          console.error(error);
          setIsRecording(false);
        },
      });
    }
  };

  const uploadStory = () => {
    const formData = new FormData();
    setLoader(true);
    formData.append('file', record);
    //  console.log('formData ======>', JSON.stringify(formData));
    uploadVidMutation(formData).then(res => {
      //  console.log('data ========>', JSON.stringify(res), city);
      if (res?.data?.status) {
        const payload = {
          user: route?.params?.user,
          media: res?.data?.data,
          city: city,
          geo_data: getLocationData(),
          location: [latitude, longitude],
        };
        // console.log('payload+++++++', payload);
        uploadStoryMutation(payload).then(response => {
          // console.log('response  =======>', response);
          setLoader(false);
          if (response?.data?.status) {
            Alert.alert('Message', 'Story Uploaded Successfully', [
              {
                text: 'OK',
                onPress: () => {
                  dispatch(getReloadData({}));
                  navigation.navigate('BOTTOM_TAB');
                  setVideo(null);
                },
              },
            ]);
          } else {
            Alert.alert('Message', 'Something went wrong, Try again!');
          }
        });
      } else {
        Alert.alert('Message', 'Something went wrong, Try again!');
      }
    });
  };

  const uploadVideoStory = () => {
    uploadStoryMutation({
      user: route?.params?.user,
      media: video,
      city: city,
      geo_data: getLocationData(),
      location: [latitude, longitude],
    }).then(response => {
      // console.log('response  =======>', response);
      setLoader(false);
      if (response?.data?.status) {
        Alert.alert('Message', 'Story Uploaded Successfully', [
          {
            text: 'OK',
            onPress: () => {
              dispatch(getReloadData({}));
              navigation.navigate('BOTTOM_TAB');
              setVideo(null);
              setUploadButton(false);
            },
          },
        ]);
      } else {
        setUploadButton(false);
        Alert.alert('Message', 'Something went wrong, Try again!');
      }
    });
  };

  if (!device) {
    return <RNText style={{ color: 'black' }}>Camera is not active</RNText>;
  }
  return (
    <RNView style={StyleSheet.absoluteFill}>
      {loader ? (
        <Loader size="large" color={ColorTheme.primary} />
      ) : (
        <>
          {video ? (
            <RNView style={StyleSheet.absoluteFill}>
              <Video source={{ uri: video }} style={StyleSheet.absoluteFill} resizeMode="cover" />

              <RNView style={styles.absoluteView}>
                <RNView style={styles.alignView}>
                  <TouchableOpacity
                    onPress={() => {
                      setVideo(null);
                    }}
                    style={styles.iconView}>
                    <Entypo name="cross" size={30} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={UploadButton ? uploadVideoStory : uploadStory} style={styles.iconView}>
                    <Entypo name="check" size={30} color="black" />
                  </TouchableOpacity>
                </RNView>
              </RNView>
            </RNView>
          ) : (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              video={true}
              audio={false}
            />
          )}
          {!video && (
            <>
              <RNView style={{ padding: px(20), top: px(25) }}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    onPress={() => {
                      navigation.goBack();
                    }}
                    name="keyboard-backspace"
                    size={30}
                    color={ColorTheme.white}
                  />
                </TouchableOpacity>
              </RNView>
              <RNText style={styles.timer}>{timer}</RNText>
              <TouchableOpacity
                onPress={startRecording}
                style={[styles.shutterView, { backgroundColor: isRecording ? 'red' : 'white' }]}></TouchableOpacity>
              <TouchableOpacity style={styles.uploadBtn}>
                <MaterialCommunityIcons
                  name="upload"
                  size={px(40)}
                  color={'white'}
                  onPress={() => {
                    setshowVideoBottomSheet(true);
                    setUploadButton(true);
                  }}
                />
              </TouchableOpacity>
            </>
          )}
        </>
      )}
      <ImgVidUploadBottomSheet
        // showBottomSheet={showVideoBottomSheet}
        imgArray={[]}
        setLoading={setLoader}
        setImageArray={data => setVideo(data[0])}
        setshowBottomSheet={setshowVideoBottomSheet}
        photos={false}
        loading={loader}
        uploadVideo={showVideoBottomSheet}
      />
    </RNView>
  );
};

export default DailyStory;
