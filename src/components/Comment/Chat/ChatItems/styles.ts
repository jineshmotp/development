import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';

export const styles = StyleSheet.create({
  topView: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  dateStyle: {
    alignSelf: 'center',
    color: 'gray',
    marginBottom: 10,
    fontFamily: FONT.PoppinsRegular,
  },
  topContainer: {
    minHeight: 30,
    maxWidth: 250,
    minWidth: 50,
    backgroundColor: '#F0F0F0',
    margin: 2,
    borderRadius: 15,
  },
  msgView: {
    paddingVertical: 1,
    paddingHorizontal: 18,
    marginTop: 5,
  },
  msgText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small,
    textAlign: 'left',
    textAlignVertical: 'top',
    // paddingHorizontal: 20,
    color: ColorTheme.black,
  },
  dateView: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  dateText: {
    color: '#999999',
    fontSize: SIZES.xSmall,
    fontFamily: FONT.PoppinsRegular,
  },
});
