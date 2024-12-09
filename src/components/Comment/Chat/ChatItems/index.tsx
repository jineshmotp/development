import React, { memo } from 'react';
import { Clipboard } from 'react-native';

import moment from 'moment';

import { isValidURL } from '@/constants/function/property.helperFunctions';
// import { isValidURL } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import LinkPreviewComp from '../LinkPreviewComp';
import SimpleText from '../SimpleText';
// import SimpleText from '../SimpleText';
import { styles } from './styles';

type Props = {
  item?: any;
  show?: boolean;
};
const ChatItems: React.FC<Props> = ({ item, show }) => {
  const ts = item?.time;
  const milliseconds = ts?.seconds * 1000 + ts?.nanoseconds / 1000000;
  const chatDate = new Date(milliseconds);
  const currentTime = moment(); // Current time
  const providedTime = item?.time?.seconds && moment.unix(item?.time?.seconds);
  const days = currentTime.diff(providedTime, 'days');

  return (
    <RNView style={styles.topView}>
      {show && (
        <RNText style={styles.dateStyle}>
          {' '}
          {days > 1 && providedTime.format('DD-MM-YYYY')}
          {days === 1 && 'Yesterday'}
          {days === 0 && 'Today'}
        </RNText>
      )}
      {isValidURL(item?.message) ? (
        <LinkPreviewComp chatDate={chatDate} item={item} />
      ) : (
        <SimpleText chatDate={chatDate} item={item} />
      )}
    </RNView>
  );
};

export default memo(ChatItems);
