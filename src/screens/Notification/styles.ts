import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  parentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
  },
  dummyText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 18,
    color: 'black',
  },
  SearchInput: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerView: {
    width: deviceWidth,
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'column',
    gap: 10,
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight - px(600),
  },
  noDataText: {
    fontSize: SIZES.medium18,
    color: 'black',
  },
});
