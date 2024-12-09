import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import HeaderBar from '@/components/common/HeaderBar';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  data: any;
  handleUpdateFieldFn?: (address1: string, address2: string) => void;
  isloading?: boolean;
  onPress?: () => void;
  editFieldName?: string;
};

const EditAddress: React.FC<Props> = ({ data, handleUpdateFieldFn, isloading = false, onPress, editFieldName }) => {
  const navigation = useNavigation();
  const [contactInfo, setContactInfo] = useState<any>(data);

  useEffect(() => {
    setContactInfo(data);
  }, []);
  const [address1, setAddress1] = useState<string>(contactInfo?.address_lane1 ? contactInfo?.address_lane1 : '');
  const [address2, setAddress2] = useState<string>(contactInfo?.address_lane2 ? contactInfo?.address_lane2 : '');

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <HeaderBar label={`${editFieldName}`} backPress={onPress} />
      <RNView style={styles.main}>
        <DetailSectionHeader
          Heading={'Address'}
          btnText={''}
          editBtnFunction={() => {}}
          style={{ marginVertical: 15 }}
        />
        <CommonInput
          onChangeText={text => {
            setAddress1(text);
          }}
          value={address1}
          label="Address Line 1"
          placeholder="Address Line 1"
          placeholderColor={ColorTheme.gray2}
          style={styles.inputStyle}
          maxLength={50}
        />
        <CommonInput
          onChangeText={text => {
            setAddress2(text);
          }}
          value={address2}
          label="Address Line 2"
          placeholder="Address Line 2"
          placeholderColor={ColorTheme.gray2}
          style={styles.inputStyle}
          maxLength={50}
        />
        <RNView style={styles.mainBtn}>
          <CommonButton
            disabled={isloading}
            onPress={() => handleUpdateFieldFn(address1, address2)}
            loaderColor="black"
            loading={isloading}
            title="Save"
            style={styles.btnSave}
            textStyle={styles.textStyle}
          />
          <CommonButton
            onPress={onPress}
            loaderColor="black"
            title="Cancel"
            style={styles.btnCancel}
            textStyle={styles.textStyle}
          />
        </RNView>
      </RNView>
    </Pressable>
  );
};

export default EditAddress;
