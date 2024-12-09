import React, { useState } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  data?: any;
  children?: React.ReactNode;
  buttons?: boolean;
  style?: ViewStyle;
};
const SwiperWrapper: React.FC<Props> = ({ data, children, buttons, style }) => {
  const [index, setIndex] = useState(0);
  return (
    <Swiper
      style={style}
      autoplay={buttons ? true : false}
      autoplayTimeout={5}
      showsButtons={buttons ? true : false}
      showsPagination={!buttons}
      index={index}
      onIndexChanged={buttons ? ind => setIndex(ind) : () => {}}
      nextButton={
        data?.length > index + 1 ? (
          <TouchableOpacity onPress={() => setIndex(prev => prev + 1)}>
            <RNView
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="rightcircle" size={30} color={ColorTheme.primary} />
            </RNView>
          </TouchableOpacity>
        ) : (
          <RNView></RNView>
        )
      }
      prevButton={
        index > 0 ? (
          <TouchableOpacity onPress={() => setIndex(prev => prev - 1)}>
            <RNView
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <RNText style={{ fontSize: 20 }}>-</RNText> */}
              <AntDesign name="leftcircle" size={30} color={ColorTheme.primary} />
            </RNView>
          </TouchableOpacity>
        ) : (
          <RNView></RNView>
        )
      }
      paginationStyle={styles.pagination}
      containerStyle={styles.insideContainer}
      dotStyle={styles.dotstyle}
      activeDotStyle={styles.activeDotStyle}
      activeDotColor="#D9D9D9">
      {children}
    </Swiper>
  );
};

export default SwiperWrapper;
