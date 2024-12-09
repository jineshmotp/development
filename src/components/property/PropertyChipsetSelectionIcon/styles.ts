import { StyleSheet } from 'react-native';

import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 35,
    paddingRight: 35,
  },

  containerDivider: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  sectionView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: px(10),
  },
});
