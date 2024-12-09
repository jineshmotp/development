import React from 'react';

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

const PropertyColivingGenderPreference: React.FC<PropertyAreaProps> = ({
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
        <PropertyChipsetWithIconSelection
          control={control}
          controlConstraints={controlConstraints}
          data={data}
          details={details}
          setDetails={setDetails}
          errors={errors}
          sectioname="Gender Preference"
          activefunction={activefunction}
        />
      </>
    )
  );
};

export default PropertyColivingGenderPreference;
