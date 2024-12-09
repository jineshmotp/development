import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import ChatItems from '@/components/Comment/Chat/ChatItems';
import DefaultProfile from '@/components/common/DefaultProfile';
import Loader from '@/components/common/Loader';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';
import { px } from '@/utils';

import { styles } from './styles';

const ChatBox = () => {
  const navigation = useNavigation();
  const [pageNumber, setPageNumber] = useState(0);
  const route = useRoute<RouteProp<RootStackParamList, 'CHATBOX'>>();
  const scrollViewRef = useRef(null);
  const [ScrollUp, setScrollUp] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messageArray, setMessageArray] = useState([]);
  const userData = route?.params?.item;
  const CHAT_ID = route?.params?.item?.chatId;
  const iam = route?.params?.iam;

  const source = route?.params?.businessProfile;

  // console.log(' details--- ', route?.params);
  // console.log(' businessid --->', route?.params);

  const setChatLimit: number = 100;

  const scrollToUp = ScrollUp => {
    if (ScrollUp) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
        setScrollUp(false);
      }
    } else {
      if (scrollViewRef.current) {
        scrollViewRef?.current?.scrollToOffset({ offset: 0, animated: true });
        setScrollUp(true);
      }
    }
  };

  const sendChat = () => {
    const data = {
      timestamp: new Date(),
      message: userInput,
      email: iam,
    };

    // console.log(' chat data ---->', data);

    // setChatLoading(true);
    firestore()
      .collection('chats')
      .doc(CHAT_ID)
      .collection('messages')
      .add(data)
      .then(res => {
        console.log('firestore chat');
        // if (scrollViewRef.current) {
        //   scrollViewRef.current.scrollToEnd({ animated: true });
        //   setScrollUp(false);
        //   // setChatLoading(false);
        // }
        scrollToUp(true);
      });

    setUserInput('');
  };

  const setLimit = pageNumber * setChatLimit + setChatLimit;
  const refreshData = () => {
    // console.log('pageNum', pageNumber);
    return firestore()
      .collection('chats')
      .doc(CHAT_ID)
      .collection('messages')
      .orderBy('timestamp')
      .limitToLast(setLimit)
      .onSnapshot(querySnapshot => {
        // console.log('querySnapshot+++++', querySnapshot);
        const chatsArr = [];
        querySnapshot.forEach(doc => {
          // console.log('ndsjgh', doc);
          const id = doc.id;
          const data = doc.data();
          // Add docId and chat datadata to chats array
          chatsArr.push({ id, ...data });
        });
        // console.log('chatsArr', chatsArr);
        const mgsArr = chatsArr?.map(item => ({
          message: item?.message,
          id: item?.chatId,
          photoURL: '',
          time: item?.timestamp,
          email: item?.email,
        }));
        const id = setTimeout(() => {
          setMessageArray(mgsArr);
          clearTimeout(id);
        }, 200);

        // if (setLimit <= mgsArr?.length) setLoadMore(true);
        // else setLoadMore(false);
        // setPageNumber(pageNumber + 1);
      });
  };

  useLayoutEffect(() => {
    const unsubscribe = refreshData();

    return () => {
      unsubscribe();
    };
  }, [route]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  useEffect(() => {
    setChatLoading(true);
    refreshData();
    const tm = setTimeout(() => {
      setScrollUp(false);
      clearTimeout(tm);
      setChatLoading(false);
    }, 2000);
  }, [pageNumber]);

  // console.log('memmmem', messageArray);

  let msgDay = 0;
  const currentTime = moment(); // Current time

  const stopRepeatDate = item => {
    const providedTime = item?.time?.seconds && moment.unix(item?.time?.seconds);
    const days = currentTime.diff(providedTime, 'days');
    if (days === msgDay) {
      return false;
    } else {
      msgDay = days;
      return true;
    }
  };

  // const loadNextPage = () => {
  //   // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);

  //   if (messageArray.length) {
  //     refreshData(pageNumber);
  //   }
  // };

  // if (chatLoading) {
  //   return <Loader size={'large'} />;
  // }

  return (
    <Container backgroundColor="white" hasHeader={true} isTab={false}>
      <RNView>
        <RNView style={styles.topView}>
          <RNView style={styles.topContainer}>
            {source === true ? (
              <>
                <RNView style={styles.headerView}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>

                  {route?.params?.item?.businessId ? (
                    userData?.connectedUsers?.profile_pic ? (
                      <RNImage source={{ uri: userData?.connectedUsers?.profile_pic }} style={styles.imgStyle} />
                    ) : (
                      <DefaultProfile
                        username={userData?.connectedUsers?.fname}
                        textStyle={styles.defaultText}
                        viewStyle={styles.defaultprofile}
                      />
                    )
                  ) : userData?.connectedUsers?.profile_pic ? (
                    <RNImage
                      source={{
                        uri: userData?.connectedUsers?.profile_pic
                          ? userData?.connectedUsers?.profile_pic
                          : 'https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
                      }}
                      style={styles.imgStyle}
                    />
                  ) : (
                    <DefaultProfile
                      username={userData?.connectedUsers?.fname}
                      textStyle={styles.defaultText}
                      viewStyle={styles.defaultprofile}
                    />
                  )}
                </RNView>
                <RNView>
                  <RNText style={styles.usernameStyle}>
                    {userData?.connectedUsers?.fname} {userData?.connectedUsers?.lname}
                  </RNText>
                </RNView>
              </>
            ) : (
              <>
                <RNView style={styles.headerView}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>

                  {route?.params?.item?.businessId !== null ? (
                    userData?.connectedUsers?.profile_pic ? (
                      <RNImage
                        source={{
                          uri: userData?.connectedUsers?.profile_pic,
                        }}
                        style={styles.imgStyle}
                      />
                    ) : (
                      <DefaultProfile
                        username={userData?.connectedUsers?.business_name}
                        textStyle={styles.defaultText}
                        viewStyle={styles.defaultprofile}
                      />
                    )
                  ) : userData?.connectedUsers?.profile_pic ? (
                    <RNImage
                      source={{
                        uri: userData?.connectedUsers?.profile_pic
                          ? userData?.connectedUsers?.profile_pic
                          : 'https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
                      }}
                      style={styles.imgStyle}
                    />
                  ) : (
                    <DefaultProfile
                      username={userData?.connectedUsers?.fname}
                      textStyle={styles.defaultText}
                      viewStyle={styles.defaultprofile}
                    />
                  )}
                </RNView>
                <RNView>
                  <RNText style={styles.usernameStyle}>
                    {route?.params?.item?.businessId !== null
                      ? userData?.connectedUsers?.business_name
                      : `${userData?.connectedUsers?.fname} ${userData?.connectedUsers?.lname}`}
                  </RNText>
                </RNView>
              </>
            )}

            <RNView></RNView>
          </RNView>
        </RNView>
      </RNView>

      <KeyboardAvoidingView
        style={{ flex: 1, paddingBottom: px(10) }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        {chatLoading ? (
          <RNView style={styles.loadMoreView}>
            <Loader size={'large'} />
          </RNView>
        ) : (
          <RNView style={styles.scrolltoTopView}>
            <TouchableOpacity style={styles.scrollUp} onPress={() => scrollToUp(ScrollUp)}>
              {ScrollUp ? (
                <Entypo name={'chevron-down'} size={px(30)} color="black" />
              ) : (
                <Entypo name={'chevron-up'} size={px(30)} color="black" />
              )}
            </TouchableOpacity>
          </RNView>
        )}
        <FlatList
          style={{ marginBottom: px(5) }}
          ref={scrollViewRef}
          data={messageArray}
          extraData={messageArray}
          inverted={false}
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }}
          renderItem={({ item, index }) => {
            return (
              <ChatItems
                key={item?.time?.seconds.toString()}
                item={{ ...item, iam: route?.params?.iam }}
                show={stopRepeatDate(item)}
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <RNView>
                {setLimit <= messageArray?.length ? (
                  <TouchableOpacity style={styles.LoadingView} onPress={() => setPageNumber(prev => prev + 1)}>
                    <RNView style={styles.footerView}>
                      <RNText style={styles.footerText}>Load More</RNText>
                    </RNView>
                  </TouchableOpacity>
                ) : (
                  <RNView></RNView>
                )}
              </RNView>
            );
          }}
        />

        <RNView style={[Platform.OS === 'android' ? styles.inputView : { ...styles.inputView, marginBottom: px(20) }]}>
          {/* <TouchableOpacity style={styles.iconStyle}>
            <Entypo name="attachment" size={20} color="black" />
          </TouchableOpacity> */}
          <TextInput
            style={styles.inputStyle}
            value={userInput}
            onChangeText={e => {
              setUserInput(e);
            }}
            placeholder="Enter message..."
          />
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={sendChat}>
            <Ionicons name="send" size={24} color="blue" />
          </TouchableOpacity>
        </RNView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ChatBox;
