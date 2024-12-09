import React, { memo } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

interface IncrementDecrementProp {
  decreaseQuantity?: any;
  quantity?: number;
  inncreaseQuantity?: any;
  positionvalue?: number;
  gotonumval?: any;
  errorStyle?: any;
}
const IncrementDecrementInput: React.FC<IncrementDecrementProp> = ({
  decreaseQuantity,
  quantity,
  inncreaseQuantity,
  positionvalue,
  gotonumval,
  errorStyle,
}) => {
  return (
    <RNView style={[styles.countViewStyles, errorStyle]}>
      <RNView style={styles.countViewsubMinuse}>
        <TouchableOpacity
          onPress={() => decreaseQuantity(positionvalue)}
          disabled={quantity === 0}
          style={[
            styles.countView,
            quantity === 0 && { opacity: 0.2 }, // Optional: Custom styling when disabled
          ]}>
          <AntDesign name="minus" size={px(18)} color={ColorTheme.black} />
        </TouchableOpacity>
      </RNView>

      <RNView style={styles.numberpadStyle}>
        <TextInput
          style={styles.countText}
          keyboardType="number-pad"
          maxLength={5}
          onChangeText={txt => gotonumval(txt)}>
          {quantity}
        </TextInput>
      </RNView>

      <RNView style={styles.countViewsubPluse}>
        <TouchableOpacity onPress={() => inncreaseQuantity(positionvalue)} style={styles.countView}>
          <AntDesign name="plus" size={px(18)} color={ColorTheme.black} />
        </TouchableOpacity>
      </RNView>
    </RNView>
  );
};

export default memo(IncrementDecrementInput);
