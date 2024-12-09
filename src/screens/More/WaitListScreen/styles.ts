import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: ColorTheme.white,
    flexDirection: 'column',
  },

  WaitListMainView: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  JoinView: {
    flex: 0.1,

    alignContent: 'center',
    margin: px(15),
  },
  jointheWView: {
    fontSize: px(20),
    fontWeight: '700',
    color: '#095F5A',

    fontFamily: FONT.PoppinsRegular,
  },
  aitlistiew: { fontSize: px(20), fontWeight: '700', color: '#12C5BA', fontFamily: FONT.PoppinsRegular },
  WaitlistTxtView: {
    fontSize: px(15),
    fontWeight: '400',
    color: '#333333',
    marginTop: px(15),
    fontFamily: FONT.PoppinsRegular,
  },
  WaitListView: {
    flex: 0.9,

    backgroundColor: '#E8E8E8',
    width: 420,
    height: 740,
  },
  WaitListInSideView: { margin: px(20), justifyContent: 'center' },
  WaitListNameMainView: { marginTop: px(15) },
  WaitListNameView: {
    fontSize: px(12),
    fontWeight: 400,
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,
  },
  WaitListNameTxtView: {
    width: 374,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: px(8),
    marginTop: px(10),
    elevation: 5,
  },

  inputStyle: {
    width: deviceWidth / 1.09,
    height: px(40),
    backgroundColor: '#FFFFFF',
    borderRadius: px(8),
    marginTop: px(10),
    elevation: 5,
    fontSize: px(12),
  },

  outlineBorderStyle: {
    borderRadius: px(8),
    borderColor: '#D8D8D8',
  },

  selectWESView: { flexDirection: 'row', justifyContent: 'space-between', padding: px(10) },

  CommunicationView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: px(10),
    width: px(30),
    height: px(40),
    backgroundColor: ColorTheme.white,
    borderRadius: px(7.4),
    marginTop: px(10),
    elevation: 3,
    fontWeight: '500',
  },

  CommunicationViewGyap: {
    flex: 0.05,
  },

  CommunicationViewLeft: {
    flex: 0.2,
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'center',
  },
  CommunicationViewRight: {
    flex: 0.8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  CommunicationButtonImage: {
    width: px(25),
    height: px(25),
  },

  communicationLabel: {
    fontSize: px(12),
    fontWeight: '600',
    color: ColorTheme.black,
    lineHeight: px(18),
  },

  communicationLabelSelect: {
    fontSize: px(12),
    fontWeight: '600',
    color: ColorTheme.nearLukBasePrimaryColor,
    lineHeight: px(18),
  },

  SearchEngineColorView: {
    width: 374,
    height: 111,
    backgroundColor: '#095F5A',
    borderRadius: px(10),
    marginTop: px(15),
    elevation: 5,
  },
  SearchEngineHeaderView: {
    padding: px(10),
    paddingLeft: px(23),
    fontSize: px(15),
    fontWeight: '500',
    color: '#FFF',
    fontFamily: FONT.PoppinsRegular,
  },
  SubmitMainView: { marginTop: px(20), width: 373, height: 40, borderRadius: px(12) },
  SubmitTouchable: { alignSelf: 'center', padding: px(10) },
  SubmitTxt: { fontSize: px(15), fontWeight: '700', color: '#FFFFFF', fontFamily: FONT.PoppinsRegular },

  dropdown: {
    height: px(43),
    borderColor: '#D8D8D8',
    borderWidth: 0.5,
    borderRadius: px(12),
    paddingHorizontal: 8,
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    backgroundColor: ColorTheme.white,
    marginTop: px(10),
    marginBottom: px(10),
  },

  dropdownGreen: {
    height: px(43),
    borderColor: '#D8D8D8',
    borderWidth: 0.5,
    borderRadius: px(12),
    paddingHorizontal: 8,
    width: deviceWidth / 1.2,
    alignSelf: 'center',
    backgroundColor: ColorTheme.white,
    marginTop: px(10),
    marginBottom: px(10),
  },

  placeholderStyle: {
    fontSize: px(12),
    marginLeft: px(7),
    fontFamily: FONT.PoppinsSemiBold,
    color: '#3333',
  },
  selectedTextStyle: {
    fontSize: px(14),
    marginLeft: px(7),
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
  },

  inputSearchStyle: {
    height: px(40),
    fontSize: px(14),
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
});
