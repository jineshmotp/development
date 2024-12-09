import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
    shadowRadius: 3,
    shadowColor: 'gray',
    padding: 10,
    borderRadius: 100,
    paddingHorizontal: 20,
    elevation: 5, // Android only (elevation creates shadow)
    height: 40,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    flex: 1,
    // justifyContent: "center",
  },
  checkboxBase: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#5DB2BB',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#5DB2BB',
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
});
