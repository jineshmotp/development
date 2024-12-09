import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  main: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    alignItems: 'center',
  },
  sectionContainer: { width: deviceWidth / 1.09, alignItems: 'center' },
  nextBtn: {
    color: 'black',
    fontWeight: '500',
    fontSize: SIZES.medium,
    fontFamily: FONT.PoppinsMedium,
  },
  mainBtn: { alignItems: 'center', justifyContent: 'center', marginTop: 30 },
  label: {
    fontSize: SIZES.small,
    fontWeight: '400',
    fontFamily: FONT.PoppinsRegular,
    color: 'black',
  },
  btnStyle: {
    marginBottom: 10,
    // width: 130,
    borderRadius: 10,
    // marginRight: 20,
    backgroundColor: '#E0E0E0',
    minHeight: 39,
  },
  btnStyle1: {
    marginBottom: 10,
    // width: 130,
    borderRadius: 10,
    // marginRight: 20,
    // backgroundColor: '#E0E0E0',
    minHeight: 39,
  },
  otpTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 5,
    gap: 5,
    marginTop: 50,
  },
  topView: {
    alignItems: 'flex-start',
    width: deviceWidth / 1.09,
    marginBottom: 10,
  },
});
