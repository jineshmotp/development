import { StyleSheet } from 'react-native';

import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // gap: 10,
    alignItems: 'center',
    marginBottom: px(10),
    marginTop: px(10),
  },
  androidContainer: {
    // Apply specific styles for Android if needed
  },
  labelContainer: {
    flex: 1, // Take up remaining space
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
