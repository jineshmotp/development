import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
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
    width: deviceWidth / 1.09,
    height: deviceWidth / 1.3,
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'column',

    padding: 10,
  },
  propLocality: {
    marginVertical: 1,
    color: 'black',
    marginTop: 5,

    fontFamily: FONT.PoppinsRegular,
    fontSize: px(10),
    opacity: 0.5,
    fontWeight: '400',
  },
  typeText: {
    marginVertical: 1,
    color: 'black',
    fontFamily: FONT.PoppinsRegular,
    fontSize: px(10),
    opacity: 0.5,
    fontWeight: '400',
  },
  propPrice: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '600',
    color: 'black',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',

    // gap: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',

    // gap: 1,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: px(10),
  },
  absoluteView: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 50,
  },
  imageBGContainer: {
    width: '100%',
    height: '100%',
  },
  verifiedView: {
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
  },
  verifiedText: {
    fontSize: SIZES.small,
    color: 'black',
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
  },
  priceContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  priceText: {
    fontSize: SIZES.medium,
    color: 'white',
    fontFamily: FONT.PoppinsMedium,
    fontWeight: 'bold',
  },
  reraView: {
    backgroundColor: '#1A938C',
    width: px(60),
    height: px(30),
    marginLeft: px(10),

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px(20),
    flexDirection: 'row',
  },
  reraText: {
    fontSize: SIZES.small,
    color: 'white',
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
  },
  bhkText: {
    fontSize: SIZES.small,
    color: 'white',
    fontFamily: FONT.PoppinsMedium,
    marginLeft: px(5),
  },
  propertyText: {
    fontSize: px(14),
    color: ColorTheme.white,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: 'bold',
  },
  buyView: {
    backgroundColor: '#333333',
    width: px(80),
    height: px(30),

    borderTopLeftRadius: px(20),
    borderBottomLeftRadius: px(20),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  transparentView: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '92%',
    height: '52%',
    alignSelf: 'center',
    marginTop: px(80),
    borderRadius: px(8),
    paddingVertical: px(12),
    paddingHorizontal: px(15),
  },
  rowView: {
    flexDirection: 'row',

    gap: 5,
  },
  flexView: {
    flex: 3.5,
  },

  typeView: {
    padding: 3,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 2,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facingView: {
    borderWidth: 0.5,
    borderColor: ColorTheme.gray,
    width: deviceWidth / 2.5,
    marginTop: 20,
    paddingHorizontal: px(4),
    paddingVertical: px(5),
    borderRadius: 4,
  },
  colummView: {
    flexDirection: 'column',
  },
  lineView: {
    backgroundColor: ColorTheme.gray,
    height: 35,
    width: 0.5,
    marginLeft: 5,
  },
  endView: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  facingText: {
    fontSize: px(10),
    color: '#8F8F8F',
    fontWeight: '500',
  },
  subType: {
    padding: 3,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 4,
    marginTop: 10,
  },
  sqView: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  durationText: {
    width: 20,
    height: 10,
    marginTop: 7,
  },
  reraImage: {
    width: px(10),
    height: px(10),
    marginLeft: px(5),
  },
  disImage: {
    width: px(15),
    height: px(15),
    marginLeft: px(5),
  },
  resImage: {
    width: px(15),
    height: px(15),
    marginLeft: px(5),
  },
  lastView: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  bottomLineView: {
    position: 'absolute',
    bottom: 0,
    height: px(40),
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLineText: {
    fontSize: SIZES.medium15,
    fontWeight: '500',
    color: ColorTheme.primary,
  },
});
