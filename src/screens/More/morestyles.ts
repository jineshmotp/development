import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const morestyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    width: deviceWidth,
    height: deviceHeight,

    flexDirection: 'column',
    backgroundColor: '#E8E8E8',
  },

  TopView: {
    flex: 0.3,
    backgroundColor: '#E8E8E8',
  },

  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: px(10),
  },

  imageStyle: {
    width: deviceWidth / 1.8,
    height: deviceWidth / 2,

    alignSelf: 'center',
  },

  BottomView: {
    flex: 0.7,

    flexDirection: 'column',

    borderTopRightRadius: px(30),
    borderTopLeftRadius: px(30),

    top: px(15),
    backgroundColor: '#fff',
    elevation: 5,
    // resizeMode: 'contain',
  },

  BottomSubView: {
    flex: 0.7,
    justifyContent: 'center',
    alignContent: 'center',

    margin: px(10),
    padding: px(10),
  },

  BottomWaitListView: {
    flex: 0.3,

    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

    bottom: px(10),
  },

  DescriptionHeading: {
    fontSize: px(20),
    fontWeight: '700',
    color: '#6CD475',
  },

  DescriptionTxtView: {
    fontSize: px(13),
    fontWeight: '400',
    color: ColorTheme.black,
    lineHeight: px(19.5),
    marginTop: px(20),
  },

  ColvingRoundView: {
    // marginTop: px(30),
    width: deviceWidth / 1.09,
    // borderRadius: px(78.25),
    minHeight: px(65),
    backgroundColor: ColorTheme.white,
    // elevation: 5,

    flexDirection: 'row',
    padding: px(12),
  },

  ColvingRoundViewLeft: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  ColvingRoundViewRight: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },

  ColivingIconCircle: {
    width: px(36),
    height: px(36),
    borderRadius: px(78),
    backgroundColor: ColorTheme.white,
    elevation: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  ColvingHomeImageView: { width: px(40), height: px(40) },

  HomesImageView: { width: 80.98, height: 80.98, alignSelf: 'center', top: px(25), left: px(85) },
  WallImageView: { width: 148.29, height: 211.85, alignSelf: 'center', top: px(-70) },
  GirlsImageView: { width: 174.04, height: 174.4, marginTop: px(-127), left: px(24) },

  livingView: { fontSize: px(20), fontWeight: '700', color: '#6CD475' },
  colivingTxtView: { fontSize: px(14), fontWeight: '400', color: '#333333', marginTop: px(20) },
  colivingMainView: {
    borderTopRightRadius: px(30),
    borderTopLeftRadius: px(30),
    width: 411,
    height: 589,
    top: px(15),
    backgroundColor: '#fff',
    elevation: 5,
    resizeMode: 'contain',
  },
  ColvingHomeOutFullView: {
    marginTop: px(30),
    width: 370.96,
    borderRadius: 78.25,
    height: 60.41,
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  ColvingHomeOutView: { flexDirection: 'row', padding: px(12) },
  ColvingHomeView: {
    width: 35.52,
    borderRadius: 78.25,
    height: 35.52,
    backgroundColor: '#F7F7F7',
    elevation: 5,
  },

  ColvingHomeImageTxt: {
    fontSize: px(13),
    width: 300,
    paddingLeft: px(15),
    color: ColorTheme.black,
  },
  SliderMainView: { top: px(30), alignItems: 'center' },
  LinearGradientSliderView: {
    borderRadius: px(50),
    width: deviceWidth / 1.09,
    height: px(73),

    backgroundColor: ColorTheme.white,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  WaitlistImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: px(15),
  },

  WaitlistImageIcon: {
    width: px(55),
    height: px(55),
  },

  nextImageView: { width: 24, height: 24, alignSelf: 'center', top: px(14) },
  forwordImageView: { width: px(31), height: px(20), alignItems: 'center', paddingLeft: px(15) },
  LinearGradientSliderTxtView: {
    alignItems: 'center',
    fontSize: px(14),
    fontWeight: '700',
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,
    paddingLeft: px(60),
  },
  animatedStyle: {
    width: 54,
    height: 54,
    position: 'absolute',
    left: 0,
    backgroundColor: '#00B2A7',
    borderRadius: px(30),
  },

  //waitlist

  JoinView: { margin: px(15) },

  CreditlukBoxView: {
    marginTop: px(20),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  CreditlukBox: {
    width: deviceWidth / 2.5,
    borderRadius: px(10),
    minHeight: px(120),
    backgroundColor: ColorTheme.white,
    elevation: 5,
    padding: px(12),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  CreditlukBoxViewLeft: {
    flex: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  CreditlukBoxViewRight: {
    flex: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  CreditlukBoxTxt: {
    fontSize: px(13),
    flexWrap: 'wrap',
    color: ColorTheme.black,
    textAlign: 'center',
    fontFamily: FONT.PoppinsRegular, // Ensure text takes full width of its container
  },
});
