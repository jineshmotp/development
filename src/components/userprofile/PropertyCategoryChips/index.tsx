import React, { memo, ReactElement } from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';

import { styles } from './styles';

type Props = {
  item?: any;
  onPress?: () => void;
  width?: number;
  style?: ViewStyle | [ViewStyle];
  containerStyle?: ViewStyle;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  textStyle?: TextStyle;
  selected?: boolean;
};

const PropertyCategoryChips: React.FC<Props> = ({
  item,
  onPress,
  style,
  containerStyle,
  rightIcon,
  textStyle,
  selected,
  leftIcon,
}) => {
  // console.log("PropertyCategoryChips=================", item);
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <RNView
        style={[
          styles.container,
          {
            backgroundColor: item?.active || selected ? ColorTheme.primary : 'white',
          },
          style,
        ]}>
        {leftIcon}
        <RNText
          style={[
            {
              color: item?.active || selected ? 'black' : 'gray',
              fontSize: SIZES.medium,
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

export default memo(PropertyCategoryChips);
