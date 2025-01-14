import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  userIcon: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 100,
    backgroundColor: ColorTheme.primary,
  },
  userLetter: {
    textTransform: 'capitalize',
    fontSize: SIZES.xLarge,
    fontFamily: FONT.PoppinsBold,
    lineHeight: 35,
    color: 'white',
  },
  main: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 5,
    shadowColor: 'gray',
    elevation: 10,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerView: {
    width: deviceWidth,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ColorTheme.onboardingButton,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: SIZES.medium18,
    fontWeight: '600',
    lineHeight: SIZES.large,
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  crossBtn: {
    marginRight: 10,
    width: 15,
    // height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetail: {
    width: deviceWidth / 1.09,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgStyle: { width: 55, height: 55, borderRadius: 30 },
  userView: { paddingLeft: 10 },
  userText: {
    fontSize: SIZES.small14,
    fontWeight: '500',
    lineHeight: 21,
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  profileText: {
    fontSize: SIZES.small,
    fontWeight: '500',
    lineHeight: 18,
    fontFamily: FONT.PoppinsMedium,
    color: '#A3A3A3',
  },
  inputStyle: {
    fontSize: SIZES.medium15,
    width: deviceWidth / 1.09,
    // borderWidth: 1,
    minHeight: 100,
    color: 'black',
  },
  uploadSpace: { minHeight: deviceHeight / 2 , paddingBottom:px(10) },
  uploadLoading: { height: deviceHeight / 1.8, opacity: 1 },
  uploadContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth / 1.09,
    gap: 5,
  },
  bottomContainer: {
    width: deviceWidth/1.05,
    height: 55,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf:'center'
  },
  uploading: {
    width: deviceWidth,
    height: 55,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  uploadingText: { color: 'black', fontSize: SIZES.medium18, fontWeight: '700' },
  btnView: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
   marginTop:px(20)
  },
  btnStyle: {
    width: deviceWidth / 1.09,
    minHeight: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    lineHeight: 23,
    color: 'black',
  },
  topView: { left: 0, bottom: 10 },
  iconStyle: { width: 28, height: 28 },
  animStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerMain: { width: deviceWidth, alignItems: 'center' },
  imgStyles: {
    width: deviceWidth / 2.3,
    height: deviceWidth / 2.3,
  },
});
