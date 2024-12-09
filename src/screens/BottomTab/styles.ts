import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';

export const style = StyleSheet.create({
  floating: {
    backgroundColor: ColorTheme.primary,
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    borderWidth: 10,
    borderColor: 'white',
    padding: 25,
  },
  animStyle: {
    backgroundColor: 'white',
  },
  normalmenu: {
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // bottom: 30,
    borderWidth: 10,
    borderColor: 'white',
  },
});

export const styles = StyleSheet.create({
  defaultprofile: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  Img: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  FirstLetter: {
    fontSize: SIZES.medium15,
    fontWeight: 'bold',
    color: 'white',
  },
  FirstLetter2: {
    fontSize: SIZES.medium18,
    fontWeight: 'bold',
    color: 'white',
  },
  isFocused: {
    position: 'absolute',
    top: 25,
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    color: ColorTheme.nearLukGray,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderColor: 'red', // Set the border color for the active tab
    height: 60,
    backgroundColor: 'white',
  },
  moreImg: {
    width: 30,
    height: 30,
  },
  imgStyle: {
    height: 25,
    width: 25,
  },
});
