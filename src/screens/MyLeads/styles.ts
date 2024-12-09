import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  imgStyle: { width: px(13), height: px(13), marginLeft: 0 },
  tabContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    borderBottomColor: 'gray',
    marginTop: 15,
  },
  tabContainerView: {
    width: deviceWidth,
    justifyContent: 'space-between',
    alignSelf: 'center',
    //   borderWidth: 1,
    flexDirection: 'row',
  },
  tabView: {
    height: 35,
    borderBottomWidth: 4,
    flex: 1,
    marginHorizontal: 0,
    minWidth: deviceWidth / 2.6,
    alignItems: 'center',
  },
  tabText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    // lineHeight: 21,
    textAlign: 'center',
    color: 'black',
  },
  container: {
    width: deviceWidth,
    alignItems: 'center',
    height: px(200),
    marginTop: px(5),
  },
  flatListStyle: {
    width: deviceWidth,
    height: deviceHeight,
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
    marginTop: px(50),
    height: px(200),
  },
  noDataText: {
    fontSize: SIZES.small,
    color: ColorTheme.black,
  },
  dividerView: { width: deviceWidth, alignItems: 'center' },
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

  leadsContainer: {
    flexDirection: 'row',
    width: deviceWidth,
    justifyContent: 'space-evenly',
  },
  leadsViewStyle: {
    borderRadius: px(15),
    elevation: px(5),
    shadowOffset: { width: 0, height: 1 },
    shadowColor: ColorTheme.black,
    shadowOpacity: 0.5,
    padding: px(20),
    backgroundColor: ColorTheme.white,
    margin: px(5),
    flexDirection:'row'
  },
  totalLeadsTextStyle: {
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
    color: ColorTheme.black,
    margin: px(5),
    fontSize: px(14),
  },
  totalLeadsLabelStyle: {
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
    margin: px(5),
    fontSize: px(16),
    color: ColorTheme.black,
  },
});
