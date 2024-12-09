import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  bannerContainer: {
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideContainer: {
    height: px(150),

    position: 'relative',
    top: px(20),
  },
  imageContainer: {
    width: deviceWidth / 1.09,
    height: px(110),
    borderRadius: px(10),
    padding: px(5),
    //   backgroundColor: "aqua",
  },
  wrapper: {
    height: Platform.OS === 'android' ? px(300) : px(329),
    borderBottomEndRadius: px(40),
    borderBottomLeftRadius: px(40),
    overflow: 'hidden',
  },
  slide1: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // height: 200,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: ColorTheme.white,
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
  },
  pagination: {
    // backgroundColor: "black",
  },
  dotstyle: {
    width: px(5),
    height: px(5),
    borderRadius: px(5),
    color: '#D9D9D9',
  },
  activeDotStyle: {
    width: px(9),
    height: px(9),
    borderRadius: px(9),
    color: '#D9D9D9',
  },
});
