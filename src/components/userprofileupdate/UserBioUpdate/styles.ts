import { StyleSheet } from 'react-native';



import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';


export const styles = StyleSheet.create({
  sectionContainer: { width: deviceWidth, alignItems: 'center' },
  container: { width: deviceWidth / 1.09, marginTop: 20 },
  InputStyle: {
    width: deviceWidth / 1.09,
    borderRadius: 0,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: SIZES.small13,
    paddingTop: px(10),
    color: 'black',
  },
  mainBtn: { alignItems: 'flex-end', justifyContent: 'center' },
  btnStyle2: {
    marginBottom: 10,
    width: 100,
    borderRadius: 25,
    marginRight: 20,
    minHeight: 39,
    backgroundColor: ColorTheme.nearLukGray4,
  },
  btnStyle: {
    marginBottom: 10,
    width: 100,
    borderRadius: 25,
    marginRight: 20,
    minHeight: 39,
    backgroundColor: ColorTheme.primary,
  },
  initialText: {
    color: ColorTheme.onboardingButton,
    fontSize: SIZES.medium15,
    fontWeight: '500',
    paddingLeft:px(20),
    marginTop:px(20)
  },
  textBtn: {
    color: 'black',
    fontSize: SIZES.medium15,
    fontWeight: '500',
  },
  inputView: {
    width: deviceWidth,
    // alignSelf: "center",
    alignItems: 'center',
    // marginTop: 20,
  },
});