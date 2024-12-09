import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import Loader from '@/components/common/Loader';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyGetAllUnreadNotificationQuery } from '@/redux/Notification/notificationService';
import { ColorTheme } from '@/theme';

import NotificationUnreadElement from '../NotificationUnreadElement';
import { styles } from '../styles';

const AllUnreadNotificationList = () => {
  const userId = useAppSelector(getUserData)._id;
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [unreadpageNumber, setUnreadPageNumber] = useState<number>(1);
  const [allUnreadNotification, { data: loadUnreadData, isLoading }] = useLazyGetAllUnreadNotificationQuery();
  const [read, setRead] = useState(0);

  const getAllUnreadNotiFn = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${userId}?${params}`;
    allUnreadNotification(payload).then(response => {
      // console.log('dsbhjbdsjvbjdsb+++unread', response?.data?.notifications?.data, userId);
      if (response?.data?.status) {
        if (response?.data?.notifications?.data?.length && data?.page > 1) {
          setUnreadNotifications(prev => prev.concat(response?.data?.notifications?.data));
        } else {
          if (!response?.data?.notifications?.data?.length && data?.page > 1) {
            setUnreadNotifications(prev => prev.concat(response?.data?.notifications?.data));
          } else {
            setUnreadNotifications(response?.data?.notifications?.data);
          }
        }
      } else {
        // console.log('first+++++++++');
        if (response?.error?.status === false) {
          // if (data?.page == 1) {
          //   if (userId) onRefreshUnread();
          // } else {
          //   setUnreadNotifications(unreadNotifications);
          // }
        }
      }
    });
  };
  const onRefreshUnread = () => {
    getAllUnreadNotiFn({ page: '1', limit: '20' });
    setUnreadPageNumber(1);
  };

  const loadUnreadNextPage = () => {
    // console.log(
    //   'loadUnreadNextPage================================',
    //   unreadpageNumber + 1,
    //   loadUnreadData?.notifications?.data?.length
    // );
    if (loadUnreadData?.notifications?.data?.length) {
      setUnreadPageNumber(unreadpageNumber + 1);
      if (userId) {
        getAllUnreadNotiFn({
          limit: '20',
          page: `${unreadpageNumber + 1}`,
        });
      } else {
        console.log('selectedData?.user?.user?._id,', userId);
      }
    } else {
      //   console.log('loadUnreadNextPage,loadUnreadNextPage');
      setUnreadNotifications(unreadNotifications);
    }
  };

  const renderItemUnread = useMemo(() => {
    return ({ item, index }) => {
      return <NotificationUnreadElement item={item} key={index} onPress={() => setRead(prev => prev + 1)} />;
    };
  }, []);
  useEffect(() => {
    onRefreshUnread();
  }, [read]);
  return (
    <RNView style={styles.containerView}>
      <FlatList
        nestedScrollEnabled
        data={unreadNotifications}
        extraData={unreadNotifications}
        renderItem={renderItemUnread}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={loadUnreadNextPage}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              onRefreshUnread();
            }}
          />
        }
        ListEmptyComponent={() => {
          return isLoading ? (
            <Loader size={'large'} height={100} color={ColorTheme.nearLukGray} />
          ) : (
            <ListEmptyComponent text={'No notification found'} type="default" />
          );
        }}
      />
    </RNView>
  );
};

export default AllUnreadNotificationList;
