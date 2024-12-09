import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },

  containerTop: {
    flex: 1,
    // marginTop: px(10),
    padding: px(10),

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
