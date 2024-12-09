import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';

export const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  valueText: {
    fontSize: SIZES.small,
    textAlign: 'center',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  priceText: {
    fontSize: SIZES.small14,
    textAlign: 'center',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
