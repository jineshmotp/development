import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';

export const styles = StyleSheet.create({
  imgMain: {
    width: 55,
    height: 55,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
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
    marginBottom: -5,
    marginTop: 15,
  },
  imgStyle: { width: 34, height: 34, borderRadius: 5 },
  actionSheet: {
    gap: 10,
    marginBottom: -5,
  },
});
