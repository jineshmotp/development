import React from 'react';

import Divider from '@/components/common/Divider';
import SpecChip from '@/components/property/SpecChip';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const PropertyVerificationDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.rera_number || details?.dtcp_number ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Verification Details</RNText>
            </RNView>

            <RNView style={styles.sectionView}>
              {details?.rera_number ? (
                <SpecChip label={'Rera Verification Number'} description={details?.rera_number} />
              ) : null}
              {details?.dtcp_number ? (
                <SpecChip label={'DTCP Verification Number'} description={details?.dtcp_number} />
              ) : null}
            </RNView>
          </RNView>

          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={{
              marginVertical: px(10),
            }}
          />
        </>
      ) : null}
    </RNView>
  );
};

export default PropertyVerificationDetails;
