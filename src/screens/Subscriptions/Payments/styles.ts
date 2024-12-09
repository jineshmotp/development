import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  cardView: {
    width: deviceWidth / 1.05,
    height: px(200),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: ColorTheme.nearLukGray6,
    marginTop: px(20),
    padding: px(20),
    alignSelf: 'center',
    elevation: 5,
    borderRadius: px(8),
    gap: px(10),
  },
  singleDetail: {
    height: px(50),
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 10,
  },

  singleDetailRight: {
    height: px(50),
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    margin: 10,
  },

  textThin: {
    fontSize: SIZES.small13,
    fontWeight: '400',
    fontFamily: FONT.PoppinsThin,
    color: '#7E7E7E',
  },
  textThick: {
    fontSize: SIZES.small,
    fontWeight: '600',
    fontFamily: FONT.PoppinsThin,
    color: 'black',
  },

  textThickSuc: {
    fontSize: SIZES.small,
    fontWeight: '600',
    fontFamily: FONT.PoppinsThin,
    color: ColorTheme.nearLukSuccess,
  },
  textThickView: {
    fontSize: SIZES.small14,
    fontWeight: '600',
    fontFamily: FONT.PoppinsBold,
    color: '#139991',
  },
  planRow: {
    flexDirection: 'row',
    width: deviceWidth / 1.09,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
});
