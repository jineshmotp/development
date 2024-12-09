import React, { useRef, useState } from 'react';
import { ActivityIndicator, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import Video from 'react-native-video';

import ModalWrapper from '@/components/common/ModalWrapper';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import { styles } from './styles';

type Props = {
  imgStyle?: ViewStyle;
  item?: string;
  data?: any;
};
const HomeTourVideo: React.FC<Props> = ({ imgStyle, item, data }) => {
  // console.log('HomeTourVideo+++++', data);
  const videoRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const [pause, setPause] = useState(false);
  const [fullVideo, setFullVideo] = useState(false);
  return (
    <RNView style={imgStyle}>
      <TouchableOpacity
        onPress={() => {
          setFullVideo(true);
        }}>
        <RNView style={{ borderWidth: 0.7, borderRadius: 10, borderColor: ColorTheme.primary }}>
          <Video
            source={{
              uri: item || 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
            }}
            style={Platform.select({
              ios: imgStyle,
              android: imgStyle,
            })}
            volume={Platform.OS === 'ios' && fullVideo ? 10 : 0}
            resizeMode="cover"
            fullscreen={Platform.OS === 'ios' && fullVideo}
            paused={Platform.OS === 'ios' ? !fullVideo : pause}
            ref={videoRef}
            onLoad={() => {
              setLoader(false);
              setTimeout(() => {
                setPause(true);
              }, 1000);
            }}
            onFullscreenPlayerWillPresent={() => console.log('data++++')}
            onFullscreenPlayerDidDismiss={() => console.log('data++++dismess')}
            onFullscreenPlayerWillDismiss={() => setFullVideo(false)}
            fullscreenOrientation="all"
            fullscreenAutorotate={true}
          />
        </RNView>
        {loader && (
          <RNView style={styles.playIcon}>
            <ActivityIndicator size="large" color={ColorTheme.primary} />
          </RNView>
        )}
      </TouchableOpacity>
      <ModalWrapper
        header={false}
        visible={Platform.OS === 'android' && fullVideo}
        onClose={() => setFullVideo(false)}
        closeBtnStyle={{ color: 'black', fontSize: SIZES.medium18, fontWeight: 'bold' }}>
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
          fullscreen={fullVideo}
          fullscreenOrientation="all"
          fullscreenAutorotate={true}
        />
      </ModalWrapper>
    </RNView>
  );
};

export default HomeTourVideo;
