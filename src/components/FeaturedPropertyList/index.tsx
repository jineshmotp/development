import React, { memo } from 'react';

import { useNavigation } from '@react-navigation/native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getAllFeaturedProperty } from '@/redux/home/homeReducer';
import { px } from '@/utils';

import SwiperWrapper from '../common/SwiperWrapper';
import FeaturedCard from './FeaturedCard';
import { styles } from './styles';

const FeaturedPropertyList = () => {
  const allProperty = useAppSelector(getAllFeaturedProperty);
  // console.log('allProperty ======>', allProperty);

  const navigation = useNavigation();

  return allProperty?.length ? (
    <RNView style={{ marginTop: px(20) }}>
      <RNView style={styles.headView}>
        <RNText style={styles.headText}>Featured Properties</RNText>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('TRENDING_FEATURED_PROPERTY', { name: 'Featured Properties', trending: false });
          }}>
          <RNText style={styles.moreText}>More</RNText>
        </TouchableOpacity> */}
      </RNView>
      <SwiperWrapper data={allProperty} buttons={true} style={styles.wrapper}>
        {allProperty?.map((item, index) => {
          return (
            <RNView key={index}>
              <FeaturedCard data={item} />
            </RNView>
          );
        })}
      </SwiperWrapper>
    </RNView>
  ) : (
    <RNView></RNView>
  );
};

export default memo(FeaturedPropertyList);
