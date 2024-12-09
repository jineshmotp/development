import { StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: ColorTheme.white,
  },
  stepContainer: {
    alignContent: 'center',
    marginTop: px(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: ColorTheme.onboardingPrimary,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: 'bold',
    fontSize: px(20),
    textAlign: 'center',
  },

  BtnStyle: {
    fontSize: px(16),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
  },
});
