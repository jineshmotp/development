import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  headerViewStyle: {
    backgroundColor: ColorTheme.white,
    paddingHorizontal: px(8),
    paddingVertical: px(8),
    shadowColor: ColorTheme.black,
    borderColor: ColorTheme.gray,
    borderBottomWidth: px(1),
    shadowOffset: {
      width: px(0),
      height: px(2),
    },
    shadowOpacity: px(0.25),
    shadowRadius: px(3.84),
    elevation: 0, // This controls the overall elevation of the view
  },

  headerViewBottomElevationStyle: {},

  headerTouchableStyle: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTextStyle: {
    flex: 0.8,
    fontSize: SIZES.medium, // Adjust font size for "List Property" text
    textAlign: 'left',
    color: ColorTheme.black,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerClearTouchable: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerClearText: {
    fontSize: SIZES.small14,
    fontFamily: 'popins',
    color: ColorTheme.nearLukBaseSecondaryColor3,
    
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

  rowStryle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
