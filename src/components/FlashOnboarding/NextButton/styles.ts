import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  NextButtonMainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackgroundView: {
    resizeMode: 'cover',
    width: 48,
    height: 48,
  },
  ImageView1: { resizeMode: 'cover', width: 48, height: 48 },
  ImageView2: {
    resizeMode: 'cover',
    width: 25,
    height: 25,
  },

  touchableViewOutside: {
    width: px(62),
    height: px(62),
    backgroundColor: ColorTheme.primary,
    borderRadius: px(30),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  iconArrowStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  touchableViewInside: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: px(45),
    height: px(45),
    backgroundColor: ColorTheme.onboardingPrimary,
    borderRadius: px(30),
  },

  // NextButtonTouchView: {
  //   width: 62,
  //   height: 62,
  //   backgroundColor: '#3FDBD1',
  //   borderRadius: 30,
  // }}
  // onPress={() => {
  //   setCurrentIndex(currentIndex + 1);
  // },
});
