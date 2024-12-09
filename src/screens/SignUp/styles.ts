import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';
import globalStyles from '@/utils/globalStyles';

export const styles = StyleSheet.create({
  gradientView: {
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
    height: deviceHeight / 1.9,
    backgroundColor: ColorTheme.white,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: px(40),
    elevation: 5,
  },
  errorText: {
    color: 'red',

    alignSelf: 'flex-start',

    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsRegular,
    position: 'relative',
    bottom: px(10),
  },
  topImg: {
    width: deviceWidth,
    marginTop: px(20),
    ...globalStyles.center,
  },
  formPart: {
    width: deviceWidth / 1.2,
    alignSelf: 'center',

    marginTop: px(10),
  },
  initialText: {
    fontSize: px(16),
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
    marginLeft: px(80),
  },
  numberText: {
    fontSize: px(12),
    fontWeight: '600',
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
    alignSelf: 'center',
  },
  inputView: {
    flexDirection: 'row',
  },
  numberView: {
    width: deviceWidth / 8,
    height: px(40),
    marginTop: px(7),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: ColorTheme.gray,
    borderRadius: 4,
    justifyContent: 'center',
  },
  agreeText: {
    fontSize: px(12),
    marginLeft: px(10),
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  termText: {
    fontSize: px(12),
    textDecorationLine: 'underline',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.primaryColor,
  },
  SignUpContainer: {
    marginVertical: px(10),
    marginTop: px(20),
    alignSelf: 'center',
  },
  topImgStyle: {
    width: deviceWidth,
    height: (deviceWidth * 3) / 4,
  },
  headView: {
    alignSelf: 'flex-start',
    marginBottom: px(15),
  },
  headText: {
    fontSize: px(30),
    fontWeight: '600',
    color: 'black',
  },
  topViewContainer: {
    width: deviceWidth / 1.2,
    alignSelf: 'center',
  },
  inputStyle: {
    height: px(40),
    color: 'black',
  },
  numberStyle: {
    height: px(40),
    width: deviceWidth / 1.47,
    marginLeft: px(10),
    borderRadius: 8,
    borderColor: ColorTheme.gray,
  },
  haveAccount: {
    marginVertical: px(10),
    marginTop: px(40),
    alignSelf: 'flex-start',
  },
  btnStyle: {
    fontSize: px(16),
    fontFamily: FONT.PoppinsRegular,
    fontWeight: '300',
    lineHeight: px(28),
    color: 'black',
  },
  loginText: {
    fontSize: SIZES.medium15,
    color: ColorTheme.gray,
  },
  keyboardView: { flex: 1 },
  imageView: {
    width: '100%',
    height: '30%',
  },
  imageStyle: {
    width: deviceWidth,
    height: deviceHeight / 3,
  },
});
