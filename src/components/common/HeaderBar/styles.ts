import { Platform, StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const style = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  container: {
    width: deviceWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backBtn: {
    borderWidth: 1,
    borderRadius: 100,
    // padding: 5,
    width: px(33),
    height: px(33),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEEBF3',
    borderColor: '#92C8EA',
  },
  rightBtn: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEEBF3',
    borderColor: '#92C8EA',
  },
  labelStyle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.PoppinsMedium,
    textTransform: 'capitalize',
    color: 'black',
    fontWeight: '500',
  },
});
