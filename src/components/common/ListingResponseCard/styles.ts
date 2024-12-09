import { StyleSheet } from 'react-native';



import { FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';


export const styles = StyleSheet.create({
  btnStyle: {
    // marginBottom: 10,
    width: 120,
    borderRadius: 5,
    // marginRight: 20,
    minHeight: 32,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },

  btnText: {
    color: 'black',
    lineHeight: 21,
    fontWeight: '500',
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsRegular,
  },
  btnContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: deviceWidth / 1.09,
  },
  postedText: {
    fontSize: SIZES.xSmall,
    color: 'black',
    paddingLeft: 4,
    lineHeight: 14,
    flex:1,
    marginRight:px(2)
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 3,
  },
  cardContainer: {
    width: deviceWidth / 1.09,
    height: px(180),
    alignItems: 'center',
  },
  cardView: {
    backgroundColor: 'white',
    width: deviceWidth / 1.09,
    height: px(180),
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    flex:2,
    justifyContent:'space-between'
    // justifyContent: "center",
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgView: {
    flex: 1,
    height: px(180),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: { height: px(170), position: 'relative', right: 5 ,width:px(150)},
  cardContent: { flex: 1, height: px(180), paddingLeft: 5 },
  propView: { marginTop: 10 },
  propName: {
    fontSize: SIZES.small,
    fontWeight: '600',
    lineHeight: 18,
    color: 'black',
  },
  addView: { marginVertical: SIZES.small13 },
  priceText: {
    fontSize: SIZES.medium15,
    fontWeight: '600',
    color: 'black',
    //   fontFamily: FONT.PoppinsMedium,
  },
  btnView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
  },
});