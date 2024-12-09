import React from 'react';
import { Text, View } from 'react-native';

import { LinkPreview } from '@flyerhq/react-native-link-preview';
import moment from 'moment';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  item?: { message?: string; email: string; iam: string };
  chatDate?: any;
};
const LinkPreviewComp: React.FC<Props> = ({ item, chatDate }) => {
  return (
    <RNView style={[styles.topContainer, { alignSelf: item.email === item?.iam ? 'flex-end' : 'flex-start' }]}>
      <LinkPreview text={item?.message} containerStyle={styles.topContainerPreview} />
      <RNView style={[styles.dateView, { alignSelf: item?.email === item?.iam ? 'flex-end' : 'flex-end' }]}>
        <RNText style={styles.dateText}>{moment(chatDate).format('hh:mm A')}</RNText>
      </RNView>
    </RNView>
  );
};

export default LinkPreviewComp;
