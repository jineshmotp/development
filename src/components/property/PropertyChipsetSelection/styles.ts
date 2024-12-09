import { StyleSheet } from 'react-native';

import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth / 1.2,
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
