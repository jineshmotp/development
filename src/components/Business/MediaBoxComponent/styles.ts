import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    paddingRight: px(10),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  uploadBox: {
    borderStyle: 'dashed',
    borderRadius: px(10),
    borderColor: ColorTheme.gray,
    backgroundColor: ColorTheme.white,
    borderWidth: px(1),
    // padding: px(25),
    minHeight: px(100),
    minWidth: px(100),
    marginVertical: px(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    height: px(100),
    width: px(100),
    minHeight: px(100),
    minWidth: px(100),
    resizeMode: 'cover',
    borderRadius: px(10),
  },

  uploadBoxText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: px(12),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.black,
    lineHeight: px(18),
    fontWeight: '400',
  },

  uploadBoxWith: {
    borderColor: ColorTheme.onboardingPrimary,
    backgroundColor: ColorTheme.onboardingPrimary,
    borderBottomLeftRadius: px(10),
    borderBottomRightRadius: px(10),

    borderWidth: px(1),
    padding: px(1),
    minHeight: px(25),
    minWidth: px(100),
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',

    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  uploadBoxWithIcon: {
    borderColor: ColorTheme.white,
    backgroundColor: ColorTheme.white,
    // borderBottomLeftRadius: px(10),
    // borderBottomRightRadius: px(10),

    borderWidth: px(1),
    padding: px(1),
    height: px(35),
    width: px(35),
    position: 'absolute',
    bottom: px(2),
    left: px(2),
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteCrossButton: {
    borderColor: ColorTheme.red,
    backgroundColor: ColorTheme.red,
    borderBottomLeftRadius: px(25),
    borderBottomRightRadius: px(25),

    borderTopLeftRadius: px(25),
    borderTopRightRadius: px(25),

    borderWidth: px(5),
    padding: px(4),
    height: px(30),
    width: px(30),
    position: 'absolute',
    top: -6,
    right: -6,
  },

  removeIconStyle: {
    fontSize: SIZES.small,
    color: ColorTheme.white,
    fontWeight: '100',
  },

  uploadBoxTextWith: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: px(8),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.white,
    lineHeight: px(18),
    fontWeight: '400',
  },

  cardViewRightView: {
    // flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: px(30),
    width: px(64),
  },

  OpenContainer: {
    elevation: 2,
    height: px(25),
    width: px(64),
    padding: px(2),
    // padding: px(5),
    backgroundColor: ColorTheme.white,
    borderRadius: px(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  OpenContainerClose: {
    elevation: 2,
    height: px(25),
    width: px(64),
    padding: px(3),
    // padding: px(5),
    backgroundColor: '#D8D8D8',
    borderRadius: px(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  OpenViewLeft: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  OpenViewRight: {
    flex: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  colorStyle: {
    width: px(18),
    height: px(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(20),
    borderWidth: px(1),
    elevation: 5,
    borderColor: ColorTheme.checkboxcolorGreen,
    backgroundColor: ColorTheme.checkboxcolorGreen,

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  opencloseText: {
    fontSize: px(8),
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
  },

  fileStyle: {
    height: px(100),
    width: px(100),
    borderRadius: px(5),
  },
});
