import React, { useState } from 'react';
import { Image, Linking, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import Divider from '@/components/common/Divider';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import PropertyModalWrapper from '../PropertyModalWrapper';
import { styles } from './styles';

interface PropertyProps {
  details?: any;
}

const PropertyBroucherDetails: React.FC<PropertyProps> = ({ details }) => {
  const [showModal, setShowModal] = useState(false);
  const [layoutUrl, setLayoutUrl] = useState<string | null>(null);

  const PreviewDoc = async (item: any) => {
    setShowModal(true);
    setLayoutUrl(item);
  };

  const closeall = () => {
    setShowModal(false);
    setLayoutUrl(null);
  };

  return (
    <RNView>
      {details?.property_broucher.length > 0 && (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Property Broucher</RNText>
            </RNView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}>
              <RNView style={styles.sectionView}>
                {details?.property_broucher?.length > 0 ? (
                  details?.property_broucher?.map((item: any, key: any) => {
                    return (
                      <TouchableOpacity key={key} style={styles.parkingChip} onPress={() => PreviewDoc(item)}>
                        {/* <RNText>{item}</RNText> */}

                        <Image source={{ uri: item }} style={styles.image} />
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

      <PropertyModalWrapper visible={showModal}>
        <RNView style={styles.topView}>
          <TouchableOpacity onPress={closeall}>
            <Entypo name="cross" size={px(24)} color={ColorTheme.black} />
          </TouchableOpacity>
        </RNView>

        <Image source={{ uri: layoutUrl }} style={styles.fullScreenImage} />
      </PropertyModalWrapper>
    </RNView>
  );
};

export default PropertyBroucherDetails;
