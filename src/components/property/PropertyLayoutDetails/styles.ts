import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  containerViewStyle: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },
  selectionHeader: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsSemiBold,
    fontWeight: 'bold',
    color: ColorTheme.black,
  },

  parkingChip: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: px(6),
    padding: px(5),
    backgroundColor: ColorTheme.nearLukGray6,
    borderRadius: px(5),
    paddingHorizontal: px(10),
  },

  chipsetText: {
    color: ColorTheme.black,
  },
  sectionView: {
    marginTop: px(10),
    flexDirection: 'row',
    gap: px(10),
  },

  image: {
    width: px(100),
    height: px(100),
    borderRadius: px(10),
  },
  fullScreenImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },

  topView: {
    marginTop: px(30),
    gap: px(280),
    paddingHorizontal: px(10),
    paddingVertical: px(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
