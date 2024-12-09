import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type CheckBoxProps = {
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
  labelStyle?: any;
  onPress?: () => void;
  isCheckBox?: any;
};
function CheckBox({ checked, label, labelStyle, onPress, isCheckBox }: CheckBoxProps) {
  const borderRadiusValue = isCheckBox ? 3 : 100;

  return (
    <TouchableOpacity style={styles.appContainer} onPress={onPress}>
      <RNView style={[styles.checkboxBase, { borderRadius: borderRadiusValue }, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={14} color="white" />}
      </RNView>
      <RNText style={labelStyle}>{label}</RNText>
    </TouchableOpacity>
  );
}

export default memo(CheckBox);
