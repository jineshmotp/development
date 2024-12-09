import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import DropDownComponent from '@/components/common/DropDownComponent';
import PropertyYesNo from '@/components/property/PropertyYesNo';
import { propertyAreaUnits } from '@/constants/function/property.helper';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from '../../../screens/Property/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  checkingData?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyCorner: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
  checkingData,
}) => {
  const [unitData, setUnitData] = useState(propertyAreaUnits);

  const { field: cornerPropertyField } = useController({
    name: 'corner_property',
    control,
    defaultValue: details.corner_property,
    rules: controlConstraints.corner_property, // Apply constraints for fname
  });

  const { field: frontfacingField } = useController({
    name: 'front_facing_road_width',
    control,
    defaultValue: details.front_facing_road_width,
    rules: controlConstraints.front_facing_road_width, // Apply constraints for fname
  });

  const { field: frontfacingUnitsField } = useController({
    name: 'front_facing_road_width_unit',
    control,
    defaultValue: details.front_facing_road_width_unit,
    rules: controlConstraints.front_facing_road_width_unit, // Apply constraints for fname
  });

  const { field: sidefacingField } = useController({
    name: 'side_facing_road_width',
    control,
    defaultValue: details.side_facing_road_width,
    rules: controlConstraints.side_facing_road_width, // Apply constraints for fname
  });

  const { field: sidefacingUnitsField } = useController({
    name: 'side_facing_road_width_unit',
    control,
    defaultValue: details.side_facing_road_width_unit,
    rules: controlConstraints.side_facing_road_width_unit, // Apply constraints for fname
  });

  const { field: boundaryfencingField } = useController({
    name: 'boundary_fencing',
    control,
    defaultValue: details.boundary_fencing,
    rules: controlConstraints.boundary_fencing, // Apply constraints for fname
  });

  const { field: borewellField } = useController({
    name: 'borewell',
    control,
    defaultValue: details.borewell,
    rules: controlConstraints.borewell, // Apply constraints for fname
  });

  //###################################  Front facing unit calculating ############################################

  const frontfacing_calc = (item: any) => {
    setDetails({ ...details, front_facing_road_width_unit: item.label });
  };

  const sidefacing_calc = (item: any) => {
    setDetails({ ...details, side_facing_road_width_unit: item.label });
  };

  useEffect(() => {
    cornerPropertyField.onChange(details?.corner_property);
    frontfacingField.onChange(details?.front_facing_road_width);
    frontfacingUnitsField.onChange(details?.front_facing_road_width_unit);

    sidefacingField.onChange(details?.side_facing_road_width);
    sidefacingUnitsField.onChange(details?.side_facing_road_width_unit);

    boundaryfencingField.onChange(details?.boundary_fencing);

    borewellField.onChange(details?.front_facing_road_width);
  }, [
    details?.corner_property,
    details?.front_facing_road_width,
    details?.front_facing_road_width_unit,
    details?.side_facing_road_width,
    details?.side_facing_road_width_unit,
    details?.boundary_fencing,
    details?.front_facing_road_width,
  ]);

  // #########################################################################################

  return (
    checkingData.property_type === 'Land or Plot' && (
      <>
        <RNView style={styles.container}>
          <>
            <PropertyYesNo
              propertyKeylabel="Corner Property"
              propertyKey="corner_property" // Pass your property key
              propertyValue={cornerPropertyField.value}
              setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
            />

            {details.corner_property === true && (
              <>
                <>
                  <CommonInput
                    label="Width of Front facing road"
                    placeholder=""
                    maxLength={5}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[styles.inputStyle, { marginBottom: errors.front_facing_road_width ? -10 : 10 }]}
                    onChangeText={(e: string) => {
                      setDetails({ ...details, front_facing_road_width: e });
                      frontfacingField.onChange(e);
                    }}
                    value={frontfacingField.value}
                  />

                  {errors.front_facing_road_width && (
                    <RNText style={{ color: ColorTheme.red }}>{errors.front_facing_road_width.message}</RNText>
                  )}

                  <DropDownComponent
                    data={unitData}
                    disabled={false}
                    sectioname="Units"
                    value={frontfacingUnitsField.value}
                    errors={errors.front_facing_road_width_unit}
                    activefunction={frontfacing_calc}
                  />
                </>

                {/* <RNView
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <RNView style={{ flex: 2 }}></RNView>

                  <RNView style={{ flex: 1 }}></RNView>
                </RNView> */}

                <>
                  <CommonInput
                    label="Width of Side facing road"
                    placeholder=""
                    maxLength={5}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[styles.inputStyle, { marginBottom: errors.side_facing_road_width ? -10 : 10 }]}
                    onChangeText={(e: string) => {
                      setDetails({ ...details, side_facing_road_width: e });
                      sidefacingField.onChange(e);
                    }}
                    value={sidefacingField.value}
                  />

                  {errors.side_facing_road_width && (
                    <RNText style={{ color: ColorTheme.red }}>{errors.side_facing_road_width.message}</RNText>
                  )}

                  <DropDownComponent
                    data={unitData}
                    disabled={false}
                    sectioname="Units"
                    value={sidefacingUnitsField.value}
                    errors={errors.side_facing_road_width_unit}
                    activefunction={sidefacing_calc}
                  />
                </>

                {/* 
                <RNView
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                  <RNView style={{ flex: 2 }}></RNView>

                  <RNView style={{ flex: 1 }}></RNView>
                </RNView> */}
              </>
            )}

            {details.corner_property === false && (
              <>
                <CommonInput
                  label="Width of facing road"
                  placeholder=""
                  maxLength={5}
                  contentStyle={{ textTransform: 'capitalize' }}
                  placeholderColor={ColorTheme.gray}
                  style={[styles.inputStyle, { marginBottom: errors.front_facing_road_width ? -10 : 10 }]}
                  onChangeText={(e: string) => {
                    setDetails({ ...details, front_facing_road_width: e });
                    frontfacingField.onChange(e);
                  }}
                  value={frontfacingField.value}
                />

                {errors.front_facing_road_width && (
                  <RNText style={{ color: ColorTheme.red }}>{errors.front_facing_road_width.message}</RNText>
                )}

                <DropDownComponent
                  data={unitData}
                  disabled={false}
                  sectioname="Units"
                  value={frontfacingUnitsField.value}
                  errors={errors.front_facing_road_width_unit}
                  activefunction={frontfacing_calc}
                />
              </>
            )}

            <PropertyYesNo
              propertyKeylabel="Boundryfencing wall"
              propertyKey="boundary_fencing" // Pass your property key
              propertyValue={boundaryfencingField.value}
              setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
            />

            <PropertyYesNo
              propertyKeylabel="Borewell available"
              propertyKey="borewell" // Pass your property key
              propertyValue={borewellField.value}
              setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
            />

            <Divider
              borderColor="#D9D6D6"
              style={{
                marginTop: 10,
                gap: 10,
              }}
            />
          </>
        </RNView>
      </>
    )
  );
};

export default PropertyCorner;
