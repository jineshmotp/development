import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    gap: 5,

    width: deviceWidth / 1.09,
    alignSelf: 'center',
    alignItems: 'center',
  },
  popularText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 15,
    color: ColorTheme.nearLukGray,
    marginBottom: 10,
  },
  searchParentContainer: {
    height: 48,
    marginTop: 50,
  },
  recentText: {
    fontFamily: FONT.PoppinsMedium,
    // fontSize: 15,
    color: ColorTheme.nearLukGray,
    marginBottom: 10,
  },
  historyText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    color: ColorTheme.nearLukGray,
  },
  lineContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 25,
    borderColor: ColorTheme.nearLukGray,
  },
  categoryImage: {
    width: 60,
    height: 60,
  },
  demandingProperties: {
    width: 120,
    height: 130,
    borderRadius: 10,
  },
  categoryText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    color: ColorTheme.nearLukGray,
    textAlign: 'center',
    marginTop: 10,
  },
  categText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    marginLeft: px(20),
    color: ColorTheme.nearLukGray,

    marginTop: 10,
  },
  subText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    marginLeft: px(20),
    color: ColorTheme.nearLukGray,

    marginTop: px(20),
  },
  viewText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    marginRight: px(20),
    color: ColorTheme.nearLukGray,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginTop: px(10),
  },
  propertyText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small14,
    marginTop: 10,
    color: 'black',
  },
  searchChild: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: ColorTheme.nearLukGray2,
    gap: 5,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    // padding: 5,
    paddingLeft: 5,
    borderRightWidth: 1,
    borderRightColor: ColorTheme.nearLukGray2,
    color: 'black',
  },
  residentialText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small14,

    marginTop: 5,
    color: ColorTheme.nearLukGray,
  },
  priceText: {
    fontFamily: FONT.PoppinsRegular,
    marginTop: 5,
    fontSize: SIZES.small14,
    color: 'black',
  },
  mainContainer: {
    paddingBottom: 20,
  },
  micCOntainer: {
    borderRadius: 100,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularContainer: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 30,
  },
  popularChild: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    margin: 5,
    gap: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 2,
    width: deviceWidth / 3.5,
    height: 100,
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  recentSearchChip: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    borderColor: ColorTheme.nearLukGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
  },
  recentChipCont: {
    gap: 10,
  },

  highDemandProject: {
    gap: 30,
  },
  dropdown: {
    marginHorizontal: px(15),
    height: px(40),
    backgroundColor: ColorTheme.white,
    width: deviceWidth / 1.07,
    borderRadius: 10,
    marginVertical: 10,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
    marginLeft: 15,
  },
  textItem: {
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
    marginLeft: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    color: 'black',
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterView: {
    flex: 0.5,
    width: '90%',
    alignSelf: 'center',
  },
  miniContainer: {
    width: '100%',
    height: Platform.OS === 'android' ? '89%' : '89%',
  },
  touchableView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  filterImage: {
    width: 10,
    height: 10,
  },

  filterText: {
    fontSize: px(14),

    marginLeft: px(20),
    marginTop: px(20),
    fontFamily: FONT.PoppinsRegular,

    color: ColorTheme.black,
  },
  contentView: {
    width: '100%',
    paddingBottom: 20,
  },
  resultView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  renderView: {
    marginVertical: 5,
    marginTop: 20,
  },
  lastContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    height: 500,
  },
  lastText: {
    fontSize: SIZES.small14,
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.gray,
  },
  button: {
    borderRadius: px(6),
    backgroundColor: 'white',
    marginTop: px(10),
    elevation: 5,
    paddingHorizontal: px(18),
    paddingVertical: px(12),
  },
  subbutton: {
    borderRadius: px(6),
    backgroundColor: 'white',
    marginTop: px(10),
    elevation: 5,
    width: px(165),
    height: px(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: px(30),
    height: px(30),
  },
  buttonText: {
    color: ColorTheme.black,
    marginLeft: px(10),
  },
  rentText: {
    color: ColorTheme.black,
  },
  navChild: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    // marginBottom: 10,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  locationText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
  },
  areaText: {
    fontFamily: FONT.PoppinsRegular,
    width: 200,
    fontSize: 10,
    color: 'black',
    fontWeight: '600',
  },
});
