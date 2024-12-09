import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  topTabContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: px(5),
    borderBottomColor: 'gray',
    marginTop: px(15),
  },
  topTabView: {
    width: deviceWidth / 1.09,
    justifyContent: 'space-between',
    alignSelf: 'center',
    //   borderWidth: 1,
    flexDirection: 'row',
  },
  topTab: {
    height: px(35),
    borderBottomWidth: 4,
    flex: 1,
  },
  topTabText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    // lineHeight: 21,
    textAlign: 'center',
    color: 'black',
  },
});
