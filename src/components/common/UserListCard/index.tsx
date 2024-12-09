import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import { chatTimeCalculation, chatTimefromTimestamp } from '@/constants/function/chat.function';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useAcceptChatReqMutation, useRejectChatReqMutation } from '@/redux/login/loginService';

import DefaultProfile from '../DefaultProfile';
// import { chatAction } from '../redux/action';
import { styles } from './styles';

type Props = {
  onPress?: () => void;
  item?: any;
  activeChat?: boolean;
};

const UserListCard: React.FC<Props> = ({ onPress, item, activeChat }) => {
  // console.log('chatitem --', item);
  const toast = useToast();
  const userData = useAppSelector(getUserData);
  const sender = item?.sender;
  const reciever = item?.receiver;
  const iam = userData?._id;
  // console.log('--------> Pending chats', item);
  const chatWith = iam !== sender?._id ? sender : reciever;
  const [triggerAcceptReq] = useAcceptChatReqMutation();
  const [triggerRejectReq] = useRejectChatReqMutation();
  const [hide, setHide] = useState(false);

  const [msgLast, setMesgLast] = useState();
  const [timeLast, setTimeLast] = useState();

  const acceptChatReq = () => {
    triggerAcceptReq({
      sender: sender,
      receiver: reciever,
      propertyId: item?.propertyId,
    }).then((resp: any) => {
      // console.log('abhayagyaay+++++', resp);
      if (resp?.data?.status) {
        setHide(true);
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
  };

  const rejectChatReq = () => {
    triggerRejectReq({
      sender: sender,
      receiver: reciever,
      propertyId: item?.propertyId,
    }).then((resp: any) => {
      if (resp?.data?.status) {
        setHide(true);
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
  };

  const refreshData = () => {
    return firestore()
      .collection('chats')
      .doc(item?.chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot(querySnapshot => {
        let latestMessage = null;

        querySnapshot.forEach(doc => {
          const data = doc.data();

          latestMessage = {
            message: data?.message,
            time: data,
          };
        });

        if (latestMessage) {
          setMesgLast(latestMessage.message);
          setTimeLast(chatTimeCalculation(latestMessage.time));
          // console.log(' message time -->', latestMessage.time);
        } else {
          console.log('No messages found');
        }
      });
  };

  useLayoutEffect(() => {
    const unsubscribe = refreshData();

    return () => {
      unsubscribe();
    };
  }, [item]);

  return hide ? (
    <RNView></RNView>
  ) : (
    <TouchableOpacity onPress={activeChat ? onPress : () => {}} style={styles.topView}>
      <RNView style={styles.topContainer}>
        <RNView>
          {item?.connectedUsers?.profile_pic ? (
            <RNImage
              source={{
                uri: item?.connectedUsers?.profile_pic,
              }}
              style={styles.imgStyle}
            />
          ) : (
            <DefaultProfile
              textStyle={styles.defaultText}
              viewStyle={styles.defaultprofile}
              username={item?.connectedUsers?.fname}
            />
          )}
        </RNView>
        <RNView style={styles.leftSide}>
          <RNText style={styles.userName}>{item?.connectedUsers?.fname + ' ' + item?.connectedUsers?.lname}</RNText>
          {item?.isAccepted === false && (
            <RNText style={styles.msgText} numberOfLines={1}>
              {item?.updatedAt ? chatTimefromTimestamp(item?.updatedAt) : chatTimefromTimestamp(item?.createdAt)}
            </RNText>
          )}

          <RNText style={styles.msgText} numberOfLines={1}>
            {msgLast}
          </RNText>
        </RNView>
        {activeChat ? (
          <RNView style={styles.dateView}>
            <RNText style={styles.dateText}>{timeLast ? timeLast : chatTimefromTimestamp(item?.createdAt)}</RNText>
            {/* <RNView style={styles.pendingCount}>
              <RNText style={styles.countText}>2</RNText>
            </RNView> */}
          </RNView>
        ) : item?.isAccepted === false && item?.sender?._id !== iam ? (
          <RNView style={styles.btnView}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={rejectChatReq}>
              <AntDesign name="closecircle" size={30} color="#EA4040" />
            </TouchableOpacity>
            <TouchableOpacity onPress={acceptChatReq}>
              <MaterialIcons name="check-circle" size={35} color="#81D01C" />
            </TouchableOpacity>
          </RNView>
        ) : (
          <RNView style={styles.btnView}>
            <TouchableOpacity>
              <AntDesign name="closecircle" size={30} color="#EA4040" />
            </TouchableOpacity>
          </RNView>
        )}
      </RNView>
    </TouchableOpacity>
  );
};

export default UserListCard;
