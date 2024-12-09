import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
  initialText: {
    fontSize: SIZES.small,
    color: ColorTheme.black,
  },
  reqCallbackWrapper: {
    flex: 1,
    alignItems: 'center',
    padding: px(20),
    backgroundColor: ColorTheme.white,
  },
  modalHeading: {
    fontSize: SIZES.medium15,
    color: 'white',
    fontWeight: '400',
  },
  disclaimer: {
    fontSize: SIZES.small,
    color: 'black',
    fontWeight: '400',
    lineHeight: SIZES.medium18,
    textAlign: 'justify',
  },
  topCloseView: {
    width: deviceWidth / 1.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    color: 'white',
    fontSize: SIZES.medium18,
    fontWeight: '500',
    padding: px(5),
  },
  modalForm: {
    flex: 1,
    marginVertical: px(10),
    alignSelf: 'stretch',
    paddingHorizontal: px(10),
  },
  addressTitle: {
    fontSize: SIZES.xLarge,
    color: 'black',
    fontWeight: '500',
  },
  addressTitle2: {
    fontSize: SIZES.large,
    color: 'black',
    fontWeight: '500',
  },
  addressDetail: {
    fontSize: SIZES.small11,
    color: 'black',
    marginBottom: px(20),
    fontWeight: '400',
  },
  inputLabel: {
    fontSize: SIZES.medium,
    color: 'black',
    marginTop: px(15),
    marginBottom: px(5),
  },
  inputStyle: {
    borderRadius: px(5),
    backgroundColor: ColorTheme.white,
    height: px(45),
    borderWidth: px(0.7),
    minHeight: px(35),
    color: ColorTheme.black,
  },
  agreeWrap: {
    flexDirection: 'row',
    marginBottom: px(20),
    paddingHorizontal: px(10),
  },

  agreeWrap_new: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },

  checkboxBase: {
    width: px(16),
    height: px(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: px(2),
    borderColor: ColorTheme.primary,
    backgroundColor: 'transparent',
    marginRight: px(5),
  },
  checkboxChecked: {
    backgroundColor: ColorTheme.primary,
  },
  imageBackgroundStyle: {
    height: Platform.OS === 'android' ? px(300) : px(329),
    borderBottomEndRadius: px(40),
    borderBottomLeftRadius: px(40),
    overflow: 'hidden',
  },
  navChild: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? px(20) : px(60),
    alignItems: 'center',
    marginHorizontal: px(20),
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: px(20),
  },
  pricingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: px(20),
    alignItems: 'center',
  },
  pricingChild: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: px(20),
    borderRadius: px(100),
    justifyContent: 'center',
    padding: px(6),
  },

  galleryBtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: px(3),
    alignItems: 'center',
    gap: px(10),
    backgroundColor: 'white',
    borderRadius: px(6),
    paddingHorizontal: px(5),
  },
  buttonsView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: px(20) },
  chatButton: { width: px(100), borderRadius: px(100), marginRight: px(50) },
  callBackBtn: { width: px(180), borderRadius: px(100) },
  headText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsSemiBold,
    fontWeight: 'bold',
    color: ColorTheme.black,
  },
  headView: {
    width: deviceWidth,
    // height: px(20),
    paddingLeft: px(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: px(5),
  },
});
