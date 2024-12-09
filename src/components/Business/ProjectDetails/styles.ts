import { StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const propertyStyle = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth / 2.5,
  },

  imageStyle: {
    margin: px(7),
    width: px(30),
    height: px(27),
  },
  lableStyle: {
    fontFamily: FONT.PoppinsSemiBold,
    margin: px(5),
    marginLeft: px(10),
    fontSize: px(10),
  },
  propertyTextStyle: {
    fontFamily: FONT.PoppinsSemiBold,
    margin: px(5),
    color: ColorTheme.black,
    fontWeight: 'bold',
    fontSize: px(10),
    marginLeft: px(10),
  },
  dotedBorderStyle: {
    borderStyle: 'dashed',
    borderRadius: px(10),
    borderColor: ColorTheme.gray,
    borderWidth: px(1),
    padding: px(5),
    marginVertical: px(5),
  },
});
