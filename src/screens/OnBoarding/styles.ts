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
  secondContainer: {marginTop:px(70)},
  secondText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsRegular,

    fontSize: px(16),
    textAlign: 'center',
  },
  touchableContainer: {
    height: px(120),
    width: px(90),
    backgroundColor: '#F5F9F9',
    elevation: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  programmerStyle: {
    width: px(80),
    height: px(40),
  },
  BtnStyle: {
    fontSize: px(16),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
  },
  imageText: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsBold,
    fontWeight: 'bold',
    fontSize: px(10),
    textAlign: 'center',
    marginTop: px(10),
  },
  label: {
    color: ColorTheme.white,
    fontFamily: FONT.PoppinsBold,
    fontWeight: '700',
    fontSize: px(18),
  },
  subLabel: {
    color: ColorTheme.white,
    fontFamily: FONT.PoppinsBold,
    opacity: 0.9,
    fontSize: px(13),
    marginBottom: px(20),
  },
  referInput: {
    borderRadius: 7,
    paddingHorizontal: 15,
    backgroundColor: ColorTheme.white,
    height: 45,
  },
  actionPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    color: ColorTheme.white,
    fontFamily: FONT.PoppinsBold,
    fontSize: px(16),
  },
});
