import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable } from 'react-native';

import HeaderBar from '@/components/common/HeaderBar';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  data?: number | string;
  handleUpdateFieldFn?: (pincodeData: string) => void;
  isloading?: boolean;
  onPressClose?: () => void;
  editFieldName?: string;
};

const EditPinCode: React.FC<Props> = ({
  data,
  handleUpdateFieldFn,
  isloading = false,
  onPressClose,
  editFieldName,
}) => {
  const [pincodeData, setPincodeData] = useState<string | number>(data || '');
  //   const dispatch = useDispatch();

  useEffect(() => {
    setPincodeData(data || '');
  }, [data]);

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <HeaderBar
        label={`${editFieldName}`}
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={onPressClose}
      />
      <RNView style={styles.inputView}>
        <CommonInput
          onChangeText={text => {
            setPincodeData(text);
          }}
          value={`${pincodeData}`}
          label="Pincode"
          placeholder="Pincode"
          maxLength={6}
          keyboardType={'numeric'}
          placeholderColor={ColorTheme.gray2}
          style={styles.InputStyle}
        />
      </RNView>
      <RNView style={styles.mainBtn}>
        <CommonButton
          disabled={isloading}
          onPress={() => {
            handleUpdateFieldFn(pincodeData);
            setPincodeData('');
          }}
          loaderColor="black"
          loading={isloading}
          title="Save"
          style={styles.btnStyle}
          textStyle={styles.textStyle}
        />
      </RNView>
    </Pressable>
  );
};

export default EditPinCode;
