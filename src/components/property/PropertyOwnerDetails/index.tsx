import React from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import SectionHoc from '@/components/common/SectionHoc';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from '../../../screens/Property/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyOwnerDetails: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
}) => {
  const { field: fnameField } = useController({
    name: 'fname',
    control,
    defaultValue: '',
    rules: controlConstraints.fname, // Apply constraints for fname
  });

  const { field: lnameField } = useController({
    name: 'lname',
    control,
    defaultValue: '',
    rules: controlConstraints.lname, // Apply constraints for lname
  });

  const { field: mobileNoField } = useController({
    name: 'mobile_no',
    control,
    defaultValue: '',
    rules: controlConstraints.mobile_no, // Apply constraints for mobile_no
  });

  return (
    <RNView style={styles.container}>
      <SectionHoc title="Property Owner Details" mandatory={true}>
        <CommonInput
          label="* First Name"
          errorvalue={errors.fname}
          placeholder=""
          maxLength={30}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.fname ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, fname: e });
            fnameField.onChange(e);
          }}
          value={fnameField.value}
          //onChangeText={fnameField.onChange}
        />

        {errors.fname && <PropertyInputErrorComponent errordata={errors.fname.message ? errors.fname.message : ''} />}

        {/* {errors.fname && <RNText style={{ color: ColorTheme.red }}>{errors.fname.message}</RNText>} */}

        <CommonInput
          label="* Last Name"
          errorvalue={errors.lname}
          placeholder=""
          maxLength={30}
          contentStyle={{ textTransform: 'capitalize' }}
          placeholderColor={ColorTheme.gray}
          style={[
            styles.inputStyle,
            {
              marginBottom: errors.lname ? -10 : 10,
              borderColor: errors.lname ? ColorTheme.red : ColorTheme.primaryColor,
            },
          ]}
          onChangeText={(e: string) => {
            setDetails({ ...details, lname: e });
            lnameField.onChange(e);
          }}
          value={lnameField.value}
          //onChangeText={lnameField.onChange}
        />

        {errors.lname && <RNText style={{ color: ColorTheme.red }}>{errors.lname.message}</RNText>}

        <CommonInput
          label="* Mobile Number"
          errorvalue={errors.mobile_no}
          placeholder=""
          keyboardType="number-pad"
          maxLength={10}
          placeholderColor={ColorTheme.gray}
          style={[styles.inputStyle, { marginBottom: errors.mobile_no ? -10 : 10 }]}
          onChangeText={(e: string) => {
            setDetails({ ...details, mobile_no: e });
            mobileNoField.onChange(e);
          }}
          value={mobileNoField.value}
          //onChangeText={mobileNoField.onChange}
        />

        {errors.mobile_no && <RNText style={{ color: ColorTheme.red }}>{errors.mobile_no.message}</RNText>}
      </SectionHoc>

      <Divider
        borderColor="#D9D6D6"
        style={{
          marginTop: 10,
          gap: 10,
        }}
      />
    </RNView>
  );
};

export default PropertyOwnerDetails;
