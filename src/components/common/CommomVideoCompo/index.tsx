import React, { useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RNView from '@/custom/RNView';
// import  AntDesign  from 'react-native-vector-icons/AntDesign';
// import { ResizeMode, Video } from 'expo-av';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  imgStyle?: ViewStyle;
  item?: string;
  playIconSize?: number;
  closeBtn?: boolean;
  closeBtnStyle?: ViewStyle;
  onPressCloseBtn?: () => void;
  playIconStyle?: ViewStyle;
};

const CommomVideoCompo: React.FC<Props> = ({
  imgStyle,
  item,
  playIconSize = 40,
  closeBtn = false,
  closeBtnStyle,
  onPressCloseBtn,
  playIconStyle,
}) => {
  const video = React.useRef(null);
  const [loader, setLoader] = useState(true);
  const [fullvideo, setFullVideo] = useState(false);
  return (
    <RNView style={imgStyle}>
      <RNView>
        {/* <Video
          ref={video}
          status={{
            isMuted: !fullvideo,
          }}
          source={{
            uri: item,
          }}
          useNativeControls={fullvideo ? true : false}
          style={imgStyle}
          resizeMode={fullvideo ? ResizeMode.CONTAIN : ResizeMode.COVER}
          onLoad={() => setLoader(false)}
          isLooping={fullvideo}
          shouldPlay={fullvideo}
          onFullscreenUpdate={data => {
            // console.log("first", data);
            if (data?.fullscreenUpdate < 2) {
              setFullVideo(true);
            } else {
              setFullVideo(false);
            }
          }}
        /> */}
        <RNView style={imgStyle}></RNView>
        <RNView style={[playIconStyle, imgStyle]}>
          <MaterialIcons
            onPress={() => {
              // video.current.presentFullscreenPlayer();
            }}
            name="play-circle-fill"
            size={playIconSize}
            color={ColorTheme.primary}
          />
        </RNView>
        {loader && (
          <RNView style={styles.playIcon}>
            <ActivityIndicator size="large" color={ColorTheme.primary} />
          </RNView>
        )}
        {closeBtn && (
          <TouchableOpacity style={closeBtnStyle} onPress={onPressCloseBtn}>
            {/* <AntDesign name="close" size={18} color="black" /> */}
          </TouchableOpacity>
        )}
      </RNView>
    </RNView>
  );
};

export default CommomVideoCompo;
