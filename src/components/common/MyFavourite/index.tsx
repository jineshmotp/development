import React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@/routes/RootNavigator';

import FavouriteList from '../FavouriteList';

const MyFavourite = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MY_PROPERTY'>>();
  return <FavouriteList headerShow={route?.params?.headerShow} />;
};

export default MyFavourite;
