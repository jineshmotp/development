import React, { memo, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  data?: any;
  styledata?: any;
  disabled?: boolean;
  sectioname?: any;
  value?: any;
  errors?: any;
  activefunction?: any;
};
const DropDownComponent: React.FC<Props> = ({
  data,
  disabled,
  value,
  sectioname,
  errors,
  activefunction,
  styledata,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <RNView>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: ColorTheme.primaryColor }, styledata]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        disable={disabled}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? sectioname : '...'}
        placeholderStyle={{ color: ColorTheme.black }}
        itemTextStyle={{ color: ColorTheme.black }}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          activefunction(item);
          setIsFocus(false);
        }}
      />
    </RNView>
  );
};

export default memo(DropDownComponent);
