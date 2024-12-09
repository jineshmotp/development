import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 1.05,
    height: px(150),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: ColorTheme.white,
    // marginTop: px(20),
    padding: px(20),
    alignSelf: 'center',
    elevation: 2,
    borderRadius: px(8),
    gap: px(10),

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  cardViewRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Distributes space evenly between columns
    marginTop: 10,

    // paddingHorizontal: px(25),
    alignItems: 'center',
    alignContent: 'center',
  },

  cardViewLeftView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  cardViewCenterView: {
    flex: 0.2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  cardViewRightView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  // Dropdown

  dropdown: {
    height: px(43),
    borderColor: ColorTheme.businessdropdownbackground,
    borderWidth: 0.5,
    borderRadius: px(12),
    paddingHorizontal: 8,
    width: deviceWidth / 3,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorTheme.businessdropdownbackground,
    marginTop: px(10),
    marginBottom: px(10),
    elevation: 2,

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  placeholderStyle: {
    fontSize: px(12),
    marginLeft: px(7),
    fontFamily: FONT.PoppinsSemiBold,
    color: '#3333',
  },
  selectedTextStyle: {
    fontSize: px(14),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: px(7),
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
  },

  iconStyle: {
    width: 20,
    height: 20,
    color: ColorTheme.black,
    paddingRight: px(20),
  },
  inputSearchStyle: {
    height: px(40),
    fontSize: px(14),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // open button

  OpenContainer: {
    // flex: 1,
    elevation: 2,
    height: px(30),
    width: px(60),
    padding: px(3),
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
    height: px(30),
    width: px(60),
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
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  OpenViewRight: {
    flex: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  colorStyle: {
    width: px(21),
    height: px(21),
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
    fontSize: px(10),
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
  },

  // toucahble day val

  daystyle: {
    height: px(43),
    borderColor: ColorTheme.businessdropdownbackground,
    borderWidth: 0.5,
    borderRadius: px(12),
    paddingHorizontal: 8,
    width: deviceWidth / 3,
    alignSelf: 'center',
    backgroundColor: ColorTheme.businessdropdownbackground,
    marginTop: px(10),
    marginBottom: px(10),
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  dayTextStyle: {
    fontSize: px(12),

    fontFamily: FONT.PoppinsSemiBold,
    color: '#095F5A',
    fontWeight: '500',
    lineHeight: px(18),
  },

  dayToText: {
    fontSize: px(12),

    fontFamily: FONT.PoppinsSemiBold,
    color: '#333333',
    fontWeight: '400',
    lineHeight: px(18),
  },
});
