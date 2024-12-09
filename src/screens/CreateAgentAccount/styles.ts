import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  inputStyle: {
    height: 43,
    width: deviceWidth / 1.09,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: 'black',
  },
  monthView: {
    width: 150,
    height: 50,
    borderWidth: 1,
    borderColor: '#B9B9B9',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  monthText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    lineHeight: SIZES.xLarge,
    fontWeight: '400',
    color: 'black',
  },
  upDown: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downAr: { position: 'relative', bottom: 5 },
  btnText: { color: 'black' },
});
