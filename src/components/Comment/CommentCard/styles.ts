import { StyleSheet } from 'react-native';



import { SIZES } from '@/theme';


export const styles = StyleSheet.create({
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
  timetext: {
    fontWeight: '300',
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    padding: 5,
    color: 'black',
  },
  commentDetail: {
    padding: 10,
    backgroundColor: '#EFEFEF',
    minWidth: 250,
    borderRadius: 8,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});