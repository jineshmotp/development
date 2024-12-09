import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const style = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: deviceWidth / 3.5,
    height: deviceWidth / 3.2,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: px(5),
    borderRadius: px(10),
    width: px(100),
    height: px(70),
    alignSelf: 'center',
    padding: px(10),
    opacity: 1,
  },
  text: {
    textAlign: 'center',
    // marginTop: 5,
    width: deviceWidth / 4,
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.small13,
    lineHeight: SIZES.medium18,
    color: ColorTheme.black,
  },
  icon: {
    width: px(45),
    height: px(45),
  },
  creditIcon: {
    width: px(60),
    height: px(60),
  },
});
