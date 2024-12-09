import { ReactNode } from 'react';
import { View as RNView, StyleProp, ViewProps, ViewStyle } from 'react-native';

interface CustomViewProps extends ViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default (props: CustomViewProps) => <RNView style={props.style}>{props?.children}</RNView>;
