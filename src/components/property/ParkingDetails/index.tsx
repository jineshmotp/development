import React from 'react';
import { ScrollView } from 'react-native';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const ParkingDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.wheeler_2_parking !== 0 &&
      details?.wheeler_4_parking !== 0 &&
      details?.params?.visitor_parking !== 0 ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Parking Details</RNText>
            </RNView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}>
              <RNView
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <RNView
                  style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 6,
                  }}>
                  {details?.wheeler_2_parking !== 0 && (
                    <RNView style={styles.parkingChip}>
                      <RNText style={styles.chipsetText}>Two Wheeler</RNText>
                      <RNText style={styles.chipsetText}>{details?.wheeler_2_parking}</RNText>
                    </RNView>
                  )}

                  {details?.wheeler_4_parking !== 0 && (
                    <RNView style={styles.parkingChip}>
                      <RNText style={styles.chipsetText}>Four Wheeler</RNText>
                      <RNText style={styles.chipsetText}>{details?.wheeler_4_parking}</RNText>
                    </RNView>
                  )}

                  {details?.visitor_parking !== 0 && (
                    <RNView style={styles.parkingChip}>
                      <RNText style={styles.chipsetText}>Visitor</RNText>
                      <RNText style={styles.chipsetText}>{details?.visitor_parking}</RNText>
                    </RNView>
                  )}
                </RNView>
              </RNView>
            </ScrollView>
          </RNView>
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={{
              marginVertical: 10,
            }}
          />
        </>
      ) : null}
    </RNView>
  );
};

export default ParkingDetails;
