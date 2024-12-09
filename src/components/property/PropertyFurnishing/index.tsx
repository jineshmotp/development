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

const PropertyFurnishing: React.FC<PropertyAreaProps> = ({
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
    checkingData.iwant !== 'Coliving' &&
    checkingData.property_type !== 'Land or Plot' &&
    checkingData.property_sub_type !== 'Industrial' &&
    checkingData.property_sub_type !== 'Educational' &&
    checkingData.property_sub_type !== 'Office_Space' &&
    checkingData.property_sub_type !== 'Shop_And_Retail' &&
    checkingData.transaction_type_new !== 'Bareshell' && (
      <>
        <PropertyChipsetSelection
          mandatory={false}
          control={control}
          controlConstraints={controlConstraints}
          data={data}
          details={details}
          setDetails={setDetails}
          errors={errors}
          sectioname="Furnishing Status"
          activefunction={activefunction}
        />
      </>
    )
  );
};

export default PropertyFurnishing;
