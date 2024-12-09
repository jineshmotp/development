import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  filterView: {
    gap: 20,
    justifyContent: 'flex-start',
    width: deviceWidth / 1.7,
    marginLeft: 50,
  },
  filterText: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  scrollView: {
    gap: 10,
    paddingVertical: 10,
  },
});
