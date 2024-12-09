import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    marginTop: px(15),
    marginBottom: px(15),
  },
  subViewOne: {
    flex: 0.1,
    marginHorizontal: px(8),

    borderRadius: px(5),
    justifyContent: 'center',
    alignContent: 'center',
  },
  subViewTwo: {
    flex: 0.65,
    marginHorizontal: px(8),
    height: px(10),
    borderRadius: px(5),
    justifyContent: 'center',
    alignContent: 'center',
  },
  progressViewTwo: {
    //marginHorizontal: 10,
    backgroundColor: ColorTheme.white,
    height: px(10),
    borderRadius: px(5),
  },
  progressViewThree: {
    flex: 0.15,
    marginLeft: px(0),
    justifyContent: 'center',
    alignContent: 'center',
  },
  progressText: {
    fontWeight: 'bold',
    color: ColorTheme.black,
    textAlign: 'center',
  },

  progressViewfour: {
    flex: 0.1,
    marginHorizontal: px(10),

    borderRadius: px(5),
    justifyContent: 'center',
    alignContent: 'center',
  },
});
