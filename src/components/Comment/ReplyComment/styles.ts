import { StyleSheet } from 'react-native';



import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';


export const styles = StyleSheet.create({
  timetext: {
    fontWeight: '300',
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    padding: 5,
    color: 'black',
  },
  defaultprofile: {
    width: 39,
    height: 39,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  defaultText: {
    fontSize: SIZES.medium15,
    fontWeight: 'bold',
    color: 'white',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  commentHead: {
    padding: 10,
    backgroundColor: '#EFEFEF',
    width: deviceWidth / 1.5,
    borderRadius: 8,
  },
  nameCommentstyle: {
    fontWeight: '500',
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    color: 'black',
  },
  parentComment: {
    fontWeight: '300',
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    color: 'black',
  },
  profileImg: {
    width: 39,
    height: 39,
    borderRadius: 30,
  },
  inputField: { flex: 4, height: 40, marginLeft: 20 },
  topView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});