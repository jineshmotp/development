import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import Loader from '@/components/common/Loader';
import MyPropertyCard from '@/components/common/MyPropertyCard';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazyGetBuilderPropertyQuery } from '@/redux/builder/builderService';
import { useLazyGetUserPropertyQuery } from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';

import { styles } from '../styles';

type ActiveProps = {
  userId?: string;
  text?: string;
  businessId?: string;
};
const ActivePropertyList: React.FC<ActiveProps> = ({ userId, text, businessId }) => {
  const navigation = useNavigation();
  const [activeProp, setActiveProp] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [getAllBuilderPropertyMutation, { data: loadData, isLoading }] = useLazyGetBuilderPropertyQuery();

  // ALL GET PROPERTY CALL
  const getAllPropertyResult = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${businessId}?${params}`;
    //console.log(' payload from active --->', payload);

    getAllBuilderPropertyMutation(payload).then(response => {
      // console.log('response?.data?.status', response?.data?.data);
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
            navigation.navigate('BUILDER_PROPERTY_DETAILS', {
              id: item?._id,
              businessId: businessId,
            });
          }}
          data={item}
          key={i}
          onReloadData={onRefreshfn}
          type={'active'}
          business={true}
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
    <SafeAreaView style={{ flex: 1 }}>
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
            return <RNView></RNView>;
          }}
        />
      </RNView>
    </SafeAreaView>
  );
};

export default ActivePropertyList;
