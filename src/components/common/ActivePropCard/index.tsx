import React, { memo, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { isArray } from '@/constants/function/isArray';
import { formatNumberWithNotation, isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { usePropertyFavUnfavMutation } from '@/redux/login/loginService';

import { styles } from './styles';

type Props = {
  data?: any;
  onPress?: () => void;
  onPressFavourite?: () => void;
};

const ActivePropCard: React.FC<Props> = ({ data, onPress, onPressFavourite }) => {
  const [favorite, setFavorite] = useState(data?.isFav || false);
  const selectedData = useAppSelector(getUserData);
  const [propertyFavUnfavMutation] = usePropertyFavUnfavMutation();
  // console.log('data============>', data);
  // console.log(" ", data.property.image_gallery[0]);

  const handleUnFavourite = () => {
    const payload = {
      property: data?.property_id,
      user: selectedData?._id,
    };
    try {
      propertyFavUnfavMutation(payload).then(result => {
        // console.log('handlePropertyPostFavUnFav', result);
        if (result?.data?.status) {
          // console.log('handlePropertyPostFavUnFav+++');
          setFavorite(!favorite);
          onPressFavourite();
        } else {
          handleUnFavourite();
          setFavorite(favorite);
        }
      });
    } catch (err) {
      console.log('errorrr', err);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RNView style={styles.topView}>
        <RNView style={styles.leftView}>
          <RNImage
            resizeMode="cover"
            source={{
              uri: data?.property?.profile_pic
                ? data?.property?.profile_pic
                : isValidURL(isArray(data?.property?.gallery) ? data?.property?.gallery[0]?.url : '')
                  ? data?.property?.gallery[0]?.url
                  : 'https://img.freepik.com/free-photo/3d-view-house-model_23-2150761168.jpg?t=st=1695977989~exp=1695981589~hmac=bc0ea167c08465128ba86d3baf041a05723aa66f8b128dfaed2df1b06b105904&w=2000',
            }}
            style={styles.imgStyle}
          />
          <RNView style={styles.subTract}>
            <ImageBackground
              resizeMode="contain"
              source={require('@/assets/images/nearu/Subtract.png')}
              style={styles.bgImgStyle}
              // resizeMode="contain"
            >
              <RNView style={styles.verifyView}>
                <RNText style={styles.verifyText}>Verified</RNText>
              </RNView>
            </ImageBackground>
          </RNView>

          {/* <RNView style={styles.priceView}>
            {data?.property?.expected_price && (
              <RNText style={styles.priceText}>
                ₹ {formatNumberWithNotation(data?.property?.expected_price) || 'N/A'}
              </RNText>
            )}
          </RNView> */}
          <RNView style={styles.reraView}>
            <RNText style={styles.reraText}>RERA</RNText>
          </RNView>
        </RNView>
        <RNView style={styles.imgContainer}>
          <RNView style={styles.header}>
            <RNView style={styles.headerRight}>
              <RNText numberOfLines={1} style={styles.propName}>
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
                <RNText numberOfLines={2} style={styles.propLocality}>
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
            <RNView style={styles.headerLeft}>
              <TouchableOpacity onPress={handleUnFavourite}>
                {favorite ? (
                  <AntDesign name="heart" size={22} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={22} color="black" />
                )}
              </TouchableOpacity>
            </RNView>
          </RNView>
          <RNView style={styles.flexRow}>
            {data?.property?.bhk ? (
              <RNText style={styles.propLocality}>{data?.property?.bhk} ,</RNText>
            ) : (
              <RNView></RNView>
            )}
            <RNText style={styles.propLocality}>Furnished</RNText>
          </RNView>
          {data?.property?.transaction_type || data?.property?.transaction_type_new ? (
            <RNText style={styles.propLocality}>Agent Property</RNText>
          ) : (
            <RNView></RNView>
          )}
          <RNView style={styles.flexRow}>
            {data?.property?.transaction_type ? (
              <RNView style={styles.transView}>
                <RNText style={styles.propLocality}>{data?.property?.transaction_type}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
            {data?.property?.transaction_type_new ? (
              <RNView style={styles.transTypeNew}>
                <RNText style={styles.propLocality}>{data?.property?.transaction_type_new}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
          </RNView>
          <RNView style={styles.rightBottom}>
            <RNView style={styles.flexRow}>
              <RNView style={{ flexDirection: 'column' }}>
                {data?.property?.property_area ? (
                  <RNText style={styles.propsUnits}>
                    {data?.property?.property_area} {data?.property?.property_area_units}
                  </RNText>
                ) : (
                  <RNView></RNView>
                )}
                <RNText style={styles.propLocality}>Property Area</RNText>
              </RNView>
              <RNView style={styles.verticleLine}></RNView>

              <RNView style={{ flexDirection: 'column', marginLeft: 5 }}>
                {/* {data?.property?.property_facing && (

              <RNText style={{fontSize: SIZES.small13,color:"#8F8F8F", fontWeight:'500' }}>
                {data?.property?.property_facing} 
              </RNText>
            )} */}
                <RNText style={styles.facing}>North East</RNText>
                <RNText style={styles.propLocality}>Facing</RNText>
              </RNView>
            </RNView>
          </RNView>
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(ActivePropCard);
