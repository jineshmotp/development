import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getAllTrendingProperty } from '@/redux/home/homeReducer';
import { px } from '@/utils';

import SwiperWrapper from '../common/SwiperWrapper';
import { styles } from './styles';
import TrendingCard from './TrendingCard';

const TrendingPropertyList = () => {
  const allProperty = useAppSelector(getAllTrendingProperty);
  // console.log('allProperty ====>', allProperty);

  const navigation = useNavigation();
  return allProperty?.length ? (
    <RNView style={{ marginTop: px(20) }}>
      <RNView style={styles.headView}>
        <RNText style={styles.headText}>Trending Properties</RNText>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('TRENDING_FEATURED_PROPERTY', { name: 'Trending Properties', trending: true });
          }}>
          <RNText style={styles.moreText}>More</RNText>
        </TouchableOpacity> */}
      </RNView>
      <SwiperWrapper data={allProperty} buttons={true} style={styles.wrapper}>
        {allProperty?.map((item, index) => {
          return (
            <RNView key={index}>
              <TrendingCard key={index} data={item} />
            </RNView>
          );
        })}
      </SwiperWrapper>
    </RNView>
  ) : (
    <RNView></RNView>
  );
};

export default TrendingPropertyList;
