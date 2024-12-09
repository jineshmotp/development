import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

import { useNavigation } from '@react-navigation/native';

import { formatNumberWithNotation, isValidURL } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, FONT, SIZES } from '@/theme';

import { styles } from './styles';

type SliderVideosProps = {
  details?: any;
  goBack?: () => void;
  url?: string;
  index?: number;
};
const SliderVideos: React.FC<SliderVideosProps> = ({ details, goBack, url, index }) => {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const [imagArr, setImgArr] = useState([]);
  const totalImages = () => {
    const imageArr = details?.gallery.map(ele => {
      return ele?.url;
    });
    setImgArr(imageArr);
  };
  useEffect(() => {
    totalImages();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GALLERY_PREVIEW', {
          images: imagArr,
          index: index,
        });
      }}
      style={styles.imageBackgroundStyle}>
      <Video
        style={styles.videstyle}
        resizeMode="cover"
        fullscreen={false}
        paused={false}
        ref={videoRef}
        volume={0}
        source={{
          uri: url || 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
        }}
      />
      <RNView style={styles.topView}>
        <RNView style={styles.navChild}>
          <RNView>
            <TouchableOpacity
              onPress={goBack}
              style={{
                padding: 2,
                borderRadius: 100,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <Ionicons name="arrow-back-outline" size={35} color="white" />
            </TouchableOpacity>
          </RNView>
          <RNView style={styles.navRight}>
            <TouchableOpacity
              style={{
                padding: 6,
                borderRadius: 100,
              }}></TouchableOpacity>
          </RNView>
        </RNView>

        <RNView style={styles.pricingContainer}>
          <RNView style={styles.pricingChild}>
            <RNView
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RNView
                style={{
                  // flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RNText
                  style={{
                    fontFamily: FONT.PoppinsBold,
                    fontSize: 15,
                    color: ColorTheme.nearLukGray,
                  }}></RNText>
                <RNText
                  style={{
                    fontSize: SIZES.large,
                    fontFamily: FONT.PoppinsBold,
                    color: ColorTheme.black,
                    lineHeight: SIZES.xLarge,
                    fontWeight: 'bold',
                  }}>
                  {formatNumberWithNotation(details?.iwant !== 'Sell' ? details?.rent_amount : details?.property_price)}
                  <RNText style={styles.pricingSubText}>/{details?.rented_time}</RNText>
                </RNText>
              </RNView>
              {details?.negotiable && (
                <RNText
                  style={{
                    color: 'gray',
                    marginTop: -3,
                    fontSize: SIZES.small,
                    fontFamily: FONT.PoppinsRegular,
                  }}>
                  Negotialble
                </RNText>
              )}
            </RNView>
          </RNView>

          {details?.gallery?.length > 0 && (
            <TouchableOpacity
              style={styles.galleryBtn}
              onPress={() => {
                navigation.navigate('GALLERY_PREVIEW', {
                  images: imagArr,
                  index: 0,
                });
              }}>
              <RNText
                style={{
                  color: 'black',
                  fontWeight: '500',
                }}>
                {details?.gallery?.length}
              </RNText>
              <Ionicons name="images-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default SliderVideos;
