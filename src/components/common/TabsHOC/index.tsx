import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import MyCheckbox from '../MyCheckbox';
import { styles } from './styles';

type Props = {
  setCheck?: () => void;
  label?: string;
  check?: boolean;
  isButton?: boolean;
  onPress?: () => void;
};
const TabsHOC: React.FC<Props> = ({ setCheck, check, label, isButton, onPress }) => {
  return (
    <RNView>
      <TouchableOpacity onPress={onPress} style={styles.tabs}>
        <RNView style={styles.main}>
          <MyCheckbox checked={check} borderRadius={5} />
          <RNText style={styles.textStyle}>{label}</RNText>
        </RNView>
      </TouchableOpacity>
    </RNView>
  );
};

export default TabsHOC;
