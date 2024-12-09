import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

px;

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ColorTheme.white,
  },

  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth / 1.2,
    marginTop: px(20),
    marginBottom: px(20),
    height: px(60),
    backgroundColor: ColorTheme.secondary,
  },

  labeltext: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',
    fontSize: SIZES.small,
    verticalAlign: 'middle',
  },

  locationButton: {
    backgroundColor: ColorTheme.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: px(45),
    borderRadius: px(8),
    borderColor: ColorTheme.white,
    borderWidth: px(1),
    padding: px(5),
  },

  buttontext: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',
    fontSize: SIZES.small,
    verticalAlign: 'middle',
  },
  modelViewStyle: { zIndex: 99, position: 'absolute' },
  modelInsideViewStyle: {
    top: px(5),
    left: px(10),
    right: px(10),

    zIndex: 99,
    position: 'absolute',
  },

  topView: {
    top: px(20),
    left: px(0),
    right: px(0),
    position: 'relative',
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',

    backgroundColor: ColorTheme.gray,
    borderColor: ColorTheme.gray,
    borderRadius: px(50),
    width: px(40),
    height: px(40),
    padding: px(5),
  },

  mapView: {},
  mapStyle: { width: deviceWidth, height: deviceHeight },

  autoCompleteView: {
    top: px(70),
    left: px(10),
    right: px(10),

    zIndex: 1,
    position: 'absolute',
  },

  button_view: {
    position: 'absolute',
    bottom: 0, // Adjust the top position as needed
    left: px(10), // Adjust the left position as needed
    right: px(10), // Adjust the right position as needed
    zIndex: 1, // Ensure the autocomplete is above the map
    justifyContent: 'center',
    alignContent: 'center',
  },

  clear_button: {
    backgroundColor: ColorTheme.transparent,
    borderColor: ColorTheme.transparent,
    borderRadius: px(50),
    width: px(50),
    height: px(50),
    padding: px(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    top: Platform.OS === 'ios' ? px(0) : px(0),
    right: px(10),
    zIndex: 99,
    position: 'absolute',
  },
  saveButton: {
    backgroundColor: ColorTheme.primary,
    alignSelf: 'center',
    borderRadius: px(5),

    paddingHorizontal: px(10),
    marginVertical: px(20),
  },

  getLocationView: {
    flex: px(0.3),
    alignItems: 'flex-end',
    padding: px(5),
  },
  completeAddressView: {
    flex: px(0.7),
    alignItems: 'flex-start',
    padding: px(5),
  },
});
