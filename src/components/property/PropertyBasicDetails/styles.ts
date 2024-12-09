import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  containerViewStyle: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },

  propertyNameText: {
    fontSize: SIZES.medium18,
    fontFamily: FONT.PoppinsSemiBold,
    color: ColorTheme.black,
    fontWeight: 'bold',
  },

  viewRow: {
    flexDirection: 'row',
    gap: px(5),
    alignItems: 'center',
  },

  postbyviewRow: {
    flexDirection: 'row',
    gap: px(0),
    alignItems: 'center',
  },

  imageView: {
    position: 'relative',
    backgroundColor: ColorTheme.transparent,
    zIndex: 99,
    bottom: px(20),
    right: px(60),
  },
  imgStyle: {
    width: px(50),
    height: px(50),
  },

  textViewStyle: {
    color: ColorTheme.black,
    fontFamily: FONT.PoppinsMedium,
    width: deviceWidth / 1.2,
  },
  textVerification: {
    color: ColorTheme.black,
    fontSize: SIZES.small11,
  },
});
