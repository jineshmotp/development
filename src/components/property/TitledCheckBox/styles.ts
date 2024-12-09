import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },

  checkboxBase: {
    width: px(18),
    height: px(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(5),
    borderWidth: px(2),
    borderColor: ColorTheme.gray2,
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: ColorTheme.primary,
  },
  appContainer: {
    flexDirection: 'row',
    gap: px(4),
    alignItems: 'center',
  },

  appTitle: {
    marginVertical: px(16),
    fontWeight: 'bold',
    fontSize: SIZES.xLarge,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  labelStyle: {
    color: ColorTheme.black,
  },
});
