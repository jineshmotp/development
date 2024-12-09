import React from 'react';

import moment from 'moment';

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

const PropertyListingDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      <RNView style={styles.containerViewStyle}>
        <RNView>
          <RNText style={styles.selectionHeader}>Listing Details</RNText>
        </RNView>

        <RNView style={styles.sectionView}>
          <SpecChip label={'Purpose'} description={details?.iwant ? `${details?.iwant}` : 'N/A'} />
          {details?.property_type !== '' && details?.property_type !== undefined ? (
            <SpecChip
              label={'Property Type'}
              description={details?.property_type ? `${details?.property_type}` : 'N/A'}
            />
          ) : null}

          {details?.property_sub_type === 'Shop_And_Retail' ? (
            <SpecChip label={'Property Sub Type'} description={'Shop And Retail'} />
          ) : details?.property_sub_type === 'Office_Space' ? (
            <SpecChip label={'Property Sub Type'} description={'Office Space'} />
          ) : (
            <SpecChip
              label={'Property Sub Type'}
              description={details?.property_sub_type ? `${details?.property_sub_type}` : 'N/A'}
            />
          )}

          {details?.hospitality_type !== '' && details?.hospitality_type !== undefined ? (
            <SpecChip
              label={'Hospitality Type'}
              description={details?.hospitality_type ? `${details?.hospitality_type}` : 'N/A'}
            />
          ) : null}
          {details?.transaction_type !== '' && details?.transaction_type !== undefined ? (
            details?.transaction_type === 'Pre_owned' ? (
              <SpecChip label={'Transaction Sub Type'} description={'Pre Owned'} />
            ) : (
              <SpecChip
                label={'Transaction Type'}
                description={details?.transaction_type ? `${details?.transaction_type}` : 'N/A'}
              />
            )
          ) : null}

          {details?.transaction_type_new !== '' && details?.transaction_type_new !== undefined ? (
            details?.transaction_type_new === 'Ready_to_occupy' ? (
              <SpecChip label={'Transaction Sub Type'} description={'Ready to occupy'} />
            ) : details?.transaction_type_new === 'Under_construction' ? (
              <SpecChip label={'Transaction Sub Type'} description={'Under construction'} />
            ) : (
              <SpecChip
                label={'Transaction Sub Type'}
                description={details?.transaction_type_new ? `${details?.transaction_type_new}` : 'N/A'}
              />
            )
          ) : null}

          {details?.ready_for_possession_by !== '' && details?.ready_for_possession_by !== undefined ? (
            <SpecChip
              label={'Possession Date'}
              description={
                details?.ready_for_possession_by
                  ? `${moment(details?.ready_for_possession_by).format('YYYY-MM-DD')}`
                  : 'N/A'
              }
            />
          ) : null}
          {details?.gated_community !== '' && details?.gated_community !== undefined ? (
            <SpecChip label={'Gated Community'} description={details?.gated_community ? 'YES' : 'NO'} />
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
    </RNView>
  );
};

export default PropertyListingDetails;
