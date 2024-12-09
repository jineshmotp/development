import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  bgImg: {
    width: deviceWidth,
    height: px(230),
  },
  imgView: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    fontFamily: FONT.PoppinsRegular,
    width: deviceWidth / 1.09,
    textAlign: 'justify',
    fontSize: SIZES.small,
    color: 'black',
  },
  topView: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 20,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 40,
  },
});
