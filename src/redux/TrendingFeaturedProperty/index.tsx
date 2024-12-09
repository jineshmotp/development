import React from 'react';
import { FlatList } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import TrendingCard from '@/components/TrendingPropertyList/TrendingCard';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootStackParamList } from '@/routes/RootNavigator';
import { deviceWidth, px } from '@/utils';

import { getAllFeaturedProperty, getAllTrendingProperty } from '../home/homeReducer';

const Seperator = () => {
  return <RNView style={{ width: deviceWidth, height: px(10) }}></RNView>;
};
const TrendingFeaturedProperty = () => {
  const allTrendingProperty = useAppSelector(getAllTrendingProperty);
  const allFeaturedProperty = useAppSelector(getAllFeaturedProperty);
  const route = useRoute<RouteProp<RootStackParamList, 'TRENDING_FEATURED_PROPERTY'>>();
  const navigation = useNavigation();

  const renderItems = ({ item, index }) => {
    return <TrendingCard key={index} data={item} containerStyle={{ width: deviceWidth / 1.09, height: px(200) }} />;
  };

  const allProperty = route?.params?.trending ? allTrendingProperty : allFeaturedProperty;
  return (
    <Container backgroundColor="white" hasHeader={true} isTab={false}>
      <HeaderBar backPress={() => navigation.goBack()} label={route?.params?.name} />
      <FlatList
        data={allProperty}
        renderItem={renderItems}
        horizontal={false}
        ItemSeparatorComponent={() => <Seperator />}
        style={{ paddingTop: px(20) }}
        contentContainerStyle={{ paddingBottom: px(50) }}
        indicatorStyle="white"
      />
    </Container>
  );
};

export default TrendingFeaturedProperty;
