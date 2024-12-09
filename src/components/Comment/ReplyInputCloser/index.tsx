import React from 'react';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  setIsReply?: (val) => void;
  name?: string;
};
const ReplyInputCloser: React.FC<Props> = ({ setIsReply, name }) => {
  return (
    <RNView style={styles.bottomreplyinput}>
      <RNText style={styles.commentText}>{`Reply Comment to ${name}`}</RNText>
      <RNText style={styles.closeBtn} onPress={() => setIsReply(false)}>
        X
      </RNText>
    </RNView>
  );
};

export default ReplyInputCloser;
