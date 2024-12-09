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
  goBack?: () => void;
}

const PropertyAdditionalContactDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.additional_contact_details?.length > 0 && (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Additional Contact Details</RNText>
            </RNView>

            <RNView
              style={{
                marginTop: 10,
                flexDirection: 'column',
                gap: 5,
              }}>
              {details?.additional_contact_details.map((contact, index) => (
                <RNView key={index}>
                  <SpecChip label={'Name'} description={contact.name} />
                  <SpecChip label={'Mobile number'} description={contact.mobile_no} />
                </RNView>
              ))}
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
      )}
    </RNView>
  );
};

export default PropertyAdditionalContactDetails;
