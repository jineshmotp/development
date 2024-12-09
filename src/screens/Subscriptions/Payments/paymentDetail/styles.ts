import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  topView: { padding: px(20) },
  headLeft: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  billBorder: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: px(10),
    paddingHorizontal: px(15),
    paddingBottom: px(10),
    marginTop: px(20),
  },
  billHead: {
    fontSize: SIZES.medium15,
    fontWeight: '700',
    textAlign: 'center',
    padding: px(5),
    borderBottomColor: ColorTheme.nearLukGray4,
    borderBottomWidth: 1.5,
    color: 'black',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: px(7),
  },
  rowText: {
    fontSize: SIZES.small,
    color: ColorTheme.nearLukGray,
    fontWeight: '500',
  },
});
