import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { Text } from 'react-native';

import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
import CommonInput from '@/custom/CommonInput';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface VerificationDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
  checkingData?: any;
}

const PropertyVerification: React.FC<VerificationDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
  checkingData,
}) => {
  const { field: reranumberField } = useController({
    name: 'rera_number',
    control,
    defaultValue: details?.rera_number,
    rules: controlConstraints.rera_number, // Apply constraints for fname
  });

  const { field: dtcpnumberField } = useController({
    name: 'dtcp_number',
    control,
    defaultValue: details?.dtcp_number,
    rules: controlConstraints.dtcp_number, // Apply constraints for lname
  });

  useEffect(() => {
    reranumberField.onChange(details?.rera_number);
    dtcpnumberField.onChange(details?.dtcp_number);
  }, [details?.rera_number, details?.dtcp_number]);

  return (
    <RNView style={styles.container}>
      <SectionHoc title="Property Verfication">
        {details.property_type !== 'Land or Plot' ? (
          <>
            <CommonInput
              label="Rera Number"
              keyboardType="number-pad"
              errorvalue={errors.rera_number}
              placeholder=""
              maxLength={50}
              contentStyle={{ textTransform: 'capitalize' }}
              placeholderColor={ColorTheme.gray}
              style={[styles.inputStyle, { marginBottom: errors.rera_number ? -10 : 10 }]}
              onChangeText={(e: string) => {
                setDetails({ ...details, rera_number: e });
                reranumberField.onChange(e);
              }}
              value={reranumberField.value}
            />
            {errors.rera_number && <Text style={{ color: ColorTheme.red }}>{errors.rera_number.message}</Text>}
          </>
        ) : null}

        {details.property_type === 'Land or Plot' ? (
          <>
            <CommonInput
              label="DTCP Number"
              keyboardType="number-pad"
              errorvalue={errors.dtcp_number}
              placeholder=""
              maxLength={50}
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
                setDetails({ ...details, dtcp_number: e });
                dtcpnumberField.onChange(e);
              }}
              value={dtcpnumberField.value}
              //onChangeText={lnameField.onChange}
            />
            {errors.dtcp_number && <Text style={{ color: ColorTheme.red }}>{errors.dtcp_number.message}</Text>}
          </>
        ) : null}
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

export default PropertyVerification;
