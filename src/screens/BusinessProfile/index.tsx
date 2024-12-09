import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BuilderList from '@/components/common/BuilderList';
import { Container } from '@/custom/Container';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import loginReducer, { getReloadData, getUserData } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

const BusinessProfile = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'BUSINESS_PROFILE'>>();
  const toast = useToast();



  const businessId = route?.params?.id;
  // console.log(' businessId-->', route?.params?.id);

  const selectedUserData = useAppSelector(getUserData);



  return (

    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <BuilderList headerShow={false} userId={selectedUserData?._id} businessId={businessId} />
    </Container>

  );
};

export default BusinessProfile;
