import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 3,
    shadowColor: 'gray',
    elevation: 3,
    borderRadius: 9,
    alignSelf: 'center',
    width: Platform.OS === 'android' ? deviceWidth / 1.09 : deviceWidth / 1.09,
  },
  imgContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 5,
    width: 170,
  },
  propLocality: {
    marginVertical: 1,
    color: 'black',
    width: 100,
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.xSmall,
    opacity: 0.5,
    fontWeight: '400',
  },
  propPrice: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '600',
    color: 'black',
  },
  topView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 1,
  },
  imgView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5,
  },
  imgStyle: {
    width: 180,
    height: 180,
    borderRadius: 8,
  },
  headView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  defaultView: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  defaultText: {
    fontSize: SIZES.medium18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: FONT.PoppinsBold,
  },
  username: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: Platform.OS === 'android' ? SIZES.small : 13,
    color: '#378E6C',
  },
  posted: {
    fontSize: Platform.OS === 'android' ? 9 : 10,
    fontFamily: FONT.PoppinsRegular,
    opacity: 0.5,
    color: 'black',
  },
  propertyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '700',
    color: 'black',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionTopView: {
    flexDirection: 'row',
    gap: Platform.OS === 'android' ? 7 : 7,
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  actionText: {
    fontSize: Platform.OS === 'android' ? 10 : 10,
    padding: 2,
    opacity: 0.5,
    color: 'black',
  },
});
