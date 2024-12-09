import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth / 1.09,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: px(5),
    columnGap: px(7),
  },
  image: {
    width: deviceWidth / 3.4,
    height: deviceWidth / 3.4,
  },
  textTab: {
    color: 'black',
    fontSize: SIZES.medium15,
    fontWeight: '500',
    lineHeight: 22,
  },
  noDataView: {
    width: deviceWidth / 1.09,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery: {
    rowGap: 5,
    columnGap: 5,
  },
});
