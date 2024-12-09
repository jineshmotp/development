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
import PropertyInputErrorComponent from '../PropertyInputErrorComponent';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyLocationDetails: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
}) => {
  const { field: countryField } = useController({
    name: 'country',
    control,
    defaultValue: details.country,
    rules: controlConstraints.country,
  });

  const { field: localityField } = useController({
    name: 'locality',
    control,
    defaultValue: details.locality,
    rules: controlConstraints.locality,
  });

  const { field: stateField } = useController({
    name: 'state',
    control,
    defaultValue: details.state,
    rules: controlConstraints.state,
  });

  const { field: cityField } = useController({
    name: 'city',
    control,
    defaultValue: details.city,
    rules: controlConstraints.city,
  });

  const { field: pincodeField } = useController({
    name: 'pincode',
    control,
    defaultValue: details.pincode,
    rules: controlConstraints.pincode,
  });

  const { field: propertynameNoField } = useController({
    name: 'property_name',
    control,
    defaultValue: details.property_name,
    rules: controlConstraints.property_name,
  });

  const { field: blocknoField } = useController({
    name: 'block_no',
    control,
    defaultValue: details.block_no,
    rules: controlConstraints.block_no,
  });

  const { field: roadstreetnoField } = useController({
    name: 'road_street_no',
    control,
    defaultValue: details.road_street_no,
    rules: controlConstraints.road_street_no,
  });

  const { field: landmarkField } = useController({
    name: 'landmark',
    control,
    defaultValue: details.landmark,
    rules: controlConstraints.landmark,
  });

  useEffect(() => {
    countryField.onChange(details?.country);
    blocknoField.onChange(details?.block_no);
    stateField.onChange(details?.state);
    localityField.onChange(details?.locality);
    cityField.onChange(details?.city);
    pincodeField.onChange(details?.pincode);
    propertynameNoField.onChange(details?.property_name);
    roadstreetnoField.onChange(details?.road_street_no);
    landmarkField.onChange(details?.landmark);
  }, [details]);

  return (
    <RNView style={styles.container}>
      <SectionHoc title="" mandatory={true}>
        <CommonInput
          label="* City"
          errorvalue={errors.city}
          placeholder=""
          maxLength={20}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.city ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, city: e });
          }}
          value={cityField.value}
        />

        {errors.city && (
          <PropertyInputErrorComponent
            styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            errordata={errors.city.message}
          />
        )}

        <CommonInput
          label="* Pincode"
          errorvalue={errors.pincode}
          placeholder=""
          keyboardType="number-pad"
          maxLength={6}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.pincode ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, pincode: e });
            pincodeField.onChange(e);
          }}
          value={pincodeField.value}
        />

        {errors.pincode && (
          <PropertyInputErrorComponent
            styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            errordata={errors.pincode.message}
          />
        )}

        <CommonInput
          label="* Property Name"
          errorvalue={errors.property_name}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholder=""
          maxLength={40}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.property_name ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, property_name: e });
          }}
          value={propertynameNoField.value}
        />

        {errors.property_name && (
          <PropertyInputErrorComponent
            styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            errordata={errors.property_name.message}
          />
        )}

        <CommonInput
          label="Block No."
          placeholder=""
          maxLength={20}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.block_no ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, block_no: e });
          }}
          value={blocknoField.value}
        />

        {errors.block_no && (
          <PropertyInputErrorComponent
            styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            errordata={errors.block_no.message}
          />
        )}

        <CommonInput
          label="Street No./Road No."
          placeholder=""
          keyboardType="number-pad"
          maxLength={20}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.road_street_no ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, road_street_no: e });
            roadstreetnoField.onChange(e);
          }}
          value={roadstreetnoField.value}
        />

        {errors.road_street_no && (
          <PropertyInputErrorComponent
            styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            errordata={errors.road_street_no.message}
          />
        )}

        <CommonInput
          label="Landmark"
          placeholder=""
          maxLength={30}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.landmark ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, landmark: e });
          }}
          value={landmarkField.value}
        />

        {errors.landmark && (
          <PropertyInputErrorComponent
            styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            errordata={errors.landmark.message}
          />
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
  );
};

export default PropertyLocationDetails;
