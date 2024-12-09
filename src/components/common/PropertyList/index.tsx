import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import PropertyActionActiveModel from '@/components/property/PropertyActionActiveModel';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import { property_active_list } from '@/constants/function/property.helper';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import RNView from '@/custom/RNView';
import {
  useDeletPropertyMutation,
  useLazyGetUserPropertyQuery,
  usePropertyFavUnfavMutation,
} from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import CustomAlertWrapper from '../CustomAlertWrapper';
import HeaderBar from '../HeaderBar';
import TopTab from '../TopTab';
import ActivePropertyList from './ActivePropertyList';
import InActivePropertyList from './InActivePropertyList';
import { styles } from './styles';

type Props = {
  headerShow?: boolean;
  userId?: string;
};
const PropertyList: React.FC<Props> = ({ headerShow = true, userId }) => {
  const navigation = useNavigation();
  const [deletePopup, setShowDeletePopup] = useState<boolean>(false);
  // const userId = useAppSelector(getUserData)?._id;
  const [inActiveProp, setInActiveProp] = useState([]);
  const [activeProp, setActiveProp] = useState([]);
  const [propId, setPropId] = useState<string>('');
  const [isActive, setIsActive] = useState<string>('active');
  const [load, setLoad] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [getAllUserPropertyMutation, { isLoading }] = useLazyGetUserPropertyQuery();
  // console.log('getAllProperty+++++++++++', getAllProperty);
  const [propertyFavMutation] = usePropertyFavUnfavMutation();
  const [deletePostMutation] = useDeletPropertyMutation();

  const [text, setText] = useState('');

  const [showFilters, setShowFilters] = useState(false);

  // const divideActiveInActiveFn = data => {
  //   const inActiveData = data.filter(ele => {
  //     return ele?.isHide || ele?.isReportedProperty || ele?.isExpired;
  //   });
  //   setInActiveProp(inActiveData);
  //   const activeData = data?.filter(ele => {
  //     return !(ele?.isHide || ele?.isReportedProperty || ele?.isExpired);
  //   });
  //   setActiveProp(activeData);
  //   setLoad(false);
  // };

  // ALL GET PROPERTY CALL
  const getAllPropertyResult = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${userId}?${params}`;
    getAllUserPropertyMutation(payload).then(response => {
      if (response?.data?.status) {
        if (response?.data?.data?.length && data?.page_number > 1) {
          if (isActive === 'active') {
            setActiveProp(prev => prev.concat(response?.data?.data));
          } else {
            setInActiveProp(prev => prev.concat(response?.data?.data));
            console.log('in active property list---------->', response?.data?.data);
          }
        } else {
          if (isActive === 'active') {
            setActiveProp(prev => prev.concat(response?.data?.data));
          } else {
            setInActiveProp(prev => prev.concat(response?.data?.data));
            console.log('in active property list---------->', response?.data?.data);
          }
        }
      } else {
        // console.log('first+++++++++');
        if (response?.data?.status === false) {
          if (data?.page_number == 1) {
            if (userId) onRefreshfn();
          } else {
            if (isActive === 'active') {
              setActiveProp(activeProp);
            } else {
              setInActiveProp(inActiveProp);
            }
          }
        }
      }
    });
  };
  const onRefreshfn = () => {
    getAllPropertyResult({
      sortBy: -1,
      is_active: isActive === 'active' ? true : false,
      page_size: '10',
      page_number: '1',
    });
  };

  // const deletePropertyById = async payload => {
  //   deletePostMutation(payload).then(result => {
  //     console.log('deletePropertyById', result?.data.status);
  //     if (result?.data?.status) {
  //       setReload(true);
  //       setTimeout(() => {
  //         setReload(false);
  //       }, 2000);
  //     } else {
  //       console.log('deletePropertyById+++');
  //     }
  //   });
  // };

  // const propactiveaction = () => {
  //   console.log('value');
  // };

  // const deleteProperty = () => {
  //   console.log(' Delete Property--');

  //   setShowDeletePopup(!deletePopup);

  //   deletePropertyById({
  //     propertyLocationId: [propId],
  //   });

  //   setPropId('');
  // };

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
        // console.log('first');
      }
    });
  };

  useEffect(() => {
    onRefreshfn();
  }, []);

  useEffect(() => {
    if (text) {
      const activeList = activeProp.filter(ele => {
        const searchFields = `{${ele?.property?.property_name} ${ele?.property?.property_price} ${ele?.property?.property_type} ${ele?.property?.locality} ${ele?.property?.property_area} ${ele?.property?.property_area}}`;
        // console.log('searchFields', searchFields, searchFields?.includes(text));
        return searchFields?.toLocaleLowerCase()?.includes(text);
      });
      setActiveProp(activeList);
      const inActiveList = inActiveProp.filter(ele => {
        const searchFields = `{${ele?.property?.property_name} ${ele?.property?.property_price} ${ele?.property?.property_type} ${ele?.property?.locality} ${ele?.property?.property_area} ${ele?.property?.property_area}}`;
        // console.log('searchFields', searchFields, searchFields?.includes(text));
        return searchFields?.toLocaleLowerCase()?.includes(text);
      });
      setInActiveProp(inActiveList);
    } else {
      onRefreshfn();
    }
  }, [text]);

  // console.log('activeProp', activeProp);

  return (
    <Container hasHeader={headerShow} isTab={false} backgroundColor="white">
      {headerShow && (
        <HeaderBar
          backPress={() => {
            navigation.goBack();
          }}
          label={'My Properties'}
          // rightIcon={<CustomRightIcon onPress={() => setShowFilters(true)} />}
        />
      )}
      {/* CUSTOM TOP TAB COMPONENT */}
      <TopTab
        onPressLeft={() => setIsActive('active')}
        onPressRight={() => setIsActive('pending')}
        leftTabStyle={{ borderBottomColor: isActive === 'active' ? ColorTheme.primary : 'white' }}
        rightTabStyle={{ borderBottomColor: isActive === 'pending' ? ColorTheme.primary : 'white' }}
        leftTabText={'Active Property'}
        rightTabText={'Inactive Property'}
      />
      <RNView style={{ width: deviceWidth, alignItems: 'center' }}>
        <CommonInput
          maxLength={300}
          multiline={true}
          contentStyle={{ textTransform: 'lowercase', paddingTop: px(10) }}
          style={styles.inputStyle}
          numberOfLines={5}
          value={text}
          onChangeText={t => setText(t)}
          label="Search Property"
        />
      </RNView>

      <RNView style={{ width: deviceWidth, alignItems: 'center', paddingTop: px(20) }}>
        {isActive === 'active' ? (
          <ActivePropertyList userId={userId} text={text} />
        ) : (
          <InActivePropertyList userId={userId} text={text} />
        )}
      </RNView>

      {/* <PropertyActionActiveModel
        data={property_active_list}
        showModal={showFilters}
        placeholder=""
        setShowModal={setShowFilters}
        onPressItem={propactiveaction}
      /> */}

      {/* {deletePopup && (
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
      )} */}
    </Container>
  );
};

export default PropertyList;
