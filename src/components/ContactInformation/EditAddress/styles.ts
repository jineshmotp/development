import { StyleSheet } from 'react-native';



import { SIZES } from '@/theme';
import { deviceWidth } from '@/utils';


export const styles = StyleSheet.create({
  main: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    alignItems: 'center',
  },
  mainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: deviceWidth / 1.09,
  },
  inputStyle: {
    height: 43,
    width: deviceWidth / 1.09,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: 'black',
  },
  btnSave: {
    marginBottom: 10,
    width: 100,
    borderRadius: 5,
    marginRight: 5,
    minHeight: 30,
    backgroundColor: '#3FDBD1',
  },
  btnCancel: {
    marginBottom: 10,
    width: 100,
    borderRadius: 5,
    minHeight: 30,
    backgroundColor: '#F6F3F3',
  },
  textStyle: { color: 'black', fontSize: 13, fontWeight: '500' },
});