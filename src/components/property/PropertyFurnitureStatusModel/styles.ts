import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  actionSheetItem: {
    height: px(50),
    width: deviceWidth,
    borderBottomColor: '#DBDBDB',
    backgroundColor: ColorTheme.white,
    marginBottom: px(10),
  },

  element_main: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
  },

  element: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  subsubelement: {
    marginTop: px(10),
  },

  style_view: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: px(10),
  },
  topView: {
    marginTop: px(30),
    gap: px(280),
    paddingHorizontal: px(10),
    paddingVertical: px(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  HeaderView: {
    paddingHorizontal: px(30),
    paddingVertical: px(15),
    flexDirection: 'column',
    justifyContent: 'center',
  },

  placeHolderText: {
    fontSize: SIZES.medium18,
    fontWeight: '500',
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsMedium,
  },
  placeHolderSubText: {
    fontSize: SIZES.small,
    fontWeight: '400',
    color: ColorTheme.gray2,
    fontFamily: FONT.PoppinsMedium,
  },
  clearAllText: {
    fontSize: SIZES.small14,
    fontWeight: '500',

    color: ColorTheme.primaryColor,
  },

  furnishingScrollStyle: {
    width: deviceWidth,
    paddingLeft: px(40),
    paddingRight: px(40),
    paddingBottom: px(40),
    backgroundColor: ColorTheme.white,
    height: deviceHeight,
  },

  ScrollViewStyle: {
    margin: px(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  countViewStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ColorTheme.black,

    gap: px(30),
    width: px(120),
    borderWidth: 0.6,
    borderRadius: px(3),
    shadowColor: 'gray',
    paddingHorizontal: px(5),
    height: px(40),
  },

  countViewsubMinuse: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  countViewsubPluse: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  countText: {
    color: ColorTheme.black,
    alignItems: 'center',
  },

  countView: {
    width: px(22),
    height: px(22),
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberpadStyle: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  saveButton: {
    backgroundColor: ColorTheme.primary,
    alignSelf: 'center',
    borderRadius: px(5),

    paddingHorizontal: px(10),
    marginVertical: px(20),
  },

  modelViewStyle: { backgroundColor: ColorTheme.white, height: deviceHeight },
});
