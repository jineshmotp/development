import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import DropDownComponent from '@/components/common/DropDownComponent';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import SectionHoc from '@/components/common/SectionHoc';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/BuilderProperty/styles';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  control?: any;
  clearErrors?: any;
  checkingData?: any;
  controlConstraints?: any;
  errors?: any;
}

const NumberofUnits: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  details,
  checkingData,
}) => {
  const { setValue } = useForm();

  const { field: buildernoofunits } = useController({
    name: 'no_of_units',
    control,
    defaultValue: details?.no_of_units,
    rules: controlConstraints.no_of_units, // Apply constraints for fname
  });

  useEffect(() => {
    buildernoofunits.onChange(details?.no_of_units);
  }, [details?.no_of_units]);

  //#############################################################

  return (
    <>
      <RNView style={styles.container}>
        <SectionHoc title="Number of Units" mandatory={true}>
          <CommonInput
            label="* Total number of units in this projects"
            errorvalue={errors.no_of_units}
            placeholder=""
            keyboardType="number-pad"
            maxLength={10}
            contentStyle={{ textTransform: 'capitalize' }}
            placeholderColor={ColorTheme.gray}
            style={[styles.inputStyle, { marginBottom: errors.no_of_units ? -10 : 10 }]}
            onChangeText={(e: string) => {
              setDetails({ ...details, no_of_units: e });
              // buildernoofunits.onChange(e);
            }}
            value={buildernoofunits.value}
          />
          {errors.no_of_units && (
            <PropertyInputErrorComponent
              styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
              errordata={errors.no_of_units.message}
            />
          )}
        </SectionHoc>

        <Divider
          borderColor="#D9D6D6"
          style={{
            marginTop: 10,
            gap: 10,
          }}
        />
      </RNView>
    </>
  );
};

export default NumberofUnits;
