import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  textTab: {
    color: 'black',
    fontSize: SIZES.medium15,
    fontWeight: '500',
    lineHeight: 22,
  },
  horizontalScroll: {
    height: px(50),
    marginVertical: 5,
    width: deviceWidth / 1.09,
    backgroundColor: 'white',
  },
  galleryViewStyle: {
    // width: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  galleryText: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    paddingTop: 5,
    color: 'black',
  },
  galleryContainer: {
    borderBottomWidth: 3,
    height: 43,
    backgroundColor: 'white',
  },
  noDataView: {
    width: deviceWidth / 1.09,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { width: deviceWidth, alignItems: 'center' },
  containerView: { flex:1, minHeight:deviceHeight, alignItems: 'center' },
  containerScroll: { height: deviceHeight - px(150) },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // width: deviceWidth,
  },
});
