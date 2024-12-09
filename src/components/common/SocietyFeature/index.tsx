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

const SocietyFeature: React.FC<PropertyAreaProps> = ({
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
    (checkingData.property_sub_type !== 'Industrial' || checkingData.property_type === 'Land or Plot') &&
    checkingData.gated_community === true && (
      <>
        <PropertyChipsetWithIconSelection
          control={control}
          controlConstraints={controlConstraints}
          data={data}
          details={details}
          setDetails={setDetails}
          errors={errors}
          sectioname="Society Features"
          activefunction={activefunction}
        />
      </>
    )
  );
};

export default SocietyFeature;
