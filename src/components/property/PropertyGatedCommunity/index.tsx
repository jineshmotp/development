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

const PropertyGatedCommunity: React.FC<OwnerDetailsProps> = ({
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
    defaultValue: details?.gated_community || false,
    rules: controlConstraints.gated_community, // Apply constraints for fname
  });

  useEffect(() => {
    console.log(' gated communitysssss--->', details?.gated_community);
    gatedCommunityField.onChange(details?.gated_community);
  }, [details?.gated_community]);

  return (
    (checkingData.property_type === 'Land or Plot' ||
      (checkingData.property_type === 'Residential' && checkingData.iwant !== 'Coliving')) && (
      <>
        <RNView>
          <PropertyYesNo
            propertyKeylabel="Gated Community"
            propertyKey="gated_community" // Pass your property key
            propertyValue={gatedCommunityField.value}
            setPropertyDetails={(key, value) => {
              gatedCommunityField.onChange(value); // Update form state
              setDetails({ ...details, [key]: value }); // Update parent state
            }}
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

export default PropertyGatedCommunity;
