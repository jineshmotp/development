import React, { memo, useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  data?: { label: string; value: string }[];
  disabled?: boolean;
  placeholderName?: string;
  value?: string;
  onSelectChange?: (item) => void;
  placeholderStyle?: TextStyle;
  itemTextStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  dropDownStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  maxHeight?: number;
  minHeight?: number;
  activeColor?: string;
  backgroundColor?: string;
};
const DropDownComponent: React.FC<Props> = ({
  data,
  disabled,
  value,
  placeholderName,
  onSelectChange,
  placeholderStyle,
  selectedTextStyle,
  dropDownStyle,
  dropdownPosition,
  itemTextStyle,
  containerStyle,
  maxHeight,
  minHeight,
  itemContainerStyle,
  activeColor,
  backgroundColor,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <RNView>
      <Dropdown
        style={[dropDownStyle, isFocus && { borderColor: ColorTheme.primaryColor }]}
        selectedTextStyle={[selectedTextStyle]}
        iconStyle={styles.iconStyle}
        data={data}
        disable={disabled}
        maxHeight={maxHeight || 300}
        minHeight={minHeight}
        labelField="label"
        valueField="value"
        placeholderStyle={placeholderStyle}
        itemTextStyle={itemTextStyle}
        containerStyle={containerStyle}
        itemContainerStyle={itemContainerStyle}
        placeholder={!isFocus ? placeholderName : 'Select'}
        searchPlaceholder="Search..."
        value={value}
        activeColor={activeColor}
        backgroundColor={backgroundColor}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onSelectChange(item);
          setIsFocus(false);
        }}
        dropdownPosition={dropdownPosition}
      />
    </RNView>
  );
};

export default memo(DropDownComponent);
