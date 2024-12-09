import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  onPressLeft?: () => void;
  onPressRight?: () => void;
  leftTabText?: string;
  rightTabText?: string;
  leftTabStyle?: ViewStyle;
  rightTabStyle?: ViewStyle;
};
const TopTab: React.FC<Props> = ({
  onPressLeft,
  onPressRight,
  leftTabStyle,
  rightTabStyle,
  leftTabText,
  rightTabText,
}) => {
  return (
    <RNView style={styles.topTabContainer}>
      <RNView style={styles.topTabView}>
        <TouchableOpacity onPress={onPressLeft} style={[styles.topTab, leftTabStyle]}>
          <RNText style={styles.topTabText}>{leftTabText}</RNText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressRight} style={[styles.topTab, rightTabStyle]}>
          <RNText style={styles.topTabText}>{rightTabText}</RNText>
        </TouchableOpacity>
      </RNView>
    </RNView>
  );
};

export default TopTab;
