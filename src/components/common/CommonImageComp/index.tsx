import React, { useState } from 'react';
import { ActivityIndicator, ImageStyle, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import { isArray } from '@/constants/function/isArray';
import RNImage from '@/custom/RNImage';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceWidth } from '@/utils';

import VideoModal from '../VideoModal';
import { styles } from './styles';

// import { ColorTheme } from '../../../utils/colorTheme';
type Props = {
  item?: string;
  handleImages?: (item: string) => void;
  close?: boolean;
  allImages?: string[] | [];
  imgStyles?: ImageStyle;
  imgIndex?: number;
};

const CommonImageComp: React.FC<Props> = ({
  item,
  handleImages,
  close = false,
  allImages = [],
  imgStyles,
  imgIndex = 0,
}) => {
  // console.log('item+++', item);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);

  const verifyImageString = (data: string) => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    // console.log("temp", temp);
    if (temp) {
      return data;
    }
  };
  const verifyImageOrVideo = data => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    // console.log("temp", temp);
    return temp;
  };
  const images = isArray(allImages) ? allImages : [item];
  // console.log('verifyImageOrVideo(item)', images);
  return (
    <>
      {verifyImageOrVideo(item) ? (
        <RNView style={[styles.imageTopView, imgStyles]}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('GALLERY_PREVIEW', { images: images, index: imgIndex, hasHeader: true });
            }}>
            <RNImage
              source={{ uri: verifyImageString(item) }}
              style={imgStyles}
              resizeMode="cover"
              onLoad={() => setLoader(false)}
            />
          </TouchableWithoutFeedback>
          {loader && (
            <RNView style={styles.loader}>
              <ActivityIndicator size="large" color={ColorTheme.primary} />
            </RNView>
          )}
          {close && (
            <TouchableOpacity style={styles.closeBtn} onPress={() => handleImages(item)}>
              <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
          )}
        </RNView>
      ) : (
        <VideoModal
          imgStyle={imgStyles}
          playIconSize={50}
          item={item}
          playIconStyle={styles.playIcon}
          closeBtn={close}
          onPressCloseBtn={() => handleImages(item)}
          closeBtnStyle={styles.closeBtn}
        />
      )}
    </>
  );
};

export default CommonImageComp;
