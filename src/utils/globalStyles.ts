import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default globalStyles;
