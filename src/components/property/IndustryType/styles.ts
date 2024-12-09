import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ColorTheme.white,
  },

  containerViewStyle: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },

  parkingChip: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    padding: px(5),
    backgroundColor: ColorTheme.nearLukGray6,
    borderRadius: px(5),
    paddingHorizontal: px(10),
  },
});
