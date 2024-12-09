import React, { memo, ReactElement } from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

type Props = {
  item?: {
    active?: Boolean;
    label?: String;
  };
  onPress?: () => void;
  disabled?: Boolean;
  mandatory?: Boolean;
  errortext?: String;
  style?: ViewStyle;
};

const PropertyCategoryChipsWithIcon: React.FC<Props> = ({ item, onPress, disabled, mandatory, errortext, style }) => {
  return (
    <RNView>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View
          style={[
            style,
            styles.containerTouchable,
            {
              backgroundColor: item?.active
                ? ColorTheme.primary
                : disabled
                  ? ColorTheme.nearLukGray6
                  : ColorTheme.white,
            },
          ]}>
          <Text
            style={{
              color: item?.active ? ColorTheme.black : ColorTheme.gray,
            }}>
            {mandatory && ( // Display * in red if mandatory
              <Text
                style={{
                  color: errortext ? ColorTheme.red : ColorTheme.black,
                }}>
                *
              </Text>
            )}{' '}
            {item?.label}
          </Text>
          <AntDesign name="down" size={15} color="black" />
        </View>
      </TouchableOpacity>
    </RNView>
  );
};

export default memo(PropertyCategoryChipsWithIcon);
