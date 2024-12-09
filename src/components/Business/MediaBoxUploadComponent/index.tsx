import React, { memo } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Video from 'react-native-video';

import { useNavigation } from '@react-navigation/native';

import { imagevideoextention } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

interface IncrementDecrementProp {
  uploadBtnClick?: any;
  loadingImage?: boolean;
  imagetype?: boolean;
}
const MediaBoxUploadComponent: React.FC<IncrementDecrementProp> = ({ uploadBtnClick, loadingImage, imagetype }) => {
  const navigation = useNavigation();

  //  onPress={() => {
  //             navigation.navigate('GALLERY_PREVIEW', {
  //               images: itemArray,
  //               index: 0,
  //               hasHeader: true,
  //             });
  //           }}

  return (
    <TouchableOpacity style={styles.container} onPress={uploadBtnClick} disabled={loadingImage}>
      {imagetype ? (
        <RNImage style={styles.imagestyle} source={require('@/assets/images/More/businessUploadImage.png')} />
      ) : (
        <RNImage style={styles.imagestyle} source={require('@/assets/images/More/businessUploadVideo.png')} />
      )}
    </TouchableOpacity>
  );
};

export default memo(MediaBoxUploadComponent);
