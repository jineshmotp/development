import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SectionHoc from '@/components/common/SectionHoc';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type CheckBoxProps = {
  checked?: boolean;
  setChecked?: any;
  label?: string;
};
function TitledCheckBox({ checked, setChecked, label }: CheckBoxProps) {
  return (
    <RNView style={styles.container}>
      <SectionHoc title="" mandatory={false}>
        <TouchableOpacity
          style={styles.appContainer}
          onPress={() => {
            setChecked(!checked);
          }}>
          <RNView style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
            {checked && <Ionicons name="checkmark" size={14} color="white" />}
          </RNView>
          <RNText style={styles.labelStyle}>{label}</RNText>
        </TouchableOpacity>
      </SectionHoc>
    </RNView>
  );
}

export default memo(TitledCheckBox);
