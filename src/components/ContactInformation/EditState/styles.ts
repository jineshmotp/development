import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  mainBtn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: deviceWidth,
  },
  main: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  StateName: {
    marginBottom: 6,
    fontSize: 15,
    color: ColorTheme.gray,
    fontFamily: FONT.PoppinsRegular,
  },
  stateTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    width: deviceWidth / 1.09,
    padding: 10,
    borderRadius: 8,
    borderColor: ColorTheme.nearLukGray,
  },
  btnStyle: {
    marginBottom: 10,
    width: 100,
    borderRadius: 30,
    marginRight: 20,
    minHeight: 39,
  },
  textStyle: {
    color: '#000000',
    fontSize: SIZES.medium15,
  },
  touch: {
    marginBottom: 20,
  },
});
