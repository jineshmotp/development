import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  scrollContainer: { height: deviceHeight },
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
  numberText: {
    fontSize: px(12),
    fontWeight: '600',
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
    alignSelf: 'center',
  },
  inputView: {
    flex: 1,
    padding: px(10),
  },
  numberView: {
    width: deviceWidth / 8,
    height: px(45),
    marginTop: px(7),
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: ColorTheme.gray,
    borderRadius: 4,
    justifyContent: 'center',
    marginLeft: px(10),
  },
  inputStyle: {
    height: px(45),
    width: deviceWidth / 1.5,
    marginLeft: px(10),
    borderRadius: 8,
    borderColor: ColorTheme.gray,
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

  keyboardView: { flex: 1 },

  BtnStyle: {
    fontSize: px(SIZES.medium15),
    fontFamily: FONT.PoppinsRegular,
    fontWeight: '300',
    lineHeight: px(28),
    color: 'black',
  },
  SignUpContainer: {
    marginVertical: px(10),
    marginTop: px(40),
    alignSelf: 'center',
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
