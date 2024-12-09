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

const PropertyShopTypeShowroom: React.FC<PropertyAreaProps> = ({
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
    checkingData.shop_retail_type === 'Showroom' && (
      <>
        <PropertyChipsetWithIconSelection
          mandatory={true}
          control={control}
          controlConstraints={controlConstraints}
          data={data}
          details={details}
          setDetails={setDetails}
          errors={errors}
          sectioname="Showroom Types"
          activefunction={activefunction}
        />
      </>
    )
  );
};

export default PropertyShopTypeShowroom;
