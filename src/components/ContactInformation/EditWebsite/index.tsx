import React, { useState } from 'react';
import { Keyboard, Pressable } from 'react-native';

import HeaderBar from '@/components/common/HeaderBar';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  data?: any;
  onPress?: () => void;
  isloading?: boolean;
  handleUpdateFieldFn?: (website: string) => void;
  editFieldName?: string;
};

const EditWebsite: React.FC<Props> = ({ data, onPress, isloading = false, handleUpdateFieldFn, editFieldName }) => {
  const [website, setWebsite] = useState<string>(data);

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <HeaderBar label={`${editFieldName}`} backPress={onPress} />
      <RNView style={styles.main}>
        <CommonInput
          onChangeText={text => {
            setWebsite(text);
          }}
          value={website}
          label="Website URl"
          placeholder="Website"
          keyboardType={'url'}
          placeholderColor={ColorTheme.gray2}
          style={styles.inputStyle}
        />
        <RNView style={styles.mainBtn}>
          <CommonButton
            disabled={isloading}
            onPress={() => handleUpdateFieldFn(website)}
            loaderColor="black"
            loading={isloading}
            title="Save"
            style={styles.btnSaveStyle}
            textStyle={styles.btntext}
          />
          <CommonButton
            // disabled={loader}
            onPress={onPress}
            // loaderColor="black"
            // loading={loader}
            title="Cancel"
            style={styles.btnCancelStyle}
            textStyle={styles.textStyle}
          />
        </RNView>
      </RNView>
    </Pressable>
  );
};

export default EditWebsite;
