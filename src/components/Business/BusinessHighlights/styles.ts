import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ColorTheme.white,
  },

  containerViewStyle: {
    width: deviceWidth / 1.05,
    alignSelf: 'center',
  },

  selectionHeader: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsSemiBold,
    fontWeight: 'bold',
    color: ColorTheme.black,
  },
  selectionText: {
    fontSize: SIZES.small14,
    fontFamily: FONT.PoppinsSemiBold,
  },
  mapViewView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: px(10),
  },
  mapStyle: {
    width: deviceWidth,
    height: px(250),
  },
  highlightChipView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: px(6),
  },
});
