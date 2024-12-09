import { StyleSheet } from 'react-native';

import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  bottomreplyinput: {
    width: deviceWidth / 1.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 20,
    height: 30,
  },
  closeBtn: {
    fontSize: 10,
    padding: 6,
    color: 'black',
  },
  commentText: {
    fontSize: 10,
    color: 'black',
  },
});
