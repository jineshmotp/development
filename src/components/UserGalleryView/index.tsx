import React, { useState } from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { isArray } from '@/constants/function/isArray';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import ListEmptyComponent from '../common/ListEmptyComponent';
import { styles } from './styles';

type Props = {
  images?: any;
};
const UserGalleryView: React.FC<Props> = ({ images }) => {
  const navigation = useNavigation();
  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <RNView style={styles.container}>
        {isArray(images) ? (
          images?.map(
            (item, index) =>
              // Check if media array is not empty
              item.media?.length > 0 && (
                <RNView
                  key={index}
                  style={[styles.gallery, { flexDirection: item.media.length > 1 ? 'row' : 'column' }]}>
                  {item?.media?.map((mediaItem, mediaIndex) => {
                    return (
                      <TouchableWithoutFeedback
                        key={mediaIndex}
                        onPress={() => {
                          navigation.navigate('GALLERY_PREVIEW', { images: item?.media, hasHeader: true, mediaIndex });
                        }}>
                        <RNImage source={{ uri: mediaItem }} style={styles.image} />
                      </TouchableWithoutFeedback>
                    );
                  })}
                </RNView>
              )
          )
        ) : (
          <ListEmptyComponent text={'No Photos'} type="default" />
        )}
      </RNView>
    </ScrollView>
  );
};

export default UserGalleryView;
