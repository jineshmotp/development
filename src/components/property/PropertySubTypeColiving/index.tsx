import React from 'react';

import PropertyChipsetSelection from '@/components/property/PropertyChipsetSelection';

interface PropertyProps {
  setDetails?: any;

  data?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  checkingData?: any;
  errors?: any;
  activefunction?: any;
}

const PropertySubTypeColiving: React.FC<PropertyProps> = ({
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
    checkingData.iwant === 'Coliving' && (
      <>
        <PropertyChipsetSelection
          mandatory={true}
          control={control}
          controlConstraints={controlConstraints}
          data={data}
          details={details}
          setDetails={setDetails}
          errors={errors}
          sectioname="Property Sub Type"
          activefunction={activefunction}
        />
      </>
    )
  );
};

export default PropertySubTypeColiving;
