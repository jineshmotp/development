import React, { memo, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';
import { FontAwesome } from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment';

import { isArray } from '@/constants/function/isArray';
import { formatNumberWithNotation, isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import DefaultProfile from '../DefaultProfile';
import { styles } from './styles';

type Props = {
  data?: any;
  onPress?: () => void;
  onFav?: () => void;
};

const PropertyCardForaSearch: React.FC<Props> = ({ data, onPress, onFav }) => {
  // console.log('data value :', data);

  const [favorite, setFavorite] = useState(data?.isFav);
  // console.log("data============>1", data);
  // console.log(" ", data.property.gallery[0]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RNView style={styles.topView}>
        <RNView style={styles.imgView}>
          <RNImage
            source={{
              uri: data?.property?.profile_pic
                ? data?.property?.profile_pic
                : isValidURL(isArray(data?.property?.gallery) ? data?.property?.gallery[0]?.url : '')
                  ? data?.property?.gallery[0]?.url
                  : 'https://img.freepik.com/free-photo/3d-view-house-model_23-2150761168.jpg?t=st=1695977989~exp=1695981589~hmac=bc0ea167c08465128ba86d3baf041a05723aa66f8b128dfaed2df1b06b105904&w=2000',
            }}
            style={styles.imgStyle}
            // resizeMode="contain"
          />
        </RNView>
        <RNView style={styles.imgContainer}>
          <RNView style={styles.headView}>
            {data?.posted_by?.profile_pic ? (
              <RNImage
                source={{
                  uri: data?.posted_by?.profile_pic,
                }}
                style={styles.headImg}
                resizeMode="cover"
              />
            ) : (
              <DefaultProfile
                username={data?.posted_by?.fname}
                viewStyle={styles.defaultView}
                textStyle={styles.defaultText}
              />
            )}
            <RNView>
              <RNText style={styles.username}>
                {(data?.posted_by?.fname || data?.property?.posted_by?.fname || data?.user?.fname) ?? 'N/A'}
              </RNText>
              <RNText style={styles.posted}>Posted on: {moment(data?.createdAt).format('DD-MM-YYYY hh:mm')}</RNText>
            </RNView>
          </RNView>

          <RNView style={{ marginTop: 10 }}>
            <RNText numberOfLines={1} style={styles.propertyName}>
              {data?.property?.property_name}
            </RNText>
            {data?.property?.bhk ? (
              <RNText numberOfLines={1} style={styles.propLocality}>
                {data?.property?.bhk}
              </RNText>
            ) : (
              <RNView></RNView>
            )}
            {data?.property?.locality ? (
              <RNText numberOfLines={1} style={styles.propLocality}>
                {data?.property?.locality}
              </RNText>
            ) : (
              <RNView></RNView>
            )}
            {data?.property?.property_price ? (
              <RNText style={styles.propPrice}>
                ₹ {formatNumberWithNotation(data?.property?.property_price) || 'N/A'}
              </RNText>
            ) : (
              <RNView></RNView>
            )}
          </RNView>
          <RNView style={styles.actionContainer}>
            <RNView style={styles.actionTopView}>
              <RNView style={styles.actionView}>
                <Ionicons name="eye-outline" size={Platform.OS === 'android' ? 12 : 12} color="#A7A7A7" />
                <RNText style={styles.actionText}>25k</RNText>
              </RNView>
              <RNView style={styles.actionView}>
                <MaterialCommunityIcons
                  name="comment-text-outline"
                  size={Platform.OS === 'android' ? 10 : 10}
                  color="#A7A7A7"
                />
                <RNText style={styles.actionText}>25k</RNText>
              </RNView>
              <RNView style={styles.actionView}>
                <Ionicons name="share-social-outline" size={Platform.OS === 'android' ? 10 : 10} color="#A7A7A7" />
                <RNText style={styles.actionText}>25k</RNText>
              </RNView>
            </RNView>
            {/* <TouchableOpacity
              onPress={() => {
                setFavorite(!favorite);
                onFav();
              }}>
              {favorite ? (
                <AntDesign name="heart" size={22} color="red" />
              ) : (
                <FontAwesome name="heart-o" size={22} color="black" />
              )}
            </TouchableOpacity> */}
          </RNView>
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(PropertyCardForaSearch);
