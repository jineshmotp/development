import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth / 1.2,
    // paddingRight: 50,
  },
  containerDivider: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  sectionView: {
    marginTop: px(20),
    minWidth: deviceWidth / 1.2,
    // height: 100,
    backgroundColor: ColorTheme.nearLukBaseLighterColor3,
    borderRadius: px(10),
    padding: px(10),
  },
  subView: {
    flexDirection: 'row',
    marginTop: px(10),
    // width: deviceWidth / 1.09,
    flexWrap: 'wrap',
  },
  addMoreTouchable: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: px(10),
  },
  addmoreText: {
    color: ColorTheme.primary,
    fontWeight: '600',
  },
});
