import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  imgStyle: { width: px(15), height: px(15), marginLeft: 0 },
  itemContainer: {
    borderBottomColor: ColorTheme.nearLukGray4,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  editView: {
    flexDirection: 'row',
    width: deviceWidth / 1.09,
    marginTop: 10,
    gap: 5,
  },
  containerStyle: {
    flex: 1,
  },
  chipStyle: {
    backgroundColor: ColorTheme.primary,
  },
  topTabContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    borderBottomColor: 'gray',
    marginTop: 15,
  },
  topTabView: {
    width: deviceWidth / 1.09,
    justifyContent: 'space-between',
    alignSelf: 'center',
    //   borderWidth: 1,
    flexDirection: 'row',
  },
  topTab: {
    height: 35,
    borderBottomWidth: 4,
    flex: 1,
  },
  topTabText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    // lineHeight: 21,
    color: 'black',
    textAlign: 'center',
  },
  containerView: {
    width: deviceWidth / 1.09,
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
  inputStyle: {
    height: px(43),
    width: deviceWidth / 1.09,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: 'black',
    marginBottom: -px(20),
  },
  SearchInput: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
