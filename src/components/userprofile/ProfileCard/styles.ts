import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  containerView: {
    width: deviceWidth / 1.09,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profile: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 100,
    backgroundColor: '#DEEBF3',
    // borderColor: '#92C8EA',
  },
  imgStyle: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  imgAgent: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  nameStyle: {
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
    fontSize: SIZES.medium15,
    fontWeight: '500',
    lineHeight: SIZES.large,
  },
  defaultProfile: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  ownerText: {
    fontSize: SIZES.medium15,
    fontWeight: 'bold',
    color: 'white',
  },
});
