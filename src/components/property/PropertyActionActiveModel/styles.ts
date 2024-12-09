import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  actionSheetItem: {
    height: px(50),
    borderBottomColor: '#DBDBDB',
    marginBottom: px(10),
  },

  element_main: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
  },

  element: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  subsubelement: {
    marginTop: px(10),
  },

  style_view: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: px(10),
  },
  topView: { paddingHorizontal: px(10), paddingVertical: px(10) },
  placeholderStyle: {
    fontSize: SIZES.medium15,
    fontWeight: '500',
    fontFamily: FONT.PoppinsMedium,
  },
});
