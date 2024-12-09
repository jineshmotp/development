import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
import PropertyYesNo from '@/components/property/PropertyYesNo';
import RNView from '@/custom/RNView';

import { styles } from '../../../screens/Property/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  checkingData?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyKitchenDinningArea: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  checkingData,
  errors,
  setDetails,
  details,
}) => {
  const { field: kitchenAreaField } = useController({
    name: 'kitchen_area_available',
    control,
    defaultValue: details?.kitchen_area_available,
    rules: controlConstraints.kitchen_area_available, // Apply constraints for fname
  });

  const { field: dinningAreaField } = useController({
    name: 'dining_area_available',
    control,
    defaultValue: details?.dining_area_available,
    rules: controlConstraints.dining_area_available, // Apply constraints for fname
  });

  useEffect(() => {
    kitchenAreaField.onChange(details?.kitchen_area_available);
    dinningAreaField.onChange(details?.dining_area_available);
  }, [details?.kitchen_area_available, details?.dining_area_available]);

  return (
    (checkingData.property_sub_type === 'Hospitality' ||
      checkingData.property_sub_type === 'Shop_And_Retail' ||
      (checkingData.property_sub_type === 'Industrial' && checkingData.property_type !== 'Land or Plot') ||
      checkingData.property_sub_type === 'Educational') && (
      <>
        <RNView style={styles.container}>
          <SectionHoc title="Property Details">
            <>
              <PropertyYesNo
                propertyKeylabel="Kitchen Area"
                propertyKey="kitchen_area_available" // Pass your property key
                propertyValue={kitchenAreaField.value}
                setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
              />

              <PropertyYesNo
                propertyKeylabel="Dinning Area"
                propertyKey="dining_area_available" // Pass your property key
                propertyValue={dinningAreaField.value}
                setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
              />
            </>
          </SectionHoc>

          <Divider
            borderColor="#D9D6D6"
            style={{
              marginTop: 10,
              gap: 10,
            }}
          />
        </RNView>
      </>
    )
  );
};

export default PropertyKitchenDinningArea;
