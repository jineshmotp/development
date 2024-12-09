import React from 'react';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type CheckBoxProps = {
  checked?: boolean;
  setChecked?: any;
  label?: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
};
function TitledCheckBox({ checked, setChecked, label, labelStyle, onPress }: CheckBoxProps) {
  return (
    <TouchableOpacity
      style={styles.appContainer}
      onPress={() => {
        setChecked(!checked);
      }}>
      <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={14} color="white" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default TitledCheckBox;
