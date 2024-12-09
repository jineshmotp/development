import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    alignSelf: 'center',
    width: deviceWidth / 1.09,
    gap: 20,
  },
  headLine: {
    width: deviceWidth / 1.09,
    alignItems: 'flex-start',
    marginTop: 20,
  },
  headText: {
    fontSize: SIZES.large,
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  label: {
    fontFamily: FONT.PoppinsMedium,
    color:'black'
  },
  description: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.small,
    color: ColorTheme.nearLukGray,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
