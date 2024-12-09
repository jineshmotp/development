import { Platform, StyleSheet } from 'react-native';



import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';


export const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 1.1,
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 3,
    shadowColor: 'gray',
    elevation: 3,
    borderRadius: 8,
  },
  containerChild: {
    flexDirection: 'row',
    gap: 10,
    padding: 5,
  },
  hallName: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 16,
    color: ColorTheme.gray,
  },
  hall: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: SIZES.small11,
    color: '#656565',
    fontWeight: '300',
    lineHeight: 18,
  },
  bookingDate: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.xLarge,
    fontWeight: '600',
    marginTop: 10,
    color: 'black',
  },
  bookingDay: {
    fontFamily: FONT.PoppinsRegular,
    color: 'black',
    fontWeight: '300',
    fontSize: SIZES.small13,
    // lineHeight: 36,
  },

  cancelBtn: {
    width: 140,
    alignSelf: 'flex-end',
    margin: 8,
    backgroundColor: ColorTheme.danger,
    minHeight: 30,
    borderRadius: 5,
  },
  againBtn: {
    width: 140,
    alignSelf: 'flex-end',
    margin: 8,
    backgroundColor: ColorTheme.danger,
    minHeight: 30,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small,
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 8,
    gap: 3,
  },
  footerContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  headerView: {
    alignItems: 'center',
    gap: 2,
  },
  profileStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});