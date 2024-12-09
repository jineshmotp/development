import React from 'react';
import { FlatList } from 'react-native';

import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import ListEmptyComponent from '../ListEmptyComponent';
import GridPhotos from './GridPhotos';
import PropertyAlbum from './PropertyAlbum';
import { styles } from './styles';

type Props = {
  useralbum?: any;
};
const UserAblumView: React.FC<Props> = ({ useralbum }) => {
  const renderItem = ({ item }) => {
    if (item?._id === 'profile_pic' || item?._id === 'cover_pic') {
      // Render profile pic or cover pic
      if (isArray(item?.data)) {
        return <GridPhotos item={item} />;
      }
    } else {
      // Render property pic
      if (isArray(item?.data)) {
        return <PropertyAlbum item={item} />;
      }
    }
  };
  const renderPropertyItem = ({ item }) => {
    // Render property pic
    return <PropertyAlbum item={item} />;
  };
  // Combine profile pic, cover pic, and property into a single array
  const combinedData = [
    { _id: 'profile_pic', property_name: 'Profile Picture', data: useralbum?.profile_pic },
    { _id: 'cover_pic', property_name: 'Cover Photo', data: useralbum?.cover_pic },
  ];
  return (
    <>
      <FlatList
        data={isArray(useralbum?.profile_pic) || isArray(useralbum?.cover_pic) ? combinedData : []}
        extraData={isArray(useralbum?.profile_pic) || isArray(useralbum?.cover_pic) ? combinedData : []}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.container}
        ListEmptyComponent={() => {
          return <ListEmptyComponent type="default" />;
        }}
      />
      <FlatList
        data={isArray(useralbum?.property) ? useralbum?.property : []}
        renderItem={renderPropertyItem}
        numColumns={2}
        contentContainerStyle={styles.containerProperty}
        ListEmptyComponent={() => {
          return <ListEmptyComponent type="default" />;
        }}
      />
    </>
    // <RNView style={styles.emptyView}>
    //   <RNText style={styles.emptyText}> No Photos</RNText>
    // </RNView>
  );
};
export default UserAblumView;
