import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  backgroundContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#F2F2F2',
  },
  initialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  subContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  firstName: {
    fontSize: SIZES.medium18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: FONT.PoppinsBold,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreContainer: {
    marginTop: 10,
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },
  morethanCouple: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'space-between',
  },
  userPostView: {
    width: deviceWidth / 2.2,
    height: 160,
    borderRadius: 1,
  },
  userPostImage: {
    width: deviceWidth / 1.09,
    height: 250,
    borderRadius: 5,
  },
  galleryView: {
    flexDirection: 'row',

    marginTop: 1,
    width: deviceWidth / 1.09,
  },
  userImage: {
    width: deviceWidth / 1.09,
    height: 132,
    borderRadius: 1,
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'black',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 20,
    color: 'white',
  },
  socialDisplay: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviceWidth / 1.09,
    alignSelf: 'center',
  },
  likeIconContainer: {
    padding: px(5),
    backgroundColor: '#2096f3',
    borderRadius: 100,
  },
  subSocialDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
  iconStyle: {
    padding: 5,
    backgroundColor: '#2096f3',
    borderRadius: 100,
  },
  commonText: {
    fontFamily: FONT.PoppinsRegular,
    color: ColorTheme.gray,
    fontSize: SIZES.small14,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  commentImage: {
    width: 16,
    height: 16,
  },
  commentText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: 15,
    color: 'black',
  },
  lineContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#E4E4E4',
    width: deviceWidth,
    alignSelf: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    width: deviceWidth / 1.09,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  subBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
  likeIcon: {
    marginTop: -3,
  },
  likeText: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: 15,
    color: 'black',
  },
  name: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.medium15,
    lineHeight: SIZES.xLarge,
    color: 'black',
  },
  posted: {
    fontFamily: FONT.PoppinsRegular,
    color: '#848484',
    fontSize: SIZES.xSmall,
  },
  description: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsRegular,
    fontWeight: '400',
    lineHeight: SIZES.medium18,
    color: 'black',
  },
  moreBtn: {
    lineHeight: 16,
    fontSize: SIZES.small,
    color: 'blue',
    fontWeight: '400',
    flex: 1,
  },
  scroll: {
    width: deviceWidth,
    // alignItems: "center",
    // flex: 1,
    backgroundColor: 'white',
    // height: DEVICE_HEIGHT,
  },
});
