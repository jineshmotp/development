import { StyleSheet } from 'react-native';

import { deviceHeight, deviceWidth } from '@/utils';

export const style = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
