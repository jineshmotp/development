import React, { memo, useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

import { useNavigation } from '@react-navigation/native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  data?: any;
  storyData?: any;
  index?: number;
  totalData?:any
};

const UserStory: React.FC<Props> = ({ data, storyData, index ,totalData}) => {
// console.log('UserData+++++++++++', JSON.stringify(data));
  const navigation = useNavigation();
  const selectedUser = useAppSelector(getUserData);
  const videoRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const [pause, setPause] = useState(false);
  const HeadText =
    data?._id === selectedUser?._id
      ? `My Story (${data?.stories?.length})`
      : `${data?.user?.fname} (${data?.stories?.length})`;
  return (
    <RNView style={styles.container}>
      <TouchableOpacity
        style={{ borderWidth: 0.7, borderRadius: 10, borderColor: ColorTheme.primary }}
        onPress={() =>
          navigation.navigate('VIDEO_SLIDER', { data: data, VideosData: storyData, hasHeader: true, key: index ,totalData:totalData})
        }>
        <Video
          source={{
            uri:
              data?.stories[data?.stories?.length - 1]?.media ||
              'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
          }}
          style={Platform.select({
            ios: styles.subContainer,
            android: styles.subContainer,
          })}
          volume={0}
          resizeMode="cover"
          fullscreen={false}
          paused={pause}
          ref={videoRef}
          onLoad={() => {
            setLoader(false);
            setTimeout(() => {
              setPause(true);
            }, 2000);
          }}
          onFullscreenPlayerWillPresent={() => console.log('data++++')}
          onFullscreenPlayerDidDismiss={() => console.log('data++++dismess')}
          // onFullscreenPlayerWillDismiss={() => setFullVideo(false)}
          fullscreenOrientation="all"
          fullscreenAutorotate={true}
        />
        {loader && (
          <RNView style={styles.loadingIcon}>
            <ActivityIndicator size="large" color={ColorTheme.primary} />
          </RNView>
        )}
        <RNView style={styles.bottomLineView}>
          <RNText style={styles.bottomLineText}>{HeadText}</RNText>
        </RNView>
      </TouchableOpacity>
    </RNView>
  );
};

export default memo(UserStory);
