import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import Divider from '@/components/common/Divider';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import ListingResponseCard from '@/components/common/ListingResponseCard';
import Loader from '@/components/common/Loader';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyGetUserPropertyQuery } from '@/redux/login/loginService';

import { styles } from '../styles';

const ListingResponse = () => {
  const selectedUserData = useAppSelector(getUserData);
  const toast = useToast();
  const [allListing, setAllListing] = useState([]);
  const [getAllUserProperty, { isLoading }] = useLazyGetUserPropertyQuery();

  const getAllResponseResult = payload => {
    console.log(' payload ----->', payload);

    getAllUserProperty(payload).then(response => {
      // console.log('respsonse+++++++++++bchdfb', response?.data?.data);
      if (response?.data?.status) {
        setAllListing(response?.data?.data);
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
  //   const loadNextPage = () => {
  //     console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
  //     if (loadData?.data?.length) {
  //       setPageNumber(pageNumber + 1);
  //       getAllResponseResult(selectedUserData?._id);
  //     }
  //   };
  useEffect(() => {
    if (selectedUserData?._id) getAllResponseResult(selectedUserData?._id);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <FlatList
      data={allListing}
      renderItem={({ item, index }) => {
        return (
          <RNView key={index} style={styles.container}>
            <ListingResponseCard data={item} />
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
            // dispatch(userAction.fetchUserLeads(selectUserData?._id));
          }}
          refreshing={false}
        />
      }
      ListEmptyComponent={<ListEmptyComponent type="default" />}
      //   onEndReached={
      //     isArray(allListing) && allListing?.length >= 10 ? loadNextPage : () => console.log('loadNextPage++++++++++')
      //   }
      //   onEndReachedThreshold={allListing?.length > 9 ? 5 : 2}
    />
  );
};

export default ListingResponse;
