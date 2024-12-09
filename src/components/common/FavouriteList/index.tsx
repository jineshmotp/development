import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';

import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getReloadData, getUserData } from '@/redux/login/loginReducer';
import { useLazyGetAllUserFavouritePropertyQuery } from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';

import FavouriteCard from '../FavouriteCard';
import HeaderBar from '../HeaderBar';
import ListEmptyComponent from '../ListEmptyComponent';
import Loader from '../Loader';
import MyFavPropertyCard from '../MyFavPropertyCard';
import MyPropertyCard from '../MyPropertyCard';
import { styles } from './styles';

type Props = {
  headerShow?: boolean;
};
const FavouriteList: React.FC<Props> = ({ headerShow = true }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const selectedData = useAppSelector(getUserData);
  const [userFavProperty, setUserFavProperty] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [getAllUserFavouriteProperty, { isLoading }] = useLazyGetAllUserFavouritePropertyQuery();

  const getAllPropertyResult = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${selectedData?._id}?${params}`;

    // console.log('payload value---->', payload);

    getAllUserFavouriteProperty(payload).then(results => {
      // console.log('resultsresultssssssssss', results?.data?.data);
      if (results?.isSuccess) {
        setUserFavProperty(results?.data?.data);
      } else {
        if (!results?.error?.status) {
          setUserFavProperty([]);
        } else {
          setUserFavProperty(userFavProperty);
        }
      }
    });
  };

  const handleNavigation = (item: any) => {
    // console.log(' item value-- ', item);

    if (item?.business_id !== null) {
      navigation.navigate('BUILDER_PROPERTY_DETAILS', {
        id: item?.property_id,
        businessId: item?.business_id,
      });
    } else {
      navigation.navigate('PROPERTY_DETAILS', {
        id: item?.property_id,
        owner: item?.owned_by,
      });
    }
  };

  const loadNextPage = () => {
    if (userFavProperty?.length) {
      setPageNumber(pageNumber + 1);

      const payload = {
        pageSize: 10,
        pageNumber: `${pageNumber + 1}`,
      };

      getAllPropertyResult(payload);
    }
  };

  const renderItem = useMemo(() => {
    return ({ item, i }) => {
      // console.log("property", item?.isHide);
      return (
        <MyFavPropertyCard onPress={() => handleNavigation(item)} data={item} key={i} onPressFavourite={onRefreshfn}  onRefreshfn={onRefreshfn}/>
      );
    };
  }, []);

  const onRefreshfn = () => {
    const payload = {
      pageNumber: 1,
      pageSize: 10,
    };
    getAllPropertyResult(payload);
    setPageNumber(1);
  };

  useEffect(() => {
    getAllPropertyResult({
      pageNumber: 1,
      pageSize: 10,
    });
  }, []);

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <Container hasHeader={headerShow} isTab={false} backgroundColor="white">
      {headerShow && (
        <HeaderBar
          backPress={() => {
            dispatch(getReloadData({}));
            navigation.goBack();
          }}
          label={`Favourites (${userFavProperty?.length ? userFavProperty?.length : 0})`}
        />
      )}

      <RNView style={styles.topView}>
        <FlatList
          nestedScrollEnabled
          data={userFavProperty}
          extraData={userFavProperty}
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
    </Container>
  );
};

export default FavouriteList;
