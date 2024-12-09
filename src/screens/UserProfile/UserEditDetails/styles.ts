import { StyleSheet } from 'react-native';

import { FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

export const styles = StyleSheet.create({
  mapView: {
    width: deviceWidth / 1.08,
    height: 150,
    marginBottom: 10,
  },
  sectionContainer: { width: deviceWidth, alignItems: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    width: deviceWidth / 1.09,
  },
  sectionHeaderText: {
    color: 'black',
    fontFamily: FONT.PoppinsBold,
    fontSize: SIZES.medium,
  },
  sectionDetailPart: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    width: deviceWidth / 1.09,
    paddingVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
    width: deviceWidth,
  },
  sectionpart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconCircle: {
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionText: { fontSize: SIZES.small, fontFamily: FONT.PoppinsMedium, color: 'black' },
  editTextStyle: { color: '#1E9991', fontSize: SIZES.small, textAlign: 'left' },
  followImg: {
    height: 67,
    width: 67,
    marginRight: 10,
    borderRadius: 60,
  },
  followerText: {
    fontSize: SIZES.small13,
    fontWeight: '500',
    fontFamily: FONT.PoppinsMedium,
    color: 'black',
  },
  contentContainerStyle: { paddingBottom: 50 },
  scrollStyle: {
    backgroundColor: '#F1F1F1',
  },
});
