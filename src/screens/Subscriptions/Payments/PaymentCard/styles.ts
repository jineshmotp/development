import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const modalstyles = StyleSheet.create({
  modelView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: px(50),
    marginTop: px(20),
  },

  modelHeaderView: {
    flex: 0.1,

    flexDirection: 'column',

    alignItems: 'center',
    alignContent: 'center',
  },

  modelHeaderText: {
    color: ColorTheme.black,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: px(0),
  },

  PaymentTxnNoView: {
    marginTop: px(10),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },

  PaymentTxnTextView: {
    // flex: 1,
    flexDirection: 'row',

    gap: 10,
  },

  PaymentTxnTextSubLeftView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'center',
  },

  PaymentTxnTextSubRightView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },

  modelHeaderBillNo: {
    color: ColorTheme.gray,
    fontWeight: 'normal',
    fontSize: SIZES.small,
    alignItems: 'flex-end',
  },

  modelSelectionView: {
    flex: 0.9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },

  modelSelectionSubscription: {
    flex: 0.5,

    flexDirection: 'column',
    width: deviceWidth,
  },

  SubscriptionText: {
    color: ColorTheme.gray,
    fontWeight: 'normal',
    fontSize: SIZES.small14,

    alignItems: 'flex-start',
    // alignContent: 'center',
  },

  SubscriptionDesciptionView: {
    // flexDirection: 'row',
    flexWrap: 'wrap',
    // gap: px(10),
  },
  SubscriptionDesciptionText: {
    color: ColorTheme.gray,
    fontWeight: 'normal',
    fontSize: SIZES.small,
  },

  modelSelectionSummary: {
    flex: 0.5,
    marginTop: px(50),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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

  cardViewModal: {
    width: deviceWidth / 1.05,
    height: px(200),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: ColorTheme.transparent,
    // marginTop: px(20),
    // padding: px(20),
    alignSelf: 'center',
    elevation: 0,
    borderRadius: px(8),
    // gap: px(10),
  },
  planRowHeader: {
    flexDirection: 'row',
    width: deviceWidth / 1.09,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    // marginBottom: 20,
    marginTop: 10,
  },

  planRowNew: {
    flexDirection: 'row',
    width: deviceWidth / 1.09,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  planRowButtom: {
    flex: 1,
    flexDirection: 'row',
    // width: deviceWidth / 1.2,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
  },

  planRowButtomView: {
    flex: 0.5,
  },

  textThickDescription: {
    width: deviceWidth,
    fontSize: SIZES.small,
    fontWeight: '600',
    fontFamily: FONT.PoppinsThin,
    color: 'black',
  },
  singleDetailDescription: {
    flexWrap: 'wrap',
    // height: px(50),
    // justifyContent: 'space-around',
    // alignItems: 'flex-start',
    // margin: 10,
  },
  sectionView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: px(10),
  },
  descriptionText: {
    textAlign: 'justify',
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small13,
    color: ColorTheme.black,
  },
  textThinHHeading: {
    fontSize: SIZES.small13,
    fontWeight: '800',
    fontFamily: FONT.PoppinsThin,
    color: ColorTheme.black,
  },

  planRow2: {
    flexDirection: 'row',
    width: deviceWidth / 1.09,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    // marginBottom: 20,
    // marginTop: 10,
  },

  singleDetail2: {
    height: px(20),
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 10,
  },

  singleDetail3: {
    height: px(10),
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 10,
  },
  textThick: {
    fontSize: SIZES.small,
    fontWeight: '800',
    fontFamily: FONT.PoppinsThin,
    color: 'black',
  },
  saveButton: {
    backgroundColor: ColorTheme.primary,
    alignSelf: 'center',
    borderRadius: px(5),
    width: px(150),
    paddingHorizontal: px(10),
    marginVertical: px(20),
  },
});
