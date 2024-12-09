import React from 'react';

import Divider from '@/components/common/Divider';
import SpecChip from '@/components/property/SpecChip';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
  goBack?: () => void;
}

const PropertyOwnderDisplayDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      <>
        <RNView style={styles.containerViewStyle}>
          <RNView>
            <RNText style={styles.selectionHeader}>Owner Details</RNText>
          </RNView>

          <RNView style={styles.sectionView}>
            <RNView>
              <SpecChip label={'First Name'} description={details?.owner_contact_details?.fname?.toUpperCase()} />

              <SpecChip label={'Last Name'} description={details?.owner_contact_details?.lname?.toUpperCase()} />

              <SpecChip label={'Mobile number'} description={details?.owner_contact_details?.mobile_no} />
            </RNView>
          </RNView>
        </RNView>

        <Divider
          borderColor="#D9D6D6"
          dividerWidth={deviceWidth}
          style={{
            marginVertical: 10,
          }}
        />
      </>
    </RNView>
  );
};

export default PropertyOwnderDisplayDetails;
