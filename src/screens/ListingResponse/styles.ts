import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: px(5),
  },
  postedText: {
    fontSize: SIZES.small,
    paddingLeft: 4,
    lineHeight: px(18),
    fontWeight: '400',
    fontFamily: FONT.PoppinsRegular,
    color: 'black',
  },
  topView: { width: deviceWidth },
  container: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: px(15),
  },
  propView: {
    borderBottomColor: ColorTheme.nearLukGray4,
    borderBottomWidth: 1,
    height: px(110),
    width: deviceWidth / 1.09,
    marginTop: 20,
  },
  propDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propName: {
    fontSize: SIZES.large,
    fontFamily: FONT.PoppinsBold,
    fontWeight: '700',
  },
  priceText: {
    fontSize: SIZES.large,
    fontFamily: FONT.PoppinsBold,
    fontWeight: '700',
    color: 'black',
  },
  propLoc: { marginVertical: 13 },
  filterView: {
    width: deviceWidth / 1.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardView: {
    width: deviceWidth,
    alignItems: 'center',
    height: px(200),
  },
  flatListStyle: {
    width: deviceWidth,
    height: deviceHeight - 240,
    backgroundColor: 'white',
  },
  divider: {
    width: deviceWidth,
    height: 10,
    borderTopColor: ColorTheme.nearLukGray4,
    borderTopWidth: 1,
    borderBottomColor: 'white',
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: SIZES.small11,
    color: 'black',
  },
  dividerView: {
    width: deviceWidth,
    alignItems: 'center',
  },
  filterModal: {
    width: px(200),
    height: px(200),
  },
  ModalView: {
    marginTop: px(50),
  },
  optionView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: px(40),
    width: px(200),
    borderBottomColor: ColorTheme.nearLukGray4,
    borderBottomWidth: 0.5,
  },
  optionText: {
    fontSize: SIZES.medium15,
    color: 'black',
    fontWeight: '400',
  },
});
