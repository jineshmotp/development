import React from 'react';
import { ImageStyle, TouchableOpacity } from 'react-native';

import RNImage from '@/custom/RNImage';

import VideoModal from '../../common/VideoModal';
import { styles } from './styles';

type Props = {
  imgStyle?: ImageStyle;
  onPress?: () => void;
  item?: string;
};

const PropertyImageVideo: React.FC<Props> = ({ onPress, imgStyle, item }) => {
  // console.log('item =======>', item);

  // VERIFY FUNCTUIN FOR IMAGES EXTENTIONS
  const verifyImageString = (data: string) => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    if (temp) {
      return data;
    } else {
      return 'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    }
  };
  //   const videoFileExtensionsRegex = /\.(mp4|avi|mkv|mov|wmv|flv|webm)$/;

  //   function isVideoFile(fileName) {
  //     return videoFileExtensionsRegex.test(fileName);
  //   }
  const verifyVideoString = (data: string) => {
    const temp = /\.(mp4|avi|mkv|mov|wmv|flv|webm)$/.test(data);
    if (temp) {
      return data;
    } else {
      return 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
    }
  };

  const verifyImageOrVideo = data => {
    // console.log('verifyImageOrVideo', data);
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    // console.log("temp", temp);
    return temp;
  };
  return (
    <>
      {verifyImageOrVideo(item) ? (
        <TouchableOpacity onPress={onPress}>
          <RNImage
            source={{
              uri: verifyImageString(item),
            }}
            style={imgStyle}
          />
        </TouchableOpacity>
      ) : (
        <VideoModal imgStyle={imgStyle} playIconSize={40} item={item} playIconStyle={styles.absoluteIcon} />
      )}
    </>
  );
};

export default PropertyImageVideo;
