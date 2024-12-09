import React, { useState } from 'react';
import 'react-native';
import { TouchableOpacity } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazyUpdateNotificationQuery } from '@/redux/Notification/notificationService';

import { styles } from './styles';

type Props = {
  item?: any;
  onPress?: () => void;
};

const NotificationUnreadElement: React.FC<Props> = ({ item, onPress }) => {
  // console.log('item++++++++', item);
  const [read, setRead] = useState(item?.read || false);
  const [updateNotification] = useLazyUpdateNotificationQuery();

  const handleReadUnread = () => {
    onPress();
    if (!read) {
      updateNotification(item?._id).then(res => {
        setRead(true);
        // console.log('resposl', res);
      });
    }
  };

  const eventWiseNotification = (eventName: string) => {
    switch (eventName) {
      case 'postLiked':
        return (
          <TouchableOpacity onPress={handleReadUnread}>
            <RNView style={read ? styles.topView : styles.topViewUnread}>
              <RNText style={styles.messageText}>{item?.notification[0]?.message}</RNText>
              {!read && (
                <RNView style={styles.dotView}>
                  <RNView style={styles.dot}></RNView>
                </RNView>
              )}
            </RNView>
          </TouchableOpacity>
        );
      case 'acceptRequest':
        return (
          <TouchableOpacity onPress={handleReadUnread}>
            <RNView style={read ? styles.topView : styles.topViewUnread}>
              <RNText style={styles.messageText}>{item?.notification[0]}</RNText>
              {!read && (
                <RNView style={styles.dotView}>
                  <RNView style={styles.dot}></RNView>
                </RNView>
              )}
            </RNView>
          </TouchableOpacity>
        );
    }
  };

  return eventWiseNotification(item?.event);
};

export default NotificationUnreadElement;
