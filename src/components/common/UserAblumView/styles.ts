import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    maxHeight: deviceWidth / 1.6,
  },
  containerProperty: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    minHeight: deviceWidth / 2,
  },
  itemContainer: {
    width: deviceWidth / 2.2,
    height: deviceWidth / 2.2,
    padding: 10,
  },
  image: {
    flex: 1,
  },
  textTab: {
    color: 'black',
    fontSize: SIZES.medium15,
    fontWeight: '500',
    lineHeight: 22,
  },
  textStyle: {
    fontSize: SIZES.small,
    color: 'black',
  },
  emptyView: {
    flex: 1,
    height: 250,
    width: deviceWidth,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  emptyText: { color: 'black', fontSize: 16, alignSelf: 'center' },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight - 600,
  },
  noDataText: {
    fontSize: SIZES.medium18,
    color: 'black',
  },
});
