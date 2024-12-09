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

const TransactionType: React.FC<PropertyProps> = ({
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
    checkingData.property_type !== 'Land or Plot' && (
      <>
        <PropertyChipsetSelection
          mandatory={true}
          control={control}
          controlConstraints={controlConstraints}
          data={data}
          details={details}
          setDetails={setDetails}
          errors={errors}
          sectioname="Transaction Type"
          activefunction={activefunction}
        />
      </>
    )
  );
};

export default TransactionType;
