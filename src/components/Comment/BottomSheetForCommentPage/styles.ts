import { StyleSheet } from 'react-native';



import { FONT, SIZES } from '@/theme';
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
  textStyle: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small13,
    fontWeight: '500',
    lineHeight: 20,
    color: 'black',
  },
  actionSheetItem: {
    gap: 10,
    // marginBottom: -5,
    marginTop: 15,
    height: px(40),
  },
  imgStyle: { width: 20, height: 20, borderRadius: 5 },
});