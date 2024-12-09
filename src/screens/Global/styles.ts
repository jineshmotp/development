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
    paddingBottom: px(10),
    flex: 1,
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
    marginHorizontal: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
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
    fontSize: 16,
    color: 'black',
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterView: {
    height: Platform.OS === 'android' ? 50 : 30,
    width: '90%',
    alignSelf: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  miniContainer: {
    width: '100%',
    height: Platform.OS === 'android' ? '89%' : '89%',
    zIndex: -15,
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
    fontSize: SIZES.small,
    marginLeft: 10,
    fontFamily: FONT.PoppinsRegular,
    textAlign: 'center',
    color: 'black',
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

  modalContainer: {
    position: 'absolute',
    top: px(50),
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    borderRadius: px(5),
    shadowColor: ColorTheme.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: px(5),
    elevation: 5,
  },
  itemContainer: {
    padding: px(10),
    borderBottomWidth: px(1),
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: SIZES.medium,
    color: ColorTheme.black,
  },
});
