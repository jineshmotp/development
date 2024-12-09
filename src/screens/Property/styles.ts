import { StyleSheet } from 'react-native';

import { colors, ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';
import globalStyles from '@/utils/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ColorTheme.white,
  },

  SectionSeperation: {
    marginBottom: px(20),
  },

  keyboardAvoid: {
    flex: 1,
    paddingBottom: px(25),
  },

  mainView: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: px(10),
  },

  inputStyle: {
    height: px(40),
  },

  buttonStyle: {
    backgroundColor: ColorTheme.primary,
    alignSelf: 'center',
    borderRadius: px(5),
    paddingHorizontal: px(10),
    marginVertical: px(20),
  },

  buttonPreviewStyle: {
    backgroundColor: ColorTheme.white,
    alignSelf: 'center',
    borderWidth: px(1),
    borderRadius: px(5),
    borderColor: ColorTheme.gray,

    paddingHorizontal: px(5),
    marginVertical: px(0),
  },

  topSectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: px(10),
  },

  userIconSheet: {
    width: px(50),
    height: px(50),
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: px(100),
    backgroundColor: ColorTheme.primary,
  },
  userLetter: {
    textTransform: 'capitalize',
    fontSize: SIZES.xLarge,
    fontFamily: FONT.PoppinsBold,
    lineHeight: px(35),
    color: ColorTheme.black,
  },

  modalView: {
    width: deviceWidth,
    // alignSelf: 'flex-start',
    marginTop: px(20),
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  RNViewContainer: {
    width: deviceWidth,

    alignContent: 'center',
    alignItems: 'center',
    height: px(45),
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: px(1),
  },
  RNViewTextStyle: {
    color: ColorTheme.black,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: deviceWidth,
    shadowColor: 'gray',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingBottom: px(100),
    // overflow: 'hidden',
  },

  modelHeaderView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  modelHeaderText: {
    color: ColorTheme.black,
    fontWeight: 'bold',
  },

  modelSelectionView: {
    flex: 0.9,

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingBottom: px(150),
  },

  modelSectionStyle: {
    height: px(50),
    width: px(200),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    // paddingLeft: px(100),
    // paddingRight: px(100),
    backgroundColor: ColorTheme.transparent,
    borderColor: ColorTheme.gray2,
    borderRadius: px(5),
    borderWidth: 1,
    marginBottom: px(8),
  },

  modelSubscriptionText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: SIZES.small14,
    color: ColorTheme.black,
  },
  modelSubscriptionSubText: {
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: SIZES.xSmall,
    color: ColorTheme.gray,
  },
});
