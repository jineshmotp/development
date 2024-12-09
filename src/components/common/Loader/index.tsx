import React, { memo } from 'react';
import { ViewStyle } from 'react-native';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import { style } from './styles';

type Props = {
  size?: ActivityIndicatorProps['size'];
  color?: ActivityIndicatorProps['color'];
  width?: number;
  height?: number;
  viewStyle?: ViewStyle;
};
const Loader: React.FC<Props> = ({
  size,
  color = ColorTheme.primary,
  width = deviceWidth,
  height = deviceHeight,
  viewStyle,
}) => {
  return (
    <RNView style={[style.container, { width, height }, viewStyle]}>
      <ActivityIndicator size={size} color={color} />
    </RNView>
  );
};

export default memo(Loader);
