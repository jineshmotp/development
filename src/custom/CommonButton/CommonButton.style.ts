// import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const buttonStyle = StyleSheet.create({
  buttonCOntainer: {
    backgroundColor: ColorTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: px(45),
    borderRadius: px(8),
    width: deviceWidth / 1.2,
    flexDirection: 'row',
  },
  buttontext: {
    color: 'white',
    fontSize: px(SIZES.medium18),
    verticalAlign: 'middle',
    fontFamily: FONT.PoppinsRegular,
  },
});
