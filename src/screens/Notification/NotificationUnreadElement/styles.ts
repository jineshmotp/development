import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    width: deviceWidth,
    height: px(70),
    borderBottomColor: ColorTheme.nearLukGray2,
    borderBottomWidth: 0.5,
    paddingHorizontal: px(30),
    backgroundColor: ColorTheme.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topViewUnread: {
    width: deviceWidth,
    height: px(70),
    borderBottomColor: ColorTheme.nearLukGray2,
    borderBottomWidth: 0.5,
    paddingHorizontal: px(30),
    backgroundColor: ColorTheme.nearLukBaseLighterColor2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: SIZES.medium,
    color: ColorTheme.black,
    flex: 11,
  },
  dot: {
    width: px(8),
    height: px(8),
    backgroundColor: 'red',
    borderRadius: px(8),
  },
  dotView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: px(70),
    paddingTop: px(10),
  },
});
