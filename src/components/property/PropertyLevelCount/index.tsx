import React, { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
import PropertyYesNo from '@/components/property/PropertyYesNo';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  checkingData?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyLevelCount: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  checkingData,
  setDetails,
  details,
}) => {
  const { setValue } = useForm();

  const { field: ismultilevelField } = useController({
    name: 'is_multi_level',
    control,
    defaultValue: details?.is_multi_level,
    rules: controlConstraints.is_multi_level, // Apply constraints for fname
  });

  const { field: levelcountField } = useController({
    name: 'level_count',
    control,
    defaultValue: '',
    rules: controlConstraints.level_count, // Apply constraints for fname
  });

  const { field: totalunitfloorField } = useController({
    name: 'total_units_of_floors',
    control,
    defaultValue: '',
    rules: controlConstraints.total_units_of_floors, // Apply constraints for fname
  });

  useEffect(() => {
    ismultilevelField.onChange(details?.is_multi_level);
    levelcountField.onChange(details?.level_count);
    totalunitfloorField.onChange(details?.total_units_of_floors);

    setValue('is_multi_level', details?.is_multi_level);

    // console.log(' multi level value --> ', details?.is_multi_level);
    // console.log(' multi level valuesssss --> ', ismultilevelField.value);
  }, [details?.is_multi_level, details?.level_count, details?.total_units_of_floors]);

  useEffect(() => {
    setValue('is_multi_level', details?.is_multi_level);
  }, [ismultilevelField.value]);

  return (
    (checkingData.property_sub_type === 'Hospitality' ||
      (checkingData.iwant === 'Sell' &&
        checkingData.property_sub_type === 'Shop_And_Retail' &&
        checkingData.transaction_type_new !== 'Bareshell') ||
      (checkingData.iwant === 'Sell' &&
        checkingData.property_sub_type === 'Educational' &&
        checkingData.transaction_type_new !== 'Bareshell') ||
      (checkingData.property_sub_type === 'Office_Space' && checkingData.transaction_type_new !== 'Bareshell')) && (
      <>
        <RNView style={styles.container}>
          <SectionHoc title="Property Details">
            <>
              <PropertyYesNo
                propertyKeylabel="Multi level"
                propertyKey="is_multi_level" // Pass your property key
                propertyValue={ismultilevelField.value}
                setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
              />

              {details.is_multi_level === true && (
                <>
                  <CommonInput
                    label="Total Level count"
                    placeholder=""
                    keyboardType="number-pad"
                    maxLength={5}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[styles.inputStyle, { marginBottom: errors.level_count ? -10 : 10 }]}
                    onChangeText={(e: string) => {
                      setDetails({ ...details, level_count: e });
                      levelcountField.onChange(e);
                    }}
                    value={levelcountField.value}
                  />

                  {errors.level_count && (
                    <RNText style={{ color: ColorTheme.red }}>{errors.level_count.message}</RNText>
                  )}
                </>
              )}

              {((checkingData.iwant === 'Sell' &&
                checkingData.property_sub_type === 'Shop_And_Retail' &&
                checkingData.transaction_type_new !== 'Bareshell') ||
                (checkingData.iwant === 'Sell' &&
                  checkingData.property_sub_type === 'Educational' &&
                  checkingData.transaction_type_new !== 'Bareshell') ||
                (checkingData.iwant === 'Sell' &&
                  checkingData.property_sub_type === 'Office_Space' &&
                  checkingData.transaction_type_new !== 'Bareshell') ||
                (checkingData.iwant === 'Rent' &&
                  checkingData.property_sub_type === 'Shop_And_Retail' &&
                  checkingData.transaction_type_new !== 'Bareshell') ||
                (checkingData.iwant === 'Rent' &&
                  checkingData.property_sub_type === 'Office_Space' &&
                  checkingData.transaction_type_new !== 'Bareshell' &&
                  details.is_multi_level === false)) && (
                <>
                  <CommonInput
                    label="Total units"
                    placeholder=""
                    keyboardType="number-pad"
                    maxLength={5}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[styles.inputStyle, { marginBottom: errors.total_units_of_floors ? -10 : 10 }]}
                    onChangeText={(e: string) => {
                      setDetails({ ...details, total_units_of_floors: e });
                      totalunitfloorField.onChange(e);
                    }}
                    value={totalunitfloorField.value}
                  />

                  {errors.total_units_of_floors && (
                    <RNText style={{ color: ColorTheme.red }}>{errors.total_units_of_floors.message}</RNText>
                  )}
                </>
              )}

              {/* {(checkingData.iwant === 'Rent' || checkingData.iwant === 'Sell') &&
                checkingData.property_sub_type === 'Office_Space' && (
                  <>
                    <CommonInput
                      label="Total units"
                      keyboardType="number-pad"
                      placeholder=""
                      maxLength={5}
                      contentStyle={{ textTransform: 'capitalize' }}
                      placeholderColor={ColorTheme.gray}
                      style={[styles.inputStyle, { marginBottom: errors.total_units_of_floors ? -10 : 10 }]}
                      onChangeText={(e: string) => {
                        setDetails({ ...details, total_units_of_floors: e });
                        totalunitfloorField.onChange(e);
                      }}
                      value={totalunitfloorField.value}
                    />

                    {errors.total_units_of_floors && (
                      <RNText style={{ color: ColorTheme.red }}>{errors.total_units_of_floors.message}</RNText>
                    )}
                  </>
                )} */}
            </>
          </SectionHoc>

          <Divider
            borderColor="#D9D6D6"
            style={{
              marginTop: px(10),
              gap: px(10),
            }}
          />
        </RNView>
      </>
    )
  );
};

export default PropertyLevelCount;
