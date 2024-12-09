import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { isArray } from '@/constants/function/isArray';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazyGetUserPropertyQuery } from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';

import ListEmptyComponent from '../../ListEmptyComponent';
import Loader from '../../Loader';
import MyPropertyCard from '../../MyPropertyCard';
import { styles } from '../styles';

type InActiveProps = {
  userId?: string;
  text?: string;
};
const InActivePropertyList: React.FC<InActiveProps> = ({ userId, text }) => {
  const navigation = useNavigation();
  const [inActiveProp, setInActiveProp] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [getAllUserPropertyMutation, { data: loadData, isLoading }] = useLazyGetUserPropertyQuery();

  // ALL GET INACTIVE PROPERTY CALL
  const getAllPropertyResult = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${userId}?${params}`;
    // console.log(payload);
    getAllUserPropertyMutation(payload).then(response => {
      // console.log('dsbhjbdsjvbjdsb+++', response?.data?.data);
      if (response?.data?.status) {
        if (response?.data?.data?.length && data?.page_number > 1) {
          setInActiveProp(prev => prev.concat(response?.data?.data));
          // console.log('inactive property--->', response?.data?.data);
        } else {
          if (!response?.data?.data?.length && data?.page_number > 1) {
            setInActiveProp(prev => prev.concat(response?.data?.data));
            // console.log('inactive property--->', response?.data?.data);
          } else {
            setInActiveProp(response?.data?.data);
          }
        }
      } else {
        // console.log('first+++++++++');
        if (response?.data?.status === false) {
          if (data?.page_number == 1) {
            if (userId) onRefreshfn();
          } else {
            setInActiveProp(inActiveProp);
          }
        }
      }
    });
  };
  const onRefreshfn = () => {
    const payload = text
      ? {
          sortBy: -1,
          is_active: false,
          page_size: '10',
          page_number: '1',
          property_name: text,
        }
      : {
          sortBy: -1,
          is_active: false,
          page_size: '10',
          page_number: '1',
        };
    getAllPropertyResult(payload);
    setPageNumber(1);
  };

  // NEXT LOAD DATA FUNCTION FOR ALL NOTIFICATION
  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length) {
      setPageNumber(pageNumber + 1);
      if (userId) {
        const payload = text
          ? {
              sortBy: -1,
              is_active: false,
              page_size: '10',
              page_number: `${pageNumber + 1}`,
              property_name: text,
            }
          : {
              sortBy: -1,
              is_active: false,
              page_size: '10',
              page_number: `${pageNumber + 1}`,
            };
        // console.log('payload+++', payload);
        getAllPropertyResult(payload);
      } else {
        console.log('selectedData?.user?.user?._id,', userId);
      }
    } else {
      setInActiveProp(inActiveProp);
    }
  };

  const renderItemInActive = useMemo(() => {
    return ({ item, i }) => {
      // console.log("property", item);
      return (
        <MyPropertyCard
          onPress={() => {
            navigation.navigate('PROPERTY_DETAILS', {
              id: item?._id,
              owner: item?.owned_by,
            });
          }}
          data={item}
          key={i}
          onReloadData={onRefreshfn}
          type={'inactive'}
        />
      );
    };
  }, []);

  useEffect(() => {
    onRefreshfn();
  }, []);
  useEffect(() => {
    if (text) {
      getAllPropertyResult({
        sortBy: -1,
        is_active: false,
        page_size: '10',
        page_number: '1',
        property_name: text,
      });
    } else {
      onRefreshfn();
    }
  }, [text]);

  return (
    <RNView style={styles.containerView}>
      <FlatList
        nestedScrollEnabled
        data={inActiveProp}
        extraData={inActiveProp}
        renderItem={renderItemInActive}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              onRefreshfn();
              // setReload(true);
              // setTimeout(() => {
              //   setReload(false);
              // }, 2000);
            }}
          />
        }
        ListEmptyComponent={() => {
          return <ListEmptyComponent text={'No Property Found'} type="property" />;
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
        ListHeaderComponent={() => {
          return <RNView></RNView>;
        }}
      />
    </RNView>
  );
};

export default InActivePropertyList;
