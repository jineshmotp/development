import { StyleSheet } from 'react-native';

import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  imgStyle: { width: '100%', height: '100%' },
  containerDimension: {
    width: deviceWidth,
    height: deviceHeight,
  },
  container: {
    flex: 1,
    backgroundColor: ColorTheme.white,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
  },
  toolbar: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 1,
    // height: deviceHeight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bottomToolBar: {
    bottom: deviceHeight / 2,
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },

  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
