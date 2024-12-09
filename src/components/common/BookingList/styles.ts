import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const style = StyleSheet.create({
  categoryContainer: {
    height: 60,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBDBDB',
  },
  categoryChips: {
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 20,
  },
  categoryChipsText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small13,
    color: 'black',
  },
  tabContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: ColorTheme.nearLukGray,
  },
  tabCategoryChips: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    paddingHorizontal: 20,
  },
  tabCategoryChipsText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.medium15,
    paddingBottom: SIZES.xSmall,
    color: 'black',
  },
  contentContainerStyle: {
    width: deviceWidth / 1.08,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flatView: {
    width: deviceWidth,
    alignItems: 'center',
  },
  flatContent: {
    gap: 20,
    marginTop: 20,
    paddingBottom: 280,
  },
  noDataView: {
    width: deviceWidth / 1.09,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: SIZES.medium15,
    color: 'black',
    fontFamily: FONT.PoppinsSemiBold,
  },
});
