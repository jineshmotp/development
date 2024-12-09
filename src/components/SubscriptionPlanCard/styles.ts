import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  topOuterView: { width: deviceWidth, height: 'auto', justifyContent: 'center', alignItems: 'center', marginTop:px(20) },
  topView: {
    width: deviceWidth / 1.5,
    borderRadius: px(33),
    height: deviceHeight / 1.8,
    alignItems: 'center',
    borderWidth: px(4),
    backgroundColor: ColorTheme.white,
    elevation: 5,
  },
  topHiddenView: {
    position: 'absolute',
    bottom: -px(13),
    height: deviceHeight / 1.87,
    width: deviceWidth / 2.2,
    backgroundColor: '#23E5C2',
    zIndex: -2,
    borderRadius: px(17),
  },
  topView1: {
    width: deviceWidth / 1.5,
    borderRadius: px(33),
    height: deviceHeight / 1.8,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: ColorTheme.gray2,
    backgroundColor: ColorTheme.white,
    elevation: 5,
  },
  topHeader: { marginVertical: px(20), zIndex: -1 },
  topHeaderText: {
    fontSize: SIZES.xxLarge,
    lineHeight: SIZES.xxxLarge,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: ColorTheme.black,
  },
  gradintView1: { height: px(50), width: '100%', justifyContent: 'center', alignItems: 'center' },
  gradintView: { height: px(50), width: '120%', justifyContent: 'center', alignItems: 'center' },
  gradintViewLeft: {
    height: px(50),
    width: '50%',
    position: 'absolute',
    bottom: 50,
    transform: [{ rotateY: '10deg' }, { rotate: '-45deg' }, { translateY: -px(50) }, { translateX: -px(53) }],
  },
  gradintText: { fontWeight: '600', fontSize: px(23), lineHeight: px(28), color: ColorTheme.white },
  infoView: {
    marginVertical: px(20),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: px(35),
    color: ColorTheme.black,
  },
  infoText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: SIZES.large,
    lineHeight: SIZES.xxLarge,
    color: ColorTheme?.black,
  },
  btnView: {
    height: px(50),
    width: px(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(17),
  },
  btnText: { fontSize: px(16), lineHeight: px(20), fontWeight: '700', color: ColorTheme.white },
  closeBtn: {
    marginTop: px(20),
    width: px(30),
    height: px(30),
    borderRadius: px(20),
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    width: '100%',
    height: '90%',
    backgroundColor: ColorTheme.white,
  },
});
