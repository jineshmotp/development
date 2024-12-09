import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';

export const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 5,
      marginHorizontal: 10,
      borderRadius: 100,
      width: 40,
      height: 40,
      alignSelf: 'center',
      padding: 30,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
      shadowColor: 'rgba(0,0,0,0.15)',
    },
    android: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 5,
      marginHorizontal: 10,
      borderRadius: 100,
      width: 40,
      height: 40,
      alignSelf: 'center',
      padding: 30,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
      shadowColor: 'gray',
      elevation: 10,
    },
  }),
  text: {
    textAlign: 'center',
    marginTop: 5,
    width: 90,
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.xSmall,
    color: ColorTheme.black,
    lineHeight: SIZES.small,
  },
  icon: {
    width: 38,
    height: 38,
  },
  labelContainer: {
    alignItems: 'center',
  },
});
