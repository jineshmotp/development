import React, { memo, useEffect, useState } from 'react';
import { ImageBackground, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { isArray } from '@/constants/function/isArray';
import { areaunitremoveunder, formatNumberWithNotation, isValidURL } from '@/constants/function/property.helper';
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
  onReloadData?: () => void;
  type?: string;
  business?: boolean;
  onPressFavourite?: () => void;
  onRefreshfn?: () => void;
};

const MyFavPropertyCard: React.FC<Props> = ({ data, onPress, onReloadData, type, onPressFavourite, onRefreshfn }) => {
  const userId = useAppSelector(getUserData)?._id;

  const [favorite, setFavorite] = useState(data?.isFav || false);
  const selectedData = useAppSelector(getUserData);
  const [propertyFavUnfavMutation] = usePropertyFavUnfavMutation();

  const handleUnFavourite = () => {
    const payload = {
      property: data?.property_id,
      user: selectedData?._id,
    };
    // console.log('payload+++++', payload);
    try {
      propertyFavUnfavMutation(payload).then(result => {
        // console.log('handlePropertyPostFavUnFav', result);
        if (result?.data?.status) {
          onRefreshfn();
          setFavorite(!favorite);

          setTimeout(() => {
            onRefreshfn();
            onPressFavourite();
          }, 1000);
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
                  : data?.owned_by === userId
                    ? 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png'
                    : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png',
            }}
            style={styles.imgStyle}
          />

          {data?.is_verified && !data?.property?.business_id ? (
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
          ) : (
            <RNView></RNView>
          )}

          <RNView style={styles.priceView}>
            {data?.property?.property_price ? (
              <RNText style={styles.priceText}>
                ₹ {formatNumberWithNotation(data?.property?.property_price) || 'N/A'}
              </RNText>
            ) : (
              <RNView></RNView>
            )}
          </RNView>
          {data?.property?.rera_number ? (
            <RNView style={styles.reraView}>
              <RNText style={styles.reraText}>RERA</RNText>
            </RNView>
          ) : (
            <RNView></RNView>
          )}
        </RNView>
        <RNView style={styles.imgContainer}>
          <RNView style={styles.header}>
            <RNView style={styles.headerRight}>
              <RNText numberOfLines={1} style={styles.propName}>
                {data?.property?.property_name}
              </RNText>
              {data?.property?.locality ? (
                <RNText numberOfLines={2} style={styles.propLocality}>
                  {data?.property?.locality}
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
          <RNView>
            <RNText
              style={
                styles.propLocality
              }>{`Posted on: ${moment(data?.createdAt).format('DD-MM-YYYY hh:mm A')}`}</RNText>
          </RNView>
          {type === 'active' ? (
            <RNView>
              <RNText
                style={
                  styles.propLocality
                }>{`Inactive on: ${moment(data?.expired_date).format('DD-MM-YYYY hh:mm A')}`}</RNText>
            </RNView>
          ) : (
            <RNView>
              <RNText
                style={
                  styles.propLocality
                }>{`Inactive since: ${moment(data?.expired_date).format('DD-MM-YYYY hh:mm A  ')}`}</RNText>
            </RNView>
          )}

          <RNView style={styles.rowView}>
            {data?.property?.iwant ? (
              <RNView style={styles.subType}>
                <RNText style={styles.typeText}>{data?.property?.iwant}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}

            {data?.property?.property_type ? (
              <RNView style={styles.subType}>
                <RNText style={styles.typeText}>{data?.property?.property_type}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}

            {data?.property?.property_sub_type ? (
              <RNView style={styles.subType}>
                <RNText style={styles.typeText}>{data?.property?.property_sub_type}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
          </RNView>

          {/* <RNView style={styles.flexRow}>
            {data?.property?.bhk ? (
              <RNText style={styles.propLocality}>{data?.property?.bhk} ,</RNText>
            ) : (
              <RNView></RNView>
            )}
            {data?.property?.furnishing_status ? (
              <RNText style={styles.propLocality}>{data?.property?.furnishing_status}</RNText>
            ) : (
              <RNView></RNView>
            )}
          </RNView> */}

          {/* {data?.property?.transaction_type || data?.property?.transaction_type_new ? (
            <RNText style={styles.propLocality}>Agent Property</RNText>
          ) : (
            <RNView></RNView>
          )} */}
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
                  <>
                    <RNText style={styles.propsUnits}>
                      {data?.property?.property_area} {areaunitremoveunder(data?.property?.property_area_units)}
                    </RNText>
                    <RNText style={styles.propLocality}>Property Area</RNText>
                  </>
                ) : data?.property?.rent_amount ? (
                  <>
                    <RNText style={styles.propsUnits}>{formatNumberWithNotation(data?.property?.rent_amount)}</RNText>
                    <RNText style={styles.propLocality}>Rent Amount</RNText>
                  </>
                ) : null}
              </RNView>

              <RNView style={styles.verticleLine}></RNView>

              {data?.property?.business_id ? (
                <RNView style={{ flexDirection: 'column', marginLeft: 5 }}>
                  <RNText style={styles.facingText}>{data?.property?.no_of_units}</RNText>

                  <RNText style={styles.propLocality}>No of Units</RNText>
                </RNView>
              ) : (
                <RNView style={{ flexDirection: 'column', marginLeft: 5 }}>
                  {data?.property?.property_facing ? (
                    <RNText style={styles.facingText}>{data?.property?.property_facing}</RNText>
                  ) : (
                    <RNText style={styles.facingText}>NA</RNText>
                  )}
                  <RNText style={styles.propLocality}>Facing</RNText>
                </RNView>
              )}
            </RNView>
          </RNView>
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(MyFavPropertyCard);
