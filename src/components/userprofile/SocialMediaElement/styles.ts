import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  sectionDetailPart: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    width: deviceWidth / 1.09,
  },
  sectionText: {
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
    color: 'blue',
    marginRight: 10,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  textMain: {
    width: deviceWidth / 1.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 30,
  },
  imgStyle: {
    width: 40,
    height: 40,
  },
});
