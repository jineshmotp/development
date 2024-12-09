import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorTheme.nearLukGray6,
  },
  itemContainer: {
    padding: px(10),
    borderBottomWidth: px(1),
    borderBottomColor: ColorTheme.nearLukGray4,
  },
  highlightName: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.small,
    fontWeight: 'bold',
    marginBottom: px(5),
    color: ColorTheme.black,
  },
  highlightDetails: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.small,
    color: ColorTheme.nearLukBaseLightColor,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.medium,
    color: ColorTheme.nearLukBaseLightColor,
  },
});
