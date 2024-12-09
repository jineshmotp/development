import React, { memo } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';

import { formatNumberWithNotation, isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';

import { styles } from './styles';

type Props = {
  data?: any;
  onPress?: () => void;
};

const SearchCard: React.FC<Props> = ({ data, onPress }) => {
  // console.log('data============>', data?._source?.gallery[0]?.url);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RNView style={styles.rowContainer}>
        <RNView style={styles.imageContainer}>
          <RNImage
            resizeMode="cover"
            source={{
              uri: isValidURL(data?._source?.gallery[0]?.url)
                ? data?._source?.gallery[0]?.url ||
                  'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png'
                : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png',
            }}
            style={styles.imageStyle}
          />

          {data?._source?.is_verified && (
            <RNView style={styles.absoluteView}>
              <ImageBackground
                resizeMode="contain"
                source={require('@/assets/images/nearu/Subtract.png')}
                style={styles.imageBGContainer}>
                <RNView style={styles.verifiedView}>
                  <RNText style={styles.verifiedText}>Verified</RNText>
                </RNView>
              </ImageBackground>
            </RNView>
          )}

          <RNView style={styles.bottomLineView}>
            {data?._source?.property_price ? (
              <RNView style={{ backgroundColor: ColorTheme.transparent }}>
                <RNText style={styles.bottomLineText}>
                  ₹ {formatNumberWithNotation(data?._source?.property_price) || 'N/A'}
                </RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
            {data?._source?.rent_amount ? (
              <RNView>
                <RNText style={styles.bottomLineText}>
                  ₹ {formatNumberWithNotation(data?._source?.rent_amount) || 'N/A'} / Month
                </RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
          </RNView>
          {data?._source?.is_rera_verified && (
            <RNView style={styles.reraView}>
              <RNText style={styles.reraText}>RERA</RNText>
            </RNView>
          )}
        </RNView>
        <RNView style={styles.imgContainer}>
          <RNView style={styles.rowView}>
            <RNView style={styles.flexView}>
              <RNText numberOfLines={1} style={styles.propertyText}>
                {data?._source?.property_name}
              </RNText>
            </RNView>
          </RNView>

          <RNText style={styles.propLocality} numberOfLines={2}>
            {data?._source?.locality}
          </RNText>
          {data?._source?.bhk && (
            <RNText numberOfLines={1} style={styles.propLocality}>
              {data?._source?.bhk}
            </RNText>
          )}

          <RNView style={styles.rowView}>
            <RNView style={styles.subType}>
              <RNText style={styles.typeText}>{data?._source?.iwant}</RNText>
            </RNView>
            <RNView style={styles.subType}>
              <RNText style={styles.typeText}>{data?._source?.property_sub_type}</RNText>
            </RNView>
          </RNView>
          <RNView style={styles.rowView}>
            <RNView style={styles.subType}>
              <RNText style={styles.typeText}>{data?._source?.property_type}</RNText>
            </RNView>
          </RNView>

          {data?._source?.property_area_units && data?._source?.property_facing ? (
            <RNView style={styles.facingView}>
              <RNView style={styles.rowView}>
                <RNView style={styles.colummView}>
                  <RNText style={{ fontSize: SIZES.small13, color: '#8F8F8F', fontWeight: '500' }}>
                    {data?._source?.property_area} {data?._source?.property_area_units}
                  </RNText>
                  <RNText style={styles.propLocality}>Property Area</RNText>
                </RNView>
                <RNView style={styles.lineView}></RNView>

                <RNView style={styles.endView}>
                  <RNText style={styles.facingText}>{data?._source?.property_facing}</RNText>
                  <RNText style={styles.propLocality}>Facing</RNText>
                </RNView>
              </RNView>
            </RNView>
          ) : null}
          {/* {data?._source?.rent_amount ? (
            <RNView>
              <RNText style={styles.bottomLineText1}>
                ₹ {formatNumberWithNotation(data?._source?.rent_amount) || 'N/A'} / Month
              </RNText>
            </RNView>
          ) : (
            <RNView></RNView>
          )} */}
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(SearchCard);
