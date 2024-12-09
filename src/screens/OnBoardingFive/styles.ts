import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  stepContainer: {
    alignContent: 'center',
    marginTop: px(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepHeader: {
    alignContent: 'center',
    marginTop: px(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText1: {
    fontSize: SIZES.medium18,
    fontWeight: '500',
    lineHeight: SIZES.xLarge,
    color: ColorTheme.black,
  },
  headerText2: {
    fontSize: SIZES.small14,
    fontWeight: '500',
    lineHeight: SIZES.xLarge,
    color: '#666666',
  },
  freeText: {
    color: '#1A938C',
    fontSize: SIZES.small14,
    fontWeight: '500',
    lineHeight: SIZES.xLarge,
  },
  stepText: {
    color: ColorTheme.onboardingPrimary,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: 'bold',
    fontSize: px(20),
    textAlign: 'center',
  },
  toggleActiveText: {
    color: ColorTheme.black,
    fontSize: SIZES.small,
    fontWeight: '600',
    lineHeight: SIZES.xLarge,
  },
  toggleInActiveText: {
    color: ColorTheme.white,
    fontSize: SIZES.small,
    fontWeight: '600',
    lineHeight: SIZES.xLarge,
  },
  toggleInActiveBtn: { borderRadius: px(6), borderWidth: 0, height: px(26) },
  toggleStyle: { backgroundColor: ColorTheme.onboardingPrimary },
  toggleView: { backgroundColor: ColorTheme.onboardingPrimary, padding: px(10), borderRadius: px(12) },
  toggleActiveBtn: {
    backgroundColor: ColorTheme.white,
    borderRadius: px(6),
    borderWidth: 0,
    height: px(26),
  },
  wrapper: {
    marginTop: px(30),
    // height: px(150),
  },
  SingleBtnStyle: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
  },
});
