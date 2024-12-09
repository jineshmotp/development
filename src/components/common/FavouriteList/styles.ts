import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'column',
    gap: 10,
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight - 100,
  },
  noDataText: {
    fontSize: SIZES.medium18,
    color: 'black',
  },
  containerView: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'column',
    gap: 10,
  },
});
