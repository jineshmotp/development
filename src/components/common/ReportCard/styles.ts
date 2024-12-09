import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  mainBtn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: deviceWidth - 40,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  btnSaveStyle: {
    marginBottom: 10,
    width: 100,
    borderRadius: px(7),
    marginRight: 10,
    minHeight: px(40),
    backgroundColor: ColorTheme.primary,
  },
  btnSaveStyle1: {
    marginBottom: 10,
    width: 100,
    borderRadius: px(7),
    marginRight: 10,
    minHeight: px(40),
    backgroundColor: ColorTheme.nearLukGray4,
  },
  btnCancelStyle: {
    marginBottom: 10,
    width: 100,
    borderRadius: px(7),
    marginRight: 20,
    minHeight: px(40),
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: ColorTheme.primary,
  },
  btntext: { color: 'white', fontSize: SIZES.medium18, fontWeight: '500' },
  textStyle: {
    color: '#000000',
    fontSize: SIZES.medium18,
    fontWeight: '500',
  },
  textArea: {
    minHeight: px(100),
    maxHeight: px(125),
    // borderRadius: 10,
    // borderWidth: 0.7,
    backgroundColor: 'white',
    borderColor: ColorTheme.nearLukGray,
    marginTop: 5,
    width: deviceWidth - 40,
  },
  containerView: {
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: deviceWidth - 40,
  },
  topView: { padding: 20 },
  headView: { width: deviceWidth - 40, marginTop: 5, marginBottom: 20 },
  headText: { fontSize: SIZES.medium18, fontWeight: 'bold', color: 'black' },
});
