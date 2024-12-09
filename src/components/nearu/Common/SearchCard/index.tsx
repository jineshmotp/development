import React, { memo } from 'react';
import { ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { formatNumberWithNotation, isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

import { styles } from './styles';

isValidURL;

type Props = {
  data?: any;
  onPress?: () => void;
};

const SearchCard: React.FC<Props> = ({ data, onPress }) => {
  // console.log('data============>', data);
  // console.log(" ", data.property.image_gallery[0]);

  return (
    <RNView style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: isValidURL(data?.gallery[0]?.url)
            ? data?.gallery[0]?.url ||
              'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png'
            : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png',
        }}
        style={styles.imageStyle}
        imageStyle={{ borderRadius: px(8) }}>
        <RNView style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: px(10) }}>
          {data?.rent_amount ? (
            <RNView style={styles.reraView}>
              <RNText style={styles.reraText}>RERA</RNText>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/right.png')}
                style={styles.reraImage}
                // resizeMode="contain"
              />
            </RNView>
          ) : (
            <RNView></RNView>
          )}
          <RNView style={styles.buyView}>
            <RNText style={styles.reraText}> {data?.iwant === 'Sell' ? 'Buy' : data?.iwant}</RNText>
          </RNView>
        </RNView>
        <Pressable onPress={onPress} style={styles.transparentView}>
          <RNView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNText numberOfLines={1} style={styles.propertyText}>
              {' '}
              {data?.property_name}
            </RNText>
            <AntDesign name="right" size={20} color="white" />
          </RNView>
          <RNView style={{ flexDirection: 'row' }}>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/bed.png')}
                style={styles.disImage}
                // resizeMode="contain"
              />
              <RNText style={styles.bhkText}> {data?.bhk}</RNText>
            </RNView>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/rup.png')}
                style={styles.disImage}
                // resizeMode="contain"
              />
              {data?.property_price ? (
                <RNText style={styles.bhkText}> ₹ {formatNumberWithNotation(data?.property_price) || 'N/A'}</RNText>
              ) : (
                <RNText style={styles.bhkText}>
                  {' '}
                  ₹ {formatNumberWithNotation(data?.rent_amount) || 'N/A'} Per Month
                </RNText>
              )}
            </RNView>
          </RNView>
          <RNView style={{ flexDirection: 'row' }}>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/loc.png')}
                style={styles.disImage}
                // resizeMode="contain"
              />
              <RNText style={styles.bhkText}>
                {' '}
                {data?.property_area} {data?.property_area_units}
              </RNText>
            </RNView>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/dir.png')}
                style={styles.disImage}
                // resizeMode="contain"
              />
              <RNText style={styles.bhkText}> {data?.property_facing}</RNText>
            </RNView>
          </RNView>
          <RNView style={{ flexDirection: 'row' }}>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              {data?.property_type === 'Residential' ? (
                <RNImage
                  resizeMode="contain"
                  source={require('@/assets/images/nearu/residential.png')}
                  style={styles.resImage}
                  // resizeMode="contain"
                />
              ) : null}
              {data?.property_type === 'Land or Plot' ? (
                <RNImage
                  resizeMode="contain"
                  source={require('@/assets/images/nearu/land.png')}
                  style={styles.resImage}
                  // resizeMode="contain"
                />
              ) : null}
              {data?.property_type === 'Commercial' ? (
                <RNImage
                  resizeMode="contain"
                  source={require('@/assets/images/nearu/commercial.png')}
                  style={styles.resImage}
                  // resizeMode="contain"
                />
              ) : null}
              {data?.property_type === 'Coliving' ? (
                <RNImage
                  resizeMode="contain"
                  source={require('@/assets/images/nearu/coliving.png')}
                  style={styles.resImage}
                  // resizeMode="contain"
                />
              ) : null}

              <RNText style={styles.bhkText}> {data?.property_type}</RNText>
            </RNView>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/cit.png')}
                style={styles.disImage}
                // resizeMode="contain"
              />
              <RNText numberOfLines={1} style={styles.bhkText}>
                {data?.locality}
              </RNText>
            </RNView>
          </RNView>
          <RNView style={{ flexDirection: 'row' }}>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/dis.png')}
                style={styles.disImage}
                // resizeMode="contain"
              />
              <RNText style={styles.bhkText}>
                {' '}
                {data?.distance > 1000 ? (data?.distance / 1000).toFixed(2) + ' km' : data?.distance?.toFixed(2) + ' m'}
              </RNText>
            </RNView>
            <RNView style={{ flexDirection: 'row', marginTop: px(10), alignItems: 'center', flex: 1 }}>
              <RNImage
                resizeMode="contain"
                source={require('@/assets/images/nearu/jip.png')}
                style={styles.disImage}
                // resizeMode="contain"
              />
              <RNText style={styles.bhkText}> {data?.duration}</RNText>
            </RNView>
          </RNView>
        </Pressable>
      </ImageBackground>
    </RNView>
  );
};

export default memo(SearchCard);
