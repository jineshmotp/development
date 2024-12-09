import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  btnStyle: {
    marginBottom: px(10),
    width: px(160),
    borderRadius: 30,
    // marginRight: 20,
    minHeight: px(40),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.1,
    // shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    color: 'black',
    lineHeight: 21,
    fontWeight: '400',
    fontSize: SIZES.medium15,
  },
  btnView: {
    width: deviceWidth,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: px(50),
  },
});
