import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import DropDownComponent from '@/components/common/DropDownComponent';
import SectionHoc from '@/components/common/SectionHoc';
import { propertyFloorTypes } from '@/constants/function/property.helper';
import RNView from '@/custom/RNView';

import { styles } from '../../../screens/Property/styles';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyFloorTypes: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
}) => {
  const [propertyfloortypes, setPropertyfloortypes] = useState(propertyFloorTypes);

  const { field: floortypesField } = useController({
    name: 'floor_types',
    control,
    defaultValue: details?.floor_types,
    rules: controlConstraints.floor_types, // Apply constraints for fname
  });

  //############################################################

  const floortype_calc = (item: any) => {
    setDetails({ ...details, floor_types: item.label });
  };

  useEffect(() => {
    floortypesField.onChange(details?.floor_types);
  }, [details?.floor_types]);

  //#############################################################

  return (
    <RNView style={styles.container}>
      <SectionHoc title="Floor Types">
        <RNView style={styles.SectionSeperation}>
          <DropDownComponent
            data={propertyfloortypes}
            disabled={false}
            sectioname="Floor Type"
            value={floortypesField.value}
            errors={errors.floortypesField}
            activefunction={floortype_calc}
          />
        </RNView>
      </SectionHoc>

      <Divider
        borderColor="#D9D6D6"
        style={{
          marginTop: 10,
          gap: 10,
        }}
      />
    </RNView>
  );
};

export default PropertyFloorTypes;
