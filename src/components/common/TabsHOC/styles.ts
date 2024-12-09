import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#FFFFFF',
    minWidth: deviceWidth / 5,
    height: 35,
    padding: 8,
    borderRadius: 50,
    // shadowColor: 'gray',
    // shadowOffset: {
    //   height: 1,
    //   width: 1,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 10,
    // elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  main: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: FONT.PoppinsMedium,
    color: '#17A2B8',
    fontSize: SIZES.small13,
  },
});
