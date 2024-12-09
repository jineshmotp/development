import React from 'react';

import PropertyChipsetSelection from '@/components/property/PropertyChipsetSelection';

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

const PropertyWashrooms: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,

  data,
  errors,
  setDetails,
  checkingData,
  details,
  activefunction,
}) => {
  return (
    ((checkingData.property_sub_type === 'Office_Space' && checkingData.transaction_type_new !== 'Bareshell') ||
      checkingData.iwant === 'Coliving') && (
      <PropertyChipsetSelection
        control={control}
        controlConstraints={controlConstraints}
        data={data}
        details={details}
        setDetails={setDetails}
        errors={errors}
        sectioname="Washroom"
        activefunction={activefunction}
      />
    )
  );
};

export default PropertyWashrooms;
