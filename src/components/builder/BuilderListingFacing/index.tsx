import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';

import PropertyChipsetWithIconSelection from '@/components/common/PropertyChipsetWithIconSelection';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  data?: any;
  control?: any;
  controlConstraints?: any;
  checkingData?: any;
  clearErrors?: any;
  errors?: any;
  activefunction?: any;
}

const BuilderListingFacing: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  data,
  setDetails,
  clearErrors,
  checkingData,
  details,
  activefunction,
}) => {
  const { field: propertyfacingField } = useController({
    name: 'property_facing_array',
    control,
    defaultValue: details.property_facing_array,
    rules: controlConstraints.property_facing_array, // Apply constraints for fname
  });

  //#############################################################

  useEffect(() => {
    // console.log('faceing array :', details?.property_facing_array);
    propertyfacingField.onChange(details?.property_facing_array);
  }, [details?.property_facing_array]);

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
        sectioname="Property Facing"
        activefunction={activefunction}
      />
    </>
  );
};

export default BuilderListingFacing;
