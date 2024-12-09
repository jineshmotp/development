import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth / 1.09,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 5,
    columnGap: 5,
  },
  textTab: {
    color: 'black',
    fontSize: SIZES.medium15,
    fontWeight: '500',
    lineHeight: 22,
  },
  imgStyle: {
    width: deviceWidth / 3.4,
    height: deviceWidth / 2,
    borderRadius: px(5),
  },
  playIcon: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  noDataView: {
    width: deviceWidth / 1.09,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
