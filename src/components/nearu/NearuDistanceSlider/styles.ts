import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';

export const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 40,
  },
  valueText: {
    fontSize: SIZES.small,
    textAlign: 'center',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
});
