import React, { useRef, useState } from 'react';
import { ActivityIndicator, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import ModalWrapper from '../ModalWrapper';
import { styles } from './styles';

type Props = {
  imgStyle?: ViewStyle;
  item?: string;
  playIconSize?: number;
  closeBtn?: boolean;
  closeBtnStyle?: ViewStyle;
  onPressCloseBtn?: () => void;
  playIconStyle?: ViewStyle;
  playIcon?: boolean;
};
const VideoModal: React.FC<Props> = ({
  imgStyle,
  item,
  playIconSize = 40,
  closeBtn = false,
  closeBtnStyle,
  onPressCloseBtn,
  playIconStyle,
  playIcon = true,
}) => {
  const videoRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const [pause, setPause] = useState(false);
  const [fullVideo, setFullVideo] = useState(false);
  if (videoRef.current) {
    // console.log('VideoPlayer', videoRef.current);
  }
  // console.log('first', item);
  return (
    <RNView style={[imgStyle, { borderWidth: 1, borderColor: ColorTheme.primary }]}>
      <RNView>
        <Video
          source={{
            uri: item || 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
          }}
          // controls={fullVideo}
          style={Platform.select({
            ios: imgStyle,
            android: imgStyle,
          })}
          resizeMode="cover"
          fullscreen={Platform.OS === 'ios' && fullVideo}
          paused={Platform.OS === 'ios' ? !fullVideo : pause}
          ref={videoRef}
          volume={Platform.OS === 'ios' && fullVideo ? 10 : 0}
          onLoad={() => {
            setLoader(false);
            setTimeout(() => {
              setPause(true);
            }, 2000);
          }}
          onLoadStart={() => (
            <RNView>
              <ActivityIndicator size={'large'} />
            </RNView>
          )}
          // onVideoLoad={() => {
          //   setLoader(false);
          //   setTimeout(() => {
          //     setPause(true);
          //   }, 1000);
          // }}
          // onFullscreenPlayerWillPresent={() => console.log('data++++')}
          // onFullscreenPlayerDidDismiss={() => console.log('data++++dismess')}
          onFullscreenPlayerWillDismiss={() => setFullVideo(false)}
        />
        {!fullVideo && (
          <TouchableOpacity
            style={[playIconStyle, imgStyle]}
            onPress={() => {
              setFullVideo(true);
            }}>
            <MaterialIcons name="play-circle-fill" size={playIconSize} color={ColorTheme.primary} />
          </TouchableOpacity>
        )}
        {loader && playIcon && (
          <RNView style={styles.playIcon}>
            <ActivityIndicator size="large" color={ColorTheme.primary} />
          </RNView>
        )}
        {closeBtn && (
          <TouchableOpacity style={closeBtnStyle} onPress={onPressCloseBtn}>
            <AntDesign name="close" size={18} color="white" />
          </TouchableOpacity>
        )}
      </RNView>
      <ModalWrapper
        header={false}
        visible={Platform.OS === 'android' && fullVideo}
        onClose={() => setFullVideo(false)}
        closeBtnStyle={styles.closeButton}>
        <Video
          source={{
            uri: item || 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
          }}
          controls={fullVideo}
          style={Platform.select({
            android: { width: deviceWidth, height: deviceHeight },
          })}
          resizeMode="contain"
          paused={false}
          volume={10}
          fullscreen={fullVideo}
          audioOnly={true}
        />
      </ModalWrapper>
    </RNView>
  );
};

export default VideoModal;
