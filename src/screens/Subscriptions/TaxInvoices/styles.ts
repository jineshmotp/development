import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  scrollView: {
    maxHeight: deviceHeight,
    // width: deviceWidth, // Adjust height as needed
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderColor: '#000',
    backgroundColor: ColorTheme.nearLukGray7,
    height: px(54),
    alignItems: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: ColorTheme.nearLukGray6,
    height: px(54),
    alignItems: 'center',
  },
  cellHeader: {
    // flex: 1,
    paddingHorizontal: 30,
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
    textAlign: 'left',
    width: px(130),
    // maxWidth: px(200),
  },
  cellHeaderView: {
    flex: 1,
    width: px(130),
    height: px(54),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  cellHeaderViewTaxNumber: {
    flex: 1,
    width: px(150),
    height: px(54),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  cell: {
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    paddingHorizontal: 30,
    fontWeight: '500',
    textAlign: 'left',
    width: px(130),
    color: 'black',
  },
  cellTaxNumber: {
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    paddingHorizontal: 30,
    fontWeight: '500',
    textAlign: 'left',
    width: px(150),
    color: 'black',
  },
  cellView: {
    flex: 1,
    width: px(130),
    height: px(54),
    justifyContent: 'center',
  },
  cellViewTaxNumber: {
    flex: 1,
    width: px(150),
    height: px(54),
    justifyContent: 'center',
  },
  cellLast: {
    flex: 1,
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    paddingHorizontal: 30,
    fontWeight: '500',
    textAlign: 'left',
    minWidth: px(100),
    color: 'black',
  },
  noDataView: {
    height: px(300),
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: SIZES.medium15,
    fontWeight: '500',
    color: 'black',
  },
  flatlistHeight: {
    height: deviceHeight - px(120),
  },
});
