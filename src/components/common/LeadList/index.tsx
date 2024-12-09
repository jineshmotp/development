import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

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
  useLazyChatListQuery,
  useLazyGetUserPropertyQuery,
  usePropertyFavUnfavMutation,
} from '@/redux/login/loginService';
import AllResponses from '@/screens/MyLeads/AllResponses';
import ContactTab from '@/screens/MyLeads/ContactTab';
import FavouriteTab from '@/screens/MyLeads/FavouriteTab';
import ListingResponse from '@/screens/MyLeads/ListingResponse';
import { styles } from '@/screens/MyLeads/styles';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import CustomAlertWrapper from '../CustomAlertWrapper';
import HeaderBar from '../HeaderBar';
import ListEmptyComponent from '../ListEmptyComponent';
import ModalWrapper from '../ModalWrapper';
import TopTab from '../TopTab';
import UserListCard from '../UserListCard';
import ActivePropertyList from './ActivePropertyList';
import InActivePropertyList from './InActivePropertyList';
import { useGetBuilderLeadsQuery } from '@/redux/builder/builderService';

type Props = {
  headerShow?: boolean;
  userId?: string;
};

const CustomRightIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <RNImage source={require('@/assets/images/userProfile/filter.png')} style={styles.imgStyle} />
  </TouchableOpacity>
);

const LeadList: React.FC<Props> = ({ headerShow = true, userId }) => {
  // console.log('firstdb+++++++++', db);
  const userData = useAppSelector(getUserData);
  const navigation = useNavigation();

  const toast = useToast();
  const [getChatList] = useLazyChatListQuery();
  const { data: leadsData } = useGetBuilderLeadsQuery({});


  const [chatList, setChatList] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [day, setDay] = useState(-7);

  const [isActive, setIsActive] = useState('All Responses');

  const handleSelection = day => {
    setDay(day);
    setShowFilters(false);
  };

  useEffect(() => {
    // Accepted and Pending

    // console.log('id=' + userData?._id + '&status=' + isActive);

    getChatList('id=' + userData?._id + '&status=' + isActive).then((resp: any) => {
      if (resp?.data?.status) {
        // console.log(resp?.data?.data, '=-==-   ');
        setChatList(resp?.data?.data);
      } else {
        toast.show(resp?.error?.message || resp?.data?.message || 'Something went wrong', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Error Message',
          },
          duration: 3000,
        });
      }
    });
  }, [isActive]);

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      {userData?.role === 'BUILDER' ? (
        <RNView style={{ marginTop: px(5) }} >
          <RNView style={styles.leadsContainer}>
                <FlatList
                style={{marginHorizontal:px(10)}}
                data={leadsData?.data}
                renderItem={({item})=>{
                  return(

                    <RNView style={[styles.leadsViewStyle,{justifyContent:'space-between'}]}>
                  <RNView>
                  <RNText style={styles.totalLeadsTextStyle}>Total no. of leads </RNText>
                  <RNText style={styles.totalLeadsLabelStyle}>{item?.totalLeads}</RNText>
                  </RNView>
                 <RNView>
                 <RNText style={styles.totalLeadsTextStyle}>Remaining leads </RNText>
                 <RNText style={styles.totalLeadsLabelStyle}>{item?.availableLeads}</RNText>
                 </RNView>
                </RNView>
                

                  )
                }}
                />
                <RNView></RNView>
              </RNView>
        </RNView>
      ) : (
        <RNView style={styles.tabContainer}>
          <RNView style={styles.tabContainerView}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {['All Responses', 'Contacted', 'Favourite', 'Listing Responses'].map((item, ind) => {
                return (
                  <TouchableOpacity
                    key={ind}
                    onPress={() => {
                      setIsActive(item);
                    }}
                    style={[styles.tabView, { borderBottomColor: isActive === item ? ColorTheme.primary : 'white' }]}>
                    <RNText style={styles.tabText}>{item}</RNText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </RNView>
        </RNView>
      )}

      {isActive === 'All Responses' && <AllResponses day={day} />}
      {isActive === 'Contacted' && <ContactTab day={day} />}
      {isActive === 'Favourite' && <FavouriteTab day={day} />}
      {isActive === 'Listing Responses' && <ListingResponse />}
      <ModalWrapper
        header={false}
        modalStyle={styles.filterModal}
        visible={showFilters}
        onClose={() => setShowFilters(!showFilters)}
        modalHeight={200}
        modalWidth={200}>
        <RNView style={styles.ModalView}>
          <TouchableOpacity style={styles.optionView} onPress={() => handleSelection(-1)}>
            <RNText style={styles.optionText}>Yesterday</RNText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionView} onPress={() => handleSelection(-7)}>
            <RNText style={styles.optionText}>Last 7 days</RNText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionView} onPress={() => handleSelection(-30)}>
            <RNText style={styles.optionText}>Last 30 days</RNText>
          </TouchableOpacity>
        </RNView>
      </ModalWrapper>
    </Container>
  );
};
export default LeadList;
