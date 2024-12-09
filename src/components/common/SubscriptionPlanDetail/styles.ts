import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  topView: { width: '100%', height: '100%', alignItems: 'center' },
  topBar: {
    height: px(21),
    borderRadius: px(20),
    width: '100%',
    // borderColor: ColorTheme.onboardingPrimary,
    // backgroundColor: ColorTheme.onboardingPrimary,
  },
  subContainer: { width: '90%', height: '98%' },
  headerTop: { marginVertical: px(10) },
  headerText: {
    fontSize: SIZES.xxLarge,
    fontWeight: '600',
    lineHeight: SIZES.xxxLarge,
    textTransform: 'capitalize',
    color: ColorTheme.black,
  },
  bottomBar: {
    width: '50%',
    height: px(5),
    borderRadius: px(20),
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: px(10),
  },
  rnText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    lineHeight: SIZES.medium15,
    textAlign: 'left',
    color: ColorTheme.black,
  },
  benefit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: px(10),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: px(10),
  },
  dot: { borderRadius: px(5), borderWidth: px(3), marginHorizontal: px(10) },
  bottomText: { fontSize: SIZES.small, fontWeight: '400', lineHeight: SIZES.medium15, textAlign: 'left' },
  btnView: {
    height: SIZES.xxxLarge,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.black,
    borderRadius: px(12),
    position: 'absolute',
    bottom: px(25),
  },
  btnText: { lineHeight: px(17), fontSize: SIZES.small14, fontWeight: '600', color: ColorTheme.white },
});
