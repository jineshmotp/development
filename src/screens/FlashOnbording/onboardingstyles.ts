import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const onboardingstyles = StyleSheet.create({
  PropertiesMainContainer: {
    flex: 1,
  },
  ImageBackgroundView: { resizeMode: 'cover', width: '100%', height: '100%' },
  ImageView: { marginTop: px(100) },

  ImageStyle: { resizeMode: 'cover', height: deviceHeight / 1.5, width: 'auto' },
  BorderView: {
    borderWidth: 1,
    width: px(74),
    borderBlockColor: '#8F8F8F',
    marginTop: px(15),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  BorderView1: {
    borderWidth: 1,
    width: px(54),
    borderBlockColor: '#8F8F8F',
    marginTop: px(15),
  },
  SkipView: {
    // marginTop: px(37),
    // paddingLeft: px(400),
    position: 'absolute',
    top: px(50),
    right: px(40),
  },
  SkipTxtView: {
    fontSize: px(18),
    fontWeight: '400',
    alignItems: 'center',
    color: ColorTheme.black,
  },
  PropertiesMianView: {
    bottom: 0,
    position: 'relative',
    marginTop: 0,
    height: px(350),
    backgroundColor: ColorTheme.white,
    borderTopLeftRadius: 80,
    elevation: 10,
  },
  PropertiesView: { paddingLeft: 58, marginTop: 47 },
  PropertiesTxtView: { fontSize: 20, fontWeight: '600', color: '#000' },
  ExploreMainView: {
    paddingLeft: 58,
    marginTop: 25,
  },
  ExploreTxtView: { fontSize: 24, fontWeight: '400', color: '#000' },
  ToTxtView: { fontSize: 24, fontWeight: '400', color: '#000' },
  FyPView: { fontSize: 24, fontWeight: '600', color: '#1A938C' },
  HomeView: { fontSize: 24, fontWeight: '600', color: '#1A938C' },
  MoreView: { fontSize: 24, fontWeight: '400', color: '#000' },
  NextSlideView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 27,

    marginTop: px(50),
  },
  NextBtnView: { paddingLeft: 150 },

  //main view

  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  skipView: {
    flex: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
    // marginTop: px(100),
  },
  whiteView: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
});
