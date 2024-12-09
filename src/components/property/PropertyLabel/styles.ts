import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    marginTop: px(0),
    backgroundColor: ColorTheme.white,
    padding: px(10),
    paddingHorizontal: px(30),
    height: px(50),
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});
