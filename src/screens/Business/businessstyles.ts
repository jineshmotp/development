import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const businessstyles = StyleSheet.create({
  initialContainer: {
    padding: px(20),
    backgroundColor: ColorTheme.onboardingPrimary,
  },
  keyboardView: { flex: 1, paddingBottom: 20 },
  initialText: {
    fontSize: px(16),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.white,
    fontWeight: 'bold',
    marginTop: px(10),
  },
  lineText: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.white,
    marginTop: px(20),
  },
  backgroundImg: {
    height: deviceHeight / 6,
    width: deviceWidth,
    backgroundColor: ColorTheme.white,
    elevation: 5,
    overflow: 'hidden',
    // opacity: 0.6,
  },

  uploadText: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.onboardingPrimary,
    fontWeight: 'bold',
    top: px(100),
    left: px(180),
  },
  userCamera: {
    height: 37,
    width: 37,
    borderRadius: 30,

    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 30,
  },
  topProfileView: {
    marginBottom: 30,
  },
  userProfile: {
    backgroundColor: ColorTheme.white,
    // padding: 5,
    borderRadius: 100,
    position: 'absolute',
    left: 20,
    bottom: -45,

    borderWidth: 0.5,
    borderColor: ColorTheme.onboardingPrimary,
    elevation: 5,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileCamera: {
    height: 25,
    width: 25,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2,

    backgroundColor: ColorTheme.white,
    elevation: 5,
  },
  formContainer: {
    // padding: px(20),
    marginTop: px(20),
    paddingBottom: px(20),
  },
  businessText: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.black,
    fontWeight: 'bold',
    marginTop: px(20),
    marginLeft: px(20),
  },
  transparentContainer: {
    width: deviceWidth,
    backgroundColor: '#F5F9F9',
    marginTop: px(10),

    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: ColorTheme.transparent,
    padding: px(10),
    paddingBottom: px(10),
    // opacity: 0.6,
  },
  labelText: {
    fontSize: px(12),
    fontFamily: FONT.PoppinsRegular,
    color: '#333333',
    marginLeft: px(10),
    marginTop: px(10),
  },
  labelTextMandatory: {
    color: ColorTheme.red,
  },
  cinStyle: {
    height: px(43),
    width: deviceWidth / 1.15,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: '#3333',
    borderColor: ColorTheme.gray,
    backgroundColor: ColorTheme.white,
    marginLeft: px(5),
    marginTop: px(10),
  },
  inputStyle: {
    height: px(43),
    width: deviceWidth / 1.09,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: '#3333',
    borderColor: ColorTheme.gray,

    backgroundColor: ColorTheme.white,
    alignSelf: 'center',
    marginTop: px(10),
  },

  documentStyle: {
    height: px(43),

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    width: deviceWidth / 1.09,

    borderColor: ColorTheme.gray,
    borderRadius: px(12),

    backgroundColor: ColorTheme.businessdropdownbackground,
    alignSelf: 'center',
    marginTop: px(10),
  },

  documentTextStyle: {
    marginLeft: px(20),
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: ColorTheme.gray,
  },

  documentUploadIcon: {
    marginLeft: px(10),
  },

  outlineBorderStyle: {
    borderRadius: px(12),
    borderColor: '#D8D8D8',
  },

  descriptionText: {
    fontSize: px(12),
    fontFamily: FONT.PoppinsRegular,
    color: '#3333',
    marginLeft: px(10),
  },
  topScrollStyle: {
    backgroundColor: 'white',
  },
  touchableContainer: {
    borderRadius: px(12),
    width: '30%',
    backgroundColor: ColorTheme.white,
    justifyContent: 'center',
    minHeight: px(48),
    elevation: Platform.OS === 'android' ? 2 : 4,
    marginHorizontal: px(5),
    marginTop: px(10),
    paddingVertical: px(10),
    paddingHorizontal: px(12),

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  submitView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: px(0),
    paddingHorizontal: px(12),
  },

  submitContainer: {
    borderRadius: px(8),
    backgroundColor: ColorTheme.onboardingPrimary,
    justifyContent: 'center',
    elevation: 0,
    marginHorizontal: px(5),
    marginTop: px(10),

    paddingVertical: px(10),
    paddingHorizontal: px(12),
    width: Platform.OS === 'android' ? deviceWidth / 3 : deviceWidth / 2,
    alignSelf: 'center',
  },
  touchableText: {
    color: ColorTheme.white,
    fontFamily: FONT.PoppinsRegular,
    fontWeight: '600',
    fontSize: px(12),
    textAlign: 'center',
  },
  touchableButtonText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,
    fontWeight: '600',
    fontSize: px(12),
    textAlign: 'center',
    flexWrap: 'wrap',
  },

  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: px(10),
  },
  selectedCategory: {
    backgroundColor: ColorTheme.onboardingPrimary,
  },

  selectedText: {
    color: 'white',
  },
  errorText: {
    color: ColorTheme.red,
    fontFamily: FONT.PoppinsRegular,
    marginLeft: px(10),
    fontSize: px(12),
  },
  mapView: {
    width: deviceWidth,
    height: deviceHeight / 3,

    alignSelf: 'center',
  },
  layoutView: {
    width: deviceWidth / 1.09,
    height: deviceHeight / 4,
    backgroundColor: ColorTheme.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '80%',
  },
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
  icon: {
    marginRight: px(5),
  },
  label: {
    position: 'absolute',
    backgroundColor: ColorTheme.white,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: px(12),
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: px(40),
    fontSize: px(14),
  },

  seperationView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainerLeft: {
    flex: 0.5,
    padding: px(0),

    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  scrollContainerRight: {
    flex: 0.5,
    padding: px(0),
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distributes space evenly between columns
    marginBottom: 10,
  },

  // checkbox container

  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Distributes space evenly between columns
    // marginBottom: 10,
    // paddingHorizontal: px(25),
    alignItems: 'center',
    alignContent: 'center',
  },

  checkboxLeftView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  checkboxRightView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  checkboxcenterView: {
    flex: 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  checkboxcenterOtherView: {
    flex: 0.19,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  checkboxcenterLine: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.checkboxcolorLine,
    height: px(0.5),

    padding: px(1),

    width: px(10),
    borderRadius: px(3),

    alignContent: 'center',
  },

  AmountRightView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  renderText: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
    marginTop: px(10),
    paddingVertical: px(5),
  },
  selectedTextModal: {
    backgroundColor: ColorTheme.onboardingPrimary,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: ColorTheme.white,
  },

  selectionChipsView: {
    // padding: px(10),
    // width: deviceWidth / 1.09,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // marginLeft: px(20),
    paddingVertical: px(5),
    paddingHorizontal: 5,
    width: deviceWidth / 1.09,
  },

  selectionChipsStyle: {
    minWidth: px(100),
    height: px(40),
    paddingLeft: px(5),
    paddingRight: px(5),
    backgroundColor: ColorTheme.onboardingPrimary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: px(2),
    borderRadius: px(12),
  },
});
