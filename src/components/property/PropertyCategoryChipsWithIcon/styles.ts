import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 35,
    paddingRight: 35,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignContent: 'center',
    // backgroundColor: ColorTheme.white,
  },

  containerTouchable: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: deviceWidth / 1.2,
    gap: px(6),
    borderColor: ColorTheme.gray2,

    // shadowColor: ColorTheme.gray,
    padding: px(10),
    borderWidth: px(1),
    borderRadius: px(3),
    paddingHorizontal: px(20),
    minHeight: px(45),
    marginBottom: px(20),
  },

  errorTextStyle: {
    fontSize: SIZES.small,
    marginBottom: 0,
    color: ColorTheme.black,
  },
});
