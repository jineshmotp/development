import { StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';

export const styles = StyleSheet.create({
  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  containerView: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: 'center',
    marginBottom: 15,
  },
  topView: {
    justifyContent: 'space-between',
    flex: 1,
  },
  btnStyle: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    padding: 6,
    paddingHorizontal: 15,
  },
  btnText: {
    fontSize: 14,
    color: 'black',
  },
  noItem: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  available: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: 12,
    color: 'black',
  },
  label: {
    fontFamily: FONT.PoppinsBold,
    fontSize: 18,
    color: ColorTheme.black,
  },
});
