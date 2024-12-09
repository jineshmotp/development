import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { Platform, Text, TouchableOpacity } from 'react-native';

import BottomSheetWrapper from '@/components/common/BottomSheetWrapper';
import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
import PropertyCategoryChipsWithIcon from '@/components/property/PropertyCategoryChipsWithIcon';
import { propertyAges } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceHeight, px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  control?: any;
  clearErrors?: any;
  controlConstraints?: any;
  checkingData?: any;
  errors?: any;
}

const PropertyAge: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  checkingData,
  details,
}) => {
  const [propertyAgeData, setPropertyAgeData] = useState(propertyAges);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { field: propertyAgeField } = useController({
    name: 'property_age',
    control,
    defaultValue: details?.property_age,
    rules: controlConstraints.property_age, // Apply constraints for fname
  });

  //############################################################

  const ageCalcuation = (item: any) => {
    setDetails({ ...details, property_age: item.label });
    clearErrors(['property_age']);
  };

  // Define item height and calculate total height
  const itemHeight = Platform.OS === 'ios' ? 7.2 : 5.8; // Height of each item in pixels
  const totalHeight = propertyAgeData.length * itemHeight;

  // Calculate snap point with a maximum height constraint
  const snapPointHeight = Math.min(totalHeight, deviceHeight * 0.8);
  // console.log('snappoint height :', snapPointHeight);
  // Maximum height is 80% of screen height

  //#############################################################

  return (
    <>
      <RNView>
        {checkingData.iwant !== 'Coliving' && (
          <RNView style={styles.container}>
            <SectionHoc title="Property Age" mandatory={true}>
              <PropertyCategoryChipsWithIcon
                mandatory={true}
                errortext={errors.property_age}
                item={{
                  label: details?.property_age ? `Property Age (${details?.property_age} Years)` : 'Property Age',
                }}
                onPress={() => {
                  setOpenDrawer(true);
                }}
              />
            </SectionHoc>

            {errors.property_age && <RNText style={{ color: ColorTheme.red }}>{errors.property_age.message}</RNText>}

            <Divider
              borderColor="#D9D6D6"
              style={{
                marginTop: px(10),
                gap: px(10),
              }}
            />
          </RNView>
        )}

        <BottomSheetWrapper onClose={() => setOpenDrawer(false)} openSheet={openDrawer} snapPoint={[70]}>
          <RNView style={styles.modalView}>
            {propertyAgeData?.map((item, ind) => (
              <TouchableOpacity
                key={ind}
                onPress={() => {
                  setOpenDrawer(false);
                  ageCalcuation(item);
                }}
                style={styles.RNViewContainer}>
                <RNText style={styles.RNViewTextStyle}>{item.label}</RNText>
              </TouchableOpacity>
            ))}
          </RNView>
        </BottomSheetWrapper>
      </RNView>
    </>
  );
};

export default PropertyAge;
