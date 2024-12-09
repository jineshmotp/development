import React from 'react';
import { Linking, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceWidth, px } from '@/utils';

import { styles } from './styles';

interface PropertyProps {
  details?: any;
}

const PreviewDoc = async (item: any) => {
  //console.log(key);

  console.log(' ');

  if (item.serverUri) {
    try {
      await Linking.openURL(item.serverUri);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  }
};

const PropertyDocumentDetails: React.FC<PropertyProps> = ({ details }) => {
  return (
    <RNView>
      {details?.property_documents.length > 0 && (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Property Documents</RNText>
            </RNView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}>
              <RNView style={styles.sectionView}>
                {details?.property_documents?.length > 0 ? (
                  details?.property_documents?.map((item: any, key: any) => {
                    return (
                      <TouchableOpacity key={key} style={styles.parkingChip} onPress={() => PreviewDoc(item)}>
                        <RNText style={styles.chipsetText}>{item?.label}</RNText>
                        <Entypo name="eye" size={24} color="black" />
                      </TouchableOpacity>
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
      )}
    </RNView>
  );
};

export default PropertyDocumentDetails;
