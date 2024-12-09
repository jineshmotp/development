import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import dayjs from 'dayjs';

import Divider from '@/components/common/Divider';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import ResponseCard from '@/components/common/ResponseCard';
import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyGetAllFavouritesQuery } from '@/redux/property/propertyService';

import { styles } from '../styles';

type AllResponsesProps = {
  day?: number;
};
const FavouriteTab: React.FC<AllResponsesProps> = ({ day }) => {
  const toast = useToast();
  const [allFavourites, setAllFavourites] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getAllResponse, { data: loadData }] = useLazyGetAllFavouritesQuery();

  const selectedUserData = useAppSelector(getUserData);

  const getAllResponseResult = payload => {
    getAllResponse(payload).then(response => {
      //   console.log('respsonse+++++++++++abbahhah', response);
      if (response?.status === 'fulfilled') {
        setAllFavourites(response?.data);
      } else {
        console.log('erorororo');
        // toast.show('Something went wrong', {
        //   type: 'error_toast',
        //   animationDuration: 100,
        //   data: {
        //     title: 'Message',
        //   },
        //   duration: 3000,
        // });
      }
    });
  };
  const payloadByDays = (days = -7) => {
    const currentDate = dayjs();
    let startDate;
    let endDate = currentDate.format('YYYY-MM-DD');

    if (days === -1) {
      startDate = currentDate.subtract(1, 'day').format('YYYY-MM-DD');
    } else if (days === -7) {
      startDate = currentDate.subtract(7, 'day').format('YYYY-MM-DD');
    } else if (days === -30) {
      startDate = currentDate.subtract(30, 'day').format('YYYY-MM-DD');
    }

    if (selectedUserData?.role === 'BUILDER') {
      return {
        pageNumber: '1',
        pageSize: '10',
        start_date: startDate,
        end_date: currentDate.format('YYYY-MM-DD'),
        owner_id: selectedUserData?._id,
      };
    } else {
      return {
        pageNumber: '1',
        pageSize: '10',
        start_date: startDate,
        end_date: currentDate.format('YYYY-MM-DD'),
      };
    }
  };
  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length) {
      setPageNumber(pageNumber + 1);
      getAllResponseResult({
        ...payloadByDays(-7),
        pageSize: '10',
        pageNumber: `${pageNumber + 1}`,
      });
    }
  };
  const handleFilterFn = (days = -7) => {
    getAllResponseResult(payloadByDays(days));
  };

  const onRefresh = () => {
    handleFilterFn(day);
  };
  useEffect(() => {
    handleFilterFn(day);
  }, []);
  return (
    <FlatList
      data={allFavourites}
      renderItem={({ item, index }) => {
        return <ResponseCard key={index} data={item} favorite={item?.is_favorite} tab={'Favourite'} />;
      }}
      style={styles.flatListStyle}
      ItemSeparatorComponent={() => (
        <RNView style={styles.dividerView}>
          <Divider style={styles.divider} />
        </RNView>
      )}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            // dispatch(userAction.fetchUserLeads(selectUserData?._id));
            onRefresh();
          }}
          refreshing={false}
        />
      }
      ListEmptyComponent={<ListEmptyComponent type="default" />}
      onEndReached={
        isArray(allFavourites) && allFavourites?.length >= 10
          ? loadNextPage
          : () => console.log('loadNextPage++++++++++')
      }
      onEndReachedThreshold={allFavourites?.length > 9 ? 5 : 2}
    />
  );
};

export default FavouriteTab;
