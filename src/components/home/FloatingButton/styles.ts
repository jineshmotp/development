import { StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';

export const styles = StyleSheet.create({
  elem: {
    // padding: 10,
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    position: 'absolute',
    right: 30,
    bottom: 40,
    borderRadius: 100,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: 'gray',
    elevation: 10,
  },
  menuItem: {
    position: 'absolute',
    right: 30,
    bottom: 100,
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  menu: {
    padding: 8,
    backgroundColor: ColorTheme.white,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: 'gray',
    elevation: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  img: {
    width: 30,
    height: 30,
  },
  menuText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 15,
    color: 'black',
  },
});
