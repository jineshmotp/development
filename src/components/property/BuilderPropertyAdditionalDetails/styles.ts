import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  containerViewStyle: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },

  selectionHeader: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsSemiBold,
    fontWeight: 'bold',
    color: ColorTheme.black,
  },

  sectionPlaceholder: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 5,
  },
});
