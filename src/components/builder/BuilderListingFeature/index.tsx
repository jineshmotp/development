import React from 'react';
import { useController } from 'react-hook-form';

import PropertyChipsetWithIconSelection from '@/components/common/PropertyChipsetWithIconSelection';

interface PropertyAreaProps {
  setDetails?: any;

  data?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  checkingData?: any;
  errors?: any;
  activefunction?: any;
}

const BuilderListingFeature: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,

  data,
  errors,
  setDetails,
  checkingData,
  details,
  activefunction,
}) => {
  const { field: propertyfeatureField } = useController({
    name: 'property_features',
    control,
    defaultValue: details.property_features,
    rules: controlConstraints.property_features, // Apply constraints for fname
  });

  return (
    <>
      <PropertyChipsetWithIconSelection
        mandatory={true}
        control={control}
        controlConstraints={controlConstraints}
        data={data}
        details={details}
        setDetails={setDetails}
        errors={errors}
        sectioname="Property Features"
        activefunction={activefunction}
      />
    </>
  );
};

export default BuilderListingFeature;
