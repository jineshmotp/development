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
  sectionView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: px(10),
  },
  descriptionText: {
    textAlign: 'justify',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.nearLukGray,
  },
});
