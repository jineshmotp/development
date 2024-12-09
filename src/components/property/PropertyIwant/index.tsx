import React from 'react';

import PropertyChipsetSelection from '@/components/property/PropertyChipsetSelection';

interface PropertyProps {
  setDetails?: any;

  data?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
  activefunction?: any;
}

const PropertyIwant: React.FC<PropertyProps> = ({
  control,
  controlConstraints,

  data,
  errors,
  setDetails,
  details,
  activefunction,
}) => {
  return (
    <>
      <PropertyChipsetSelection
        mandatory={true}
        control={control}
        controlConstraints={controlConstraints}
        data={data}
        details={details}
        setDetails={setDetails}
        errors={errors}
        sectioname="I want to list property for"
        activefunction={activefunction}
      />
    </>
  );
};

export default PropertyIwant;
