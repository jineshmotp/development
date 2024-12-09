import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import TopTab from '@/components/common/TopTab';
import UserBusinessListCard from '@/components/common/UserBusinessListCard';
import UserListCard from '@/components/common/UserListCard';
import { isArray } from '@/constants/function/isArray';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyChatListQuery } from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';
import { useLazyGetTaggedChatDetailsQuery } from '@/redux/listing/listingService';
import * as qs from 'qs';

const Chat = () => {
  // console.log('firstdb+++++++++', db);
  const userData = useAppSelector(getUserData);
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState('Accepted');
  const toast = useToast();
  const [getChatList] = useLazyChatListQuery();
  const [getTaggedChatList] = useLazyGetTaggedChatDetailsQuery();

  const [chatList, setChatList] = useState([]);

  //  console.log(' user data ---->', userData);

  //   const selectedData = useSelector((state: any) => state?.loginReducer);

  // const chatList = useSelector((state: any) => state?.chatReducer?.chatList);
  // const chatList = [];
  //   const chatListLoading = useSelector((state: any) => state?.chatReducer?.chatListLoading);

  //   useEffect(() => {
  //     const fetchContactList = async () => {
  //       dispatch(chatAction.fetchContactsList(selectedData?.user?.user?._id));
  //     };
  //     fetchContactList();
  //   }, []);

  //   if (chatListLoading) {
  //     return <Loader size={'large'} height={deviceHeight} />;
  //   }
  //   console.log('chatList', chatList);

  // firestore()
  //   .collection('chat_requests')
  //   .get()
  //   .then(querySnapshot => {
  //     // console.log('Total chat req: ', querySnapshot.size);
  //     querySnapshot.forEach(documentSnapshot => {
  //       // console.log('chat req ID: ', documentSnapshot.id, documentSnapshot.data());
  //     });
  //   })
  //   .catch(Err => {
  //     // console.log(Err, ' =- = -   chat req  ');
  //   });

  // firestore()
  //   .collection('messages')
  //   .get()
  //   .then(querySnapshot => {
  //     // console.log('Total messages: ', querySnapshot.size);
  //     querySnapshot.forEach(documentSnapshot => {
  //       // console.log('messages ID: ', documentSnapshot.id, documentSnapshot.data());
  //     });
  //   })
  //   .catch(Err => {
  //     // console.log(Err, ' =- = -   message  ');
  //   });

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('chat_requests')
  //     .doc('1e3CNsoGaxCq3qbaixYQ')
  //     .onSnapshot(documentSnapshot => {
  //       // console.log('Real time chat req data: ', documentSnapshot.data());
  //     });

  //   // Stop listening for updates when no longer required
  //   return () => subscriber();
  // }, ['1e3CNsoGaxCq3qbaixYQ']);

  const getTaggedChatQuery =(id)=>{
    const payload ={
      id:id
    }
    return qs.stringify(payload)
  }

  useEffect(() => {
    // Accepted and Pending

    getTaggedChatList(getTaggedChatQuery(userData?._id)).then(res=>{
      console.log('onHittingTaggedAPI',JSON.stringify(res)); 
    }).catch(err=>{
      console.log('on error ======>>>> ',err);
    })

    console.log('id=' + userData?._id + '&status=' + isActive);

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
      <HeaderBar backPress={() => navigation?.goBack()} label={'My Chats'} />
      {/* CUSTOM TOP TAB COMPONENT */}
      {userData?.role === 'BUILDER' ? (
        <></>
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
      {userData?.role === 'BUILDER' ? (
        <RNView style={{ marginTop: px(10) }}>
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
              {Array.isArray(chatList) && chatList.filter(item => item.isAccepted === true).length > 0 ? (
                chatList
                  .filter(item => item.isAccepted === true && item.connectedUsers !== null)
                  .map((item, i) => {
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
        </RNView>
      ) : isActive === 'Accepted' ? (
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
            {Array.isArray(chatList) && chatList.filter(item => item.isAccepted === true).length > 0 ? (
              chatList
                .filter(item => item.isAccepted === true && item.connectedUsers !== null)
                .map((item, i) => {
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

export default Chat;
