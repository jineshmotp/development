import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

// import { lightTheme } from '../../theme';

// type TextVariant = keyof typeof lightTheme.typography;

interface CustomTextProperty extends TextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  // variant?: TextVariant;
}

export const RNText = (props: CustomTextProperty) => {
  const { text, children, style = {}, ...rest } = props;

  // const preset = (!!variant && lightTheme?.typography?.[variant]) || {};
  const styles = [style];
  const content = text || children;

  return (
    <Text style={styles} {...rest}>
      {content}
    </Text>
  );
};
