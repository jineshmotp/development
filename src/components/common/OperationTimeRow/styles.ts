import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';

export const styles = StyleSheet.create({
  switchmain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ColorTheme.placeholderColor,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flex: 1.3
  },
  oneTime: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  timeText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '300',
    color: 'black',
    flex: .7
  },
  enableTimeText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '300',
    color: 'black',
  },
  disableTimeText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '300',
    color: ColorTheme.gray2,
  },
  oneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
});
