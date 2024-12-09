import React from 'react';
import { ImageSourcePropType, TouchableOpacity, ViewStyle } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import { useNavigation } from '@react-navigation/native';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  item: {
    link: any;
    img: ImageSourcePropType;
    label: string;
  };
  styleIcon?: ViewStyle;
  propertyType?: string[];
  type?: string;
};
const LabelledIconsCard: React.FC<Props> = ({ item, propertyType, type }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('EXPLORE', { propertyType, label: item?.label, type: type });
      }}>
      <RNView style={styles.container}>
        <RNImage
          source={item.img}
          style={item?.label === 'Exclusive Services' ? { width: 45, height: 45 } : styles.icon}
        />
      </RNView>
      <RNView style={styles.labelContainer}>
        <RNText style={styles.text}>{item.label}</RNText>
      </RNView>
    </TouchableOpacity>
  );
};

export default LabelledIconsCard;
