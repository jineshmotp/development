import { StyleSheet } from 'react-native';

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
  mainView: {
    margin: px(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Subsection: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: px(10),
    marginLeft: px(100),
    width: px(100),
    borderWidth: 0.6,
    borderRadius: px(3),
    shadowColor: ColorTheme.black,

    paddingHorizontal: px(20),
    height: px(40),
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: px(6),
    width: px(75),
  },
  touchableStyle: {
    width: px(22),
    height: px(22),
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelText: {
    color: ColorTheme.black,
  },

  countText: {
    color: ColorTheme.black,
  },
});
