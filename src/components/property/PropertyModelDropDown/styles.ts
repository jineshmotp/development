import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorTheme.white,
    width: deviceWidth / 1.2,
    padding: px(10),
    borderRadius: px(5),
    height: px(300),
  },
  btns: {
    margin: px(2),
    backgroundColor: '#e7e7e7',
    padding: px(7),
    borderRadius: px(5),
  },
  notfoundMsg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: px(150),
  },
});
