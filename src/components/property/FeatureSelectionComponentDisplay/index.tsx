import React from 'react';
import { ScrollView} from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceWidth } from '@/utils';

import { FONT } from '@/theme';

import { styles } from './styles';

type Props = {
  details?: any;
  placeholder?: any;

};

const FeatureSelectionComponentDisplay: React.FC<Props> = ({ details, placeholder }) => {
  return (
    <RNView
      style={{
        width: deviceWidth / 1.09,
        alignSelf: 'center',
      }}>
      <RNView
        style={{
          width: deviceWidth / 1.09,
          alignSelf: 'center',
        }}>
        <RNView>
          <RNText
            style={{
              fontSize: 18,
              fontFamily: FONT.PoppinsSemiBold,
              color:
            }}>
            {placeholder}
          </RNText>
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
            {details.length > 0 ? (
              details?.map((item: any, key: any) => {
                return (
                  <RNView key={key} style={styles.ChipStyle}>
                    <RNText style={{ color: 'black' }}>{item?.label}</RNText>
                  </RNView>
                );
              })
            ) : (
              <RNText style={{ color: 'black' }}>N/A</RNText>
            )}
          </RNView>
        </ScrollView>
      </RNView>
    </RNView>
  );
};

export default FeatureSelectionComponentDisplay;
