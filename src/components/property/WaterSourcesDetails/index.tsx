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

const WaterSourcesDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.water_source ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Water Sources</RNText>
            </RNView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}>
              <RNView style={styles.sectionView}>
                {details?.water_source?.length > 0 ? (
                  details?.water_source?.map((item: any, key: any) => {
                    return (
                      <RNView key={key} style={styles.parkingChip}>
                        <RNText style={styles.chipsetText}>{item?.label}</RNText>
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
              marginVertical: 10,
            }}
          />
        </>
      ) : null}
    </RNView>
  );
};

export default WaterSourcesDetails;
