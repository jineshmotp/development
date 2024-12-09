import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceHeight, px } from '@/utils';

export const styles = StyleSheet.create({
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight / 2,
  },
  noDataText: {
    fontSize: SIZES.medium18,
    color: 'black',
  },
  noProperty: {
    width: px(100),
    height: px(100),
    marginBottom: px(10),
  },
});
