import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  sectionHocStyle: {
    marginTop: px(20),
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },

  sectionHocHeading: {
    fontSize: SIZES.medium15,
    color: ColorTheme.black,
    fontWeight: '600',
    marginRight: px(5),
  },

  sectionHocHeadingMandatory: {
    color: 'red',
    fontSize: SIZES.medium15,
    fontWeight: '600',
  },
});
