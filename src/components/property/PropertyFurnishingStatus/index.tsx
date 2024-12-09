import React from 'react';
import { ScrollView } from 'react-native';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const PropertyFurnishingStatus: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.furnishing_status !== 'Unfurnished' ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Furnishing Details</RNText>
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
                {details?.furnishing_items?.length > 0 ? (
                  details?.furnishing_items?.map((item: any, key: any) => {
                    return (
                      <RNView key={key} style={styles.parkingChip}>
                        <RNText style={styles.chipsetText}>
                          {item?.label} - {item?.count}
                        </RNText>
                      </RNView>
                    );
                  })
                ) : (
                  <RNText style={{ color: 'black' }}>N/A</RNText>
                )}
              </RNView>
            </ScrollView>
          </RNView>

          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={{
              marginVertical: px(10),
            }}
          />
        </>
      ) : null}
    </RNView>
  );
};

export default PropertyFurnishingStatus;
