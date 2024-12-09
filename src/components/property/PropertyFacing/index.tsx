import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import DropDownComponent from '@/components/common/DropDownComponent';
import SectionHoc from '@/components/common/SectionHoc';
import { propertyFacing } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  checkingData?: any;
  clearErrors?: any;
  errors?: any;
}

const PropertyFacing: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  checkingData,
  details,
}) => {
  const [propertyFaceData, setPropertyFaceData] = useState(propertyFacing);

  const { field: propertyfacingField } = useController({
    name: 'property_facing',
    control,
    defaultValue: details.property_facing,
    rules: controlConstraints.property_facing, // Apply constraints for fname
  });

  //############################################################

  const facing_calc = (item: any) => {
    setDetails({ ...details, property_facing: item.label });

    clearErrors(['property_facing']);
  };

  //#############################################################

  useEffect(() => {
    propertyfacingField.onChange(details?.property_facing);
  }, [details?.property_facing]);

  return (
    <RNView>
      {checkingData.iwant !== 'Coliving' && (
        <RNView style={styles.container}>
          <SectionHoc title="Property Facing" mandatory={true}>
            <RNView style={styles.SectionSeperation}>
              <DropDownComponent
                data={propertyFaceData}
                disabled={false}
                sectioname="Select Facing"
                value={propertyfacingField.value}
                errors={errors.property_facing}
                activefunction={facing_calc}
              />

              {errors.property_facing && (
                <RNText style={{ color: ColorTheme.red }}>{errors.property_facing.message}</RNText>
              )}
            </RNView>
          </SectionHoc>

          <Divider
            borderColor="#D9D6D6"
            style={{
              marginTop: px(10),
              gap: px(10),
            }}
          />
        </RNView>
      )}
    </RNView>
  );
};

export default PropertyFacing;
