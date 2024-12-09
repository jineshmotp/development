import { StyleSheet } from 'react-native';



import { FONT, SIZES } from '@/theme';


export const styles = StyleSheet.create({
  imgMain: {
    width: 40,
    height: 40,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
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
    height: 40,
  },
  imgStyle: { width: 20, height: 20, borderRadius: 5 },
});