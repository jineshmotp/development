import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

type PropertyRadioProps = {
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
};
function PropertyRadio({ checked, setChecked, label, labelStyle, onPress }: PropertyRadioProps) {
  return (
    <TouchableOpacity
      style={styles.appContainer}
      onPress={() => {
        setChecked(!checked);
      }}>
      <View style={styles.checkboxBaseOuter}>
        <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>{checked}</View>
      </View>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

export default PropertyRadio;
