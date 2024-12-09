import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';

export const styles = StyleSheet.create({
  checkboxBase: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: ColorTheme.gray,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: ColorTheme.primary,
  },
  appContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
