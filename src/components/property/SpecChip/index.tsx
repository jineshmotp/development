import React from 'react';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { FONT } from '@/theme';

import { styles } from './styles';

type Propertyheaderprop = {
  label?: String;
  description?: String;
};

const SpecChip = ({ label, description }: Propertyheaderprop) => {
  return (
    <RNView style={styles.mainView}>
      <RNText style={styles.labelText}>{label}</RNText>
      <RNText style={styles.specsText}>{description}</RNText>
    </RNView>
  );
};

export default SpecChip;
