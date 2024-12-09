import React from 'react';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
  goBack?: () => void;
}

const PropertyDescriptionDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      <RNView style={styles.containerViewStyle}>
        <RNView
          style={{
            marginBottom: 10,
          }}>
          <RNText style={styles.selectionHeader}>Property description</RNText>
        </RNView>

        <RNView style={styles.sectionView}>
          <RNText style={styles.descriptionText}>{details?.property_description || 'N/A'}</RNText>
        </RNView>
      </RNView>

      {/* <Divider
        borderColor="#D9D6D6"
        dividerWidth={deviceWidth}
        style={{
          marginVertical: 10,
        }}
      /> */}
    </RNView>
  );
};

export default PropertyDescriptionDetails;
