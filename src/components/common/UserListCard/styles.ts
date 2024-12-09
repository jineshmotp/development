import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    height: 70,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorTheme.white,
    borderBottomColor: ColorTheme.nearLukGray4,
    borderBottomWidth: 0.5,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth / 1.09,
  },
  imgStyle: {
    width: px(39),
    height: px(39),
    borderRadius: px(39),
    borderColor: ColorTheme.nearLukGray4,
    borderWidth: 0.5,
  },
  leftSide: {
    flex: 1,
    paddingLeft: 10,
  },
  userName: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small13,
    lineHeight: 20,
    color: 'black',
  },
  msgText: {
    color: 'gray',
    fontSize: 12,
    width: 200,
  },
  dateView: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    height: 60,
    justifyContent: 'space-evenly',
    width: 80,
  },
  dateText: {
    color: 'black',
    fontSize: SIZES.small13,
    fontFamily: FONT.PoppinsMedium,
  },
  pendingCount: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#81D01C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: { fontSize: SIZES.small11, color: 'white' },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px(60),
    justifyContent: 'space-between',
    // width: 70,
  },
  defaultprofile: {
    width: px(39),
    height: px(39),
    borderRadius: px(39),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  defaultText: {
    fontSize: SIZES.medium15,
    fontWeight: 'bold',
    color: 'white',
  },
});
