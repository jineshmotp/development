import { ColorTheme, FONT, SIZES } from '@/theme';
import React, { memo, ReactElement } from 'react';
import { Platform, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';


type Props = {
  item?: any;
  onPress?: () => void;
  width?: number;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  textStyle?: TextStyle;
  selected?: boolean;
};

const FilterValues: React.FC<Props> = ({
  item,
  onPress,
  style,
  containerStyle,
  rightIcon,
  textStyle,
  selected,
  leftIcon,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: item?.active || selected ? ColorTheme.primary : 'white',
        },
        style,
      ]}>
      {leftIcon}
      <Text
        style={[
          {
            color: item?.active || selected ? 'black' : 'gray',
            fontSize: SIZES.small14,
            fontFamily: FONT.PoppinsMedium,
          },
          textStyle,
        ]}>
        {item?.label}
      </Text>
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 3,
    shadowColor: 'gray',
    // padding: 10,

    elevation: 5, // Android only (elevation creates shadow)
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
  },
});
export default memo(FilterValues);
