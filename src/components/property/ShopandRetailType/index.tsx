import React from 'react';
import { ScrollView } from 'react-native';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { FONT } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const ShopandRetailType: React.FC<PropertyAreaProps> = ({ details }) => {
  return (
    <RNView>
      {details?.property?.shop_retail_type !== '' && details?.property?.shop_retail_type !== undefined ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Shops and Retail</RNText>

              <RNText style={styles.retailtypeText}>{details?.shop_retail_type}</RNText>
            </RNView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}>
              {details?.shop_retail_type === 'Retail' && details?.shop_retail_type !== undefined ? (
                <RNView style={styles.showroomTypeView}>
                  {details?.type_of_retail?.length > 0 ? (
                    details?.type_of_retail?.map((item: any, key: any) => {
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

              {details?.shop_retail_type === 'Showroom' && details?.shop_retail_type !== undefined ? (
                <RNView style={styles.showroomTypeView}>
                  {details?.type_of_showroom?.length > 0 ? (
                    details?.type_of_showroom?.map((item: any, key: any) => {
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
              ) : null}
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

export default ShopandRetailType;
