import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  sectionContainer: { width: deviceWidth, alignItems: 'center' },
  inputstyle: {
    width: deviceWidth / 1.09,
    height: 43,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D6D6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputStyleArea: {
    width: deviceWidth / 1.09,
    height: px(100),
    borderBottomWidth: 1,
    borderBottomColor: '#D9D6D6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  mainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: deviceWidth / 1.09,
    marginTop: 20,
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
  inputStyle: {
    height: 43,
    width: deviceWidth / 1.09,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: 'black',
  },
  headingTextStyle: { fontSize: SIZES.medium15, marginBottom: 10, color: 'black' },
  contentStyle: { textTransform: 'capitalize', color: 'black' },
});
