import React, { memo, useState } from 'react';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const PrinceRangeSlider = ({ filterDetails, setFilterDetails }: any) => {
  const [twoWayValue, setTwoWayValue] = useState([0, 100]);

  const handleTwoWaySliderChange = (values: number[]) => {
    const minPrice = values[0];
    const maxPrice = values[1];
    const priceRange = `${minPrice}-${maxPrice} in lacs`;
    setTwoWayValue(values);
    setFilterDetails({
      ...filterDetails,
      price_range: priceRange,
    });
  };

  return (
    <RNView>
      <RNView style={styles.sliderContainer}>
        <MultiSlider
          values={twoWayValue}
          onValuesChange={handleTwoWaySliderChange}
          sliderLength={200}
          min={0}
          max={100}
          step={1}
          allowOverlap={false}
          snapped={true}
          markerStyle={{ backgroundColor: ColorTheme.primaryColor }}
          selectedStyle={{ backgroundColor: ColorTheme.primaryColor }}
          unselectedStyle={{ backgroundColor: ColorTheme.gray }}
        />
      </RNView>
      <RNView style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <RNText style={styles.valueText}>Min Price {twoWayValue[0]}</RNText>
        <RNText style={styles.valueText}>Max Price {twoWayValue[1]}</RNText>
      </RNView>
      <RNText style={styles.priceText}>Price in ( Lacs )</RNText>
    </RNView>
  );
};

export default memo(PrinceRangeSlider);
