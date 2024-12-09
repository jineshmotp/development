import React from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { RNText } from '@/custom/RNText';

type Props = {
  username?: string;
  onPress?: () => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const DefaultProfile: React.FC<Props> = ({ username, onPress, viewStyle, textStyle }) => {
  return (
    <TouchableOpacity style={viewStyle} onPress={onPress}>
      <RNText style={textStyle}>{(username || 'A')?.slice(0, 1).toLocaleUpperCase()}</RNText>
    </TouchableOpacity>
  );
};

export default DefaultProfile;
