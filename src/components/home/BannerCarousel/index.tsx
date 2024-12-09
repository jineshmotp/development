import React from 'react';
import { TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

import { useNavigation } from '@react-navigation/native';

import { homeBannerSlider } from '@/constants/functions/home.banner';
import RNImage from '@/custom/RNImage';
import RNView from '@/custom/RNView';

import { styles } from './styles';

const BannerCarousel = () => {
  const navigation = useNavigation();
  const homeBannerSlider = [
    'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201031330022.png',
    'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201035940655.png',
    'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201032191445.png',
    'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201034987811.png',
    'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201033808566.png',
  ];
  return (
    <RNView style={styles.bannerContainer}>
      <Swiper
        style={styles.wrapper}
        autoplay={true}
        paginationStyle={styles.pagination}
        containerStyle={styles.insideContainer}
        dotStyle={styles.dotstyle}
        activeDotStyle={styles.activeDotStyle}
        activeDotColor="#D9D9D9">
        {homeBannerSlider.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.slide1}
              onPress={() =>
                navigation.navigate('GALLERY_PREVIEW', {
                  hasHeader: true,
                  images: homeBannerSlider,
                  headerName: 'Banner',
                  index: i,
                })
              }>
              <RNImage key={i} source={{ uri: item }} style={styles.imageContainer} resizeMode="contain" />
            </TouchableOpacity>
          );
        })}
      </Swiper>
      {/* </ScrollView> */}
    </RNView>
  );
};

export default BannerCarousel;
