import React, { useEffect } from 'react';
import { Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

import Divider from '@/components/common/Divider';
import { locationdataCorrection } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const PropertyBasicDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  useEffect(() => {
    locationdataCorrection(details?.property?.locality);
  }, []);

  return (
    <RNView>
      <RNView style={styles.containerViewStyle}>
        <RNView>
          <RNView style={{ marginVertical: px(5) }}>
            <RNText style={styles.propertyNameText}>
              {details?.property?.property_name
                ?.toUpperCase()
                .toLowerCase()
                .replace(/(^\w)/, c => c.toUpperCase())}
            </RNText>
          </RNView>

          <RNView
            style={{
              flexDirection: 'row',
              gap: 0,
              alignItems: 'center',
            }}>
            <RNView
              style={{
                gap: 5,
              }}>
              <RNView style={styles.viewRow}>
                <Ionicons name="earth" size={px(18)} color="gray" />
                <RNText style={styles.textViewStyle}>
                  Posted On - {moment(details?.property?.createdAt).format('DD-MM-YYYY hh:mm A')}
                </RNText>
              </RNView>

              {details?.property?.locality ? (
                <RNView style={styles.viewRow}>
                  <Ionicons name="location-sharp" size={px(18)} color="gray" />
                  <RNText style={styles.textViewStyle}>{details?.property?.locality}</RNText>
                </RNView>
              ) : null}

              {/* {details?.property?.pincode ? (
                <RNView style={styles.viewRow}>
                  <Ionicons name="location-sharp" size={px(18)} color="gray" />
                  <RNText style={styles.textViewStyle}>
                    Pin - {details?.property?.pincode} {details?.property?.state}
                  </RNText>
                </RNView>
              ) : null} */}

              {details?.likeCount ? (
                <RNView style={styles.viewRow}>
                  <AntDesign name="like1" size={px(18)} color={ColorTheme.primary} />
                  <RNText style={styles.textViewStyle}>{details?.likeCount} People like this property</RNText>
                </RNView>
              ) : null}
            </RNView>

            <RNView style={styles.imageView}>
              {details?.property?.is_rera_verified === true && (
                <Image source={require('@/assets/images/property/rera.png')} style={styles.imgStyle} />
              )}

              {details?.property?.is_dtcp_verified === true && (
                <Image source={require('@/assets/images/property/dtcp.png')} style={styles.imgStyle} />
              )}
            </RNView>
            {/* )} */}
          </RNView>
        </RNView>
      </RNView>

      <Divider
        borderColor="#D9D6D6"
        dividerWidth={deviceWidth}
        style={{
          marginVertical: 10,
        }}
      />
    </RNView>
  );
};

export default PropertyBasicDetails;
