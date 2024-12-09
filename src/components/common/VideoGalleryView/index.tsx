import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';

import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import ListEmptyComponent from '../ListEmptyComponent';
import VideoModal from '../VideoModal';
import { styles } from './styles';

type ObjType = {
  _id?: string;
  upload_date?: string;
  url?: string;
  media?: string[];
};
type Props = {
  uservideo?: ObjType[];
};
const VideoGalleryView: React.FC<Props> = ({ uservideo }) => {
  // console.log('dfnjkgkgjbdsjkgn++++', uservideo);
  return (
    <ScrollView
      //   style={isArray(uservideo) ? styles.scrollview : styles.scrollview1}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}>
      <RNView style={styles.container}>
        {isArray(uservideo) && uservideo?.length > 0 ? (
          uservideo?.map((item, index) => (
            <VideoModal
              key={index}
              imgStyle={styles.imgStyle}
              playIconSize={30}
              item={item?.media ? item.media[0] : item?.url}
              playIconStyle={styles.playIcon}
            />
          ))
        ) : (
          <ListEmptyComponent text={' No Videos'} type="default" />
        )}
      </RNView>
    </ScrollView>
  );
};

export default VideoGalleryView;
