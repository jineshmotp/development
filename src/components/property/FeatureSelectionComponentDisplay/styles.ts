import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';


export const styles = StyleSheet.create({
  sectionHocStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },

  sectionHocHeading: {
    fontSize: SIZES.medium15,
    color: ColorTheme.black,
    fontWeight: '600',
    marginRight: 5,
  },

  sectionHocHeadingMandatory: {
    color: 'red',
    fontSize: SIZES.medium15,
    fontWeight: '600',
  },
  ChipStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    padding: 5,
    backgroundColor: ColorTheme.nearLukGray4,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
