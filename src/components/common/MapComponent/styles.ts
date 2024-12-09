import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: deviceWidth / 1.2,
    shadowColor: 'gray',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.05,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 400,
    zIndex: 999,
    elevation: 20,
  },
});
