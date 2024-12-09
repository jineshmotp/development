import React, { memo } from 'react';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';

type CheckBoxProps = {
  checked?: boolean;
  setChecked?: () => void;
  borderRadius?: number;
};
function MyCheckbox({ checked, setChecked, borderRadius = 100 }: CheckBoxProps) {
  return (
    <Pressable
      style={[styles.checkboxBase, { borderRadius: borderRadius }, checked && styles.checkboxChecked]}
      //   onPress={() => setChecked()}
    >
      {checked && <Ionicons name="checkmark" size={14} color="white" />}
    </Pressable>
  );
}

export default memo(MyCheckbox);
