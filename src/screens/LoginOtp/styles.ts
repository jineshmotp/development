import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  gradientView: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  logoView: {
    width: deviceWidth,
    height: px(50),
    marginTop: px(50),
    alignItems: 'center',
  },
  logoStyle: {
    width: deviceWidth / 1.6,
    height: px(50),
  },
  mainContainer: {
    width: deviceWidth / 1.09,
    height: deviceHeight / 2,
    backgroundColor: ColorTheme.white,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: px(40),
    elevation: 5,
  },
  initialText: {
    fontSize: px(16),
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
    alignSelf: 'center',
    marginTop: px(20),
  },
  secondaryText: {
    fontSize: SIZES.small,
    fontWeight: '800',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.gray,
    alignSelf: 'center',
    marginTop: px(30),
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: deviceHeight / 1.3,
    alignItems: 'center',
  },
  imgContainer: {
    width: deviceWidth,
    // marginBottom: 50,
    alignItems: 'center',
  },
  img: {
    width: 145,
    height: 145,
    alignSelf: 'center',
  },
  phoneReview: {
    textAlign: 'center',
    fontSize: SIZES.medium15,
    fontWeight: '400',
    lineHeight: px(21),
    marginBottom: px(50),
    color: ColorTheme.gray,
    fontFamily: FONT.PoppinsRegular,
    width: deviceWidth / 1.6,
  },
  inputContainer: {
    width: deviceWidth / 1.2,
    alignSelf: 'center',
  },
  loginHeader: {
    alignSelf: 'flex-start',
    marginBottom: px(15),
  },
  loginLabel: {
    fontSize: px(30),
    fontFamily: FONT.PoppinsSemiBold,
    color: 'black',
  },
  otpTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: px(5),
    gap: px(5),
  },
  editPhoneContainer: {},
  btnStyle: {
    fontSize: px(16),
    fontFamily: FONT.PoppinsRegular,
    fontWeight: '300',
    lineHeight: 28,
    color: 'black',
  },
  sendOtpText: {
    alignSelf: 'center',
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.small13,
    color: 'black',
  },
  backIcon: { margin: px(10), height: px(30), width: px(30), borderRadius: px(30) },
  countText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.small13,
    color: 'black',
  },
  noOtpText: { textAlign: 'left', fontSize: SIZES.small13, color: ColorTheme.black },
  lottieStyle: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
  },
  imageView: {
    width: '100%',
    height: '30%',
  },
  imageStyle: {
    width: deviceWidth,
    height: deviceHeight / 3,
  },
});
