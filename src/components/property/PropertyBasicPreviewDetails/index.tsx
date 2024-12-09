import React from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { FONT } from '@/theme';
import { ColorTheme } from '@/theme';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const PropertyBasicPreviewDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      <RNView style={styles.containerViewStyle}>
        <RNView>
          <RNView>
            <RNText style={styles.propertyNameText}>{details?.property_name?.toUpperCase()}</RNText>
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
                <Ionicons name="earth" size={24} color="gray" />
                <RNText style={styles.textViewStyle}>
                  Posted On - {moment(new Date()).format('DD-MM-YYYY hh:mm')}
                </RNText>
              </RNView>

              <RNView style={styles.viewRow}>
                <Ionicons name="location-sharp" size={24} color="gray" />
                <RNText style={styles.textViewStyle}>{details?.locality}</RNText>
              </RNView>

              <RNView style={styles.viewRow}>
                <Ionicons name="location-sharp" size={24} color="gray" />
                <RNText style={styles.textViewStyle}>
                  Pin - {details?.pincode},{details?.state}
                </RNText>
              </RNView>
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

export default PropertyBasicPreviewDetails;
