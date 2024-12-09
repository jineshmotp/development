import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';

export const styles = StyleSheet.create({
  topView: {
    flex: 1,
    paddingTop: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  topAndroidView: {
    flex: 1,
    paddingTop: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  inputStyle: { height: 40 },
  contentStyle: { textTransform: 'capitalize' },
  heading: {
    marginBottom: 6,
    fontSize: SIZES.medium15,
    color: ColorTheme.gray,
    fontFamily: FONT.PoppinsMedium,
  },
  headView: {
    marginBottom: 20,
  },
  nameView: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: ColorTheme.gray,
  },
});
