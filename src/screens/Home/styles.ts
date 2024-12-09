import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  locationText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
    width: 'auto',
  },
  areaText: {
    fontFamily: FONT.PoppinsRegular,
    // width: 200,
    fontSize: 10,
    fontWeight: '600',
    color: 'black',
    width: 'auto',
  },
  lineView: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: deviceWidth / 1.3,
    alignSelf: 'center',
    // marginTop: 20,
    borderColor: ColorTheme.nearLukGray,
  },
  nearlukView: {
    width: deviceWidth,
    padding: 20,
    gap: 15,
    // marginTop: 10,
    paddingHorizontal: 20,
  },
  nearlukText: {
    fontFamily: FONT.PoppinsBold,
    fontSize: SIZES.medium18,
    fontWeight: '600',
    lineHeight: 26,
    color: 'black',
  },
  gradientView: {
    left: -20,
    right: 0,
    height: 105,
    width: deviceWidth,
  },
  subGradientView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    alignSelf: 'center',
    paddingTop: 5,
    // borderWidth: 1,
  },
  belowGradientView: {
    flexDirection: 'row',
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    // marginTop: 10,
  },
  lastGradientView: {
    right: 0,
    height: 90,
  },
  subNearlukText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.xSmall,
    fontWeight: '400',
    lineHeight: 14,
    color: 'black',
  },
  storyImage: {
    width: px(130),
    height: px(180),
    borderRadius: 10,
  },
  listContainer: {
    width: deviceWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    width: deviceWidth,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
  },

  navButton: {
    backgroundColor: '#DEEBF3',
    padding: 10,
    borderRadius: 100,
    borderColor: '#92C8EA',
    borderWidth: StyleSheet.hairlineWidth,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  navChild: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 10 : 0,
    alignItems: 'center',
    marginHorizontal: 20,
    // marginBottom: 10,
    backgroundColor: 'white',
  },
  stories: {
    borderBottomColor: '#E4E4E4',
    borderTopColor: '#E4E4E4',
    borderBottomWidth: 6,
    width: deviceWidth,
    paddingHorizontal: 10,
    padding: 10,
  },
  storyCard: {
    alignSelf: 'center',
    backgroundColor: ColorTheme.primaryColor,
    borderRadius: 100,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    borderColor: 'white',
    position: 'absolute',
    bottom: px(10),
  },
  countStyle: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: -5,
    width: px(20),
    height: px(20),
    borderRadius: px(10),
    backgroundColor: ColorTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: SIZES.small14,
    color: ColorTheme.white,
    fontWeight: '500',
  },
  defaultView: {
    width: px(130),
    height: px(180),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  defaultText: {
    fontSize: SIZES.xxxLarge,
    fontWeight: 'bold',
    color: ColorTheme.white,
  },
  selectAllText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: ColorTheme.onboardingButton,
  },
  modelViewStyle: {
    // backgroundColor:'red',
    height: deviceWidth,
    width: deviceWidth,
    flex: 1,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: ColorTheme.white,
    height: deviceHeight / 1.6,
    width: deviceWidth / 1.2,
    elevation: 5,
  },
  modalExpireContent: {
    backgroundColor: ColorTheme.white,
    height: deviceHeight / 2.2,
    width: deviceWidth / 1.2,
    elevation: 5,
  },
  initialContainer: {
    backgroundColor: ColorTheme.onboardingPrimary,
    height: deviceHeight / 12,
    width: deviceWidth / 1.2,
    justifyContent: 'center',
  },
  initialText: {
    fontSize: px(16),
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsBold,
    color: ColorTheme.white,
    marginLeft: px(20),
  },
  programmerStyle: {
    width: px(200),
    height: px(200),
  },
  modalImage: {
    height: deviceHeight / 12,
    width: deviceWidth / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lastContainer: {
    flex: 1,
  },
  expireContainer: {
    flex: 0.8,
  },
  dearText: {
    fontSize: px(16),
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsBold,
    color: ColorTheme.onboardingPrimary,
    marginLeft: px(20),
    marginTop: px(10),
  },
  lineText: {
    fontSize: px(14),

    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.black,
    marginLeft: px(20),
    marginTop: px(10),
  },
  constantText: {
    fontSize: px(14),

    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.black,
    marginLeft: px(20),
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: px(50),
    justifyContent: 'flex-end',
    paddingHorizontal: px(20),
  },
  nextContainer: {
    width: px(120),
    borderRadius: 8,
    backgroundColor: ColorTheme.onboardingButton,

    elevation: 5,
  },
  okContainer: {
    width: px(120),
    borderRadius: 8,
    backgroundColor: ColorTheme.onboardingButton,
    alignSelf: 'flex-end',
    elevation: 5,
    marginRight: px(20),
  },
  nextStyle: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
  },
  cancelText: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
    alignSelf: 'center',
    marginRight: px(20),
  },
  cancelContainer: {
    height: px(20),

    width: px(70),
    alignSelf: 'center',
  },
});
