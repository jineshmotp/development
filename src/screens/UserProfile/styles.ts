import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const profileStyles = StyleSheet.create({
  container: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  addBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
  },
  userIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 100,
    backgroundColor: ColorTheme.primary,
  },
  userLetter: {
    textTransform: 'capitalize',
    fontSize: SIZES.xLarge,
    fontFamily: FONT.PoppinsBold,
    lineHeight: 35,
    color: 'white',
  },

  userName: {
    fontSize: 18,
    fontFamily: FONT.PoppinsMedium,
    textTransform: 'capitalize',
    color: ColorTheme.nearLukGray,
  },
  userIconSheet: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 100,
    backgroundColor: ColorTheme.primary,
  },
  tabsContainer: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 20,
  },
  headPart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  idText: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.nearLukGray,
    paddingBottom: 2,
  },
  memberText: {
    fontSize: SIZES.small,
    fontFamily: FONT.PoppinsMedium,
    color: ColorTheme.nearLukGray,
  },
  modalView: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  topSectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  username: {
    fontSize: SIZES.medium15,
    fontFamily: FONT.PoppinsMedium,
    textTransform: 'capitalize',
    color: 'black',
    lineHeight: SIZES.large,
    paddingBottom: 5,
  },
  profileText: {
    color: ColorTheme.nearLukGray,
    fontSize: SIZES.small11,
    lineHeight: SIZES.medium15,
  },
  rightArrow: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
  },
  divider: {
    borderBottomWidth: 1,
    width: deviceWidth / 1.05,
    marginTop: 20,
    borderBottomColor: ColorTheme.nearLukGray2,
    alignSelf:'center'
  },
  indicator: {
    width: deviceWidth,
    height: px(300),
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentIcon: { width: px(20), height: px(20) },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: ColorTheme.transparent,
    backgroundColor: ColorTheme.transparent,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: ColorTheme.white,
    height: deviceHeight / 1.4,
    width: deviceWidth,
    elevation: 5,
    borderTopLeftRadius: px(20),
    borderTopRightRadius: px(20),
    paddingBottom: px(20),
  },
});
