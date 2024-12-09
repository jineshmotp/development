import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  sectionContainer: { width: deviceWidth, alignItems: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    width: deviceWidth / 1.09,
  },
  sectionHeaderText: {
    color: 'black',
    fontFamily: FONT.PoppinsBold,
    fontSize: SIZES.medium,
  },
  sectionImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    width: deviceWidth / 1.09,
  },
  imageSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth / 1.09,
    paddingVertical: 15,
  },
  sectionText: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: deviceWidth / 1.09,
    color: 'black',
  },
  sectionDetailPart: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    width: deviceWidth / 1.09,
  },
  bioTextStyle: {
    textAlign: 'left',
    fontSize: SIZES.small11,
    color: 'black',
    paddingBottom: 10,
    fontFamily: FONT.PoppinsRegular,
    lineHeight: 16,
  },
  bioTextStyle1: {
    textAlign: 'center',
    fontSize: SIZES.small11,
    color: 'black',
    paddingBottom: 10,
    fontFamily: FONT.PoppinsRegular,
    lineHeight: 16,
  },
  editTextStyle: { color: '#1E9991', fontSize: SIZES.small },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  detailIcon: { paddingHorizontal: 5 },
  detailText: { fontSize: SIZES.small, color: 'black', fontWeight: '400' },
  pageText: { fontWeight: '500', color: 'black' },
  detaillogos: { width: 13, height: 13 },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
    width: deviceWidth,
  },
  bottombtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: deviceWidth,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth / 1.09,
  },
  coverPicstyle: {
    width: deviceWidth / 1.09,
    height: 230,
    borderRadius: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  costumBtn: {
    flex: 1,
    backgroundColor: ColorTheme.nearLukGray4,
    minHeight: 39,
  },
  BtnTextStyle: {
    color: 'black',
    fontSize: 14,
    fontFamily: FONT.PoppinsMedium,
  },
  userIcon: {
    width: 120,
    height: 120,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    backgroundColor: ColorTheme.primary,
  },
  userLetter: {
    textTransform: 'capitalize',
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.PoppinsBold,
    lineHeight: 120,
    color: 'white',
  },
  picContainer: { width: deviceWidth / 1.09 },
});
