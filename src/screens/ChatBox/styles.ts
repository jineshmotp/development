import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  topContainer: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  usernameStyle: {
    fontSize: SIZES.medium18,
    fontFamily: FONT.PoppinsBold,
    marginRight: 50,
  },
  inputView: {
    flexDirection: 'row',
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    justifyContent: 'center',
    gap: px(10),
    borderWidth: 1,
    padding: px(7),
    paddingHorizontal: px(10),
    borderRadius: 100,
    height: px(45),
  },
  iconStyle: {
    height: px(30),
    justifyContent: 'center',
  },
  inputStyle: {
    flex: 1,
    height: px(35),
    fontFamily: FONT.PoppinsRegular,
    color:ColorTheme.black
  },
  defaultprofile: {
    width: px(35),
    height: px(35),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
    marginVertical: px(5),
  },
  defaultText: {
    fontSize: SIZES.medium15,
    fontWeight: 'bold',
    color: 'white',
  },
  imgStyle: { width: px(35), height: px(35), borderRadius: 30 },
  headerView: { flexDirection: 'row', alignItems: 'center', paddingVertical: px(5) },
  LoadingView: { alignItems: 'center', justifyContent: 'center', width: deviceWidth, height: px(50) },
  footerView: {
    width: deviceWidth / 2,
    height: px(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorTheme.primary,
    borderRadius: px(10),
    borderWidth: 0.2,
  },
  footerText: {
    fontSize: SIZES.large,
    color: ColorTheme.black,
  },
  loadMoreView: {
    position: 'absolute',
    top: 0,
    bottom: px(0),
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  scrolltoTopView: {
    position: 'absolute',
    bottom: px(80),
    left: px(30),
    zIndex: 1000,
  },
  scrollUp: {
    width: px(40),
    height: px(40),
    borderRadius: px(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
