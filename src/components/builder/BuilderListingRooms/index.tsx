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

const BuilderListingRooms: React.FC<PropertyAreaProps> = ({
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
    checkingData.property_type === 'Residential' && (
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

export default BuilderListingRooms;
