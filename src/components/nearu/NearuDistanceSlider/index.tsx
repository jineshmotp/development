import React, { memo, useState } from 'react';

import Slider from '@react-native-community/slider';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const NearuDistanceSlider = ({ filterDetails, setFilterDetails }: any) => {
  const [sliderValue, setSliderValue] = useState(5);
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setFilterDetails({
      ...filterDetails,
      distance: `${value}`,
    });
  };

  return (
    <RNView style={styles.sliderContainer}>
      <Slider
        maximumValue={25}
        minimumValue={5}
        minimumTrackTintColor={ColorTheme.primary}
        maximumTrackTintColor={ColorTheme.gray}
        step={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
      />
      <RNText style={styles.valueText}>Distance Radius {sliderValue} in kms</RNText>
    </RNView>
  );
};

export default memo(NearuDistanceSlider);
