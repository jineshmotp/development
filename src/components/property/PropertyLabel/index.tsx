import React from 'react';
import { Text, View } from 'react-native';

import { deviceWidth } from '@/utils';

import { styles } from './styles';

type Props = {
  placeholder?: any;
  labelStyle?: any;
  style?: any;
};

const PropertyLabel: React.FC<Props> = ({ placeholder, style }) => {
  const width = deviceWidth;
  const containerWidth = Math.min(width * 0.8, 400); // Adjust the percentage or maximum value as needed
  const fontSize = Math.min(containerWidth * 0.05, 16); // Adjust the percentage or minimum value as needed

  return (
    <View style={[styles.container, style, { width: containerWidth }]}>
      <Text style={[styles.text, { fontSize }]}>{placeholder}</Text>
    </View>
  );
};

export default PropertyLabel;
