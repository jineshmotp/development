import React, { useRef } from 'react';
import { Platform } from 'react-native';
import Video from 'react-native-video';

import RNImage from '@/custom/RNImage';

import { styles } from '../styles';

type Props = {
  item?: string;
};
const RenderItem: React.FC<Props> = ({ item }) => {
  const videoRef = useRef(null);
  const verifyImageOrVideo = data => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    // console.log("temp", temp);
    return temp;
  };
  return verifyImageOrVideo(item) ? (
    <RNImage
      source={{ uri: item }}
      // style={StyleSheet.absoluteFillObject}
      resizeMode="contain"
      onLoad={e => {
        // const { width=120, height=120 } = e;
        // setImageDimensions({ width: 150, height: 150 });
      }}
      style={styles.imgStyle}
    />
  ) : (
    <Video
      source={{
        uri: item || 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
      }}
      style={Platform.select({
        ios: { flex: 1 },
        android: { flex: 1 },
      })}
      controls
      volume={50}
      resizeMode="contain"
      fullscreen={true}
      paused={false}
      ref={videoRef}
      // onLoad={() => {
      //   setLoader(false);
      //   setTimeout(() => {
      //     setPause(true);
      //   }, 1000);
      // }}
      onFullscreenPlayerWillPresent={() => console.log('data++++')}
      onFullscreenPlayerDidDismiss={() => console.log('data++++dismess')}
      // onFullscreenPlayerWillDismiss={() => setFullVideo(false)}
      fullscreenOrientation="all"
      fullscreenAutorotate={true}
    />
  );
};

export default RenderItem;
