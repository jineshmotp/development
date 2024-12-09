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
import { useLazyGetAllResponseByPropIdQuery } from '@/redux/property/propertyService';

import { styles } from '../styles';

type AllResponsesProps = {
  day?: number;
  propertyId?: string;
};
// https://devapi.nearluk.com/ownerleads/searchByProperty/?propertyId=6639ae5668cc58af4381d5a6&sortBy=latest&start_date=2024-04-30T17%3A30%3A54%2B05%3A30&end_date=2024-05-07T17%3A30%3A54%2B05%3A30&pageNumber=1&pageSize=10

const AllPropertyResponse: React.FC<AllResponsesProps> = ({ day, propertyId }) => {
  const toast = useToast();
  const [allResponses, setAllResponse] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getAllResponse, { data: loadData }] = useLazyGetAllResponseByPropIdQuery();

  const payloadByDays = (days = -7) => {
    const currentDate = dayjs();
    if (days === -1) {
      const oneDaysBefore = currentDate.subtract(1, 'day').format('YYYY-MM-DD');
      return {
        propertyId: propertyId,
        pageNumber: '1',
        pageSize: '10',
        start_date: oneDaysBefore,
        end_date: currentDate.format('YYYY-MM-DD'),
      };
    }
    if (days === -7) {
      const sevenDaysBefore = currentDate.subtract(7, 'day').format('YYYY-MM-DD');
      return {
        propertyId: propertyId,
        pageNumber: '1',
        pageSize: '10',
        start_date: sevenDaysBefore,
        end_date: currentDate.format('YYYY-MM-DD'),
      };
    }
    if (days === -30) {
      const thirtyDaysBefore = currentDate.subtract(30, 'day').format('YYYY-MM-DD');
      return {
        propertyId: propertyId,
        pageNumber: '1',
        pageSize: '10',
        start_date: thirtyDaysBefore,
        end_date: currentDate.format('YYYY-MM-DD'),
      };
    }
  };

  const getAllResponseResult = payload => {
    getAllResponse(payload).then(response => {
         console.log('respsonse+++++++++++abbbbbb', JSON.stringify(response));
      if (response?.status === 'fulfilled') {
        setAllResponse(response?.data?.data);
        // setShowFilters(false);
      } else {
        // setShowFilters(false);
        console.log('erorororo');
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  const handleFilterFn = (days = -7) => {
    getAllResponseResult(payloadByDays(days));
  };

  const onRefresh = () => {
    handleFilterFn();
  };

  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length) {
      setPageNumber(pageNumber + 1);
      getAllResponseResult({
        ...payloadByDays(day),
        pageSize: '10',
        pageNumber: `${pageNumber + 1}`,
      });
    }
  };

  useEffect(() => {
    handleFilterFn(day);
  }, [day]);
  return (
    <FlatList
      data={allResponses}
      renderItem={({ item }) => {
        // console.log('abhay+++', item);
        return (
          <RNView key={item} style={styles.container}>
            <ResponseCard data={item} favorite={item?.is_favorite} />
          </RNView>
        );
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
            onRefresh();
          }}
          refreshing={false}
        />
      }
      ListEmptyComponent={<ListEmptyComponent type="default" />}
      onEndReached={
        isArray(allResponses) && allResponses?.length >= 10 ? loadNextPage : () => console.log('loadNextPage++++++++++')
      }
      onEndReachedThreshold={allResponses?.length > 9 ? 5 : 2}
    />
  );
};

export default AllPropertyResponse;
