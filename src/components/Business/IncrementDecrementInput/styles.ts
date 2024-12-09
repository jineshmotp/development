import { StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  countViewStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: ColorTheme.black,

    // gap: px(30),
    width: '90%',
    // borderWidth: 0.6,
    // borderRadius: px(3),
    // shadowColor: 'gray',
    // paddingHorizontal: px(5),
    // height: px(40),

    height: px(43),
    paddingHorizontal: px(8),
    borderColor: '#D8D8D8',
    borderWidth: 0.5,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: ColorTheme.white,
    marginTop: px(10),
    marginBottom: px(10),
  },

  countViewsubMinuse: {
    flex: 0.1,
    paddingLeft: px(5),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  countViewsubPluse: {
    flex: 0.1,
    paddingRight: px(5),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  countText: {
    color: ColorTheme.black,
    alignItems: 'center',
  },

  countView: {
    width: px(22),
    height: px(22),
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberpadStyle: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
