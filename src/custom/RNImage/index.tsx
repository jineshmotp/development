// import { ReactNode } from 'react';
import { Image, ImageStyle, ImageProps as RNImageProps, StyleProp } from 'react-native';

interface CustomImageProps extends RNImageProps {
  // Add any custom props you need for your Image component
  style?: StyleProp<ImageStyle>;
}

const RNImage: React.FC<CustomImageProps> = ({ ...rest }) => {
  // You can use customProp or any other custom logic here
  return <Image {...rest} />;
};

export default RNImage;
