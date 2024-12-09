import { StyleSheet } from 'react-native';



import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';


export const styles = StyleSheet.create({
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
    fontSize: px(12),
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
    borderColor: ColorTheme.onboardingPrimary,
    padding: px(10),
    // opacity: 0.6,
  },
  labelText: {
    fontSize: px(12),
    fontFamily: FONT.PoppinsRegular,
    color: '#3333',
    marginLeft: px(10),
    marginTop: px(10),
  },
  cinStyle: {
    height: px(43),
    width: deviceWidth / 1.15,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: '#3333',
    borderColor: ColorTheme.gray,
    backgroundColor: ColorTheme.white,
    marginLeft:px(5),
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
    borderRadius: 5,
    backgroundColor: ColorTheme.white,
    justifyContent: 'center',
    elevation: 5,
    marginHorizontal: px(5),
    marginTop: px(10),
    paddingVertical: px(10),
    paddingHorizontal: px(12),
  },
  submitContainer: {
    borderRadius: 5,
    backgroundColor: ColorTheme.onboardingButton,
    justifyContent: 'center',
    elevation: 5,
    marginHorizontal: px(5),
    marginTop: px(10),
    paddingVertical: px(10),
    paddingHorizontal: px(12),
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  touchableText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,

    fontSize: px(12),
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: px(10),
  },
  selectedCategory: {
    backgroundColor: ColorTheme.primary,
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
    width: deviceWidth / 1.07,
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
    borderColor: ColorTheme.black,
    borderWidth: 0.5,
    borderRadius: 4,
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
});