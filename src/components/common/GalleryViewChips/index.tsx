import React, { memo, ReactElement } from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  item?: {
    active: boolean;
    label: string;
  };
  onPress?: () => void;
  width?: number;
  style?: ViewStyle | [ViewStyle];
  containerStyle?: ViewStyle | [ViewStyle];
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  textStyle?: TextStyle | [TextStyle];
};

const GalleryViewChips: React.FC<Props> = ({
  item,
  onPress,
  width,
  style,
  containerStyle,
  rightIcon,
  textStyle,
  leftIcon,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <RNView style={[styles.container, style]}>
        {leftIcon}
        <RNText
          style={[
            {
              color: item?.active ? 'black' : 'white',
            },
            textStyle,
          ]}>
          {item?.label}
        </RNText>
        {rightIcon}
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(GalleryViewChips);
