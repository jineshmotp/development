import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 3,
    shadowColor: 'gray',
    // padding: 10,
    borderRadius: 100,
    paddingHorizontal: 20,
    elevation: 5, // Android only (elevation creates shadow)
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});
