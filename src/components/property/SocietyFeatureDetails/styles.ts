import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

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

  parkingChip: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    padding: 5,
    backgroundColor: ColorTheme.nearLukGray6,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  chipsetText: {
    color: ColorTheme.black,
  },

  featureTypeView: {
    marginTop: px(10),
    flexDirection: 'row',
    gap: px(10),
  },
});
