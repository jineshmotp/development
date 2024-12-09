import { Dimensions, StyleSheet } from 'react-native';

import { ColorTheme, FONT } from '@/theme';
import { deviceWidth, px } from '@/utils';

const { width } = Dimensions.get('window');

export const InputStyle = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    marginBottom: 15,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    paddingHorizontal: 15,
    color: 'white',
    width: width / 1.2,
    paddingVertical: 16,
    fontFamily: FONT.PoppinsMedium,
  },
  label: {
    marginBottom: 6,
    fontSize: 15,
    color: ColorTheme.gray,
    fontFamily: FONT.PoppinsMedium,
  },
  style: {
    color: 'black',
    width: deviceWidth / 1.2,
    fontFamily: FONT.PoppinsMedium,
    borderColor: 'grey',
    borderRadius: px(8),
    marginBottom: px(15),
    // fontSize: 34,
    // backgroundColor: 'black',
  },
  outline: { borderWidth: 0.7 },
  content: { color: 'black', paddingTop: 0, paddingBottom: 0 },
});
