import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 15,
    width: deviceWidth / 1.09,
  },
  sectionHeaderText: {
    color: 'black',
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: SIZES.medium18,
    fontWeight: '600',
    textTransform: 'capitalize',
    lineHeight: 22,
  },
  headingStyle: {
    color: 'black',
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: SIZES.medium18,
    fontWeight: '600',
    // textTransform: "capitalize",
    lineHeight: 22,
  },
  editTextStyle: { color: '#1E9991', fontSize: SIZES.small, padding: 5 },
  topView: { width: deviceWidth / 1.09 },
});
