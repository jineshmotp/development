import { StyleSheet } from 'react-native';

import { deviceHeight, deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  NearlukContainer: {
    flex: 1,
  },
  ImageView: {
    resizeMode: 'cover', // Changed from 'cover' to 'contain'
    width: '100%',
    height: '100%',
  },
});
