import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import PropertyActionActiveModel from '@/components/property/PropertyActionActiveModel';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import { isArray } from '@/constants/function/isArray';
import { property_active_list } from '@/constants/function/property.helper';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useDeletPropertyMutation,
  useGetUserPropertyQuery,
  useLazyGetUserPropertyQuery,
  usePropertyFavUnfavMutation,
} from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';

import CustomAlertWrapper from '../CustomAlertWrapper';
import HeaderBar from '../HeaderBar';
import ListEmptyComponent from '../ListEmptyComponent';
import Loader from '../Loader';
import MyPropertyCard from '../MyPropertyCard';
import TopTab from '../TopTab';
import { styles } from './styles';

type Props = {
  headerShow?: boolean;
  userId?: string;
};
const ProfilePropertyList: React.FC<Props> = ({ headerShow = true, userId }) => {
  const navigation = useNavigation();
  const [activeProp, setActiveProp] = useState([]);
  const [text, setText] = useState('');
  const [deletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [propId, setPropId] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [getAllUserPropertyMutation, { data: loadData, isLoading }] = useLazyGetUserPropertyQuery();
  // console.log('getAllProperty+++++++++++', getAllProperty);
  const [propertyFavMutation] = usePropertyFavUnfavMutation();
  const [deletePostMutation] = useDeletPropertyMutation();

  const [showFilters, setShowFilters] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // ALL GET PROPERTY CALL
  const getAllPropertyResult = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${userId}?${params}`;
    // console.log('payload++++++', payload);
    getAllUserPropertyMutation(payload).then(response => {
      // console.log('dsbhjbdsjvbjdsb+++', response, userId);
      if (response?.data?.status) {
        // console.log('response?.data?.status', response?.data?.data?.length);
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

  // REFRSH FUNCTION TO LOAD DATA
  const onRefreshfn = () => {
    const payload = text
      ? {
          sortBy: 1,
          is_active: true,
          page_size: '10',
          page_number: '1',
          property_name: text,
        }
      : {
          sortBy: 1,
          is_active: true,
          page_size: '10',
          page_number: 1,
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
              sortBy: 1,
              is_active: true,
              page_size: '10',
              page_number: `${pageNumber + 1}`,
              property_name: text,
            }
          : {
              sortBy: 1,
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

  const deletePropertyById = async payload => {
    deletePostMutation(payload).then(result => {
      // console.log('deletePropertyById', result?.data.status);
      if (result?.data?.status) {
        setReload(true);
        setTimeout(() => {
          setReload(false);
        }, 2000);
      } else {
        console.log('deletePropertyById+++');
      }
    });
  };

  const propactiveaction = () => {
    console.log('value');
  };

  const deleteProperty = () => {
    setShowDeletePopup(!deletePopup);

    deletePropertyById({
      propertyLocationId: [propId],
    });

    setPropId('');
  };

  const CustomRightIcon = ({ onPress }) => (
    <RNImage source={require('@/assets/images/userProfile/filter.png')} style={styles.imgStyle} />
  );

  const propertyFavAndUnFav = payload => {
    propertyFavMutation(payload).then(results => {
      // console.log('propertyFavAndUnFav', results?.data?.status);
      if (results?.data?.status) {
        setReload(true);
        setTimeout(() => {
          setReload(false);
        }, 2000);
      } else {
        console.log('first');
      }
    });
  };

  useEffect(() => {
    onRefreshfn();
  }, []);

  useEffect(() => {
    if (text) {
      getAllPropertyResult({
        sortBy: 1,
        is_active: true,
        page_size: '10',
        page_number: '1',
        property_name: text,
      });
    } else {
      onRefreshfn();
    }
  }, [text]);

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

  return (
    <Container hasHeader={headerShow} isTab={false} backgroundColor="white">
      {headerShow && (
        <HeaderBar
          backPress={() => {
            navigation.goBack();
          }}
          // label={`My Properties (${getAllProperty?.data?.length ? getAllProperty?.data?.length : 0})`}
          rightIcon={<CustomRightIcon onPress={() => setShowFilters(true)} />}
        />
      )}
      {/* CUSTOM TOP TAB COMPONENT */}
      <RNView style={styles.SearchInput}>
        <CommonInput
          maxLength={300}
          multiline={true}
          contentStyle={{ textTransform: 'lowercase', textAlignVertical: 'center' }}
          style={styles.inputStyle}
          numberOfLines={5}
          value={text}
          onChangeText={t => setText(t)}
          // placeholder="Search Property"
          label="Search Property"
        />
      </RNView>

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
            return <ListEmptyComponent text={'No property found'} type="property" />;
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

      <PropertyActionActiveModel
        data={property_active_list}
        showModal={showFilters}
        placeholder=""
        setShowModal={setShowFilters}
        onPressItem={propactiveaction}
      />

      {deletePopup && (
        <CustomAlertWrapper
          onClose={() => setShowDeletePopup(false)}
          openModal={deletePopup}
          text={'Are you sure you want to delete?'}
          head={'Delete'}>
          <PropertyCategoryChips
            item={{ label: 'Cancel', active: true }}
            containerStyle={{
              flex: 1,
            }}
            onPress={() => {
              setShowDeletePopup(!deletePopup);
            }}
            style={{
              backgroundColor: 'white',
            }}
          />
          <PropertyCategoryChips
            item={{ label: 'Delete' }}
            containerStyle={{
              flex: 1,
            }}
            onPress={deleteProperty}
            style={{
              backgroundColor: 'red',
            }}
            textStyle={{
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </CustomAlertWrapper>
      )}
    </Container>
  );
};

export default ProfilePropertyList;
