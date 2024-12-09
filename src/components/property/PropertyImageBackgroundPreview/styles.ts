import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  imageBackgroundStyle: {
    height: Platform.OS === 'android' ? px(300) : px(329),
    borderBottomEndRadius: px(40),
    borderBottomLeftRadius: px(40),
    overflow: 'hidden',
  },
  navChild: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? px(20) : px(60),
    alignItems: 'center',
    marginHorizontal: px(20),
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: px(20),
  },

  navRightView: {
    justifyContent: 'space-between',
  },

  navRightImageCategory: {
    backgroundColor: 'white',
    padding: px(5),
    borderWidth: 1,
    borderRadius: px(10),
    // marginHorizontal: px(20),
    // marginVertical: px(20),
  },
  navRightImageCategoryText: {
    color: ColorTheme.gray,

    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsRegular,
  },

  pricingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: px(20),
    alignItems: 'center',
  },
  pricingChild: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: px(20),
    borderRadius: px(100),
    justifyContent: 'center',
    padding: px(6),
  },
  negotiableText: {
    color: ColorTheme.gray,
    marginTop: -3,
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsRegular,
  },

  pricingText: {
    fontSize: SIZES.large,
    fontFamily: FONT.PoppinsBold,
    color: ColorTheme.black,
    lineHeight: SIZES.xLarge,
    fontWeight: 'bold',
  },

  pricingSubText: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsBold,
    color: ColorTheme.black,
    lineHeight: SIZES.xLarge,
    fontWeight: 'normal',
  },

  galleryBtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: px(3),
    alignItems: 'center',
    gap: px(10),
    backgroundColor: 'white',
    borderRadius: px(6),
    paddingHorizontal: px(5),
  },
  topView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: px(19),
  },
  goBackButton: {
    padding: px(5),
    borderRadius: px(100),
    backgroundColor: ColorTheme.white,
  },
  shareButton: {
    padding: px(5),
    borderRadius: px(100),
    backgroundColor: ColorTheme.white,
  },
});
