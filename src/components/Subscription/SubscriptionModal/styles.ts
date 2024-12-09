import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

export const styles = StyleSheet.create({
  modelHeaderView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  modelHeaderText: {
    color: ColorTheme.black,
    fontWeight: 'bold',
  },

  modelSelectionView: {
    flex: 0.9,

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingBottom: px(150),
  },

  modelSectionStyle: {
    height: px(50),
    width: px(200),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    // paddingLeft: px(100),
    // paddingRight: px(100),
    backgroundColor: ColorTheme.transparent,
    borderColor: ColorTheme.gray2,
    borderRadius: px(5),
    borderWidth: 1,
    marginBottom: px(8),
  },

  modelSubscriptionText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: SIZES.small14,
    color: ColorTheme.black,
  },
  modelSubscriptionSubText: {
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: SIZES.xSmall,
    color: ColorTheme.gray,
  },
});
