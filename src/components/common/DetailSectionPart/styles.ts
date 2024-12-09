import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  sectionDetailPart: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    width: deviceWidth / 1.09,
    paddingVertical: 10,
  },
  iconCircle: {
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionText: {
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    color: '#000000',
    marginRight: 10,
  },
  sectionTextWeb: {
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    color: 'blue',
    marginRight: 10,
  },
  sectionTextCap: {
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    color: '#000000',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  AddNameField: {
    fontSize: SIZES.medium,
    color: '#1E9991',
    textTransform: 'capitalize',
  },
  AddNameField1: {
    fontSize: SIZES.medium,
    color: '#1E9991',
    // textTransform: "capitalize",
  },
  sectionpart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addressAvail: { alignItems: 'flex-start' },
  subtile: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsRegular,
    color: '#9F9F9F',
  },
  addEdit: { flex: 10 },
  viewEditstyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  editTextStyle: { color: '#1E9991', fontSize: SIZES.small, padding: 5 },
  editIconStyle: { height: 30, width: 30, borderRadius: 30, padding: 5 },
  imgStyle: { width: 17, height: 17 },
  sectionContainer: { flex: 1, flexDirection: 'row' },
  rightSide: { width: deviceWidth / 1.5 },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  toolTip: { paddingHorizontal: 5 },
});
