import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: deviceWidth * 0.95, // Adjust the container to be slightly less than the device width
    padding: 10, // Add padding inside the container
    backgroundColor: ColorTheme.transparent, // Optional: background color for visibility
  },
  imagestyle: {
    height: 150, // Fixed height or adjust as needed
    width: '100%', // Make the image take the full width of the container
    resizeMode: 'stretch', // Ensure the image covers the entire area of the box
  },
});
