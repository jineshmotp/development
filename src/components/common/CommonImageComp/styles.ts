import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  imageTopView: {
    position: 'relative',
  },
  imgStyles: {
    width: deviceWidth / 2.3,
    height: deviceWidth / 2.3,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    borderRadius: 20,
  },
  playIcon: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
