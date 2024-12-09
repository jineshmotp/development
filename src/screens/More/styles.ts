import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  listContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth / 1.09,
    // backgroundColor: "aqua",
  },
  listItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorTheme.nearLukGray2,
    width: deviceWidth / 1.7,
    paddingVertical: px(12),
  },
  scroll: { flex: 1, width: deviceWidth, backgroundColor: 'rgba(250,250,250,0.3)' },
  topView: {
    marginTop: px(70),
    alignItems: 'center',
    width: deviceWidth,
  },
});
