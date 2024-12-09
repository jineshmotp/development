import React from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { style } from './styles';

type Props = {
  item: {
    link: any;
    img: ImageSourcePropType;
    label: string;
  };
  propertyType?: string[];
  type?: string;
  propertyFor?: string;
};
const MoreScreenElement: React.FC<Props> = ({ item, propertyType, type, propertyFor }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.label === 'CreditLuk') {
          navigation.navigate('CREDITLUK_SCREEN', { label: item?.label });
        } else if (item.label === 'Auctions') {
          navigation.navigate('AUCTIONS_MORE', { label: item?.label });
        } else if (item.label === 'Rent Pay') {
          navigation.navigate('RENTPAY_MORE', { label: item?.label });
        } else {
          // console.log(' ', item?.label);

          navigation.navigate('EXPLORE', { propertyType, label: item?.label, type: type, propertyFor });
        }
      }}
      style={style.main}>
      <RNView style={style.container}>
        <RNImage source={item.img} style={item?.label === 'CreditLuk' ? style.creditIcon : style.icon} />
      </RNView>
      <RNText style={style.text}>{item.label}</RNText>
    </TouchableOpacity>
  );
};

export default MoreScreenElement;
