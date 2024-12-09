import React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@/routes/RootNavigator';

import PropertyList from '../PropertyList';

const MyProperty = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MY_PROPERTY'>>();
  return <PropertyList headerShow={route?.params?.headerShow || true} userId={route?.params?.userId} />;
};

export default MyProperty;
