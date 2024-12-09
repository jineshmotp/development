import React, { memo } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

const BusinessCard = ({ item }) => {
  const navigation = useNavigation();
  const checkImage = () => {
    switch (item?.label) {
      case 'Parking':
        return <RNImage style={styles.imgStyle} source={require('@/assets/images/business/parking.png')} />;
      case 'Play Ground':
        return <RNImage style={styles.imgStyle} source={require('@/assets/images/business/playground.png')} />;
      case 'Event Space':
        return <RNImage style={styles.imgStyle} source={require('@/assets/images/customImage/wedding.png')} />;
      case 'Service Apartment':
        return <RNImage style={styles.imgStyle} source={require('@/assets/images/business/service.png')} />;
      case 'CoWorking Space':
        return <RNImage style={styles.imgStyle} source={require('@/assets/images/business/coworking.png')} />;
    }
  };
  return (
    <RNView style={styles.containerView}>
      {checkImage()}
      <RNView style={styles.topView}>
        <RNView>
          <RNText style={styles.label}>{item?.label}</RNText>
          <RNText style={styles.available}>({item?.count} Available)</RNText>
        </RNView>
        <RNView style={styles.noItem}>
          {item?.count <= 0 ? (
            <RNText style={{ color: 'black' }}>No item found</RNText>
          ) : (
            <CommonButton
              // onPress={() =>
              //   navigation.navigate('BusinessListing', {
              //     key: item.label,
              //     businessData: item,
              //   })
              // }
              textStyle={styles.btnText}
              style={styles.btnStyle}
              title="Explore"
              // rightIcon={<AntDesign name="arrowright" size={24} color="black" />}
            />
          )}
        </RNView>
      </RNView>
    </RNView>
  );
};

export default memo(BusinessCard);
