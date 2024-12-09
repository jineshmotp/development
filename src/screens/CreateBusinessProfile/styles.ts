import { StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  formView: {
    width: deviceWidth / 1.2,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inputStyle: { height: 45, color: 'black' },
  cinErrorText: {
    marginTop: -15,
    color: ColorTheme.danger,
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    textAlign: 'left',
  },
  searchInput: {
    borderRadius: 5,
    marginBottom: 15,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    paddingHorizontal: 15,
    height: 50,
    color: 'black',
    paddingVertical: 10,
    fontFamily: FONT.PoppinsMedium,
  },
  mapStyles: {
    width: deviceHeight / 1.2,
    height: 200,
    borderRadius: 10,
  },
  btnText: { color: 'black' },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  mapTopView: { marginBottom: 10 },
  mapTextView: { width: deviceWidth / 1.2 },
  mapText: {
    marginBottom: 0,
    fontSize: 15,
    // marginLeft: 20,
    marginRight: 20,
    color: ColorTheme.gray,
    fontFamily: FONT.PoppinsMedium,
  },
});
