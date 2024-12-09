import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  checkBoxStyle: {
    height: px(43),
    borderColor: '#D8D8D8',
    borderWidth: 0.5,
    borderRadius: px(12),
    paddingHorizontal: px(10),
    width: deviceWidth / 3,
    alignSelf: 'center',
    backgroundColor: ColorTheme.white,
    marginTop: px(10),
    marginBottom: px(10),
    justifyContent: 'center',
    // alignItems: 'center',
  },

  appContainer: {
    flexDirection: 'row',
    gap: px(15),
    // justifyContent: 'space-between',
    alignItems: 'center',
  },

  appContainerWithout: {
    flexDirection: 'row',
    gap: px(10),
    // justifyContent: 'space-between',
    alignItems: 'center',
  },

  checkboxBase: {
    width: px(22),
    height: px(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(5),
    borderWidth: px(1),
    borderColor: ColorTheme.gray2,
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: '#1A938C',
  },

  appSubContainer: {
    flexDirection: 'row',
    gap: px(10),
    paddingRight: px(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'flex-start',
  },

  labelStyle: {
    flexWrap: 'wrap',
    color: ColorTheme.black,
    fontSize: SIZES.small,
    fontWeight: '500',
  },
  colorStyle: {
    width: px(12.28),
    height: px(12.28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(20),
    borderWidth: px(1),
    borderColor: ColorTheme.checkboxcolorGreen,
    backgroundColor: ColorTheme.checkboxcolorGreen,
  },
});
