import React from 'react';

import PropertyChipsetSelection from '@/components/property/PropertyChipsetSelection';
import RNView from '@/custom/RNView';

import { styles } from '../../../screens/Property/styles';

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

const PropertyRooms: React.FC<PropertyAreaProps> = ({
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
    ((checkingData.iwant === 'Coliving' &&
      (checkingData.property_sub_type === 'Flat' ||
        checkingData.property_sub_type === 'Studio Apartment' ||
        checkingData.property_sub_type === 'Apartment' ||
        checkingData.property_sub_type === 'Villa' ||
        checkingData.property_sub_type === 'Independent House')) ||
      (checkingData.iwant !== 'Coliving' &&
        checkingData.property_sub_type !== 'Industrial' &&
        checkingData.property_sub_type !== 'Educational' &&
        checkingData.property_sub_type !== 'Office_Space' &&
        checkingData.property_sub_type !== 'Shop_And_Retail' &&
        checkingData.property_sub_type !== 'Hospitality' &&
        checkingData.transaction_type_new !== 'Bareshell' &&
        checkingData.property_type !== 'Land or Plot')) && (
      <>
        <RNView style={styles.container}>
          <PropertyChipsetSelection
            mandatory={true}
            control={control}
            controlConstraints={controlConstraints}
            data={data}
            details={details}
            setDetails={setDetails}
            errors={errors}
            sectioname="Rooms"
            activefunction={activefunction}
          />
        </RNView>
      </>
    )
  );
};

export default PropertyRooms;
