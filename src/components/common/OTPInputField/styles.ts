import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
  main: {
    width: deviceWidth / 1.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 0.5,
    height: px(50),
    width: px(40),
    borderRadius: 2,
    borderColor: ColorTheme.gray,
    textAlign: 'center',
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    elevation: 0.5,
    backgroundColor: '#F5FBFF',
    color: 'black',
  },
  emptySpace: {
    width: deviceWidth / 1.2,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'aqua',
    height: 50,
    opacity: 0,
  },
  blankInput: {
    width: deviceWidth / 1.2,
    height: px(50),
    color: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
  },
});
