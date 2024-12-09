import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  topView: {
    marginTop: px(10),
    marginHorizontal: px(10),
  },
  dateStyle: {
    alignSelf: 'center',
    color: 'gray',
    marginBottom: 10,
    fontFamily: FONT.PoppinsRegular,
  },
  topContainer: {
    minHeight: px(30),
    maxWidth: deviceWidth / 1.2,
    minWidth: px(50),
    backgroundColor: '#F0F0F0',
    margin: 2,
    borderRadius: 15,
  },
  topContainerPreview: {
    minHeight: px(30),
    maxWidth: deviceWidth / 1.5,
    minWidth: px(50),
    backgroundColor: '#F0F0F0',
    margin: 2,
    borderRadius: 15,
  },
  msgView: {
    paddingVertical: 1,
    paddingHorizontal: px(18),
    marginTop: px(5),
  },
  msgText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: SIZES.small,
    textAlign: 'left',
    textAlignVertical: 'top',
    // paddingHorizontal: 20,
    color: ColorTheme.black,
  },
  dateView: {
    marginHorizontal: px(10),
    marginBottom: px(5),
  },
  dateText: {
    color: '#999999',
    fontSize: SIZES.xSmall,
    fontFamily: FONT.PoppinsRegular,
  },
});
