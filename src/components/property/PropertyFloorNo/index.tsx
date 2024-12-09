import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import DropDownComponent from '@/components/common/DropDownComponent';
import SectionHoc from '@/components/common/SectionHoc';
import { generateArraywithstrings_number } from '@/constants/function/property.helper';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  checkingData?: any;
  control?: any;
  clearErrors?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyFloorNo: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  details,
  checkingData,
}) => {
  const [floornoValue, setFloorNumberValue] = useState([]);

  const { field: totalfloorField } = useController({
    name: 'total_floors',
    control,
    defaultValue: details?.total_floors,
    rules: controlConstraints.total_floors, // Apply constraints for fname
  });

  const { field: floornoField } = useController({
    name: 'floor_no',
    control,
    defaultValue: details?.floor_no,
    rules: controlConstraints.floor_no, // Apply constraints for fname
  });

  //############################################################

  const floorno_calc = (item: any) => {
    // console.log(' item val ', item.label);
    setDetails({ ...details, floor_no: item.label });
    clearErrors(['floor_no']);
  };

  useEffect(() => {
    setFloorNumberValue(generateArraywithstrings_number(details.total_floors));

    // console.log(' Floor Value : ', floornoValue);
  }, [details?.total_floors]);

  useEffect(() => {
    totalfloorField.onChange(details?.total_floors);
    floornoField.onChange(details?.floor_no);
  }, [details?.floor_no, details?.total_floors]);

  //#############################################################

  return (
    ((checkingData.property_sub_type === 'Hospitality' &&
      // iwant === "Sell" &&
      checkingData.transaction_type_new !== 'Bareshell') ||
      (checkingData.property_sub_type === 'Industrial' && checkingData.property_type !== 'Land or Plot') ||
      checkingData.property_sub_type === 'Office_Space' ||
      checkingData.property_sub_type === 'Shop_And_Retail' ||
      checkingData.property_sub_type === 'Educational' ||
      (checkingData.property_type === 'Residential' &&
        checkingData.property_sub_type !== 'Villa' &&
        checkingData.property_sub_type !== 'Independent House' &&
        checkingData.property_sub_type !== 'Farm House' &&
        checkingData.property_sub_type !== 'Guest House' &&
        checkingData.property_type !== 'Land or Plot') ||
      (checkingData.iwant === 'Coliving' &&
        checkingData.property_sub_type !== 'Villa' &&
        checkingData.property_sub_type !== 'Independent House')) && (
      <RNView style={styles.container}>
        <SectionHoc title="Floor Number" mandatory={true}>
          <RNView style={styles.SectionSeperation}>
            <CommonInput
              label="* Enter Total Floors"
              errorvalue={errors.total_floors}
              placeholder=""
              keyboardType="number-pad"
              maxLength={10}
              contentStyle={{ textTransform: 'capitalize' }}
              placeholderColor={ColorTheme.gray}
              style={[styles.inputStyle, { marginBottom: errors.total_floors ? -10 : 10 }]}
              onChangeText={(e: string) => {
                setDetails({ ...details, total_floors: e });
                totalfloorField.onChange(e);
                // floorvalue_calculate(e);
              }}
              value={totalfloorField.value}
            />
            {errors.total_floors && (
              <RNText style={{ color: ColorTheme.red, marginTop: px(20), marginBottom: px(10) }}>
                {errors.total_floors.message}
              </RNText>
            )}

            <DropDownComponent
              data={floornoValue}
              disabled={false}
              sectioname="Floor Number"
              value={floornoField.value}
              errors={errors.floor_no}
              activefunction={floorno_calc}
            />

            {errors.floor_no && <RNText style={{ color: ColorTheme.red }}>{errors.floor_no.message}</RNText>}
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
    )
  );
};

export default PropertyFloorNo;
