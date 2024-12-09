import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import SocialPropertyCard from '@/components/common/SocialPropertyCard';
import UserPostCard from '@/components/common/UserPostCard';
import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

// import SocialPropertyCard from '../../../../../components/property/SocialPropertyCard';
import { styles } from './styles';

// import { ROUTES } from '../../../../../navigation/screen.routes';
// import { ColorTheme, FONT } from '../../../../../utils/colorTheme';

type Props = {
  data?: any;
  loadNextPage?: () => void;
  onRefresh?: () => void;
  loadData?: any;
  isRefreshing?: boolean;
};

export const UserMenuPostTabComponent: React.FC<Props> = ({
  data,
  loadNextPage,
  onRefresh,
  loadData,
  isRefreshing = false,
}) => {
  const navigation = useNavigation();
  // console.log('=======================', data?.length);

  return (
    <RNView style={styles.topView}>
      <FlatList
        nestedScrollEnabled
        data={data}
        initialNumToRender={11}
        extraData={data}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => {
          return Object.hasOwn(item, 'user_data') ? (
            <UserPostCard
              data={item}
              onPressComment={() =>
                navigation.navigate('USER_POST_COMMENTS', {
                  data: item,
                })
              }
            />
          ) : (
            <SocialPropertyCard
              data={item}
              onPress={() =>
                navigation.navigate('PROPERTY_DETAILS', {
                  id: item?._id,
                  owner: item?.owned_by,
                })
              }
              onPressComment={() => {
                navigation.navigate('PROPERTY_COMMENTS', {
                  data: item,
                });
              }}
            />
          );
        }}
        keyExtractor={item => item?.createdAt}
        ListEmptyComponent={() => <ListEmptyComponent type="post" text="No Post Found" />}
        ListFooterComponent={() =>
          data?.length ? (
            <RNView style={styles.listContainer}>
              {loadData?.length < 10 ? (
                <RNView>
                  <RNText style={styles.footerText}>No more posts</RNText>
                </RNView>
              ) : (
                <TouchableOpacity onPress={() => loadNextPage()}>
                  <RNView style={styles.loadMoreBtn}>
                    <RNText style={styles.footerText}>load More</RNText>
                  </RNView>
                </TouchableOpacity>
              )}
            </RNView>
          ) : (
            <RNView></RNView>
          )
        }
      />

      {/* {showModal.show && (
        <ImageModal showImageModal={showModal.show} src={showModal.url} setShowImageModal={setShowModal} type="video" />
      )}
      {showImageModal.show && (
        <ImageModal
          showImageModal={showImageModal.show}
          src={showImageModal.url}
          setShowImageModal={setShowImageModal}
          type="image"
        />
      )} */}
    </RNView>
  );
};
