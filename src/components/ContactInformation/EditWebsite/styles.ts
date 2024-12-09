import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  mainBtn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: deviceWidth / 1.09,
    flexDirection: 'row',
    marginTop: 10,
  },
  main: {
    width: deviceWidth,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  inputStyle: {
    height: 43,
    width: deviceWidth / 1.09,
  },
  btnSaveStyle: {
    marginBottom: 10,
    width: 100,
    borderRadius: 5,
    marginRight: 10,
    minHeight: 30,
  },
  btnCancelStyle: {
    marginBottom: 10,
    width: 100,
    borderRadius: 5,
    marginRight: 20,
    minHeight: 30,
    backgroundColor: '#F6F3F3',
  },
  btntext: { color: 'black', fontSize: 13, fontWeight: '500' },
  textStyle: {
    color: '#000000',
    fontSize: SIZES.medium15,
  },
});
