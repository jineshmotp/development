import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyAdditionalContact: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
}) => {
  const { setValue } = useForm();
  const toast = useToast();
  const [additionalc, setadditional] = useState([{ name: '', mobile_no: '' }]);

  const addContact = (index = 0) => {
    if (additionalc[index]?.name && additionalc[index]?.mobile_no.length === 10) {
      setadditional([...additionalc, { name: '', mobile_no: '' }]);
    } else {
      if (!additionalc[index]?.name) {
        toast.show('Please enter name', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Name',
          },
          duration: 3000,
        });
      }

      if (additionalc[index]?.mobile_no.length < 10) {
        toast.show('Please enter 10 digit mobile', {
          type: 'warn_toast',
          animationDuration: 100,
          data: {
            title: 'Mobile number',
          },
          duration: 3000,
        });
      }
    }
  };

  const removeContact = index => {
    const updatedContacts = [...additionalc];
    updatedContacts.splice(index, 1);
    setadditional(updatedContacts);

    setDetails({ ...details, additional_contact_details: updatedContacts });
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...additionalc];
    updatedContacts[index][field] = value;
    setadditional(updatedContacts);
    setDetails({ ...details, additional_contact_details: updatedContacts });
    // console.log(' Additional contact ---> ', updatedContacts);
  };

  // useEffect(() => {
  //   propertyfacingField.onChange(details?.additional_contact_details);
  // }, [details?.additional_contact_details]);

  useEffect(() => {
    if (details?.additional_contact_details) {
      setadditional(details?.additional_contact_details);
      details.additional_contact_details.forEach((contact, index) => {
        setValue(`additional_contacts[${index}].name`, contact.name);
        setValue(`additional_contacts[${index}].mobile_no`, contact.mobile_no);
      });
    }
  }, [details?.additional_contact_details]);

  return (
    <View style={styles.container}>
      <SectionHoc title="Additional Contact Details">
        <TouchableOpacity
          onPress={() => addContact(additionalc.length - 1)}
          style={{ marginTop: px(20), marginBottom: px(20) }}>
          <RNText style={{ color: ColorTheme.nearLukBaseLightColor }}>Add More Contact</RNText>
        </TouchableOpacity>

        {additionalc.map((contact, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            {index !== 0 && (
              <View>
                <TouchableOpacity
                  onPress={() => removeContact(index)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: px(5),
                  }}>
                  <AntDesign name="close" size={SIZES.medium15} color={ColorTheme.red} />
                  <RNText style={{ color: ColorTheme.danger }}>Remove</RNText>
                </TouchableOpacity>
              </View>
            )}

            <Controller
              name={`additional_contacts[${index}].name`}
              control={control}
              defaultValue={contact.name}
              rules={controlConstraints.name}
              render={({ field: { onChange, value } }) => (
                <>
                  <CommonInput
                    label="Name"
                    errorvalue={errors?.additional_contacts?.[index]?.name}
                    placeholder=""
                    maxLength={50}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[styles.inputStyle, { marginBottom: errors?.additional_contacts?.[index]?.name ? -10 : 10 }]}
                    onChangeText={text => {
                      handleContactChange(index, 'name', text);
                      onChange(text);
                    }}
                    value={value}
                  />
                  {errors?.additional_contacts?.[index]?.name && (
                    <RNText style={{ color: ColorTheme.red }}>{errors.additional_contacts[index].name.message}</RNText>
                  )}
                </>
              )}
            />

            <Controller
              name={`additional_contacts[${index}].mobile_no`}
              control={control}
              defaultValue={contact.mobile_no}
              rules={controlConstraints.mobile_no}
              render={({ field: { onChange, value } }) => (
                <>
                  <CommonInput
                    label="Mobile Number"
                    keyboardType="number-pad"
                    errorvalue={errors?.additional_contacts?.[index]?.mobile_no}
                    placeholder=""
                    maxLength={10}
                    contentStyle={{ textTransform: 'capitalize' }}
                    placeholderColor={ColorTheme.gray}
                    style={[
                      styles.inputStyle,
                      { marginBottom: errors?.additional_contacts?.[index]?.mobile_no ? px(-10) : px(10) },
                    ]}
                    onChangeText={text => {
                      handleContactChange(index, 'mobile_no', text);
                      onChange(text);
                    }}
                    value={value}
                  />
                  {errors?.additional_contacts?.[index]?.mobile_no && (
                    <RNText style={{ color: ColorTheme.red }}>
                      {errors.additional_contacts[index].mobile_no.message}
                    </RNText>
                  )}
                </>
              )}
            />
          </View>
        ))}
      </SectionHoc>

      <Divider
        borderColor="#D9D6D6"
        style={{
          marginTop: px(10),
          gap: px(10),
        }}
      />
    </View>
  );
};

export default PropertyAdditionalContact;
