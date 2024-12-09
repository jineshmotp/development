import { StyleSheet } from 'react-native';

import { FONT } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    backgroundColor: 'white',
    width: deviceWidth / 2.3,
    height: 90,
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
  },
  textContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
});
