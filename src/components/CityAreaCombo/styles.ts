import { StyleSheet } from 'react-native';

import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  smallInputStyle: {
    height: px(43),
    width: deviceWidth / 2.4,
    fontSize: SIZES.small14,
    fontWeight: '400',
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth / 1.09,
  },
  renderText: {
    fontSize: px(14),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.black,
    marginTop: px(10),
    paddingVertical: px(5),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },

  selectedText: {
    backgroundColor: ColorTheme.onboardingPrimary,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: ColorTheme.white,
  },
  selectedCitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  selectedCityButton: {
    backgroundColor: ColorTheme.onboardingPrimary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCityText: {
    backgroundColor: ColorTheme.onboardingPrimary,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: ColorTheme.white,
  },
});
