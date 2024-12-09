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

  lineText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,
    marginTop: px(10),
    fontSize: px(14),
    textAlign: 'center',
    marginBottom: 20,
  },
  touchableContainer: {
    width: px(140),
    height: px(50),
    borderRadius: 5,
    backgroundColor: '#F5F9F9',
    justifyContent: 'center',
    elevation: 5,
    marginHorizontal: px(5),
    marginTop: px(20),
    padding: px(10),
  },
  touchableText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(12),
    textAlign: 'center',
  },
  buttonContainer: {
    width: px(150),
    borderRadius: 5,
    backgroundColor: ColorTheme.white,
    borderWidth: 0.5,
    borderColor: ColorTheme.onboardingButton,
    elevation: 5,
  },
  BtnStyle: {
    fontSize: px(12),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.onboardingPrimary,
  },
  nextContainer: {
    width: px(150),
    borderRadius: 5,
    backgroundColor: ColorTheme.onboardingButton,

    elevation: 5,
  },
  nextStyle: {
    fontSize: px(12),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
  },
});
