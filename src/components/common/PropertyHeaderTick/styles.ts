import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  headerViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    marginTop: px(8),
    marginBottom: px(15),
  },

  baseDesign: {
    width: px(24),
    height: px(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(100),
    borderWidth: px(2),
    borderColor: ColorTheme.gray2,
    backgroundColor: 'transparent',
  },

  nextpage: {
    width: px(24),
    height: px(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(100),
    borderWidth: px(2),
    borderColor: ColorTheme.gray2,
    backgroundColor: ColorTheme.primary,
  },

  selectedpage: {
    width: px(10),
    height: px(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(100),
    borderWidth: px(2),
    borderColor: ColorTheme.transparent,
    backgroundColor: ColorTheme.primary,
  },
  unselectedpage: {
    backgroundColor: ColorTheme.transparent,
  },

  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainSubView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    height: px(2),
    borderRadius: px(5),
  },
});
