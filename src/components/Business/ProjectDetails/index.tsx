import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { propertyStyle } from './styles';

type ProjectDetailsProps = {
  lable?: string;
  propertyValue?: string;
  imagePath?: any;
  tintColor?: string;
};

export default function ProjectDetails({ lable, propertyValue, imagePath, tintColor }: ProjectDetailsProps) {
  return (
    <RNView style={propertyStyle.viewStyle}>
      <RNView style={propertyStyle.dotedBorderStyle}>
        <RNImage resizeMode="contain" style={[propertyStyle.imageStyle, { tintColor: tintColor }]} source={imagePath} />
      </RNView>
      <RNView>
        <RNText style={propertyStyle.lableStyle}>{lable}</RNText>
        <RNText style={propertyStyle.propertyTextStyle}>{propertyValue}</RNText>
      </RNView>
    </RNView>
  );
}
