import React from 'react';

import PropertyChipsetWithIconSelection from '@/components/common/PropertyChipsetWithIconSelection';

interface PropertyAreaProps {
  setDetails?: any;
  mandatory?: boolean;
  data?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  checkingData?: any;
  errors?: any;
  activefunction?: any;
}

const PropertyFeature: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  mandatory,
  data,
  errors,
  setDetails,
  checkingData,
  details,
  activefunction,
}) => {
  return (
    checkingData.property_type !== 'Land or Plot' && (
      <>
        <PropertyChipsetWithIconSelection
          mandatory={mandatory}
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
    )
  );
};

export default PropertyFeature;
