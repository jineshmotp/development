import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: px(10),
  },
  subContainer: {
    height: px(180),
    width: px(130),
    borderRadius: px(10),
    position: 'relative',
  },
  playIcon: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 300,
  },
  bottomLineView: {
    position: 'absolute',
    bottom: 0,
    height: px(50),
    width: px(130),
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: px(10),
    borderBottomLeftRadius: px(10),
  },
  bottomLineText: {
    fontSize: SIZES.small,
    fontWeight: '500',
    color: 'white',
  },

  loadingIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
