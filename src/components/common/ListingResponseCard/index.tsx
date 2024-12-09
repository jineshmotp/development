import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { formatNumberWithNotation } from '@/constants/function/property.helper';
import CommonButton from '@/custom/CommonButton';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type ListingResponseCardProps = {
  data?: any;
};

const ListingResponseCard: React.FC<ListingResponseCardProps> = ({ data }) => {
  console.log('dsnjndvj+++++', data?.property?.gallery[0]);
  const navigation = useNavigation();
  return (
    <RNView style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.cardView}
        onPress={() => {
          navigation.navigate('LISTING_RESPONSE', { propertyId: data?._id, data: data });
        }}>
        <RNView style={styles.card}>
          {data?.property?.gallery[0]?.url ? (
            <RNView style={styles.imgView}>
              <RNImage source={{ uri: data?.property?.gallery[0]?.url }} style={styles.imgStyle} resizeMode="cover" />
            </RNView>
          ) : (
            <RNView style={styles.imgView}>
              <RNImage
                source={require('@/assets/images/userProfile/responsepic.png')}
                style={styles.imgStyle}
                resizeMode="cover"
              />
            </RNView>
          )}
          <RNView style={styles.cardContent}>
            <RNView style={styles.propView}>
              <RNText style={styles.propName}>{data?.property?.property_name}</RNText>
            </RNView>
            <RNView style={styles.addView}>
              <RNView style={styles.textContainer}>
                <Ionicons name="time" size={14} color="black" />
                <RNText
                  style={styles.postedText}>{`Posted on : ${dayjs(data?.createdAt).format('DD-MM-YYYY')}`}</RNText>
              </RNView>
              <RNView style={styles.textContainer}>
                <Ionicons name="location-sharp" size={14} color="black" />
                <RNText style={styles.postedText}>{data?.property?.locality}</RNText>
              </RNView>
            </RNView>
            {data?.property?.property_price ? (
              <RNView>
                <RNText
                  style={
                    styles.priceText
                  }>{`Rs ${formatNumberWithNotation(data?.property?.property_price) || 'N/A'}`}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
            <RNView style={styles.btnView}>
              {/* <CommonButton
                // disabled={loader}
                onPress={() => {
                  navigation.navigate('LISTING_RESPONSE', { propertyId: data?._id, data: data });
                }}
                // loaderColor="black"
                // loading={loader}
                title="View Response"
                style={styles.btnStyle}
                textStyle={styles.btnText}
              /> */}
            </RNView>
          </RNView>
        </RNView>
      </TouchableOpacity>
    </RNView>
  );
};

export default ListingResponseCard;
