import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import DropDownComponent from '@/components/common/DropDownComponent';
import SectionHoc from '@/components/common/SectionHoc';
import { propertyAreaUnits } from '@/constants/function/property.helper';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  control?: any;
  clearErrors?: any;
  checkingData?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyArea: React.FC<PropertyAreaProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  details,
  checkingData,
}) => {
  const { setValue } = useForm();

  const [propertyareaunits, setPropertyareaunits] = useState(propertyAreaUnits);

  const { field: propertyareaField } = useController({
    name: 'property_area',
    control,
    defaultValue: details?.property_area,
    rules: controlConstraints.property_area, // Apply constraints for fname
  });

  const { field: propertyareaunitsField } = useController({
    name: 'property_area_units',
    control,
    defaultValue: details?.property_area_units,
    rules: controlConstraints.property_area_units, // Apply constraints for fname
  });

  const { field: carpetareaField } = useController({
    name: 'carpet_area',
    control,
    defaultValue: details?.carpet_area,
    rules: controlConstraints.carpet_area, // Apply constraints for fname
  });

  const { field: carpetareaunitsField } = useController({
    name: 'carpet_area_units',
    control,
    defaultValue: details?.carpet_area_units,
    rules: controlConstraints.carpet_area_units, // Apply constraints for fname
  });

  const { field: undividedshareField } = useController({
    name: 'undivided_share',
    control,
    defaultValue: details?.undivided_share,
    rules: controlConstraints.undivided_share, // Apply constraints for fname
  });

  const { field: undividedshareunitsField } = useController({
    name: 'undivided_share_units',
    control,
    defaultValue: details?.undivided_share_units,
    rules: controlConstraints.undivided_share_units, // Apply constraints for fname
  });

  //############################################################

  const propertyareaunits_calc = (item: any) => {
    setValue('property_area_units', item.label);
    setValue('carpet_area_units', item.label);

    setDetails({ ...details, property_area_units: item.label, carpet_area_units: item.label });

    propertyareaunitsField.onChange(item.label);
    carpetareaunitsField.onChange(item.label);

    clearErrors(['property_area_units']);
    clearErrors(['carpet_area_units']);
  };

  const carpetareaunits_calc = (item: any) => {
    setValue('property_area_units', item.label);
    setValue('carpet_area_units', item.label);

    propertyareaunitsField.onChange(item.label);
    carpetareaunitsField.onChange(item.label);

    setDetails({ ...details, property_area_units: item.label, carpet_area_units: item.label });
    clearErrors(['carpet_area_units']);
    clearErrors(['property_area_units']);
  };

  const undividedshareunits_calc = (item: any) => {
    setDetails({ ...details, undivided_share_units: item.label });
    clearErrors(['undivided_share_units']);
  };

  useEffect(() => {
    propertyareaField.onChange(details?.property_area);
    propertyareaunitsField.onChange(details?.property_area_units);
    carpetareaField.onChange(details?.carpet_area);
    carpetareaunitsField.onChange(details?.carpet_area_units);

    undividedshareField.onChange(details?.undivided_share);
    undividedshareunitsField.onChange(details?.undivided_share_units);
  }, [details?.property_area, details?.carpet_area, details?.undivided_share]);

  //#############################################################

  return (
    checkingData.iwant !== 'Coliving' && (
      <>
        <RNView style={styles.container}>
          <SectionHoc title="Property Area" mandatory={true}>
            {/* //##################### Properthy Area units ############################# */}

            <RNView style={styles.SectionSeperation}>
              <CommonInput
                label="* Property Area"
                errorvalue={errors.property_area}
                placeholder=""
                keyboardType="number-pad"
                maxLength={10}
                contentStyle={{ textTransform: 'capitalize' }}
                placeholderColor={ColorTheme.gray}
                style={[styles.inputStyle, { marginBottom: errors.property_area ? -10 : 10 }]}
                onChangeText={(e: string) => {
                  setDetails({ ...details, property_area: e });
                  propertyareaField.onChange(e);
                }}
                value={propertyareaField.value}
              />
              {errors.property_area && (
                <RNText style={{ color: ColorTheme.red, marginTop: px(20), marginBottom: px(10) }}>
                  {errors.property_area.message}
                </RNText>
              )}

              <DropDownComponent
                data={propertyareaunits}
                disabled={false}
                sectioname="Units"
                value={propertyareaunitsField.value}
                errors={errors.property_area_units}
                activefunction={propertyareaunits_calc}
              />
            </RNView>

            {/* //##################### Carpet Area units ############################# */}

            {checkingData.transaction_type_new !== 'Bareshell' && checkingData.property_type !== 'Land or Plot' && (
              <>
                <RNView style={styles.SectionSeperation}>
                  <CommonInput
                    label="Carpet Area"
                    errorvalue={errors.carpet_area}
                    placeholder=""
                    keyboardType="number-pad"
                    maxLength={10}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[styles.inputStyle, { marginBottom: errors.carpet_area ? -10 : 10 }]}
                    onChangeText={(e: string) => {
                      setDetails({ ...details, carpet_area: e });
                      carpetareaField.onChange(e);
                    }}
                    value={carpetareaField.value}
                  />
                  {errors.carpet_area && (
                    <RNText style={{ color: ColorTheme.red, marginTop: px(20), marginBottom: px(10) }}>
                      {errors.carpet_area.message}
                    </RNText>
                  )}

                  <DropDownComponent
                    data={propertyareaunits}
                    disabled={false}
                    sectioname="Units"
                    value={carpetareaunitsField.value}
                    errors={errors.carpet_area_units}
                    activefunction={carpetareaunits_calc}
                  />
                </RNView>
              </>
            )}

            {/* //##################### Undivided share units ############################# */}

            {checkingData.transaction_type_new !== 'Bareshell' && checkingData.property_type !== 'Land or Plot' && (
              <>
                <RNView>
                  <CommonInput
                    label="Undivided Share"
                    errorvalue={errors.undivided_share}
                    placeholder=""
                    keyboardType="number-pad"
                    maxLength={10}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[styles.inputStyle, { marginBottom: errors.undivided_share ? -10 : 10 }]}
                    onChangeText={(e: string) => {
                      setDetails({ ...details, undivided_share: e });
                      undividedshareField.onChange(e);
                    }}
                    value={undividedshareField.value}
                  />
                  {errors.undivided_share && (
                    <RNText style={{ color: ColorTheme.red, marginTop: px(20), marginBottom: px(10) }}>
                      {errors.undivided_share.message}
                    </RNText>
                  )}

                  <DropDownComponent
                    data={propertyareaunits}
                    disabled={false}
                    sectioname="Units"
                    value={undividedshareunitsField.value}
                    errors={errors.undivided_share_units}
                    activefunction={undividedshareunits_calc}
                  />
                </RNView>
              </>
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
    )
  );
};

export default PropertyArea;
