import { StyleSheet } from 'react-native';

import { colors, ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  // scrollViewStyle: {  },

  businessBackgroundImage: {
    width: deviceWidth,
    height: deviceHeight / 4,
  },
  initialContainer: {
    width: deviceWidth,
    backgroundColor: ColorTheme.white,
    padding: px(15),
  },
  nameText: {
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
    color: ColorTheme.black,

    fontSize: px(16),
  },
  categoryText: {
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.black,
    fontWeight: '700',
    marginTop: px(10),
    fontSize: px(12),
  },
  editText: {
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.onboardingPrimary,
    marginTop: px(10),
    fontWeight: '700',
    fontSize: px(12),
  },
  businessBackgroundcontainer: {
    width: deviceWidth,
    height: deviceHeight / 4,
    backgroundColor: 'white',
    elevation: 5,
  },

  topProfileView: {
    marginBottom: px(60),
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

  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight - px(600),
  },
  noDataText: {
    fontSize: SIZES.medium18,
    color: 'black',
  },

  profileImageStyle: { width: px(80), height: px(80), borderRadius: px(40), backgroundColor: colors.black },
  cameraContainer: { marginLeft: px(40) },
  cameraImageStyle: {
    width: px(20),
    height: px(20),
    borderRadius: px(10),
    backgroundColor: colors.black,
    marginLeft: px(60),
    marginTop: px(-25),
  },
  businessNameContainer: { flexDirection: 'row', marginBottom: px(5) },
  businessNameStyle: { position: 'absolute', alignSelf: 'center' },
  businessDescriptionStyle: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(12),
    fontWeight: '300',
    color: colors.black,
  },
  belowContainer: { marginHorizontal: px(15), marginVertical: px(20) },
  buttonStyle: { width: px(160), backgroundColor: ColorTheme.white },
  nameTextStyle: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(12),
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: px(40),
    marginTop: px(20),
  },
  ratingStyle: { paddingVertical: 5, alignSelf: 'flex-start', marginLeft: px(40) },
  descriptionTextStyle: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.onboardingPrimary,
  },
  idealText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.onboardingPrimary,
    marginTop: px(10),
    marginLeft: px(20),
  },
  locationText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),

    color: ColorTheme.black,
    marginTop: px(10),
    marginLeft: px(20),
  },
  amenitiesText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.onboardingPrimary,
  },
  followersTextStyle: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.black,
    marginLeft: px(40),
  },
  followTextStyle: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.onboardingButton,
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: px(5) },
  projectDetailsContainer: { flexDirection: 'row', marginVertical: px(5), paddingHorizontal: px(20) },
  touchableText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,

    fontSize: px(12),
    textAlign: 'center',
  },
  propertyButtonStyle: { width: deviceWidth / 1.09, marginTop: px(20) },
  buttonViewStyle: { alignItems: 'center', marginHorizontal: px(10) },
  listViewContainer: { marginVertical: px(20), backgroundColor: ColorTheme.white },
  selectedItemStyle: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(11),
    fontWeight: 'bold',
    color: ColorTheme.black,
    textDecorationLine: 'underline',
    margin: px(10),
  },

  areaContainer: {
    paddingHorizontal: px(10),
    backgroundColor: ColorTheme.white,
    borderRadius: px(5),
    width: deviceWidth / 3.3,
    paddingVertical: px(10),
  },
  mapView: {
    width: deviceWidth / 1.07,
    height: deviceHeight / 3,

    alignSelf: 'center',
  },
  areaText: {
    color: ColorTheme.primaryColor,
    fontFamily: FONT.PoppinsRegular,

    fontSize: px(12),
    textAlign: 'center',
  },
  valueText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,
    marginTop: px(20),

    fontSize: px(12),
    textAlign: 'center',
  },
  viewText: {
    color: ColorTheme.onboardingButton,
    fontFamily: FONT.PoppinsRegular,
    marginTop: px(20),

    fontSize: px(12),
    textAlign: 'center',
  },

  underlineViewStyle: {
    backgroundColor: ColorTheme.onboardingButton,
    borderRadius: px(5),
    marginHorizontal: px(5),
    marginBottom: px(10),
    padding: px(1),
  },
  nonUnderlineViewStyle: {
    marginRight: px(5),
    marginBottom: px(5),
  },
  itemStyle: {
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.black,
    fontSize: px(11),
    fontWeight: 'bold',
    marginVertical: px(5),
    marginHorizontal: px(10),
    padding: 5,
  },
  viewStyle: {
    paddingHorizontal: px(65),
  },
  rowContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginTop: px(10),

    justifyContent: 'space-between',
  },
  rowView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'red',
    marginTop: px(10),
    width: deviceWidth / 1.15,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  businessCardContainer: {
    backgroundColor: ColorTheme.white,
    width: deviceWidth / 1.05,
    alignSelf: 'center',
    padding: px(15),
  },
  builderContainer: {
    flexDirection: 'row',
    width: deviceWidth / 1.05,
    alignSelf: 'center',
    margin: px(10),
    gap: px(10),
  },
  builderContainerNoDate: {
    justifyContent: 'space-evenly',
  },
  layoutView: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    paddingBottom: px(40),
    paddingHorizontal: px(20),
    // backgroundColor: 'red',
  },
  layoutViewSpaceAround: {
    justifyContent: 'space-between',
  },

  subContainer: {
    padding: px(15),
    borderRadius: px(8),
    backgroundColor: 'green',
  },
  subText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,
    marginLeft: px(5),
    fontSize: px(12),
  },
  headText: {
    color: ColorTheme.onboardingPrimary,
    fontFamily: FONT.PoppinsRegular,
    fontWeight: 'bold',
    fontSize: px(12),

    // textAlign: 'center',
  },
  ProjectHeighLightsContainer: {
    backgroundColor: ColorTheme.white,
    marginTop: px(15),
    width: deviceWidth / 1.05,
    alignSelf: 'center',
    padding: px(15),
    borderRadius: px(8),
  },

  buildingContainer: {
    width: deviceWidth / 1.05,
    height: deviceHeight / 4,
  },
  propertyImageStyle: {
    height: '100%',
    width: '100%',
  },
  typesImage: {
    height: px(30),
    width: px(15),
  },
  propertyListStyle: {
    marginHorizontal: px(10),
    flexDirection: 'row',
  },
  propertyTextStyle: {
    fontSize: px(12),
    marginTop: px(10),
    color: ColorTheme.black,
  },
  propertyDetailsStyle: {
    backgroundColor: ColorTheme.white,
    margin: px(10),
    borderRadius: px(5),
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    // borderWidth:2,
    borderColor: 'red',
    padding: px(5),
    height: deviceHeight / 3,
    width: deviceWidth / 1.6,
  },
  imageBackgroundStyle: {
    flex: 1,
  },

  propertyCard: {
    width: '95%',
    paddingBottom: px(5),
    backgroundColor: ColorTheme.white,
    borderRadius: px(5),
    alignSelf: 'center',
    marginTop: px(15),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  propertyCardStyle: {
    width: '95%',
    // paddingBottom: px(20),
    // backgroundColor: ColorTheme.white,
    // borderRadius: px(5),
    alignSelf: 'center',
    // marginTop: px(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  propertyText: {
    color: ColorTheme.gray,
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(10),
    marginHorizontal: px(5),
  },

  PropertyLabel: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(11),
    fontWeight: 'bold',
    color: colors.black,
    margin: px(5),
  },

  PropertyLabelStyle: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(11),
    fontWeight: 'bold',
    color: colors.black,
    margin: px(5),
  },
  PropertyBlue: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(11),
    fontWeight: 'bold',
    color: ColorTheme.onboardingButton,
    margin: px(5),
  },
  propertyViewStyle: {
    width: '100%',
    marginVertical: px(5),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: px(130),
  },
  forSaleStyle: { backgroundColor: '#1A938C', borderRadius: px(5), justifyContent: 'center', alignItems: 'center' },
  whiteTextStyle: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(12),
    fontWeight: '500',
    color: ColorTheme.white,
    margin: px(5),
    padding: px(5),
  },
  nextImageStyle: {
    width: px(30),
    height: px(30),
    borderRadius: px(15),
    marginHorizontal: px(10),
    backgroundColor: ColorTheme.white,
  },
  viewMargin: {
    margin: px(0),
  },
  amenticeView: {
    flexDirection: 'row',
    margin: px(15),
  },
  amenticeViewStyle: {
    width: px(120),
    height: px(80),
    marginHorizontal: px(5),
    marginTop:px(10)
  },
  amenticeText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(10),
    textAlign: 'center',

    marginTop: px(10),
  },
  amenticeImage: {
    width: '100%',
    height: '100%',
  },

  flatPropertyStyle: {
    flexDirection: 'column',
    flex: 1,
  },
  porpertyViewStyle: { flexDirection: 'row', justifyContent: 'space-around', paddingBottom: px(40) },

  inputStyle: {
    height: px(43),
    width: deviceWidth / 1.09,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: 'black',
    marginBottom: -px(20),
  },

  arrowContainer: {
    height: 35,
    width: 35,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    right: 20,
    zIndex: 2,

    backgroundColor: ColorTheme.white,
    elevation: 5,
  },
  arrowlistingContainer: {
    height: 35,
    width: 35,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2,

    backgroundColor: ColorTheme.white,
    elevation: 5,
  },
  scrollContainer: {
    backgroundColor: ColorTheme.white,
    paddingVertical: px(5),
    paddingHorizontal: px(10),
    marginTop: px(10),
  },
  loaderContainer: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: ColorTheme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  leadsContainer: {
    flexDirection: 'row',
    width: deviceWidth,
    justifyContent: 'space-evenly',
  },
  cinContainer: {
    flexDirection: 'row',
    width: deviceWidth / 1.05,
    justifyContent: 'space-around',
    alignSelf: 'center',
    backgroundColor: ColorTheme.white,
    paddingVertical: px(20),
    marginTop: px(10),
  },
  cinSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cinNumContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: px(20),
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
  lastGradientView: {
    right: 0,
    height: 90,
  },
  cinText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.onboardingButton,
  },
  numberText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: '500',
    color: ColorTheme.black,
  },
  localityText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    fontWeight: '500',
    color: ColorTheme.black,
    marginLeft: px(10),
    paddingRight: px(20),
  },
  defaultProfile: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  ownerText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: 'white',
  },
});
