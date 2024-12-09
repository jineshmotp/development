import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import Loader from '@/components/common/Loader';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyGetAllNotificationQuery } from '@/redux/Notification/notificationService';
import { ColorTheme } from '@/theme';

import NotificationElement from '../NotificationElement';
import { styles } from '../styles';

const AllNotificationList = () => {
  const userId = useAppSelector(getUserData)._id;
  const [allNotifications, setAllNotifications] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [allNotification, { data: loadData, isLoading }] = useLazyGetAllNotificationQuery();
  console.log('allNotifications', allNotifications);
  // ALL GET NOTIFICATION CALL
  const getAllNotiFun = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${userId}?${params}`;
    allNotification(payload).then(response => {
      if (response?.data?.success) {
        // console.log('response?.data?.notifications?.data?.length', response?.data?.notifications?.data?.length);
        if (response?.data?.notifications?.data?.length && data?.page > 1) {
          setAllNotifications(prev => prev.concat(response?.data?.notifications?.data));
        } else {
          if (!response?.data?.notifications?.data?.length && data?.page > 1) {
            setAllNotifications(prev => prev.concat(response?.data?.notifications?.data));
          } else {
            setAllNotifications(response?.data?.notifications?.data);
          }
        }
      } else {
        // console.log('first+++++++++');
        if (response?.error?.status === false) {
          // if (data?.page == 1) {
          //   if (userId) onRefreshfn();
          // } else {
          //   setAllNotifications(allNotifications);
          // }
        }
      }
    });
  };
  const onRefreshfn = () => {
    getAllNotiFun({ page: '1', limit: '20' });
    setPageNumber(1);
  };
  // NEXT LOAD DATA FUNCTION FOR ALL NOTIFICATION
  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.notifications?.data?.length);
    if (loadData?.notifications?.data?.length) {
      setPageNumber(pageNumber + 1);
      if (userId) {
        getAllNotiFun({
          limit: '20',
          page: `${pageNumber + 1}`,
        });
      } else {
        console.log('selectedData?.user?.user?._id,', userId);
      }
    } else {
      setAllNotifications(allNotifications);
    }
  };
  const renderItem = useMemo(() => {
    return ({ item, index }) => {
      // console.log('property =====>', item);
      return <NotificationElement key={index} item={item} />;
    };
  }, []);

  useEffect(() => {
    onRefreshfn();
  }, []);
  return (
    <RNView style={styles.containerView}>
      <FlatList
        nestedScrollEnabled
        data={allNotifications}
        extraData={allNotifications}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        // contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              onRefreshfn();
            }}
          />
        }
        ListEmptyComponent={() => {
          return <ListEmptyComponent text={'No notification found'} type="default" />;
        }}
        ListFooterComponent={() => {
          return isLoading ? (
            <Loader size={'large'} height={100} color={ColorTheme.nearLukGray} />
          ) : (
            <RNView style={styles.noDataView}>
              <RNText style={styles.noDataText}></RNText>
            </RNView>
          );
        }}
      />
    </RNView>
  );
};

export default AllNotificationList;
