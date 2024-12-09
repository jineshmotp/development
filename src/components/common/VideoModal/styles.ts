import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';

export const styles = StyleSheet.create({
  playIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  closeButton: { color: 'black', fontSize: SIZES.medium18, fontWeight: 'bold' },
});
