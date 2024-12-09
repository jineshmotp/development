import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import PropertyLabel from '../PropertyLabel';
import PropYesNoCheck from '../PropertyRadio';
import { styles } from './styles';

interface PropertyYesNoProps {
  propertyKeylabel?: string;
  propertyKey?: string;
  propertyValue?: boolean;
  mandatory?: boolean;
  setPropertyDetails?: (key: string, value: boolean) => void;
}

const PropertyYesNo: React.FC<PropertyYesNoProps> = ({
  propertyKeylabel,
  propertyKey,
  propertyValue,
  setPropertyDetails,
  mandatory,
}) => {
  const [selectedOption, setSelectedOption] = useState<boolean | undefined>(propertyValue);

  const handleOptionChange = (value: boolean) => {
    setSelectedOption(value);
    setPropertyDetails?.(propertyKey!, value);
  };

  const containerWidth = Math.min(deviceWidth * 0.8, 400); // Adjust the percentage or maximum value as needed
  const labelFontSize = Math.min(deviceHeight * 0.1, 20); // Adjust the percentage or maximum value as needed

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      {mandatory && <Text style={{ color: ColorTheme.red }}>*</Text>}
      {/* Conditionally render the asterisk if mandatory is true */}
      <View style={styles.labelContainer}>
        <PropertyLabel placeholder={`${propertyKeylabel}`} labelStyle={{ fontSize: labelFontSize }} />
      </View>
      <View style={styles.checkboxContainer}>
        <PropYesNoCheck label={'Yes'} checked={selectedOption === true} setChecked={() => handleOptionChange(true)} />

        <PropYesNoCheck label={'No'} checked={selectedOption === false} setChecked={() => handleOptionChange(false)} />
      </View>
    </View>
  );
};

export default PropertyYesNo;
