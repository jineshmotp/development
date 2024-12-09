import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // backgroundColor: item?.active ? ColorTheme.primary : "white",
    shadowOffset: {
      width: px(1),
      height: px(1),
    },
    shadowOpacity: Platform.OS === 'android' ? px(1) : px(0.3),
    shadowRadius: px(3),
    shadowColor: 'gray',
    padding: px(10),
    borderRadius: px(100),
    paddingHorizontal: px(20),
    elevation: px(5), // Android only (elevation creates shadow)
    height: px(40),
    flexDirection: 'row',
    gap: px(5),
    alignItems: 'center',
    flex: 1,
    // justifyContent: "center",
  },
  checkboxBase: {
    width: px(18),
    height: px(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px(5),
    borderWidth: px(2),
    borderColor: ColorTheme.gray2,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: ColorTheme.primary,
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    marginVertical: px(16),
    fontWeight: 'bold',
    fontSize: SIZES.xLarge,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: px(8),
    fontWeight: '500',
    fontSize: SIZES.medium18,
    color: ColorTheme.black,
  },
});
