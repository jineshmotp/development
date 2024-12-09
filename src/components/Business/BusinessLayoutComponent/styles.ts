import { StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const LayourStyle = StyleSheet.create({
  layoutViewStyle: {
    // backgroundColor: ColorTheme.white,
    borderRadius: px(5),
    shadowOffset: { width: 0, height: 2 },
    height: deviceHeight / 4,
    width: deviceWidth / 2.5,
  },
  pdf: {
    height: deviceHeight / 4, // Adjust the height as necessary
    width: deviceWidth / 2.5, // Fill the width
    // backgroundColor:'green'
  },
  imagbackgroundStyle: {
    flex: 1,
    borderRadius: px(10),
  },
  downloadView: {
    width: '100%',
    backgroundColor: '#ffffff40',
    justifyContent: 'center',
  },
  viewDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: px(10),
    paddingVertical: px(10),
    gap: px(5),
  },
  whiteTextStyle: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.onboardingPrimary,
  },
  lableTextStyle: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(11),
    fontWeight: 'bold',
    color: ColorTheme.onboardingPrimary,
    paddingVertical: px(15),
  },
  imageStyle: { height: px(15), width: px(15) },
  bottomView: { position: 'absolute', width: '100%', bottom: 0 },
});
