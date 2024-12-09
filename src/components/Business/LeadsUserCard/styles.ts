import { StyleSheet } from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: deviceWidth / 1.09,
    height: 230,
    padding: 13,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 10,
    // justifyContent: "center",
  },
  mainContainer: { justifyContent: 'center', alignItems: 'center' },
  cardHeadLeft: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgViewStyle: { width: px(50), height: px(50), borderRadius: px(35), backgroundColor: ColorTheme.onboardingButton },
  imgStyle: { width: px(50), height: px(50), borderRadius: px(35) },
  iconContainerStyle: { width: px(50), height: px(30), borderRadius: px(35), alignItems: 'center' },
  profileContainerStyle: { flexDirection: 'row' },
  lineStyle: { height: px(0.6), backgroundColor: ColorTheme.black, width: '80%', marginLeft: px(60), opacity: 0.1 },
  nameView: { flex: 2 },
  textStyle: {},
  nameText: {
    fontSize: SIZES.small,
    fontWeight: '500',
    marginHorizontal: px(10),
    width: '100%',
  },
  descriptionText: {
    fontSize: SIZES.small,
    color: ColorTheme.black,
    fontWeight: '400',
    marginHorizontal: px(10),
  },
  userNameText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: px(10),
    marginVertical: px(5),
  },
  businessNameText: {
    fontSize: SIZES.small12,
    fontWeight: '500',
    color: ColorTheme.gray,
    marginHorizontal: px(10),
    marginBottom: px(2),
  },
  blurText: {
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    color: 'transparent',
    marginHorizontal: px(10),
    marginVertical: px(5),
  },
  blurIosText: {
    textShadowColor: 'rgba(0, 0, 0,90)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    color: '#FAFAFC50',
    marginHorizontal: px(10),
    fontSize: 16,
    marginVertical: px(5),
  },
  text: {
    fontSize: 16,
    color: 'transparent',
    marginHorizontal: px(10),
  },
  blurEffect: {
    textShadowColor: 'rgba(0, 0, 0, 0.8)', // Adjust alpha value for intensity
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // Adjust the radius for blur effect
    opacity: 0.6, // Adjust opacity for overall transparency
  },
  iconStyle: {
    width: px(12),
    height: px(12),
    marginTop: px(10),
  },
  buttonStyle: {
    width: px(120),
    height: px(30),
    alignSelf: 'flex-end',
    backgroundColor: ColorTheme.onboardingButton,
    borderRadius: px(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: SIZES.small,
    fontWeight: '800',
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsSemiBold,
  },
  userStyle: {
    width: px(85),
    height: px(30),
    marginLeft: px(30),
    alignSelf: 'center',
    backgroundColor: ColorTheme.lightWhite,
    borderRadius: px(10),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  defaultProfile: {
    width: px(50),
    height: px(50),
    borderRadius: px(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  ownerText: {
    fontSize: SIZES.medium18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
});
