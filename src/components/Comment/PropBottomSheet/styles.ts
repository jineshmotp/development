import { StyleSheet } from 'react-native';



import { ColorTheme, FONT, SIZES } from '@/theme';
import { px } from '@/utils';


export const styles = StyleSheet.create({
  imgMain: {
    width: px(40),
    height: px(40),
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(40),
  },
  imgMainBottom: {
    width: px(40),
    height: px(40),
    backgroundColor: ColorTheme.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(40),
  },

  optView: { height: px(40), justifyContent: 'center' },
  textStyle: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small13,
    fontWeight: '500',
    // lineHeight: 20,
    color: 'black',
    // marginBottom: px(5),
  },
  actionSheetItem: {
    gap: 10,
    // marginBottom: -5,
    marginTop: px(15),
    marginBottom: px(5),
    height: px(40),
  },
  imgStyle: { width: px(20), height: px(20), borderRadius: 5 },
});