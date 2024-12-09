import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import PropertyYesNo from '@/components/property/PropertyYesNo';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  checkingData?: any;
  controlConstraints?: any;
  errors?: any;
}

const BuilderListingGatedCommunity: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  checkingData,
  errors,
  setDetails,
  details,
}) => {
  const { field: gatedCommunityField } = useController({
    name: 'gated_community',
    control,
    defaultValue: details?.gated_community,
    rules: controlConstraints.gated_community, // Apply constraints for fname
  });

  useEffect(() => {
    gatedCommunityField.onChange(details?.gated_community);
  }, []);

  return (
    checkingData.property_type === 'Residential' && (
      <>
        <RNView style={styles.container}>
          <PropertyYesNo
            propertyKeylabel="Gated Community"
            propertyKey="gated_community" // Pass your property key
            propertyValue={gatedCommunityField.value}
            setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
          />

          <Divider
            borderColor={ColorTheme.nearLukGray5}
            style={{
              marginTop: px(10),
              gap: px(10),
            }}
          />
        </RNView>
      </>
    )
  );
};

export default BuilderListingGatedCommunity;
