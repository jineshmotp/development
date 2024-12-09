import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  sectionContainer: { width: deviceWidth / 1.09, alignItems: 'center' },
  nextBtn: {
    color: 'black',
    fontWeight: '500',
    fontSize: SIZES.medium,
    fontFamily: FONT.PoppinsMedium,
  },
  mainBtn: { alignItems: 'center', justifyContent: 'center', marginTop: px(20) },
  main: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    alignItems: 'center',
    height: deviceHeight,
  },
  inputStyle: {
    height: 50,
    width: deviceWidth / 1.09,
    marginBottom: -10,
    color: 'black',
  },
  btnStyle: {
    marginBottom: 10,
    // width: 130,
    borderRadius: 10,
    // marginRight: 20,
    backgroundColor: '#E0E0E0',
    width: deviceWidth / 1.09,
    minHeight: 39,
    color: 'black',
  },
  btnSucStyle: {
    marginBottom: 10,
    // width: 130,
    borderRadius: 10,
    // marginRight: 20,
    backgroundColor: ColorTheme.primary,
    width: deviceWidth / 1.09,
    minHeight: 39,
    color: 'black',
  },
  labelStyle: {
    fontSize: SIZES.small,
    color: 'black',
    fontFamily: FONT.PoppinsRegular,
  },
  errorContainer: {
    width: deviceWidth / 1.09,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: px(20),
  },
  unAvailable: {
    color: ColorTheme.danger,
    fontSize: SIZES.small,
    paddingRight: 10,
  },
  available: {
    color: ColorTheme.nearLukSuccess,
    fontSize: SIZES.small,
    paddingRight: 10,
  },
});
