import React, { useState } from 'react';
import 'react-native';
import { TouchableOpacity } from 'react-native';



import moment from 'moment';



import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazyUpdateNotificationQuery } from '@/redux/Notification/notificationService';



import { styles } from './styles';


type Props = {
  item?: any;
};

const NotificationElement: React.FC<Props> = ({ item }) => {
  //   console.log('item++++++++', item);
  const [read, setRead] = useState(item?.read || false);
  const [updateNotification] = useLazyUpdateNotificationQuery();
  const handleReadUnread = () => {
    if (!read) {
      updateNotification(item?._id).then(res => {
        setRead(true);
        // console.log('resposl', res);
      });
    }
  };

  const renderTimeAgo = () => {
    const createdAt = moment(item?.updatedAt); // Parse createdAt timestamp using moment
    const now = moment(); // Current time

    const diffHours = now.diff(createdAt, 'hours');
    if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const diffDays = now.diff(createdAt, 'days');
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  const eventWiseNotification = (eventName: string) => {
    switch (eventName) {
      case 'postLiked':
        return (
          <TouchableOpacity onPress={handleReadUnread}>
            <RNView style={read ? styles.topView : styles.topViewUnread}>
              <RNText style={styles.messageText}>{item?.notification[0]?.message}</RNText>
              <RNText>{renderTimeAgo()}</RNText>
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
              <RNText>{renderTimeAgo()}</RNText>
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

export default NotificationElement;