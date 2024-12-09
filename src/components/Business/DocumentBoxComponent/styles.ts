import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: px(10),
    padding: px(20),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },

  imageStyle: {
    height: px(100),
    width: px(100),
    minHeight: px(100),
    minWidth: px(100),
    resizeMode: 'cover',
    borderRadius: px(10),
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

  documentIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
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

  OpenContainerClose: {
    elevation: 2,
    height: px(30),
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

  fileStyle: {
    height: px(100),
    width: px(100),
    borderRadius: px(5),
  },
});
