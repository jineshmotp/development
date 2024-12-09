import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';

export const styles = StyleSheet.create({
  checkboxBase: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: ColorTheme.primary,
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
  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '500',

    color: 'black',
  },
});
