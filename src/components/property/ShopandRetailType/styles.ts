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
  retailtypeText: {
    fontSize: SIZES.small14,
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
  },
  showroomTypeView: {
    marginTop: px(10),
    flexDirection: 'row',
    gap: px(10),
  },
});
