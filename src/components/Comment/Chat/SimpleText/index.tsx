import React from 'react';
import { Clipboard } from 'react-native';

import moment from 'moment';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  item?: { message?: string; email: string; iam: string };
  chatDate?: any;
};

const SimpleText: React.FC<Props> = ({ item, chatDate }) => {
  return (
    <RNView style={[styles.topContainer, { alignSelf: item.email === item?.iam ? 'flex-end' : 'flex-start' }]}>
      <RNView style={styles.msgView}>
        <RNText onLongPress={() => Clipboard.setString(item?.message)} style={styles.msgText}>
          {item?.message}
        </RNText>
      </RNView>
      <RNView style={[styles.dateView, { alignSelf: item?.email === item?.iam ? 'flex-end' : 'flex-end' }]}>
        <RNText style={styles.dateText}>{moment(chatDate).format('hh:mm A')}</RNText>
      </RNView>
    </RNView>
  );
};

export default SimpleText;
