import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  bottominput: {
    flex: 1,
    height: 50,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth / 1.09,
    marginBottom: Platform.OS === 'ios' ? px(50) : px(20),
    paddingRight: 5,
    color: 'black',
  },
  bottomreplyinput: {
    width: deviceWidth / 1.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 20,
    height: 30,
    color: 'black',
  },
  timetext: {
    fontWeight: '300',
    fontSize: SIZES.small,
    lineHeight: SIZES.medium18,
    padding: 5,
    color: 'black',
  },
  imgstyle1: { width: 30, height: 30 },
  defaultprofile: {
    width: 39,
    height: 39,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  rightArrow: { width: 32, height: 32 },
  emptyDataComment: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    // backgroundColor: "aqua",
  },
  emptyData: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    // backgroundColor: "aqua",
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
  emptyText: { fontSize: SIZES.medium15, color: 'black' },
  commentInputpos: {
    position: 'absolute',
    bottom: 0,
    // left: 20,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
  },
  profileImg: {
    width: 39,
    height: 39,
    borderRadius: 30,
  },
  inputField: { flex: 4, height: 40, marginLeft: 20, color: 'black' },
  scroll: {
    width: deviceWidth,

    // flex: 1,
    backgroundColor: 'white',
    // height: DEVICE_HEIGHT,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  defaultText: {
    fontSize: SIZES.medium15,
    fontWeight: 'bold',
    color: 'white',
  },
  commentsScroll: {
    width: deviceWidth / 1.09,
    paddingVertical: 20,
    height: deviceHeight / 2 - px(80),
  },
  scrollView: { flex: 1, alignItems: 'center', minHeight: deviceHeight },
  headerTop: { width: deviceWidth / 1.09 },
});
