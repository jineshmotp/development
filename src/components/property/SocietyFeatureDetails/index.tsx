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

const SocietyFeatureDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.society_features !== '' &&
      details?.society_features.length > 0 &&
      details?.society_features !== undefined ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Society Feature</RNText>
            </RNView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}>
              <RNView style={styles.featureTypeView}>
                {details?.society_features?.length > 0 ? (
                  details?.society_features?.map((item: any, key: any) => {
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
              marginVertical: px(10),
            }}
          />
        </>
      ) : null}
    </RNView>
  );
};

export default SocietyFeatureDetails;
