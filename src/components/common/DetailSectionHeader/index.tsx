import React from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  Heading?: string;
  btnText?: string;
  editBtnFunction?: () => void;
  headingTextStyle?: TextStyle;
  editTextStyle?: TextStyle;
  style?: ViewStyle;
  headingText?: boolean;
};
const DetailSectionHeader: React.FC<Props> = ({
  Heading,
  btnText,
  editBtnFunction,
  headingTextStyle,
  editTextStyle,
  style,
  headingText,
}) => {
  return (
    <RNView style={[styles.topView, style]}>
      <RNView style={styles.sectionHeader}>
        <RNText
          style={headingText ? [styles.headingStyle, headingTextStyle] : [styles.sectionHeaderText, headingTextStyle]}>
          {Heading}
        </RNText>
        {btnText ? (
          <TouchableOpacity onPress={editBtnFunction}>
            <RNText style={[styles.editTextStyle, editTextStyle]}>{btnText}</RNText>
          </TouchableOpacity>
        ) : (
          <RNText></RNText>
        )}
      </RNView>
    </RNView>
  );
};

export default DetailSectionHeader;
