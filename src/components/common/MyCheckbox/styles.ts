import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';

export const styles = StyleSheet.create({
  checkboxBase: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: ColorTheme.primary,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: ColorTheme.primary,
  },


});
