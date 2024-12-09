import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

type Props = {
  item?: { _id: string; label: string; value: string; isActive: boolean };
  onPress?: (itm) => void;
  style?: ViewStyle;
};
const InputChips: React.FC<Props> = ({ onPress, item, style }) => {
  return (
    <RNView style={style}>
      <RNText style={{ fontSize: SIZES.small14, lineHeight: px(24), color: ColorTheme.white }}>{item?.label}</RNText>
      <TouchableOpacity onPress={() => onPress(item)}>
        <RNText style={{ fontSize: SIZES.small14, lineHeight: px(24), color: ColorTheme.white, padding: px(5) }}>
          X
        </RNText>
      </TouchableOpacity>
    </RNView>
  );
};

export default InputChips;
