import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    marginTop: 20,
  },
  noDataView: {
    width: deviceWidth,
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: SIZES.small,
    color:'black'
  },
  listContainer: {
    width: deviceWidth,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: SIZES.medium15,
    color: 'black',
  },
  loadMoreBtn: {
    borderWidth: 0.7,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
