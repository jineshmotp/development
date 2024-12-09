import { StyleSheet } from 'react-native';

import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  bannerContainer: {
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideContainer: {
    height: px(200),
    position: 'relative',
    // top: px(20),
  },
  imageContainer: {
    width: deviceWidth / 1.09,
    height: px(200),
    borderRadius: 10,
    padding: px(5),
    //   backgroundColor: "aqua",
  },
  wrapper: {
    height: px(200),
    // backgroundColor: "aqua",
  },
  slide1: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: px(200),
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
    color: '#fff',
    fontSize: px(30),
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
