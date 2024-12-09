import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    width: deviceWidth,
    justifyContent: 'space-between',
    alignSelf: 'center',
    // gap: 10,
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: { fontSize: SIZES.small, color: 'black' },
});
