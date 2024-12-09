import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import DropDownComponent from '@/components/common/DropDownComponent';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import SectionHoc from '@/components/common/SectionHoc';
import TitledCheckBox from '@/components/property/TitledCheckBox';
import { propertyAreaUnits } from '@/constants/function/property.helper';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from '../../../screens/BuilderProperty/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  checkingData?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const BuilderListingCorner: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
  checkingData,
}) => {
  const [unitData, setUnitData] = useState(propertyAreaUnits);
  const [cornerselect, setCornerSelect] = useState(false);

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
    <>
      <RNView style={styles.container}>
        <SectionHoc title="Width of Road Facing" mandatory={false}>
          <TitledCheckBox
            label="Is corner Property"
            checked={cornerselect}
            setChecked={() => setCornerSelect(!cornerselect)}
          />

          <RNView
            style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between', alignContent: 'center' }}>
            <CommonInput
              label={cornerselect ? 'Width of Front facing road' : 'Width of facing road'}
              placeholder=""
              maxLength={5}
              contentStyle={{ textTransform: 'capitalize' }}
              placeholderColor={ColorTheme.gray}
              style={[styles.inputStyle, { width: deviceWidth / 2.5 }]}
              onChangeText={(e: string) => {
                setDetails({ ...details, front_facing_road_width: e });
                frontfacingField.onChange(e);
              }}
              value={frontfacingField.value}
            />

            <DropDownComponent
              data={unitData}
              styledata={[{ width: deviceWidth / 2.5, marginTop: px(8) }]}
              disabled={false}
              sectioname="Units"
              value={frontfacingUnitsField.value}
              errors={errors.front_facing_road_width_unit}
              activefunction={frontfacing_calc}
            />
          </RNView>

          <RNView
            style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between', alignContent: 'center' }}>
            {errors.front_facing_road_width && (
              <PropertyInputErrorComponent
                styledata={{ color: ColorTheme.red, width: deviceWidth / 2.5 }}
                errordata={errors.front_facing_road_width.message}
              />
            )}

            {errors.front_facing_road_width_unit && (
              <PropertyInputErrorComponent
                styledata={{ color: ColorTheme.red, width: deviceWidth / 2.5 }}
                errordata={errors.front_facing_road_width_unit.message}
              />
            )}
          </RNView>

          {cornerselect === true && (
            <>
              <RNView
                style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between', alignContent: 'center' }}>
                <CommonInput
                  label="Width of Side facing road"
                  placeholder=""
                  maxLength={5}
                  contentStyle={{ textTransform: 'capitalize' }}
                  placeholderColor={ColorTheme.gray}
                  style={[styles.inputStyle, { width: deviceWidth / 2.5 }]}
                  onChangeText={(e: string) => {
                    setDetails({ ...details, side_facing_road_width: e });
                    sidefacingField.onChange(e);
                  }}
                  value={sidefacingField.value}
                />

                <DropDownComponent
                  data={unitData}
                  styledata={[{ width: deviceWidth / 2.5, marginTop: px(8) }]}
                  disabled={false}
                  sectioname="Units"
                  value={sidefacingUnitsField.value}
                  errors={errors.side_facing_road_width_unit}
                  activefunction={sidefacing_calc}
                />
              </RNView>

              <RNView
                style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between', alignContent: 'center' }}>
                {errors.side_facing_road_width && (
                  <PropertyInputErrorComponent
                    styledata={{ color: ColorTheme.red, width: deviceWidth / 2.5 }}
                    errordata={errors.side_facing_road_width.message}
                  />
                )}

                {errors.side_facing_road_width_unit && (
                  <PropertyInputErrorComponent
                    styledata={{ color: ColorTheme.red, width: deviceWidth / 2.5 }}
                    errordata={errors.side_facing_road_width_unit.message}
                  />
                )}
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
  );
};

export default BuilderListingCorner;
