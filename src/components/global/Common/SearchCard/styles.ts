import { Platform, StyleSheet } from 'react-native';



import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';


export const styles = StyleSheet.create({
  container: {
    height: deviceWidth / 1.85,
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
    fontSize: SIZES.xSmall,
    opacity: 0.5,
    fontWeight: '400',
  },
  typeText: {
    marginVertical: 1,
    color: 'black',
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
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    // gap: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    // gap: 1,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 4,
  },
  reraText: {
    fontSize: SIZES.small,
    color: 'white',
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
  },
  rowView: {
    flexDirection: 'row',

    gap: 5,
  },
  flexView: {
    flex: 3.5,
  },
  propertyText: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '700',
    color: 'black',
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
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginTop: 20,
    borderRadius: 4,
  },
  colummView: {
    flexDirection: 'column',
  },
  lineView: {
    backgroundColor: 'black',
    height: 35,
    width: 1,
    marginLeft: 5,
  },
  endView: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  facingText: {
    fontSize: SIZES.small13,
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
  bottomLineView: {
    position: 'absolute',
    bottom: 0,
    height: px(40),
    width: px(160),
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
  bottomLineText1: {
    fontSize: SIZES.medium15,
    fontWeight: '500',
    color: ColorTheme.primary,
    marginTop:px(20)
  },
});