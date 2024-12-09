import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth / 1.09,
    alignItems: 'center',
  },
  initialText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  closeView: {
    alignItems: 'center',
  },
  heightView: {
    width: deviceWidth / 1.09,
  },
  filterKeyText: {
    fontSize: SIZES.small,

    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  clearFilterText: {
    fontSize: SIZES.small14,
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.gray,
  },
  valuesView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 6,
  },
  filterStyles: {
    backgroundColor: ColorTheme.primary,
    borderRadius: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    height: deviceHeight / 1.6,
    width: deviceWidth,
    alignSelf: 'center',
    borderTopWidth: 1,
    marginTop: 5,
    borderTopColor: '#D9D6D6',
    borderBottomColor: '#D9D6D6',
    borderBottomWidth: 1,
  },
  leftValues: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'flex-start',
    paddingVertical: 1,
    borderRightWidth: 1,
    borderRightColor: '#D9D6D6',
  },
  subView: {
    borderBottomColor: '#D9D6D6',

    width: 125,
    padding: 10,

    borderRightColor: ColorTheme.primary,
  },
  rightView: {
    width: deviceWidth / 1.7,
    alignItems: 'center',
    marginTop: 19,
  },
  endContainer: {
    height: 70,
  },
  lastView: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: ColorTheme.primary,
    alignSelf: 'center',
    borderRadius: 5,
    width: 100,
    padding: 10,
  },
  buttonText: {
    fontSize: SIZES.small14,
    fontWeight: 'bold',
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.gray,
  },
  widthView: {
    width: deviceWidth / 3,
  },
});
