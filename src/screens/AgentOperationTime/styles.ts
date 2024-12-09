import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  inputStyle: {
    height: 43,
    width: deviceWidth / 1.09,
    fontSize: SIZES.small14,
    fontWeight: '400',
    marginBottom: px(0),
    color: 'black',
  },
  addMore: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.medium15,
    fontWeight: '500',
    lineHeight: 22,
    color: 'black',
  },
  switchmain: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    height: 36,
  },
  oneTime: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 50,
  },
  timeText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '300',
    color: 'black',
  },
  oneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
  },
});
