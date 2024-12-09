import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import UserGalleryView from '@/components/UserGalleryView';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { activateItemByKey } from '../../../constants/function/property.helperFunctions';
import GalleryViewChips from '../GalleryViewChips';
import ListEmptyComponent from '../ListEmptyComponent';
import UserAblumView from '../UserAblumView';
import VideoGalleryView from '../VideoGalleryView';
import { styles } from './styles';

type Props = {
  userData: any;
  setUserGallery: React.Dispatch<React.SetStateAction<any[]>>;
  userGallery: any[];
};
const GalleryTabView: React.FC<Props> = ({ userData, setUserGallery, userGallery }) => {
  // console.log('userDatauserData', userData);
  const activateTabByKeyforGallery = item => {
    const shallow = [...userGallery];
    const filterData = activateItemByKey(shallow, item.key);
    setUserGallery(filterData);
  };

  const renderGalleryTabs = data => {
    switch (data.key) {
      case 'photos':
        return <UserGalleryView images={userData?.gallery} />;
      case 'videos':
        return <VideoGalleryView uservideo={userData?.uservideo?.home_tour.concat(userData?.uservideo?.post_video)} />;
      case 'album':
        return <UserAblumView useralbum={userData?.useralbum} />;
      case 'business':
        return <ListEmptyComponent text="Business" type="default" />;
      case 'album1':
        return <ListEmptyComponent text={'No Videos'} type="default" />;
    }
  };
  return (
    <RNView style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {userGallery.map((item, ind) => {
          return (
            <GalleryViewChips
              key={ind}
              item={item}
              onPress={() => activateTabByKeyforGallery(item)}
              style={styles.galleryViewStyle}
              textStyle={[styles.galleryText, { color: item?.active ? 'black' : '#9C9C9C' }]}
              containerStyle={[
                styles.galleryContainer,
                { borderBottomColor: item?.active ? ColorTheme.primary : 'white' },
              ]}
            />
          );
        })}
      </ScrollView>
      {renderGalleryTabs(userGallery[0].active && userGallery[0])}
      {renderGalleryTabs(userGallery[1].active && userGallery[1])}
      {renderGalleryTabs(userGallery[2].active && userGallery[2])}
    </RNView>
  );
};

export default GalleryTabView;
