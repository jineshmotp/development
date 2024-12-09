import React from 'react';
import { ScrollView } from 'react-native';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { FONT } from '@/theme';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const IndustryType: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.industry_type.length > 0 &&
      details?.params?.industry_type !== '' &&
      details?.params?.industry_type !== undefined ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText
                style={{
                  fontSize: 18,
                  fontFamily: FONT.PoppinsSemiBold,
                }}>
                Industry Type
              </RNText>
            </RNView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}>
              {details?.industry_type !== null &&
              details?.industry_type !== '' &&
              details?.industry_type !== undefined ? (
                <RNView
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  {details?.industry_type?.length > 0 ? (
                    details?.industry_type?.map((item: any, key: any) => {
                      return (
                        <RNView key={key} style={styles.parkingChip}>
                          <RNText style={{ color: 'black' }}>{item?.label}</RNText>
                        </RNView>
                      );
                    })
                  ) : (
                    <RNText style={{ color: 'black' }}>N/A</RNText>
                  )}
                </RNView>
              ) : null}
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

export default IndustryType;
