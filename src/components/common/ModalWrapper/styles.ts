import { StyleSheet } from 'react-native';

import { SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: SIZES.large,
    color: 'black',
    padding: px(5),
  },
});
