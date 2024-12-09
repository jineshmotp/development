import React from 'react';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

interface ProptypeDetailsProps {
  errordata?: String;
  styledata?: any;
}

const PropertyInputErrorComponent: React.FC<ProptypeDetailsProps> = ({ errordata, styledata }) => {
  return (
    <RNView>
      <RNText
        style={[
          {
            color: errordata ? ColorTheme.red : ColorTheme.red,
            paddingBottom: px(0),
            paddingTop: px(0),
            fontSize: SIZES.xSmall,
          },
          styledata,
        ]}>
        {errordata}
      </RNText>
    </RNView>
  );
};

export default PropertyInputErrorComponent;
