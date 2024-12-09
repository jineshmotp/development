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

const PropertyAdditionalDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  // console.log('checking on details ====>>>>',JSON.stringify(details));

  return (
    <RNView>
      <RNView style={styles.containerViewStyle}>
        <RNView>
          <RNText style={styles.selectionHeader}>Additional Details</RNText>
        </RNView>

        <RNView style={styles.sectionPlaceholder}>
          {details?.furnishing_status !== '' && details?.furnishing_status ? (
            <SpecChip label={'Furnishing Status'} description={details?.furnishing_status?.toUpperCase() || 'N/A'} />
          ) : null}

          {details?.ownership?.toUpperCase() ? (
            <SpecChip label={'Ownership Type'} description={details?.ownership?.toUpperCase() || 'N/A'} />
          ) : null}

          {details?.property_facing !== '' && details?.property_facing ? (
            <SpecChip label={'Facing'} description={details?.property_facing || 'N/A'} />
          ) : null}

          {details?.property_facing_array !== '' && details?.property_facing_array ? (
            <SpecChip
              label={'Facing'}
              description={details?.property_facing_array.map((facing, index) => facing + ' ')}
            />
          ) : null}

          {details?.floor_types !== '' && details?.floor_types !== undefined ? (
            <SpecChip label={'Floor Type'} description={details?.floor_types || 'N/A'} />
          ) : null}

          {details?.iwant === 'Coliving' ? <SpecChip label={'Room'} description={details?.bhk || 'N/A'} /> : null}

          {details?.iwant === 'Coliving' ? (
            details?.coliving_type === 'Private_room' ? (
              <SpecChip label={'Coliving Type'} description={'Private Room'} />
            ) : (
              <SpecChip label={'Coliving Type'} description={'Shared Room'} />
            )
          ) : null}

          {details?.iwant === 'Coliving' ? (
            <SpecChip
              label={'Gender Preference'}
              description={details?.gender_preference.map((gender, index) => gender + ' ')}
            />
          ) : null}
        </RNView>
      </RNView>

      <Divider
        borderColor="#D9D6D6"
        dividerWidth={deviceWidth}
        style={{
          marginVertical: 10,
        }}
      />
    </RNView>
  );
};

export default PropertyAdditionalDetails;
