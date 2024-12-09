import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

const checkboxBaseSize = Math.min(deviceWidth * 0.06, deviceHeight * 0.06);

export const styles = StyleSheet.create({
  checkboxBaseOuter: {
    marginLeft: deviceWidth * 0.04, // Adjust the multiplier as needed
    marginRight: deviceWidth * 0.02, // Adjust the multiplier as needed
    width: checkboxBaseSize,
    height: checkboxBaseSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(100),
    borderWidth: px(2),
    borderColor: ColorTheme.gray2,
    backgroundColor: 'transparent',
  },

  checkboxBase: {
    width: deviceWidth * 0.03,
    height: deviceWidth * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(100),
    borderWidth: px(2),
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },

  checkboxBaseSelection: {
    backgroundColor: ColorTheme.primary,
  },

  checkboxChecked: {
    backgroundColor: ColorTheme.primary,
  },
  appContainer: {
    flexDirection: 'row',
    gap: 0,
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
});
