import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  timer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  uploadBtn: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  absoluteView: {
    position: 'absolute',
    top: 10,
  },
  alignView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    paddingHorizontal: 20,
    top: 700,
  },
  iconView: {
    padding: 10,
    borderWidth: 1,
    borderColor: ColorTheme.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.white,
  },
  shutterView: {
    width: 75,
    height: 75,
    bottom: 50,
    borderRadius: 75,

    position: 'absolute',
    alignSelf: 'center',
  },
});
