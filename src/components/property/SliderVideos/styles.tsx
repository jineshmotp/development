import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ColorTheme.white,
  },

  containerViewStyle: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },

  navButton: {
    backgroundColor: '#79D9B3',
    padding: 10,
    borderRadius: 100,
    paddingHorizontal: 20,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navChild: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 20 : 60,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  actionBtns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
    alignContent: 'center',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 3,
    shadowColor: 'gray',
    elevation: 3,
    paddingHorizontal: 20,

    padding: 10,
    borderRadius: 100,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  galleryBtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 3,
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 5,
  },
  pricingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  pricingChild: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 100,
    justifyContent: 'center',
    padding: 6,
  },
  pricingSubText: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsBold,
    color: ColorTheme.black,
    lineHeight: SIZES.xLarge,
    fontWeight: 'normal',
  },
  parkingChip: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    padding: 5,
    backgroundColor: ColorTheme.nearLukGray6,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  selectionHeader: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsSemiBold,
    fontWeight: 'bold',
    color: ColorTheme.black,
  },

  imageBackgroundStyle: {
    height: Platform.OS === 'android' ? 300 : 329,
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
    width: deviceWidth,
  },
  videstyle: {
    height: Platform.OS === 'android' ? 300 : 329,
    width: deviceWidth,
  },
  topView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 19,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
