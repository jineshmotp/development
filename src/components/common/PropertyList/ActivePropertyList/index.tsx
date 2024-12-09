import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazyGetUserPropertyQuery } from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';

import ListEmptyComponent from '../../ListEmptyComponent';
import Loader from '../../Loader';
import MyPropertyCard from '../../MyPropertyCard';
import { styles } from '../styles';

type ActiveProps = {
  userId?: string;
  text?: string;
};
const ActivePropertyList: React.FC<ActiveProps> = ({ userId, text }) => {
  const navigation = useNavigation();
  const [activeProp, setActiveProp] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getAllUserPropertyMutation, { data: loadData, isLoading }] = useLazyGetUserPropertyQuery();

  // ALL GET PROPERTY CALL
  const getAllPropertyResult = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${userId}?${params}`;
    // console.log('payload++++++', payload);
    getAllUserPropertyMutation(payload).then(response => {
      // console.log(' response--->', response?.data?.data);

      // console.log('dsbhjbdsjvbjdsb+++', response, userId);
      if (response?.data?.status) {
        if (response?.data?.data?.length && data?.page_number > 1) {
          setActiveProp(prev => prev.concat(response?.data?.data));
        } else {
          if (!response?.data?.data?.length && data?.page_number > 1) {
            setActiveProp(prev => prev.concat(response?.data?.data));
          } else {
            setActiveProp(response?.data?.data);
          }
        }
      } else {
        // console.log('first+++++++++');
        if (response?.data?.status === false) {
          if (data?.page_number == 1) {
            if (userId) onRefreshfn();
          } else {
            setActiveProp(activeProp);
          }
        }
      }
    });
  };

  const onRefreshfn = () => {
    const payload = text
      ? {
          sortBy: -1,
          is_active: true,
          page_size: '10',
          page_number: '1',
          property_name: text,
        }
      : {
          sortBy: -1,
          is_active: true,
          page_size: '10',
          page_number: 1,
        };
    getAllPropertyResult(payload);
    setPageNumber(1);
  };

  // console.log('activeProp', activeProp?.length);

  // NEXT LOAD DATA FUNCTION FOR ALL NOTIFICATION
  const loadNextPage = () => {
    // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
    if (loadData?.data?.length) {
      setPageNumber(pageNumber + 1);
      if (userId) {
        const payload = text
          ? {
              sortBy: -1,
              is_active: true,
              page_size: '10',
              page_number: `${pageNumber + 1}`,
              property_name: text,
            }
          : {
              sortBy: -1,
              is_active: true,
              page_size: '10',
              page_number: `${pageNumber + 1}`,
            };
        // console.log('paylod', payload);
        getAllPropertyResult(payload);
      } else {
        console.log('selectedData?.user?.user?._id,', userId);
      }
    } else {
      setActiveProp(activeProp);
    }
  };

  const renderItem = useMemo(() => {
    return ({ item, i }) => {
      // console.log("property", item?.isHide);
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
          type={'active'}
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
        is_active: true,
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
        data={activeProp}
        extraData={activeProp}
        renderItem={renderItem}
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
          return (
            <RNView>
              {/* <CommonInput
                maxLength={300}
                multiline={true}
                contentStyle={{ textTransform: 'lowercase', textAlignVertical: 'center' }}
                style={styles.inputStyle}
                numberOfLines={5}
                value={text}
                onChangeText={t => setText(t)}
                placeholder="Search Property"
                label="Search Property"
              /> */}
            </RNView>
          );
        }}
      />
    </RNView>
  );
};

export default ActivePropertyList;
