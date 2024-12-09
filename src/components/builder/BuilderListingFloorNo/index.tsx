import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import SectionHoc from '@/components/common/SectionHoc';
import CommonInput from '@/custom/CommonInput';
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

const BuilderListingFloorNo: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  details,
  checkingData,
}) => {
  const { field: totalfloorField } = useController({
    name: 'total_floors',
    control,
    defaultValue: details?.total_floors,
    rules: controlConstraints.total_floors, // Apply constraints for fname
  });

  //############################################################

  useEffect(() => {
    totalfloorField.onChange(details?.total_floors);
  }, [details?.total_floors]);

  //#############################################################

  return (
    (checkingData.property_sub_type === 'Flat' || checkingData.property_sub_type === 'Apartment') && (
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
              <PropertyInputErrorComponent
                errordata={errors.total_floors.message}
                styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
              />
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
    )
  );
};

export default BuilderListingFloorNo;
