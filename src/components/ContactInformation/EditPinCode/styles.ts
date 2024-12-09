import { StyleSheet } from 'react-native';



import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';


export const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
    width: deviceWidth,
  },
  sectionContainer: { width: deviceWidth, alignItems: 'center' },
  container: { width: deviceWidth, height: 50 },
  InputStyle: {
    width: deviceWidth / 1.09,
    borderRadius: 0,
    height: 43,
    // borderWidth: 0,
    // borderBottomWidth: 1,
    // borderBottomColor: "#D1D1D1",
    fontSize: SIZES.small13,
    fontWeight: '400',
    fontFamily: FONT.PoppinsRegular,
    color: 'black',
  },
  mainBtn: { alignItems: 'flex-end', justifyContent: 'center' },
  btnStyle: {
    marginBottom: 10,
    width: 100,
    borderRadius: 30,
    marginRight: 20,
    minHeight: 39,
  },
  textStyle: {
    color: '#000000',
    fontSize: SIZES.medium15,
  },
  inputView: {
    width: deviceWidth,
    alignItems: 'center',
    // alignSelf: "center",
    // alignItems: "center",
    marginTop: 20,
  },
  // topView: { height: deviceHeight / 2 },
});