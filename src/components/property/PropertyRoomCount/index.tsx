import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
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

const PropertyRoomCount: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  checkingData,
  errors,
  setDetails,
  details,
}) => {
  const { field: totalroomonlevelField } = useController({
    name: 'total_rooms_on_level',
    control,
    defaultValue: details?.total_rooms_on_level,
    rules: controlConstraints.total_rooms_on_level, // Apply constraints for fname
  });

  useEffect(() => {
    totalroomonlevelField.onChange(details?.total_rooms_on_level);
  }, [details?.total_rooms_on_level]);

  return (
    ((checkingData.property_sub_type === 'Hospitality' &&
      // checkingData.is_multi_level === true &&
      checkingData.iwant === 'Rent' &&
      checkingData.transaction_type_new !== 'Bareshell') ||
      (checkingData.property_sub_type === 'Hospitality' &&
        checkingData.iwant === 'Sell' &&
        checkingData.transaction_type_new !== 'Bareshell')) && (
      <RNView style={styles.container}>
        <SectionHoc title="">
          <CommonInput
            label="Total Room Count"
            placeholder=""
            maxLength={5}
            contentStyle={{ textTransform: 'capitalize' }}
            placeholderColor={ColorTheme.gray}
            style={[styles.inputStyle, { marginBottom: errors.total_rooms_on_level ? -10 : 10 }]}
            onChangeText={(e: string) => {
              setDetails({ ...details, total_rooms_on_level: e });
              totalroomonlevelField.onChange(e);
            }}
            value={totalroomonlevelField.value}
          />

          {errors.total_rooms_on_level && (
            <RNText style={{ color: ColorTheme.red }}>{errors.total_rooms_on_level.message}</RNText>
          )}
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

export default PropertyRoomCount;
