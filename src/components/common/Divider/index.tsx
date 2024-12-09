import React, { memo } from 'react';
import { Dimensions, View, ViewStyle } from 'react-native';

import { deviceWidth } from '@/utils';

type Props = {
  dividerWidth?: number;
  dividerHeight?: number;
  style?: ViewStyle | any;
  alignSelf?: string;
  borderColor?: string;
};
const Divider: React.FC<Props> = ({ dividerWidth, dividerHeight, alignSelf, style, borderColor }) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: dividerHeight || 1,
          width: dividerWidth || deviceWidth / 1.09,
          alignSelf: alignSelf,
          borderColor: borderColor,
        },
        style,
      ]}></View>
  );
};

export default memo(Divider);
