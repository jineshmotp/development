import { Platform } from 'react-native';

import { deviceHeight, deviceWidth, ONE_PIXEL, px } from './normalize';

const isIOS = Platform.OS === 'ios';

export { px, deviceWidth, deviceHeight, ONE_PIXEL, isIOS };
