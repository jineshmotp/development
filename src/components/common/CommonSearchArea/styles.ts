import { StyleSheet } from 'react-native';



import { FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';


export const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: deviceWidth,
    shadowColor: 'gray',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    // overflow: 'hidden',
  },
  searchInput: {
    borderBottomWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 15,
    borderBottomColor: '#00000026',
    height: 45,
    color: 'black',
  },
  listItem: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    height: 40,
    // marginVertical: 10,
  },
  topInputView: {
    height: 100,
    width: deviceWidth,
    backgroundColor: 'white',
  },
  headView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeBtn: { padding: 5, marginTop: 2 },
  textStyle: {
    fontSize: SIZES.medium15,
    fontWeight: '400',
    fontFamily: FONT.PoppinsMedium,
    padding: 5,
    marginTop: 5,
    color: 'black',
  },
  contentStyle: {
    paddingBottom: 50,
    height: deviceHeight - 130,
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: SIZES.medium18,
    color: 'black',
  },
  mainContainer: { height: deviceHeight - 100 },
});