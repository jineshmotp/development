import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

interface IncrementDecrementProp {
  SetValue?: any;
  value?: any;
  label?: string;
  colorThemes?: any;
  styleChanges?: any;
}
const BusinessCheckBox: React.FC<IncrementDecrementProp> = ({ SetValue, value, label, styleChanges, colorThemes }) => {
  // console.log(' color theme-->', colorThemes);

  return (
    <TouchableOpacity style={[styles.checkBoxStyle, styleChanges]} onPress={SetValue}>
      <RNView style={colorThemes ? styles.appContainer : styles.appContainerWithout}>
        <RNView style={[styles.checkboxBase, value && styles.checkboxChecked]}>
          {value && <Ionicons name="checkmark" size={14} color="white" />}
        </RNView>
        <RNView style={styles.appSubContainer}>
          {colorThemes ? (
            <RNView
              style={[
                styles.colorStyle,
                {
                  borderColor: colorThemes,
                  backgroundColor: colorThemes,
                },
              ]}
            />
          ) : null}

          <RNText style={styles.labelStyle}>{label}</RNText>
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(BusinessCheckBox);
