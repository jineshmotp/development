import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  onPress?: () => void;
  data?: any;
};

const PropertyStory: React.FC<Props> = ({ onPress, data }) => {
  return (
    <RNView style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {/* <Video
          source={{
            uri: data?.media?.url, // Verify that this is a valid video URL
          }}
          style={styles.subContainer}
          posterResizeMode={'contain'}>
          <RNView style={styles.titleContainer}>
            <RNText>{data.title}</RNText>
          </RNView>
        </Video> */}
      </TouchableOpacity>
     
    </RNView>
  );
};

export default memo(PropertyStory);
