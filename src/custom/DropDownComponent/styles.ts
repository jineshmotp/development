import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: ColorTheme.white,
    width: deviceWidth / 1.2,
    marginBottom: 0,
    height: 40,
    borderColor: ColorTheme.gray,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: ColorTheme.white,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 20,
    fontSize: SIZES.small,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: SIZES.small,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: SIZES.medium,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: SIZES.medium,
    color: 'black',
  },
  errorTextStyle: {
    marginTop: 8,
    color: 'black',
    fontSize: SIZES.small,
    marginBottom: 0,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
