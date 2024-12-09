import React, { FC } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { buttonStyle } from './CommonButton.style';
import { CommonButtonProps } from './commonButton.types';

const CommonButton: FC<CommonButtonProps> = ({ title, style, loading, disabled, onPress, textStyle, loaderColor }) => {
  return (
    <TouchableOpacity disabled={disabled} style={[buttonStyle.buttonCOntainer, style]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <Text style={[buttonStyle.buttontext, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;
