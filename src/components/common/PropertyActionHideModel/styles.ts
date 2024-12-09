import { StyleSheet } from 'react-native';



import { FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';


export const styles = StyleSheet.create({
  initialContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  holderText: {
    fontSize: SIZES.medium15,
    fontWeight: '500',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  container: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSheetItem: {
    height: 50,
    borderBottomColor: '#DBDBDB',
    marginBottom: 10,
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
    marginTop: 10,
  },

  style_view: {
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});