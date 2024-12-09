import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import TopTab from '@/components/common/TopTab';
import { Container } from '@/custom/Container';
import { ColorTheme } from '@/theme';

import AllNotificationList from './AllNotificationList';
import AllUnreadNotificationList from './AllUnreadNotificationList';

const Notification = () => {
  const navigation = useNavigation();
  const [tabText, setTabText] = useState<string>('all');

  // console.log('tabText', tabText);

  return (
    <Container hasHeader={true} backgroundColor={ColorTheme.white} isTab={false}>
      <HeaderBar
        label="Notification"
        // backIcon={<Entypo name="chevron-thin-left" size={24} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <TopTab
        onPressLeft={() => {
          setTabText('all');
        }}
        onPressRight={() => {
          setTabText('unread');
        }}
        leftTabStyle={{ borderBottomColor: tabText === 'all' ? ColorTheme.primary : 'white' }}
        rightTabStyle={{ borderBottomColor: tabText === 'unread' ? ColorTheme.primary : 'white' }}
        leftTabText={'All'}
        rightTabText={'Unread'}
      />
      {tabText === 'all' ? <AllNotificationList /> : <AllUnreadNotificationList />}
    </Container>
  );
};

export default Notification;
