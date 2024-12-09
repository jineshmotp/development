import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  initialContainer: {
    padding: px(20),
    backgroundColor: ColorTheme.onboardingPrimary,
  },
  keyboardView: { flex: 1, paddingBottom: 20 },
  initialText: {
    fontSize: px(16),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.white,
    fontWeight: 'bold',
    marginTop: px(10),
  },
  lineText: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.white,
    marginTop: px(20),
  },
  HeaderView: {
    flexDirection: 'column',
    width: deviceWidth,
    backgroundColor: ColorTheme.transparent,
    overflow: 'hidden',
  },

  LineView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px(15),
    paddingTop: px(15),
    paddingLeft: px(15),
    paddingRight: px(15),
    alignItems: 'center',
  },

  headerLine: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    height: px(1),
    padding: px(1.51),
    width: Platform.OS === 'android' ? deviceWidth / 3.5 : deviceWidth / 3.5,
    borderRadius: px(3),
  },

  headerLineSelection: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.onboardingPrimary,
    height: px(1),
    padding: px(1.51),
    width: Platform.OS === 'android' ? deviceWidth / 3.5 : deviceWidth / 3.5,
    borderRadius: px(3),
  },

  StepTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px(0),
    paddingTop: px(15),
    paddingLeft: px(15),
    paddingRight: px(15),
    alignItems: 'center',
  },

  StepText: {
    fontSize: SIZES.small14,
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: px(21),
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.onboardingPrimary,
  },
});
