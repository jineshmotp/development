import { Platform, StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 35,
    paddingRight: 35,
  },

  containerDivider: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  containerView: {
    shadowOpacity: Platform.OS === 'android' ? px(1) : px(0.3),
    shadowRadius: px(1),
    shadowColor: ColorTheme.gray,
    borderRadius: px(50),
    paddingHorizontal: px(20),
    elevation: 5,
    height: px(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: px(5),
  },
});
