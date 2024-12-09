import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';

import PropertyActionActiveModel from '@/components/property/PropertyActionActiveModel';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import { isArray } from '@/constants/function/isArray';
import { property_active_list } from '@/constants/function/property.helper';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useDeletPropertyMutation,
  useLazyChatListQuery,
  useLazyGetUserPropertyQuery,
  usePropertyFavUnfavMutation,
} from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import CustomAlertWrapper from '../CustomAlertWrapper';
import HeaderBar from '../HeaderBar';
import ListEmptyComponent from '../ListEmptyComponent';
import TopTab from '../TopTab';
import UserBusinessListCard from '../UserBusinessListCard';
import UserListCard from '../UserListCard';
import ActivePropertyList from './ActivePropertyList';
import InActivePropertyList from './InActivePropertyList';
import { styles } from './styles';

type Props = {
  headerShow?: boolean;
  userId?: string;
};
const ChatList: React.FC<Props> = ({ headerShow = true, userId }) => {
  // console.log('firstdb+++++++++', db);
  const userData = useAppSelector(getUserData);
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState('Accepted');
  const toast = useToast();
  const [getChatList] = useLazyChatListQuery();

  const [chatList, setChatList] = useState([]);

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
      {/* CUSTOM TOP TAB COMPONENT */}
      {userData?.role === 'BUILDER' ? (
        <RNView style={{ marginTop: px(5) }} />
      ) : (
        <TopTab
          onPressLeft={() => setIsActive('Accepted')}
          onPressRight={() => setIsActive('Pending')}
          leftTabStyle={{ borderBottomColor: isActive === 'Accepted' ? ColorTheme.primary : 'white' }}
          rightTabStyle={{ borderBottomColor: isActive === 'Pending' ? ColorTheme.primary : 'white' }}
          leftTabText={'Active Chats'}
          rightTabText={'Pending Chats'}
        />
      )}

      {isActive === 'Accepted' ? (
        <ScrollView
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={chatListLoading}
        //       onRefresh={() => {
        //         dispatch(chatAction.fetchContactsList(selectedData?.user?.user?._id));
        //       }}
        //     />
        //   }
        >
          <RNView style={styles.topView}>
            {isArray(chatList) && chatList?.filter(item => item?.isAccepted === true)?.length > 0 ? (
              chatList
                ?.filter(item => item?.isAccepted === true)
                ?.map((item, i) => {
                  // console.log('item+++++++++', item);
                  return item.businessId !== null ? (
                    <UserBusinessListCard
                      activeChat={true}
                      item={item}
                      key={i}
                      onPress={() => {
                        navigation.navigate('CHATBOX', {
                          item: item,
                          iam: userData?._id,
                          businessProfile: false,
                        });
                      }}
                    />
                  ) : (
                    <UserListCard
                      activeChat={true}
                      item={item}
                      key={i}
                      onPress={() => {
                        navigation.navigate('CHATBOX', {
                          item: item,
                          iam: userData?._id,
                          businessProfile: false,
                        });
                      }}
                    />
                  );
                })
            ) : (
              <ListEmptyComponent text={'No Active Chats Available'} type="default" />
            )}
          </RNView>
        </ScrollView>
      ) : (
        <RNView style={styles.topView}>
          {isArray(chatList) && chatList?.filter(item => item?.isAccepted !== true).length > 0 ? (
            chatList
              ?.filter(item => item?.isAccepted !== true)
              ?.map((item, i) => {
                return (
                  <UserListCard
                    activeChat={false}
                    item={item}
                    key={i}
                    onPress={() => {
                      navigation.navigate('ChatBox', {
                        item: item,
                        iam: userData?._id,
                      });
                    }}
                  />
                );
              })
          ) : (
            <ListEmptyComponent text={'No Pending Chats Available'} type="default" />
          )}
        </RNView>
      )}
    </Container>
  );
};
export default ChatList;
