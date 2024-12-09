import { Platform, StyleSheet } from 'react-native';



import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';


export const styles = StyleSheet.create({
  container: {
    height: 210,
    marginBottom: 10,
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
    flex: 1,
    flexDirection: 'column',

    padding: 10,
  },
  propLocality: {
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
  topView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    // gap: 1,
  },
  leftView: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    // padding: 5,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  subTract: { position: 'absolute', top: 0, width: 100, height: 50 },
  bgImgStyle: {
    width: '100%',
    height: '100%',
  },
  verifyView: {
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
  },
  verifyText: {
    fontSize: SIZES.small,
    color: 'black',
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '500',
  },
  priceView: { position: 'absolute', bottom: 10, right: 20 },
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
  header: {
    flexDirection: 'row',
    gap: 5,
  },
  headerRight: { flex: 3.5 },
  propName: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsMedium,
    fontWeight: '700',
    color: 'black',
  },
  locality: {
    fontSize: SIZES.small11,
    color: 'black',
  },
  headerLeft: { flex: 0.7 },
  flexRow: { flexDirection: 'row' },
  transView: {
    padding: 3,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 4,
  },
  transTypeNew: {
    padding: 3,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 2,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBottom: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    //   marginTop: 10,
    borderRadius: 4,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    right: 10,
  },
  propsUnits: {
    fontSize: SIZES.small13,
    color: '#8F8F8F',
    fontWeight: '500',
  },
  verticleLine: {
    backgroundColor: 'black',
    height: 35,
    width: 1,
    marginLeft: 5,
  },
  facing: {
    fontSize: SIZES.small13,
    color: '#8F8F8F',
    fontWeight: '500',
  },
});