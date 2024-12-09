import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 3,
    shadowColor: 'gray',
    elevation: 10,
    width: deviceWidth / 1.05,
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBarProfile: {
    backgroundColor: 'white',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: Platform.OS === "android" ? 1 : 0.3,
    // shadowRadius: 3,
    // shadowColor: "gray",
    // elevation: 10,
    width: deviceWidth / 1.05,
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  defaultprofile: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  FirstLetter: {
    fontSize: SIZES.medium18,
    fontWeight: 'bold',
    color: 'white',
  },
  gallery: {
    width: 60,
    height: 60,
  },
  whatsText: { fontSize: SIZES.medium15, color: ColorTheme.nearLukGray },
});
