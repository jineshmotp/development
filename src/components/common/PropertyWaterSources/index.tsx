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

const PropertyWaterSources: React.FC<PropertyAreaProps> = ({
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
    (checkingData.property_type === 'Residential' ||
      checkingData.property_sub_type === 'Industrial' ||
      checkingData.property_sub_type === 'Shop_And_Retail' ||
      checkingData.property_sub_type === 'Hospitality' ||
      checkingData.gated_community === false) &&
    checkingData.property_type !== 'Land or Plot' &&
    checkingData.iwant !== 'Coliving' && (
      <>
        <PropertyChipsetWithIconSelection
          mandatory={false}
          control={control}
          controlConstraints={controlConstraints}
          data={data}
          details={details}
          setDetails={setDetails}
          errors={errors}
          sectioname="Water Sources"
          activefunction={activefunction}
        />
      </>
    )
  );
};

export default PropertyWaterSources;
