import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  containerViewStyle: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },

  selectionView: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 5,
  },

  ownerView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  selectionSubView: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },

  LabelText: {
    color: ColorTheme.nearLukGray,
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small13,
  },

  ownerTestStyle: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsSemiBold,
    fontWeight: 'bold',
    color: ColorTheme.black,
  },
});
