import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
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
  additionalImage: {
    width: deviceWidth / 3.4,
    height: 150,
    // borderRadius: 2,
    // marginTop: 6,
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
});
