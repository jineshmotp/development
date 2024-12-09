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

const VerificationDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.dtcp_number !== '' && details?.rera_number !== '' ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Verification Details</RNText>
            </RNView>

            <RNView
              style={{
               
              }}>
              {details?.property_type === 'Land or Plot' ? (
                <SpecChip
                  label={'DTCP Number'}
                  description={details?.dtcp_number ? `${details?.dtcp_number} ${details?.is_dtcp_verified}` : 'N/A'}
                />
              ) : (
                <SpecChip
                  label={'Rera Number'}
                  description={details?.rera_number ? `${details?.rera_number} ${details?.is_rera_verified}` : 'N/A'}
                />
              )}
            </RNView>
          </RNView>
        </>
      ) : null}

      <Divider
        borderColor="#D9D6D6"
        dividerWidth={deviceWidth}
        style={{
          marginVertical: px(10),
        }}
      />
    </RNView>
  );
};

export default VerificationDetails;
