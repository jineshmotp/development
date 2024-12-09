import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';

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

const PropertyTotalUnits: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  checkingData,
  setDetails,
  details,
}) => {
  const { field: unitsonfloorField } = useController({
    name: 'units_on_floor',
    control,
    defaultValue: details?.units_on_floor,
    rules: controlConstraints.units_on_floor, // Apply constraints for fname
  });

  const { field: conferencehallField } = useController({
    name: 'conference_hall_available',
    control,
    defaultValue: details?.conference_hall_available,
    rules: controlConstraints.conference_hall_available, // Apply constraints for fname
  });

  const { field: conferencehallcountField } = useController({
    name: 'conference_hall_count',
    control,
    defaultValue: details?.conference_hall_count,
    rules: controlConstraints.conference_hall_count, // Apply constraints for fname
  });

  const { field: privatecabinField } = useController({
    name: 'private_cabin_available',
    control,
    defaultValue: details?.private_cabin_available,
    rules: controlConstraints.private_cabin_available, // Apply constraints for fname
  });

  const { field: privatecabincountField } = useController({
    name: 'private_cabin_count',
    control,
    defaultValue: details?.private_cabin_count,
    rules: controlConstraints.private_cabin_count, // Apply constraints for fname
  });

  const { field: pantryField } = useController({
    name: 'pantry',
    control,
    defaultValue: details?.pantry,
    rules: controlConstraints.pantry, // Apply constraints for fname
  });

  useEffect(() => {
    unitsonfloorField.onChange(details?.units_on_floor);

    conferencehallField.onChange(details?.conference_hall_available);

    conferencehallcountField.onChange(details?.conference_hall_count);
    privatecabinField.onChange(details?.private_cabin_available);
    privatecabincountField.onChange(details?.private_cabin_count);
    pantryField.onChange(details?.pantry);
  }, [
    details?.units_on_floor,
    details?.conference_hall_available,
    details?.conference_hall_count,
    details?.private_cabin_available,
    details?.private_cabin_count,
    details?.pantry,
  ]);

  return (
    ((checkingData.iwant === 'Sell' &&
      checkingData.property_sub_type === 'Industrial' &&
      checkingData.transaction_type_new !== 'Bareshell') ||
      (checkingData.iwant === 'Rent' &&
        checkingData.property_sub_type === 'Educational' &&
        checkingData.transaction_type_new !== 'Bareshell') ||
      (checkingData.iwant === 'Rent' &&
        checkingData.property_sub_type === 'Industrial' &&
        checkingData.transaction_type_new !== 'Bareshell') ||
      (checkingData.property_sub_type === 'Office_Space' && checkingData.transaction_type_new !== 'Bareshell')) && (
      <RNView style={styles.container}>
        <SectionHoc title="Total Units">
          <>
            {((checkingData.iwant === 'Sell' &&
              checkingData.property_sub_type === 'Industrial' &&
              checkingData.transaction_type_new !== 'Bareshell') ||
              (checkingData.iwant === 'Rent' &&
                checkingData.property_sub_type === 'Educational' &&
                checkingData.transaction_type_new !== 'Bareshell') ||
              (checkingData.iwant === 'Rent' &&
                checkingData.property_sub_type === 'Industrial' &&
                checkingData.transaction_type_new !== 'Bareshell')) && (
              <>
                <CommonInput
                  label="Total units in each floor"
                  placeholder=""
                  maxLength={5}
                  contentStyle={{ textTransform: 'capitalize' }}
                  placeholderColor={ColorTheme.gray}
                  style={[styles.inputStyle, { marginBottom: errors.units_on_floor ? -10 : 10 }]}
                  onChangeText={(e: string) => {
                    setDetails({ ...details, units_on_floor: e });
                    unitsonfloorField.onChange(e);
                  }}
                  value={unitsonfloorField.value}
                />

                {errors.units_on_floor && (
                  <RNText style={{ color: ColorTheme.red }}>{errors.units_on_floor.message}</RNText>
                )}
              </>
            )}

            {checkingData.property_sub_type === 'Office_Space' && checkingData.transaction_type_new !== 'Bareshell' && (
              <>
                <PropertyYesNo
                  propertyKeylabel="Conference Hall"
                  propertyKey="conference_hall_available" // Pass your property key
                  propertyValue={conferencehallField.value}
                  setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
                />

                {details.conference_hall_available === true && (
                  <>
                    <CommonInput
                      label="Conference Hall count"
                      placeholder=""
                      maxLength={5}
                      contentStyle={{ textTransform: 'capitalize' }}
                      placeholderColor={ColorTheme.gray}
                      style={[styles.inputStyle, { marginBottom: errors.conference_hall_count ? -10 : 10 }]}
                      onChangeText={(e: string) => {
                        setDetails({ ...details, conference_hall_count: e });
                        conferencehallcountField.onChange(e);
                      }}
                      value={conferencehallcountField.value}
                    />

                    {errors.conference_hall_count && (
                      <RNText style={{ color: ColorTheme.red }}>{errors.conference_hall_count.message}</RNText>
                    )}
                  </>
                )}

                <PropertyYesNo
                  propertyKeylabel="Private Cabin"
                  propertyKey="private_cabin_available" // Pass your property key
                  propertyValue={privatecabinField.value}
                  setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
                />

                {details.private_cabin_available === true && (
                  <>
                    <CommonInput
                      label="Private Cabin count"
                      placeholder=""
                      maxLength={5}
                      contentStyle={{ textTransform: 'capitalize' }}
                      placeholderColor={ColorTheme.gray}
                      style={[styles.inputStyle, { marginBottom: errors.private_cabin_count ? -10 : 10 }]}
                      onChangeText={(e: string) => {
                        setDetails({ ...details, private_cabin_count: e });
                        privatecabincountField.onChange(e);
                      }}
                      value={privatecabincountField.value}
                    />

                    {errors.private_cabin_count && (
                      <RNText style={{ color: ColorTheme.red }}>{errors.private_cabin_count.message}</RNText>
                    )}
                  </>
                )}

                <PropertyYesNo
                  propertyKeylabel="Pantry Available"
                  propertyKey="pantry" // Pass your property key
                  propertyValue={pantryField.value}
                  setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
                />
              </>
            )}
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
    )
  );
};

export default PropertyTotalUnits;
