import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import dayjs from 'dayjs';
import qs from 'qs';

import LeadsUserCard from '@/components/Business/LeadsUserCard';
import Divider from '@/components/common/Divider';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import ResponseCard from '@/components/common/ResponseCard';
import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useLazyGetBuilderViewDetailsQuery } from '@/redux/builder/builderService';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyGetAllBusinessResponseQuery, useLazyGetAllResponsesQuery } from '@/redux/property/propertyService';

import { styles } from '../styles';

type AllResponsesProps = {
  day?: number;
};

const AllResponses: React.FC<AllResponsesProps> = ({ day }) => {
  const toast = useToast();
  const [allResponses, setAllResponse] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getAllResponse, { data: loadData }] = useLazyGetAllResponsesQuery();
  const [getAllBusinessResponse, { data: loadBusinessData }] = useLazyGetAllBusinessResponseQuery();
  const selectedUserData = useAppSelector(getUserData);
  const [changeViewDetails] = useLazyGetBuilderViewDetailsQuery();

  // console.log(' userData---->', selectedUserData);

  const payloadByDays = (days = -7) => {
    const currentDate = dayjs();

    // console.log('user role--->', selectedUserData?.role);

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

  const getBuilderResponseResult = payload => {
    getAllBusinessResponse(payload)
      .then(res => {
        // console.log('checking on the response ====>>>',JSON.stringify(res));
        res?.status === 'fulfilled' ? setAllResponse(res?.data) : console.log('erorororo');
      })
      .catch(err => console.log(err));
  };

  const getAllResponseResult = payload => {
    console.log(' payload for user profile leads----->', payload);

    getAllResponse(payload).then(response => {
      //  console.log('respsonse+++++++++++', JSON.stringify(response));
      if (response?.status === 'fulfilled') {
        setAllResponse(response?.data?.data);
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

  const handleFilterFn = (days = -7) => {
    selectedUserData?.role === 'BUILDER'
      ? getBuilderResponseResult(payloadByDays(days))
      : getAllResponseResult(payloadByDays(days));
  };

  const onRefresh = () => {
    handleFilterFn(day);
  };

  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length) {
      setPageNumber(pageNumber + 1);
      selectedUserData?.role === 'BUILDER'
        ? getBuilderResponseResult({
            ...payloadByDays(day),
            pageSize: '10',
            pageNumber: `${pageNumber + 1}`,
          })
        : getAllResponseResult({
            ...payloadByDays(day),
            pageSize: '10',
            pageNumber: `${pageNumber + 1}`,
          });
    }
  };

  const viewBuilderDetails = (leadId = '', chatId = '', subscriptionId) => {
    const viewBuilderDetailsPayload = {
      lead_id: leadId,
      chatId: chatId,
      subscription_id: subscriptionId,
    };
    return qs.stringify(viewBuilderDetailsPayload);
  };

  const viewBuilderDetailsApi = property_data => {
    // console.log(' view details item --->', property_data);

    changeViewDetails(viewBuilderDetails(property_data?._id, '', property_data?.property_data?.subscription_id))
      .then(res => {
        console.log('checking on response of viewDetails', JSON.stringify(res));

        if (res?.status == 'fulfilled') {
          getBuilderResponseResult(payloadByDays(-1));
        } else {
          toast.show(res?.error?.message || res?.data?.message, {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      })
      .catch(err => {
        console.log('error of view details', err);
      });
  };

  useEffect(() => {
    handleFilterFn(day);
  }, [day]);
  return (
    <>
      {selectedUserData?.role === 'BUILDER' ? (
        <FlatList
          scrollEnabled={true}
          data={allResponses}
          renderItem={({ item, index }) => {
            return (
              <LeadsUserCard
                data={item}
                chatNavigation={() => {}}
                onViewClick={() => {
                  viewBuilderDetailsApi(item);
                }}
              />
            );
          }}
        />
      ) : (
        <FlatList
          data={allResponses}
          renderItem={({ item, index }) => {
            return <ResponseCard key={index} data={item} favorite={item?.is_favorite} />;
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
            isArray(allResponses) && allResponses?.length >= 10
              ? loadNextPage
              : () => console.log('loadNextPage++++++++++')
          }
          onEndReachedThreshold={allResponses?.length > 9 ? 0.2 : 0.2}
        />
      )}
    </>
  );
};

export default AllResponses;
