import React, { memo } from 'react';
import { Pressable, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type CheckBoxProps = {
  checked?: boolean;
  borderRadius?: number;
  onPress?: () => void;
};

type Props = {
  item?: {
    active?: boolean;
    label?: string;
  };
  width?: number;
  style?: ViewStyle;
  checked?: boolean;
  onPress?: () => void;
};
function MyCheckbox({ checked, onPress }: CheckBoxProps) {
  return (
    <Pressable style={[styles.checkboxBase, checked && styles.checkboxChecked]} onPress={onPress}>
      {checked && <Ionicons name="checkmark" size={14} color="white" />}
    </Pressable>
  );
}

const PropertyCategoryChipsWithIconCheckbox: React.FC<Props> = ({ item, onPress, width, style, checked }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <RNView style={styles.container}>
        <MyCheckbox checked={checked} onPress={onPress} />
        <RNText
          style={{
            color: item?.active ? 'black' : 'gray',
          }}>
          {item?.label}
        </RNText>
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(PropertyCategoryChipsWithIconCheckbox);
