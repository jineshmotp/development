import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: px(45),
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    borderRadius: px(5),
    shadowColor: ColorTheme.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: px(5),
    elevation: 5,
    width: '92%',
    marginLeft: '8%',
  },
  itemContainer: {
    padding: px(10),
    borderBottomWidth: px(1),
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: SIZES.medium,
    color: ColorTheme.black,
    marginLeft: '2%',
  },
});
