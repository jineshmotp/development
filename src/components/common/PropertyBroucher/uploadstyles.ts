import { Platform, StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const uploadstyles = StyleSheet.create({
  container: {
    paddingLeft: 35,
    paddingRight: 35,
  },

  containerDivider: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  RNViewcontainer: {
    height: px(200),
    justifyContent: 'center',
    backgroundColor: ColorTheme.backgroundcolor,
  },
  buttonStyle: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: Platform.OS === 'android' ? px(1) : px(0.3),
    shadowRadius: px(3),
    shadowColor: ColorTheme.gray,
    elevation: px(3),
    paddingHorizontal: px(6),
    alignSelf: 'center',
    borderRadius: px(100),
  },
  textViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: px(10),
    flexDirection: 'column',
    gap: px(3),
    marginTop: px(10),
  },
  RNtextStyle: {
    fontSize: SIZES.xSmall,
    color: ColorTheme.gray,
    textAlign: 'center',
  },
  scrollViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: px(12),
  },

  imagVideoStyle: {
    height: px(150),
    width: px(200),
    borderRadius: px(5),
  },
  categoryStyle: {
    position: 'absolute',
    backgroundColor: ColorTheme.white,
    borderRadius: px(6),
    padding: px(5),
    paddingHorizontal: px(10),
    right: px(10),
    top: px(10),
  },
  categoryimgText: {
    color: ColorTheme.black,
  },
  TouchableOpacityView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: px(12),
    marginTop: px(5),
  },
  TouchableopacityStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: px(1),
    borderRadius: 100,
    padding: px(4),
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: SIZES.small,
    color: ColorTheme.black,
    fontWeight: '600',
  },
  categoryText: {
    fontSize: SIZES.small,
    fontWeight: '400',
    color: 'black',
  },

  touchableRemove: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: px(100),
    padding: px(6),
    backgroundColor: ColorTheme.red,
    gap: px(4),
  },

  removeIconStyle: {
    fontSize: SIZES.small11,
    color: ColorTheme.white,
    fontWeight: '600',
  },

  removeTextStyle: {
    fontSize: SIZES.small11,
    color: ColorTheme.white,
    fontWeight: '600',
  },

  bottomPopupStyle: {
    flexDirection: 'row',
    gap: px(10),
    justifyContent: 'flex-start',
    padding: px(10),
  },

  modelTextStyle: {
    color: ColorTheme.black,
  },
  RNViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: px(12),
  },
  fileStyle: {
    height: px(150),
    width: px(200),
    borderRadius: 5,
  },
  tagViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: px(12),
    marginTop: px(5),
  },
  categoryDropStyle: {
    flexDirection: 'row',

    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    padding: px(4),
    justifyContent: 'center',
  },
  categoryDropText: {
    color: ColorTheme.black,
  },
  chooseTagText: {
    fontSize: SIZES.medium15,
    color: ColorTheme.black,
  },
});
