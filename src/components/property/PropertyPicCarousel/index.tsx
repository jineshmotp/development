import React from 'react';
import Swiper from 'react-native-swiper';

import { useNavigation } from '@react-navigation/native';

import PropertyImageBackground from '@/components/property/PropertyImageBackground';
import RNView from '@/custom/RNView';

import SliderVideos from '../SliderVideos';
import { styles } from './styles';

type PropertyProps = {
  Photos?: any;
  details?: any;
  handleUnFavourite?: () => void;
  favValue?: boolean;
};

const PropertyPicCarousel: React.FC<PropertyProps> = ({ Photos, details, handleUnFavourite, favValue }) => {
  const navigation = useNavigation();
  // console.log('photos++++++++', Photos);
  const verifyImageOrVideo = data => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    // console.log("temp", temp);
    return temp;
  };
  return (
    <RNView style={styles.bannerContainer}>
      <Swiper
        style={styles.wrapper}
        autoplay={true}
        paginationStyle={styles.pagination}
        // containerStyle={styles.insideContainer}
        dotStyle={styles.dotstyle}
        activeDotStyle={styles.activeDotStyle}
        activeDotColor="#D9D9D9">
        {Photos?.map((item, i) => {
          return verifyImageOrVideo(item?.url) ? (
            <PropertyImageBackground
              key={i}
              details={details}
              goBack={() => navigation.goBack()}
              url={item?.url}
              category={item?.category}
              index={i}
              handleUnFavourite={handleUnFavourite}
              favValue={favValue}
            />
          ) : (
            <SliderVideos key={i} details={details} goBack={() => navigation.goBack()} url={item?.url} index={i} />
          );
        })}
      </Swiper>
      {/* </ScrollView> */}
    </RNView>
  );
};

export default PropertyPicCarousel;
