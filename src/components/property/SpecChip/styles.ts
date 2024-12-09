import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    gap: px(0),
    // justifyContent: 'space-between',
  },
  labelText: {
    flex: 0.4,
    fontSize: SIZES.small14,
    textAlign: 'left',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.nearLukGray,
    // width: px(150),
  },

  specsText: {
    fontSize: SIZES.small14,
    textAlign: 'left',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.black,
    fontWeight: 'bold',
    flex: 0.6,
  },
});
